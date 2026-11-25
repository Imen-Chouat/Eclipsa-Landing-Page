export default function AboutCard({ title, content, align = "left" }) {
  const alignmentClass = align === "right" ? "md:ml-auto" : "md:mr-auto";

  return (
    <div
      className={`w-full md:w-[62%] ${alignmentClass} bg-[#3B1958]/65 backdrop-blur-md border border-purple-400/20 rounded-2xl p-8 md:p-10 flex flex-col items-start shadow-xl transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-purple-400/40 select-text`}
    >
      <h2 className="font-pfd font-bold text-[19px] md:text-[28px] leading-tight text-white mb-4">
        {title}
      </h2>

      <p className="font-gi text-base md:text-[18px] leading-relaxed text-white/90 whitespace-pre-line">
        {content}
      </p>
    </div>
  );
}
