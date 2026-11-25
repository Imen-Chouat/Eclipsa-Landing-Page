import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // 1. Soft Vanishing Stars (Relocate to a new random spot after fading out)
    const starCount = 130;
    const createStar = (randomInitialAlpha = false) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      size: Math.random() * 1.8 + 0.6,
      alpha: randomInitialAlpha ? Math.random() * 0.8 : 0,
      maxAlpha: Math.random() * 0.65 + 0.3,
      fadeSpeed: Math.random() * 0.0035 + 0.0015, // Slow fade in & out
      phase: randomInitialAlpha && Math.random() < 0.5 ? 'out' : 'in',
      isWhiteGlow: Math.random() < 0.3,
    });

    const stars = Array.from({ length: starCount }, () => createStar(true));

    // 2. Subtle Sky Lights (Soft white & purple ambient light pools)
    const skyLights = [
      // Top-left white/lavender glow behind the Eclipsa logo
      {
        xRatio: 0.12,
        yRatio: 0.1,
        radius: 260,
        color: 'rgba(255, 255, 255, ',
        alpha: 0.14,
        vx: 0,
        vy: 0,
        static: true,
      },
      ...Array.from({ length: 8 }, () => {
        const isWhite = Math.random() < 0.35;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 180 + 90,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          color: isWhite
            ? 'rgba(255, 255, 255, '
            : Math.random() < 0.5
              ? 'rgba(115, 0, 215, ' // #7300D7
              : 'rgba(56, 14, 93, ', // #380E5D
          alpha: isWhite ? Math.random() * 0.06 + 0.02 : Math.random() * 0.16 + 0.05,
          fadeSpeed: Math.random() * 0.0008 + 0.0003,
          fadeDir: Math.random() < 0.5 ? 1 : -1,
          static: false,
        };
      }),
    ];

    // 3. Occasional Subtle Shooting Stars / Meteors
    const meteors = [];
    let lastMeteorTime = Date.now();

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * (canvas.width * 0.85),
        y: Math.random() * (canvas.height * 0.35),
        length: Math.random() * 70 + 50,
        speed: Math.random() * 6 + 5,
        angle: (Math.PI / 180) * (Math.random() * 20 + 30),
        alpha: 0.85,
        life: 0,
        maxLife: Math.random() * 45 + 35,
      });
    };

    const render = () => {
      // Deep #040417 Sky Background
      ctx.fillStyle = '#040417';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Ambient Sky Lights
      skyLights.forEach((light) => {
        const lx = light.static ? canvas.width * light.xRatio : light.x;
        const ly = light.static ? canvas.height * light.yRatio : light.y;

        if (!light.static) {
          light.x += light.vx;
          light.y += light.vy;
          light.alpha += light.fadeSpeed * light.fadeDir;
          if (light.alpha >= 0.2 || light.alpha <= 0.02) light.fadeDir *= -1;

          if (light.x < -light.radius) light.x = canvas.width + light.radius;
          if (light.x > canvas.width + light.radius) light.x = -light.radius;
          if (light.y < -light.radius) light.y = canvas.height + light.radius;
          if (light.y > canvas.height + light.radius) light.y = -light.radius;
        }

        const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, light.radius);
        grad.addColorStop(0, `${light.color}${Math.max(0, light.alpha)})`);
        grad.addColorStop(1, `${light.color}0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(lx, ly, light.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Realistic Slow-Vanishing Stars
      stars.forEach((star, idx) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.phase === 'in') {
          star.alpha += star.fadeSpeed;
          if (star.alpha >= star.maxAlpha) {
            star.alpha = star.maxAlpha;
            star.phase = 'out';
          }
        } else {
          star.alpha -= star.fadeSpeed;
          // Once completely vanished, respawn in a brand-new random position
          if (star.alpha <= 0) {
            stars[idx] = createStar(false);
            return;
          }
        }

        // Soft outer halo
        const glowRadius = star.size * 3.5;
        const starGrad = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          glowRadius
        );
        starGrad.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
        starGrad.addColorStop(
          0.4,
          star.isWhiteGlow
            ? `rgba(243, 232, 255, ${star.alpha * 0.45})`
            : `rgba(192, 132, 252, ${star.alpha * 0.4})`
        );
        starGrad.addColorStop(1, 'rgba(115, 0, 215, 0)');

        ctx.fillStyle = starGrad;
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Crisp bright center point
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.65, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Rare Shooting Stars
      const now = Date.now();
      if (now - lastMeteorTime > 4500 + Math.random() * 5000) {
        spawnMeteor();
        lastMeteorTime = now;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life++;
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha = (1 - m.life / m.maxLife) * 0.75;

        if (m.alpha <= 0) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const meteorGrad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        meteorGrad.addColorStop(0.4, `rgba(192, 132, 252, ${m.alpha * 0.6})`);
        meteorGrad.addColorStop(1, 'rgba(115, 0, 215, 0)');

        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      >
        {/* Top Eclipse */}
        <div className="absolute -top-28 left-1/2 md:left-[56%] -translate-x-1/2 w-[300px] h-[300px] md:w-[390px] md:h-[390px] animate-eclipse blur-[4px]">
          <div
            className="absolute inset-0 rounded-full blur-md"
            style={{
              background:
                'radial-gradient(circle, #380E5D 45%, #7300D7 72%, rgba(115,0,215,0) 100%)',
              boxShadow:
                '0 0 75px 18px rgba(115, 0, 215, 0.65), 0 0 120px 35px rgba(56, 14, 93, 0.55)',
            }}
          />
          <div
            className="absolute inset-[14px] rounded-full bg-[#040417]"
            style={{
              boxShadow:
                'inset 0 -14px 28px rgba(216, 180, 254, 0.75), inset 0 -4px 12px #7300D7',
            }}
          />
        </div>

        {/* Bottom Large Eclipse (Above Footer) */}
        <div className="absolute bottom-28 md:bottom-80 left-1/2 -translate-x-1/2 w-[460px] h-[460px] md:w-[680px] md:h-[680px]  animate-eclipse blur-[4px]">
          <div
            className="absolute inset-0 rounded-full blur-md"
            style={{
              background:
                'radial-gradient(circle, #380E5D 50%, #7300D7 74%, rgba(115,0,215,0) 100%)',
              boxShadow:
                '0 -20px 95px 22px rgba(115, 0, 215, 0.6), 0 -10px 140px 45px rgba(56, 14, 93, 0.55)',
            }}
          />
          <div
            className="absolute inset-[18px] rounded-full bg-[#040417]"
            style={{
              boxShadow:
                'inset 0 18px 36px rgba(233, 213, 255, 0.85), inset 0 6px 18px #7300D7',
            }}
          />
        </div>
      </div>
    </>
  );
}
