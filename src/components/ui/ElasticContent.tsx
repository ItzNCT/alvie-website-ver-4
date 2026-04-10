import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ElasticContentProps {
  children: React.ReactNode;
  className?: string;
}

const ElasticContent = ({ children, className }: ElasticContentProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className={cn("w-full px-6", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "elastic-content transition-[margin-left,width] duration-[400ms]",
        className
      )}
      style={{
        marginLeft: "var(--nav-width, 64px)",
        width: "calc(100vw - var(--nav-width, 64px))",
        paddingLeft: "var(--safe-space, 48px)",
        paddingRight: "var(--safe-space, 48px)",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  );
};

export default ElasticContent;
