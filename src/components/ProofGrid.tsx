const PLACEHOLDER_CARDS = [
  { metric: "+312%", label: "Organic reach growth", client: "Atelier Mori" },
  { metric: "4.9/5", label: "Brand clarity score", client: "Kinhouse Studio" },
  { metric: "2.7x", label: "Qualified inbound leads", client: "Verdant Co." },
  { metric: "98%", label: "Client retention", client: "Northbound Labs" },
  { metric: "−45%", label: "Time to launch", client: "Solène Wellness" },
  { metric: "$1.2M", label: "Pipeline generated", client: "Hinoki Group" },
];

const ProofGrid = () => {
  return (
    <section
      className="relative"
      style={{
        zIndex: 50,
        background: "#F9FAFB",
        minHeight: "100vh",
        padding: "96px 48px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "#6B7280",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          The Proof
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "56px",
            fontWeight: 700,
            color: "#111827",
            letterSpacing: "-0.02em",
            lineHeight: "115%",
            marginBottom: "72px",
            maxWidth: "800px",
          }}
        >
          Quiet work,
          <br />
          loud results.
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "24px" }}
        >
          {PLACEHOLDER_CARDS.map((card, i) => (
            <div
              key={i}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "24px",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "240px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "56px",
                  fontWeight: 700,
                  color: "#0F5C4E",
                  letterSpacing: "-0.02em",
                  lineHeight: "100%",
                }}
              >
                {card.metric}
              </span>
              <div style={{ marginTop: "32px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "18px",
                    color: "#111827",
                    marginBottom: "8px",
                  }}
                >
                  {card.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "#6B7280",
                  }}
                >
                  {card.client}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofGrid;
