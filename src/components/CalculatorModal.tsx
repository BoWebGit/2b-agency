"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ArrowIcon, CheckIcon, CloseIcon } from "./icons";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STEP_COUNT = 5; // type, pages, features, timeline, result

interface CalculatorModalProps {
  open: boolean;
  onClose: () => void;
}

function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

/**
 * Multi-step "Розрахувати проєкт" popup: site type -> page count -> extra
 * features -> timeline -> estimated price + lead form. Mirrors
 * ServiceModal/PriceModal's shell and a11y pattern (Esc to close, focus
 * trap + restore, body scroll lock, portal to body so it paints above
 * the header regardless of which section's stacking context it opens
 * from).
 */
export function CalculatorModal({ open, onClose }: CalculatorModalProps) {
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const [step, setStep] = useState(0);
  const [typeIdx, setTypeIdx] = useState<number | null>(null);
  const [pageIdx, setPageIdx] = useState<number | null>(null);
  const [featureSet, setFeatureSet] = useState<Set<number>>(new Set());
  const [timelineIdx, setTimelineIdx] = useState<number | null>(null);
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const modal = modalRef.current;
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      modal?.querySelector<HTMLElement>(".service-modal-close")?.focus();
    } else if (lastFocused.current) {
      lastFocused.current.focus();
    }
  }, [open]);

  // Reset to a clean first step whenever the popup is closed, so the
  // next open never resumes a half-finished or completed run.
  useEffect(() => {
    if (open) return;
    setStep(0);
    setTypeIdx(null);
    setPageIdx(null);
    setFeatureSet(new Set());
    setTimelineIdx(null);
    setInvalid({});
    setStatus("idle");
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !open) return;
      const modal = modalRef.current;
      if (!modal) return;
      const focusable = modal.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input, textarea",
      );
      if (!focusable.length) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  function toggleFeature(idx: number) {
    setFeatureSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function clearInvalid(name: string) {
    if (invalid[name]) setInvalid((prev) => ({ ...prev, [name]: false }));
  }

  const canAdvance =
    (step === 0 && typeIdx !== null) ||
    (step === 1 && pageIdx !== null) ||
    step === 2 ||
    (step === 3 && timelineIdx !== null);

  function goNext() {
    if (!canAdvance) return;
    setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  const base = typeIdx !== null ? t.calculator.siteTypes[typeIdx]!.base : 0;
  const pagesAdd = pageIdx !== null ? t.calculator.pageCounts[pageIdx]!.add : 0;
  const featuresAdd = [...featureSet].reduce(
    (sum, idx) => sum + t.calculator.features[idx]!.add,
    0,
  );
  const mult =
    timelineIdx !== null ? t.calculator.timelines[timelineIdx]!.mult : 1;
  const total = roundTo((base + pagesAdd + featuresAdd) * mult, 50);
  const totalHigh = roundTo(total * 1.15, 50);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = ["name", "email"] as const;
    const nextInvalid: Record<string, boolean> = {};
    let ok = true;

    fields.forEach((name) => {
      const input = form.elements.namedItem(name) as HTMLInputElement | null;
      if (!input) return;
      const valid =
        name === "email"
          ? EMAIL_RE.test(input.value)
          : input.value.trim() !== "";
      nextInvalid[name] = !valid;
      if (!valid) ok = false;
    });

    setInvalid(nextInvalid);

    if (!ok) {
      const firstBadName = fields.find((f) => nextInvalid[f]);
      if (firstBadName) {
        const el = form.elements.namedItem(firstBadName) as HTMLElement | null;
        el?.focus();
      }
      return;
    }

    const featureNames = [...featureSet]
      .map((idx) => t.calculator.features[idx]?.name)
      .filter(Boolean);
    const messageLines = [
      "Заявка з калькулятора проєкту:",
      typeIdx !== null ? `Тип сайту: ${t.calculator.siteTypes[typeIdx]!.name}` : null,
      pageIdx !== null ? `Кількість сторінок: ${t.calculator.pageCounts[pageIdx]!.name}` : null,
      featureNames.length ? `Додаткові функції: ${featureNames.join(", ")}` : null,
      timelineIdx !== null ? `Терміни: ${t.calculator.timelines[timelineIdx]!.name}` : null,
      `Орієнтовна вартість: $${total.toLocaleString("en-US")} - $${totalHigh.toLocaleString("en-US")}`,
    ].filter((l): l is string => l !== null);

    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      budget: `$${total.toLocaleString("en-US")} - $${totalHigh.toLocaleString("en-US")}`,
      message: messageLines.join("\n"),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (!mounted) return null;

  return createPortal(
    <div
      className={`service-modal-overlay${open ? " open" : ""}`}
      aria-hidden={!open}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="service-modal calculator-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={t.calculator.title}
      >
        <button
          type="button"
          className="service-modal-close"
          aria-label="Закрити"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        {status === "success" ? (
          <div className="service-modal-thanks">
            <span className="service-modal-thanks-icon" aria-hidden="true">
              <CheckIcon />
            </span>
            <h3 className="service-modal-title">{t.calculator.thanksTitle}</h3>
            <p className="service-modal-desc">{t.calculator.thanksText}</p>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={onClose}
            >
              <span>{t.calculator.thanksClose}</span>
            </button>
          </div>
        ) : (
          <>
            <span className="service-modal-idx">
              {step < STEP_COUNT - 1
                ? `${t.calculator.stepPrefix} ${step + 1} ${t.calculator.stepOf} ${STEP_COUNT - 1}`
                : t.calculator.title}
            </span>

            {step < STEP_COUNT - 1 && (
              <div className="calc-progress" aria-hidden="true">
                {Array.from({ length: STEP_COUNT - 1 }).map((_, i) => (
                  <span
                    key={i}
                    className={`calc-progress-dot${i <= step ? " is-active" : ""}`}
                  />
                ))}
              </div>
            )}

            {step === 0 && (
              <>
                <h3 className="service-modal-title">
                  {t.calculator.stepTitles[0]}
                </h3>
                <div className="calc-options">
                  {t.calculator.siteTypes.map((opt, i) => (
                    <button
                      key={opt.name}
                      type="button"
                      className={`calc-option${typeIdx === i ? " is-selected" : ""}`}
                      onClick={() => setTypeIdx(i)}
                    >
                      <span className="calc-option-name">{opt.name}</span>
                      <span className="calc-option-desc">{opt.desc}</span>
                      <span className="calc-option-price">
                        від ${opt.base.toLocaleString("en-US")}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h3 className="service-modal-title">
                  {t.calculator.stepTitles[1]}
                </h3>
                <div className="calc-options">
                  {t.calculator.pageCounts.map((opt, i) => (
                    <button
                      key={opt.name}
                      type="button"
                      className={`calc-option${pageIdx === i ? " is-selected" : ""}`}
                      onClick={() => setPageIdx(i)}
                    >
                      <span className="calc-option-name">{opt.name}</span>
                      {opt.add > 0 && (
                        <span className="calc-option-price">
                          +${opt.add.toLocaleString("en-US")}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="service-modal-title">
                  {t.calculator.stepTitles[2]}
                </h3>
                <div className="calc-options">
                  {t.calculator.features.map((opt, i) => (
                    <button
                      key={opt.name}
                      type="button"
                      className={`calc-option${featureSet.has(i) ? " is-selected" : ""}`}
                      onClick={() => toggleFeature(i)}
                    >
                      <span className="calc-option-name">{opt.name}</span>
                      <span className="calc-option-price">
                        +${opt.add.toLocaleString("en-US")}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="service-modal-title">
                  {t.calculator.stepTitles[3]}
                </h3>
                <div className="calc-options">
                  {t.calculator.timelines.map((opt, i) => (
                    <button
                      key={opt.name}
                      type="button"
                      className={`calc-option${timelineIdx === i ? " is-selected" : ""}`}
                      onClick={() => setTimelineIdx(i)}
                    >
                      <span className="calc-option-name">{opt.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="calc-result">
                  <span className="calc-result-label">
                    {t.calculator.resultTitle}
                  </span>
                  <span className="calc-result-price">
                    ${total.toLocaleString("en-US")} - $
                    {totalHigh.toLocaleString("en-US")}
                  </span>
                  <p className="calc-result-note">{t.calculator.resultNote}</p>
                </div>

                <form
                  className="contacts__form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className={`field${invalid.name ? " is-invalid" : ""}`}>
                    <input
                      type="text"
                      name="name"
                      id="calc-name"
                      required
                      placeholder=" "
                      onInput={() => clearInvalid("name")}
                    />
                    <label htmlFor="calc-name">{t.contacts.nameLabel}</label>
                  </div>
                  <div className={`field${invalid.email ? " is-invalid" : ""}`}>
                    <input
                      type="email"
                      name="email"
                      id="calc-email"
                      required
                      placeholder=" "
                      onInput={() => clearInvalid("email")}
                    />
                    <label htmlFor="calc-email">{t.contacts.emailLabel}</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={status === "sending"}
                  >
                    <span>
                      {status === "sending"
                        ? t.contacts.sending
                        : t.calculator.submit}
                    </span>
                    <span className="btn-ico" aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </button>
                  <p
                    className={`form__note${status === "error" ? " is-error" : ""}`}
                    role={status === "error" ? "alert" : undefined}
                  >
                    {status === "error" ? t.contacts.error : t.contacts.note}
                  </p>
                </form>
              </>
            )}

            {step < STEP_COUNT - 1 && (
              <div className="calc-nav">
                {step > 0 && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={goBack}
                  >
                    <span>{t.calculator.back}</span>
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary calc-nav-next"
                  onClick={goNext}
                  disabled={!canAdvance}
                >
                  <span>{t.calculator.next}</span>
                  <span className="btn-ico" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
