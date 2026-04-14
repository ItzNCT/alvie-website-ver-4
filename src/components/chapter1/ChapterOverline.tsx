interface ChapterOverlineProps {
  number: string;
  label: string;
}

const ChapterOverline = ({ number, label }: ChapterOverlineProps) => (
  <div className="flex items-center gap-[1em]" style={{ fontFamily: "var(--font-body)" }}>
    <span
      className="text-xs uppercase"
      style={{
        fontWeight: 400,
        letterSpacing: "0.15em",
        color: "rgba(15, 92, 78, 0.5)",
      }}
    >
      {number}
    </span>
    <span
      className="text-xs uppercase"
      style={{
        fontWeight: 500,
        letterSpacing: "0.15em",
        color: "#0F5C4E",
      }}
    >
      {label}
    </span>
  </div>
);

export default ChapterOverline;
