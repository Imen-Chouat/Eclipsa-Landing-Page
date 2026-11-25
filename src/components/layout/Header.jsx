import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import astrotechLogo from "../../assets/Astrotech logo.svg";
import eclipsaLogo from "../../assets/Eclipse logo.svg";

const NAV_LINKS = ["Home", "Agenda", "Contacts"];

export default function Header() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [pill, setPill] = useState(null);

  const navRef = useRef(null);
  const linkRefs = useRef([]);
  const activeRef = useRef(active);

  // Measure the active link so the pill can slide to it. Stable identity so
  // async callers (fonts, resize) always read the current active link.
  const measure = useCallback(() => {
    const link = linkRefs.current[NAV_LINKS.indexOf(activeRef.current)];
    if (!link || link.offsetWidth === 0) return;
    setPill({ left: link.offsetLeft, width: link.offsetWidth });
  }, []);

  // Runs after the new active styles are applied, so the width is final.
  useLayoutEffect(() => {
    activeRef.current = active;
    measure();
  }, [active, measure]);

  // Keep the pill aligned through resizes and the Playfair font swap.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const observer = new ResizeObserver(measure);
    observer.observe(nav);

    if (document.fonts) document.fonts.ready.then(measure);

    return () => observer.disconnect();
  }, [measure]);

  return (
    <header className="w-full">
      <div className="relative mx-auto flex h-[104px]  items-center justify-between rounded-b-[24px] bg-[#380E5D]/100 px-6 shadow-[0_10px_9.3px_0_rgba(0,0,0,0.29)] sm:px-10 lg:px-[60px]">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-4">
          <img
            src={astrotechLogo}
            alt="Astrotech"
            className="h-10 w-auto sm:h-12"
          />
          <img
            src={eclipsaLogo}
            alt="Eclipsa"
            className="h-[72px] w-auto sm:h-[80px]"
          />
        </a>

        {/* Desktop nav */}
        <nav ref={navRef} className="relative hidden items-center gap-1 md:flex">
          {/* Sliding active pill */}
          {pill && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 h-12 rounded-2xl bg-[#FBF6FF] transition-[width,transform] duration-300 ease-out motion-reduce:transition-none"
              style={{
                width: pill.width,
                transform: `translate(${pill.left}px, -50%)`,
              }}
            />
          )}

          {NAV_LINKS.map((link, index) => (
            <a
              key={link}
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              href={`#${link.toLowerCase()}`}
              aria-current={active === link ? "page" : undefined}
              onClick={() => setActive(link)}
              className={`relative z-10 rounded-full px-8 py-2.5 font-playfair text-lg transition-colors duration-300 lg:text-xl ${
                active === link
                  ? "font-semibold text-[#1A0B26]"
                  : "text-[#E3D5F0] hover:text-white"
              }`}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="h-6 w-6"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="absolute inset-x-0 top-full z-20 mt-2 flex origin-top animate-menu-in flex-col gap-1 rounded-2xl bg-[#380E5D] p-3 shadow-[0_10px_9.3px_0_rgba(0,0,0,0.29)] motion-reduce:animate-none md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                aria-current={active === link ? "page" : undefined}
                onClick={() => {
                  setActive(link);
                  setMenuOpen(false);
                }}
                className={`font-playfair rounded-xl px-5 py-3 text-lg transition-colors duration-300 ${
                  active === link
                    ? "bg-[#FBF6FF] font-semibold text-[#1A0B26]"
                    : "text-[#E3D5F0] hover:bg-white/10 hover:text-white"
                }`}
              >
                {link}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
