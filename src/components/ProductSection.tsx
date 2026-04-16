const ProductSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{
        zIndex: 45,
        background: "#121212",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "16px",
          color: "#6B7280",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Product Section — Coming Soon
      </p>
    </section>
  );
};

export default ProductSection;
