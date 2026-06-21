// Shared inline SVG icons, ported 1:1 from the arrow markup repeated
// throughout index.html (buttons, service rows, case cards, text links).

export function ArrowIcon({
  width = 16,
  height = 16,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} aria-hidden="true">
      <path
        d="M7 17L17 7M9 7h8v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({
  width = 16,
  height = 16,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} aria-hidden="true">
      <path
        d="M6 6L18 18M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckIcon({
  width = 28,
  height = 28,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} aria-hidden="true">
      <path
        d="M5 12.5L9.5 17L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIconThin({
  width = 24,
  height = 24,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} aria-hidden="true">
      <path
        d="M7 17L17 7M9 7h8v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
