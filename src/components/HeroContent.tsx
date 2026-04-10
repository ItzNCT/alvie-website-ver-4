const HeroContent = () => {
  return (
    <div className="relative z-10 flex items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center justify-center w-full" style={{ maxWidth: 900 }}>
        <p
          className="font-body font-light text-left w-full animate-hero-fade-in"
          style={{
            fontSize: 64,
            lineHeight: 1.15,
            color: "#F7F4EB",
            animationDelay: "0.6s",
          }}
        >
          ALVIE is your strategic partner for synchronizing your physical capacity with your online platforms. We develop specific digital solutions that display your true value to your audience.
        </p>
      </div>
    </div>
  );
};

export default HeroContent;
