import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AccordionItem {
  number: string;
  title: string;
  body: string;
}

interface ProblemAccordionProps {
  items: AccordionItem[];
  defaultOpen?: number;
  reducedMotion?: boolean;
}

const ease = [0.4, 0, 0.2, 1] as const;

const ProblemAccordion = ({ items, defaultOpen = 0, reducedMotion = false }: ProblemAccordionProps) => {
  return (
    <AccordionPrimitive.Root
      type="single"
      defaultValue={`item-${defaultOpen}`}
      collapsible
    >
      {items.map((item, i) => (
        <ProblemAccordionItem
          key={item.number}
          item={item}
          value={`item-${i}`}
          isLast={i === items.length - 1}
          entranceDelay={0.3 + i * 0.12}
          reducedMotion={reducedMotion}
        />
      ))}
    </AccordionPrimitive.Root>
  );
};

const ProblemAccordionItem = ({
  item,
  value,
  isLast,
  entranceDelay,
  reducedMotion,
}: {
  item: AccordionItem;
  value: string;
  isLast: boolean;
  entranceDelay: number;
  reducedMotion: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current?.closest("[data-state]");
    if (!el) return;
    const observer = new MutationObserver(() => {
      setIsOpen(el.getAttribute("data-state") === "open");
    });
    setIsOpen(el.getAttribute("data-state") === "open");
    observer.observe(el, { attributes: true, attributeFilter: ["data-state"] });
    return () => observer.disconnect();
  }, []);

  const paragraphs = item.body.split("\n\n");

  const entranceProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, amount: 0.2 } as const,
        transition: { duration: 0.5, delay: entranceDelay, ease },
      };

  /* Compute colors based on open + hover state */
  const numberOpacity = isOpen ? 0.8 : isHovered ? 0.6 : 0.4;
  const titleOpacity = isOpen ? 1 : isHovered ? 0.8 : 0.55;
  const iconColor = isOpen
    ? "rgba(15, 92, 78, 0.8)"
    : isHovered
      ? "rgba(107, 114, 128, 0.6)"
      : "rgba(107, 114, 128, 0.4)";

  return (
    <motion.div {...entranceProps}>
      <AccordionPrimitive.Item
        value={value}
        className="relative"
        style={{
          borderBottom: isLast ? "none" : "1px solid #E5E7EB",
        }}
      >
        {/* Active indicator line */}
        <div
          className="absolute left-0 top-0 w-[2px] h-full origin-top"
          style={{
            backgroundColor: "#0F5C4E",
            transform: isOpen ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        <AccordionPrimitive.Trigger
          className="flex items-center w-full text-left cursor-pointer py-6 lg:py-7 group rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5C4E]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            backgroundColor: !isOpen && isHovered ? "rgba(15, 92, 78, 0.03)" : "transparent",
            transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Number */}
          <span
            className="shrink-0"
            style={{
              width: 36,
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "clamp(13px, 0.9vw, 14px)",
              color: `rgba(15, 92, 78, ${numberOpacity})`,
              transition: "color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {item.number}
          </span>

          {/* Title */}
          <span
            className="flex-1"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "clamp(16px, 1.1vw, 18px)",
              color: `rgba(17, 24, 39, ${titleOpacity})`,
              transition: "color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {item.title}
          </span>

          {/* Toggle icon: + → × */}
          <div
            className="relative shrink-0 ml-4"
            style={{ width: 16, height: 16 }}
          >
            <span
              className="absolute left-1/2 top-1/2 block"
              style={{
                width: 16,
                height: 1.5,
                backgroundColor: iconColor,
                transform: `translate(-50%, -50%) rotate(${isOpen ? "45deg" : "0deg"})`,
                transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms",
              }}
            />
            <span
              className="absolute left-1/2 top-1/2 block"
              style={{
                width: 16,
                height: 1.5,
                backgroundColor: iconColor,
                transform: `translate(-50%, -50%) rotate(${isOpen ? "-45deg" : "90deg"})`,
                transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms",
              }}
            />
          </div>
        </AccordionPrimitive.Trigger>

        <AccordionPrimitive.Content
          ref={contentRef}
          className="overflow-hidden"
          style={{
            display: "grid",
            gridTemplateRows: "var(--radix-accordion-content-height, 0fr)",
            transition: "grid-template-rows 350ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="overflow-hidden">
            <div
              className="pb-7"
              style={{
                paddingLeft: 36,
                maxWidth: 480,
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(8px)",
                transition: isOpen
                  ? "opacity 300ms 100ms, transform 300ms 100ms cubic-bezier(0.4, 0, 0.2, 1)"
                  : "opacity 150ms, transform 150ms",
              }}
            >
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={i > 0 ? "mt-4" : ""}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "clamp(15px, 1vw, 16px)",
                    lineHeight: 1.75,
                    color: "#6B7280",
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </motion.div>
  );
};

export default ProblemAccordion;
