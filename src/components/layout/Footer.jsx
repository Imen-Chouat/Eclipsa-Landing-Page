import eclipsaLogo from "../../assets/Eclipse logo.svg";
import astrotechLogo from "../../assets/Astrotech logo 2.svg";

const NAV_LINKS = [
  { label: "Register", href: "#register" },
  { label: "Agenda", href: "#agenda" },
  { label: "About us", href: "#about" },
];

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    viewBox: "0 0 320 512",
    icon: (
      <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4.4 37 1.2V7.9C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4v42.1H14v97.8h66z" />
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: (
      <>
        <rect
          x="2.6"
          y="2.6"
          width="18.8"
          height="18.8"
          rx="5.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.4" cy="6.6" r="1.3" />
      </>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/",
    icon: (
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    ),
  },
];
export default function Footer() {
  return (
    <footer id="contacts" className="w-full scroll-mt-6">
      <div className="mx-auto  rounded-t-[32px] bg-[#380E5D]/80 px-6 py-10 font-glacial sm:px-10 lg:px-[60px] lg:py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Brand, quote and organizer */}
          <div className="max-w-[640px] text-center lg:text-left">
            <a href="/" className="inline-block">
              <img
                src={eclipsaLogo}
                alt="Eclipsa"
                className="h-[80px] w-auto sm:h-[120px]"
              />
            </a>

            <p className="mx-auto mt-6 max-w-[500px] font-glacial text-xl leading-relaxed text-[#EDE6F7]/90 sm:text-2xl lg:mx-0 lg:ml-4 lg:text-left">
              <span className="mr-1">&ldquo;</span>
              Aim towards the moon and you might land on a star or Jupiter
              <span className="ml-1">&rdquo;</span>
            </p>

            <div className="mt-10 flex flex-wrap items-end justify-center gap-x-10 gap-y-6 lg:justify-start">
  {/* Heading + logo, centered on each other */}
  <div className="flex flex-col items-center gap-5 lg:ml-8">
    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
      Organized by
    </h2>
    <img
      src={astrotechLogo}
      alt="AstroTech"
      className="h-20 w-auto sm:h-36"
    />
  </div>

  {/* Address */}
  <div className="flex items-center justify-center gap-4 sm:mb-14 lg:justify-start">
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F6F2FB]">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 w-5 text-[#2A1240]"
      >
        <path d="M12 2a7 7 0 0 0-7 7c0 5.05 7 13 7 13s7-7.95 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
      </svg>
    </span>
    <p className="text-base font-glacial leading-relaxed text-[#EDE6F7] sm:text-lg">
      École Nationale Supérieure D&apos;informatique
      <br />
      16270, Oued Smar, Algiers, Algeria
    </p>
  </div>
</div>
            
          </div>

          {/* Navigation and contacts */}
          <div className="flex shrink-0 flex-col items-center gap-10 text-center lg:w-[260px]">
            <nav aria-labelledby="footer-navigation">
              <h2
                id="footer-navigation"
                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Navigation
              </h2>
              <ul className="mt-4 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xl text-[#EDE6F7] transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Contacts
              </h2>
              <a
                href="mailto:astrotech@esi.dz"
                className="mt-4 font-normal inline-block text-xl text-[#EDE6F7] transition-colors duration-200 hover:text-white"
              >
                astrotech@esi.dz
              </a>

              <ul className="mt-4 flex flex-wrap justify-center gap-4">
                {SOCIALS.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F6F2FB] text-[#2A1240] transition-transform duration-200 hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100"
                    >
                      <svg
                        viewBox={social.viewBox ?? "0 0 24 24"}
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        {social.icon}
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}