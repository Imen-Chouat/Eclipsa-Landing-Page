import { useState, useEffect } from 'react';
import eclipsaLogo from '../../assets/Logo.svg';
import heroSilhouette from '../../assets/women.svg';


const REGISTRATION_FORM_URL = 'https://forms.gle/owdCBY6tJizosCRh8';

function SparkleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-white shrink-0"
      aria-hidden="true"
    >
      <path d="M12 1L14.8 9.2L23 12L14.8 14.8L12 23L9.2 14.8L1 12L9.2 9.2L12 1Z" />
    </svg>
  );
}

export default function Hero() {
  const targetDate = new Date('2026-12-03T00:00:00').getTime();

  const calculateTimeLeft = () => {
    const now = Date.now();
    const diff = Math.max(0, targetDate - now);

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdownItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      id="home"
      className="relative max-w-6xl mx-auto px-6 md:px-12 pt-10 md:mb-[-16px] md:pt-14"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6 z-10 flex flex-col items-start">
          <img
            src={eclipsaLogo}
            alt="Eclipsa"
            className="h-24 md:h-28 w-auto mb-6 object-contain"
          />

          <p className="font-pfd font-bold text-[28px] md:text-[32px] leading-tight text-white mb-4">
            Eclipsa&apos;s first edition is coming up!
          </p>

          <p className="font-gi text-lg md:text-[21px] leading-snug text-white/90 max-w-md mb-8">
            The first ever astronomy themed hackathon in ESI is coming soon,
            don&apos;t lose your chance, register now, and participate in this
            challenge.
          </p>

          <div className="grid grid-cols-2 gap-x-12 gap-y-4 font-gi text-base md:text-[19px] text-white mb-10">
            <div className="flex items-center gap-3">
              <SparkleIcon />
              <span>Esi Algiers</span>
            </div>
            <div className="flex items-center gap-3">
              <SparkleIcon />
              <span>December 3rd</span>
            </div>
            <div className="flex items-center gap-3">
              <SparkleIcon />
              <span>3 days hackathon</span>
            </div>
            <div className="flex items-center gap-3">
              <SparkleIcon />
              <span>Teams of 4</span>
            </div>
          </div>

          <a
            href={REGISTRATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-[#FCF4FE] hover:bg-[#E0D0F0] text-[#1a0836] font-pfd font-bold text-xl md:text-[22px] shadow-xl transition-all duration-700 ease-out hover:scale-[1.05] hover:shadow-purple-400/40"
          >
            Register Now
          </a>
        </div>

        <div className="lg:col-span-6 self-stretch relative flex flex-col items-center lg:items-end justify-end min-h-[380px] -mt-6 sm:-mt-10 lg:mt-0">
          <img
            src={heroSilhouette}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute top-0 lg:top-16 right-2 sm:right-6 h-[440px] lg:h-[490px] w-auto object-contain z-0 opacity-95 drop-shadow-[0_0_24px_rgba(20,25,55,0.85)]"
          />

          <div className="relative z-10 w-full max-w-[440px] mt-auto">
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {countdownItems.map((item) => (
                <div
                  key={item.label}
                  className="bg-[#380E5D]/80 border border-purple-400/25 rounded-2xl py-4 px-2 flex flex-col items-center justify-center"
                >
                  <span className="bg-transparent font-gi text-3xl sm:text-4xl md:text-[42px] text-white leading-none mb-2">
                    {item.value}
                  </span>
                  <span className="bg-transparent font-gi text-xs sm:text-sm text-white/85">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-bold text-xl md:text-[24px] text-white mt-2 pb-5 text-left font-pfd">
              Join The Crew!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
