/** Ports the tilted marquee ribbon (decorative, no localized text - same words as the original). */
export function Marquee() {
  const words = [
    "Design",
    "Development",
    "Promotion",
    "Analytics",
    "Branding",
    "UX / UI",
    "SEO",
    "Strategy",
  ];
  const track = [...words, ...words];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {track.map((word, i) => (
          <span key={`word-${i}`} style={{ display: "contents" }}>
            <span>{word}</span>
            <i>✳</i>
          </span>
        ))}
      </div>
    </div>
  );
}
