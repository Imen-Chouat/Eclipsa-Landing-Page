export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-0 bg-[#070312]"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 15% 10%, #ffffff 50%, transparent 100%),
            radial-gradient(1px 1px at 35% 25%, #e9d5ff 50%, transparent 100%),
            radial-gradient(2px 2px at 75% 15%, #ffffff 50%, transparent 100%),
            radial-gradient(1px 1px at 85% 40%, #c084fc 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 20% 55%, #ffffff 50%, transparent 100%),
            radial-gradient(1px 1px at 60% 65%, #e9d5ff 50%, transparent 100%),
            radial-gradient(2px 2px at 45% 80%, #ffffff 50%, transparent 100%),
            radial-gradient(1px 1px at 80% 85%, #c084fc 50%, transparent 100%)
          `,
          backgroundSize: '350px 350px',
        }}
      />

      {/* Ambient Purple Nebula Glows */}
      <div className="absolute top-[18%] -left-32 w-[500px] h-[500px] rounded-full bg-purple-900/25 blur-[130px]" />
      <div className="absolute top-[45%] -right-32 w-[550px] h-[550px] rounded-full bg-indigo-900/25 blur-[140px]" />

    </div>
  );
}
