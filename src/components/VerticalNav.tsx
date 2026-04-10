import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Home, Eye, Image, Layers, BookOpen, MessageCircle,
  Search, Globe, Volume2, VolumeX, User, Share2,
  Facebook, Youtube, MessageSquare, Music, Linkedin, Phone,
  Clock, Menu, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", path: "/", icon: Home },
  { label: "About us", path: "/about", icon: Eye },
  { label: "Gallery", path: "/gallery", icon: Image },
  { label: "Services", path: "/services", icon: Layers },
  { label: "Insights", path: "/insights", icon: BookOpen },
  { label: "Contact", path: "/contact", icon: MessageCircle },
];

const socialIcons = [
  { icon: Facebook, label: "Facebook" },
  { icon: Youtube, label: "Youtube" },
  { icon: MessageSquare, label: "Discord" },
  { icon: Music, label: "Tiktok" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Phone, label: "Zalo" },
];

const VerticalNav = () => {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "VI">("EN");
  const [soundOn, setSoundOn] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (path: string) => location.pathname === path;

  const dateTimeStr = currentTime.toLocaleDateString("en-US", { weekday: "long" })
    + ", " + currentTime.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    + " · " + currentTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  const labelCn = cn(
    "font-body text-sm font-medium whitespace-nowrap transition-all duration-[250ms] ease-out overflow-hidden",
    expanded ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-2 pointer-events-none"
  );

  const utilLabelCn = cn(
    "font-body text-[13px] font-normal whitespace-nowrap transition-all duration-[250ms] ease-out overflow-hidden",
    expanded ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-2 pointer-events-none"
  );

  return (
    <>
      {/* Desktop nav */}
      <nav
        className="fixed left-0 top-0 bottom-0 z-50 hidden md:flex flex-col justify-between transition-[width] duration-[400ms] overflow-hidden"
        style={{
          width: expanded ? 280 : 64,
          backgroundColor: "rgba(247, 244, 235, 0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(26, 26, 24, 0.05)",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onMouseEnter={() => {
          setExpanded(true);
          document.documentElement.style.setProperty("--nav-width", "280px");
        }}
        onMouseLeave={() => {
          setExpanded(false);
          document.documentElement.style.setProperty("--nav-width", "64px");
        }}
      >
        {/* TOP — Logo */}
        <div className="flex items-center justify-center h-20 px-5">
          <span
            className={cn(
              "font-display font-bold text-primary whitespace-nowrap transition-all duration-300",
              expanded ? "text-2xl" : "text-base"
            )}
            style={!expanded ? {
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              letterSpacing: "2px",
            } : undefined}
          >
            ALVIE
          </span>
        </div>

        {/* MIDDLE — Nav links */}
        <div className="flex flex-col items-stretch" style={{ gap: 0 }}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <a
                key={link.path}
                href={link.path}
                className="relative flex items-center h-10 transition-colors duration-300 group"
                style={{ paddingLeft: 20 }}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 rounded-full bg-secondary" />
                )}
                <Icon
                  size={18}
                  className={cn(
                    "shrink-0 transition-colors duration-300",
                    active ? "text-primary" : "text-alvie-black/40 group-hover:text-primary"
                  )}
                />
                <span
                  className={cn(labelCn, active ? "text-primary" : "text-alvie-black group-hover:text-primary")}
                  style={{ marginLeft: 14 }}
                >
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* BOTTOM — Utilities, Social, DateTime, Tagline */}
        <div className="flex flex-col items-stretch">
          {/* Utility rows */}
          {/* Search */}
          <button
            className="flex items-center h-10 text-alvie-black/40 hover:text-alvie-black/80 transition-colors duration-300 group"
            style={{ paddingLeft: 20 }}
            onClick={() => console.log("Search clicked")}
          >
            <Search size={16} className="shrink-0" />
            <span className={utilLabelCn} style={{ marginLeft: 14 }}>Search</span>
          </button>

          {/* Language */}
          <div className="flex items-center h-10 text-alvie-black/40 group" style={{ paddingLeft: 20 }}>
            <Globe size={16} className="shrink-0" />
            <div
              className={cn(
                "flex items-center font-body text-[13px] whitespace-nowrap transition-all duration-[250ms] ease-out overflow-hidden",
                expanded ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-2 pointer-events-none"
              )}
              style={{ marginLeft: 14 }}
            >
              <button
                onClick={() => setLang("VI")}
                className={cn(
                  "transition-colors duration-300",
                  lang === "VI" ? "text-primary font-medium" : "text-alvie-black/40 hover:text-alvie-black/70"
                )}
              >
                VI
              </button>
              <span className="text-alvie-black/20 mx-1.5">/</span>
              <button
                onClick={() => setLang("EN")}
                className={cn(
                  "transition-colors duration-300",
                  lang === "EN" ? "text-primary font-medium" : "text-alvie-black/40 hover:text-alvie-black/70"
                )}
              >
                EN
              </button>
            </div>
          </div>

          {/* Sound */}
          <button
            className="flex items-center h-10 text-alvie-black/40 hover:text-alvie-black/80 transition-colors duration-300 group"
            style={{ paddingLeft: 20 }}
            onClick={() => setSoundOn(!soundOn)}
          >
            {soundOn ? <Volume2 size={16} className="shrink-0" /> : <VolumeX size={16} className="shrink-0" />}
            <span className={utilLabelCn} style={{ marginLeft: 14 }}>
              {soundOn ? "Sound on" : "Sound off"}
            </span>
          </button>

          {/* Sign in */}
          <a
            href="#"
            className="flex items-center h-10 text-alvie-black/40 hover:text-alvie-black/80 transition-colors duration-300 group"
            style={{ paddingLeft: 20 }}
          >
            <User size={16} className="shrink-0" />
            <span className={utilLabelCn} style={{ marginLeft: 14 }}>Sign in</span>
          </a>

          {/* Divider */}
          <div className="flex justify-center" style={{ margin: "16px 0" }}>
            <div className="h-px bg-secondary/25" style={{ width: 40 }} />
          </div>

          {/* Social */}
          <div className="flex items-center h-10" style={{ paddingLeft: 20 }}>
            {!expanded ? (
              <Share2 size={16} className="shrink-0 text-alvie-black/30" />
            ) : (
              <div
                className={cn(
                  "flex items-center gap-3 transition-all duration-[250ms] ease-out",
                  expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                )}
              >
                {socialIcons.map((s) => {
                  const SIcon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href="#"
                      className="text-alvie-black/30 hover:text-alvie-black/70 transition-colors duration-300"
                      aria-label={s.label}
                    >
                      <SIcon size={15} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="flex justify-center" style={{ margin: "16px 0" }}>
            <div className="h-px bg-secondary/25" style={{ width: 40 }} />
          </div>

          {/* DateTime */}
          <div className="flex items-center h-10" style={{ paddingLeft: 20 }}>
            <Clock size={16} className="shrink-0 text-alvie-black/30" />
            <span
              className={cn(
                "font-body text-xs font-light text-alvie-black/50 whitespace-nowrap transition-all duration-[250ms] ease-out overflow-hidden",
                expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
              )}
              style={{ marginLeft: 14 }}
            >
              {dateTimeStr}
            </span>
          </div>

          {/* Tagline */}
          <div className="flex items-center justify-center" style={{ paddingBottom: 20, marginTop: 16 }}>
            <span
              className={cn(
                "font-body text-[11px] font-light italic text-secondary/50 whitespace-nowrap transition-all duration-[250ms] ease-out",
                expanded ? "opacity-100 delay-200" : "opacity-0"
              )}
            >
              To not just exist
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile hamburger */}
      <button
        className="fixed z-[60] md:hidden flex items-center justify-center w-10 h-10 rounded-lg"
        style={{ top: 20, left: 20, backgroundColor: "rgba(247, 244, 235, 0.88)", backdropFilter: "blur(8px)" }}
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} className="text-primary" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[70] bg-primary flex flex-col items-center justify-center md:hidden">
          <button
            className="absolute top-5 right-5 text-primary-foreground"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <nav className="flex flex-col items-center" style={{ gap: 48 }}>
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "font-display font-bold text-[32px] text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300",
                  isActive(link.path) && "text-primary-foreground"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile utilities row */}
          <div className="absolute bottom-20 flex items-center gap-6">
            <button onClick={() => setLang(lang === "EN" ? "VI" : "EN")} className="font-body text-sm text-primary-foreground/60">
              {lang}
            </button>
            <button onClick={() => setSoundOn(!soundOn)} className="text-primary-foreground/60">
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <a href="#" className="text-primary-foreground/60"><User size={18} /></a>
          </div>

          {/* Mobile social row */}
          <div className="absolute bottom-10 flex items-center gap-4">
            {socialIcons.map((s) => {
              const SIcon = s.icon;
              return (
                <a key={s.label} href="#" className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
                  <SIcon size={16} />
                </a>
              );
            })}
          </div>

          <span className="absolute bottom-4 font-body text-xs font-light text-primary-foreground/30">
            To not just exist
          </span>
        </div>
      )}
    </>
  );
};

export default VerticalNav;
