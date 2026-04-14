import ChapterOverline from "./ChapterOverline";
import ProblemAccordion from "./ProblemAccordion";
import ParallaxBreath from "./ParallaxBreath";

const accordionItems = [
  {
    number: "01",
    title: "The Invisible Expert",
    body: "You might be running a large-scale operation with deep expertise and genuine value. Your clients trust you in person. But when a potential partner searches for you online, they find an outdated website that looks nothing like the business you've built.\n\nThe gap isn't just cosmetic. It's structural.",
  },
  {
    number: "02",
    title: "The First Impression Tax",
    body: "Modern clients verify everything online before they negotiate. An outdated digital presence doesn't just look bad — it actively contradicts your real-world credibility. Every day that gap exists, valuable opportunities quietly walk away.\n\nYou're paying a tax you can't see.",
  },
  {
    number: "03",
    title: "The Hidden Cost",
    body: "When your digital reputation falls behind your actual capabilities, trust erodes before a conversation begins. Partners hesitate. Clients second-guess. The credibility you've earned in person gets erased by a single Google search.\n\nThis is the problem we exist to close.",
  },
];

const Chapter1 = () => {
  return (
    <section
      className="relative z-[2]"
      style={{
        backgroundColor: "#F9FAFB",
        borderRadius: "24px 24px 0 0",
        boxShadow: "0 -20px 60px rgba(0,0,0,0.15)",
      }}
    >
      {/* Zone A: Problem Statement */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-[120px] pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-x-16">
          {/* Left column */}
          <div className="lg:sticky lg:top-[calc(50vh-120px)] lg:self-start mb-12 lg:mb-0">
            <ChapterOverline number="01" label="The Trust Gap" />

            <h2
              className="mt-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(32px, 3.5vw, 52px)",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
              }}
            >
              <span style={{ color: "#111827" }} className="block">
                You've built something remarkable.
              </span>
              <span style={{ color: "#6B7280" }} className="block">
                But online, no one can tell.
              </span>
            </h2>

            {/* Decorative line */}
            <div
              className="mt-8 hidden lg:block"
              style={{
                width: 1.5,
                height: 64,
                background:
                  "linear-gradient(to bottom, rgba(15, 92, 78, 0.25), transparent)",
              }}
            />
          </div>

          {/* Right column */}
          <div>
            <p
              className="mb-12"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: 17,
                lineHeight: 1.75,
                color: "#6B7280",
                maxWidth: 520,
              }}
            >
              There's a quiet crisis in business today. Companies with decades of
              expertise — real, verified, hard-won capability — are invisible
              where it matters most.
            </p>

            <ProblemAccordion items={accordionItems} defaultOpen={0} />
          </div>
        </div>
      </div>

      {/* Zone B: Parallax Breath */}
      <ParallaxBreath
        imageSrc="/images/CinematicHeaderBridgeTheNecessity.webp"
        closingLine1="The distance between what you are"
        closingLine2="and what the world sees."
        sectionNumber="01"
      />
    </section>
  );
};

export default Chapter1;
