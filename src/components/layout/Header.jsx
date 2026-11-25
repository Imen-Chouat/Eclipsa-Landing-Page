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

  const measure = useCallback(() => {
    const link = linkRefs.current[NAV_LINKS.indexOf(activeRef.current)];
    if (!link || link.offsetWidth === 0) return;
    setPill({ left: link.offsetLeft, width: link.offsetWidth });
  }, []);

  useLayoutEffect(() => {
    activeRef.current = active;
    measure();
  }, [active, measure]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const observer = new ResizeObserver(measure);
    observer.observe(nav);

    if (document.fonts) document.fonts.ready.then(measure);

    return () => observer.disconnect();
  }, [measure]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <div className="relative mx-auto flex h-[72px] items-center justify-between rounded-b-[20px] bg-[#380E5D] px-6 shadow-[0_10px_9.3px_0_rgba(0,0,0,0.29)] sm:px-10 lg:px-[60px]">
        {/* Logo */}
        <a href="#home" className="flex shrink-0 items-center gap-3">
          <img
            src={astrotechLogo}
            alt="Astrotech"
            className="h-8 w-auto sm:h-9"
          />
          <img
            src={eclipsaLogo}
            alt="Eclipsa"
            className="h-12 w-auto sm:h-14"
          />
        </a>

        {/* Desktop nav */}
        <nav ref={navRef} className="relative hidden items-center gap-1 md:flex">
          {/* Sliding active pill */}
          {pill && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 h-10 rounded-xl bg-[#FBF6FF] transition-[width,transform] duration-300 ease-out motion-reduce:transition-none"
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
              className={`relative z-10 rounded-full px-6 py-2 font-playfair text-base transition-colors duration-300 lg:text-lg ${
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
          className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 md:hidden"
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
          <nav className="animate-menu-in absolute inset-x-4 top-full z-20 mt-2 flex origin-top flex-col gap-1 rounded-2xl bg-[#380E5D] p-3 shadow-[0_10px_9.3px_0_rgba(0,0,0,0.29)] motion-reduce:animate-none md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                aria-current={active === link ? "page" : undefined}
                onClick={() => {
                  setActive(link);
                  setMenuOpen(false);
                }}
                className={`font-playfair rounded-xl px-5 py-2.5 text-base transition-colors duration-300 ${
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
