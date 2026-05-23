"use client";

import type { Engine, ISourceOptions } from "@tsparticles/engine";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import gsap from "gsap";
import { type ReactNode, useEffect, useRef, useState } from "react";
import Van from "./components/Van";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

const waveParticlesOptions: ISourceOptions = {
  fullScreen: {
    enable: false,
  },
  fpsLimit: 60,
  detectRetina: true,
  background: {
    color: {
      value: "transparent",
    },
  },
  particles: {
    number: {
      value: 9960,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["#ffffff", "#c7e6ff", "#60a5fa", "#1479ff"],
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: {
        min: 0.12,
        max: 0.95,
      },
      animation: {
        enable: true,
        speed: 0.65,
        sync: false,
      },
    },
    size: {
      value: {
        min: 0.35,
        max: 1.8,
      },
    },
    move: {
      enable: true,
      speed: {
        min: 0.5,
        max: 0.7,
      },
      direction: "right",
      random: true,
      straight: false,
      outModes: {
        default: "out",
      },
    },
    links: {
      enable: false,
    },
    shadow: {
      enable: true,
      color: "#3b82f6",
      blur: 8,
    },
  },
};

const ambientParticlesOptions: ISourceOptions = {
  fullScreen: {
    enable: false,
  },
  fpsLimit: 60,
  detectRetina: true,
  background: {
    color: {
      value: "transparent",
    },
  },
  particles: {
    number: {
      value: 52,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["#ffffff", "#93c5fd", "#3b82f6"],
    },
    opacity: {
      value: {
        min: 0.06,
        max: 0.5,
      },
      animation: {
        enable: true,
        speed: 0.45,
        sync: false,
      },
    },
    size: {
      value: {
        min: 0.5,
        max: 2.2,
      },
    },
    move: {
      enable: true,
      speed: {
        min: 0.02,
        max: 0.1,
      },
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out",
      },
    },
    links: {
      enable: false,
    },
    shadow: {
      enable: true,
      color: "#2563eb",
      blur: 10,
    },
  },
};

const contactDustOptions: ISourceOptions = {
  fullScreen: {
    enable: false,
  },
  fpsLimit: 60,
  detectRetina: true,
  background: {
    color: {
      value: "transparent",
    },
  },
  particles: {
    number: {
      value: 110,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["#ffffff", "#bfdbfe", "#60a5fa"],
    },
    opacity: {
      value: {
        min: 0.05,
        max: 0.42,
      },
      animation: {
        enable: true,
        speed: 0.35,
        sync: false,
      },
    },
    size: {
      value: {
        min: 0.45,
        max: 1.9,
      },
    },
    move: {
      enable: true,
      speed: {
        min: 0.02,
        max: 0.12,
      },
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out",
      },
    },
    links: {
      enable: false,
    },
    shadow: {
      enable: true,
      color: "#3b82f6",
      blur: 12,
    },
  },
};

const phonePathData =
  "M21.5 17.65v2.55a1.8 1.8 0 0 1-1.96 1.8 17.92 17.92 0 0 1-7.82-2.78 17.62 17.62 0 0 1-5.43-5.43A17.92 17.92 0 0 1 3.5 5.93 1.8 1.8 0 0 1 5.29 4h2.56a1.8 1.8 0 0 1 1.79 1.55c.12.87.33 1.73.62 2.55a1.8 1.8 0 0 1-.4 1.9l-1.08 1.08a14.4 14.4 0 0 0 4.14 4.14L14 14.14a1.8 1.8 0 0 1 1.9-.4c.82.29 1.68.5 2.55.62a1.8 1.8 0 0 1 1.55 1.79Z";
const morphParticleCount = 72;
const vanPathData =
  "M22 82V55c0-15 12-27 27-27h89c15 0 28 6 38 18l18 22h18c11 0 20 9 20 20v10h-24c-2-14-14-24-29-24s-27 10-29 24H91c-2-14-14-24-29-24S35 84 33 98H22V82Zm34-36h49v24H44V58c0-7 5-12 12-12Zm64 0h20c9 0 16 4 22 11l11 13h-53V46ZM45 99a17 17 0 1 0 34 0 17 17 0 0 0-34 0Zm117 0a17 17 0 1 0 34 0 17 17 0 0 0-34 0Z";
const serviceMorphParticleCount = 112;

function FadeIn({ children }: { children: ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition duration-1000 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function ContactMorph() {
  const stageRef = useRef<HTMLDivElement>(null);
  const morphRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const phonePathRef = useRef<SVGPathElement>(null);
  const particleRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const morph = morphRef.current;
    const core = coreRef.current;
    const phonePath = phonePathRef.current;
    const particles = particleRefs.current;

    if (!stage || !morph || !core || !phonePath || particles.length === 0) {
      return;
    }

    let visibilityObserver: IntersectionObserver | undefined;

    const animation = gsap.context(() => {
      const phonePathLength = phonePath.getTotalLength();
      const phonePoints = particles.map((_, index) => {
        const point = phonePath.getPointAtLength(
          (phonePathLength * index) / particles.length,
        );

        return {
          x: (point.x - 12) * 8.4,
          y: (point.y - 12) * 8.4,
        };
      });

      particles.forEach((particle, index) => {
        const angle = (Math.PI * 2 * index) / particles.length;
        const scatterRadius = 150 + (index % 7) * 22;

        gsap.set(particle, {
          x: Math.cos(angle) * scatterRadius,
          y: Math.sin(angle) * scatterRadius * 0.72,
          scale: 0.45 + (index % 4) * 0.18,
          opacity: 0.18 + (index % 5) * 0.11,
        });
      });

      const morphTimeline = gsap
        .timeline({
          paused: true,
          repeat: -1,
          repeatDelay: 0.7,
        })
        .to(
          particles,
          {
            duration: 2,
            x: (index) => {
              return phonePoints[index].x;
            },
            y: (index) => {
              return phonePoints[index].y;
            },
            opacity: 0.92,
            scale: (index) => 0.7 + (index % 4) * 0.18,
            stagger: {
              each: 0.006,
              from: "random",
            },
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          core,
          {
            duration: 1.2,
            scale: 1.08,
            filter: "drop-shadow(0 0 44px rgba(96, 165, 250, 0.92))",
            ease: "power2.out",
          },
          0.65,
        )
        .to(
          particles,
          {
            duration: 2.25,
            x: (index) => phonePoints[index].x * 1.03,
            y: (index) => phonePoints[index].y * 1.03,
            scale: (index) => 0.78 + (index % 4) * 0.2,
            ease: "sine.inOut",
          },
          2.05,
        )
        .to(
          particles,
          {
            duration: 2.45,
            x: (index) => {
              const angle =
                (Math.PI * 2 * index) / particles.length + Math.PI / 8;
              const disperseRadius = 152 + (index % 7) * 24;

              return Math.cos(angle) * disperseRadius;
            },
            y: (index) => {
              const angle =
                (Math.PI * 2 * index) / particles.length + Math.PI / 8;
              const disperseRadius = 152 + (index % 7) * 24;

              return Math.sin(angle) * disperseRadius * 0.72;
            },
            opacity: (index) => 0.16 + (index % 5) * 0.1,
            scale: (index) => 0.45 + (index % 4) * 0.18,
            rotate: 0,
            stagger: {
              each: 0.015,
              from: "center",
            },
            ease: "power2.inOut",
          },
          4.45,
        )
        .to(
          core,
          {
            duration: 1.4,
            scale: 1,
            filter: "drop-shadow(0 0 28px rgba(59, 130, 246, 0.72))",
            ease: "power2.inOut",
          },
          4.75,
        );

      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            morphTimeline.restart();
            return;
          }

          morphTimeline.pause(0);
        },
        {
          threshold: 0.25,
        },
      );

      visibilityObserver.observe(stage);
    }, morph);

    return () => {
      visibilityObserver?.disconnect();
      animation.revert();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative flex min-h-[30rem] items-center justify-center overflow-hidden"
    >
      <Particles
        id="contact-dust"
        options={contactDustOptions}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="absolute h-80 w-80 rounded-full border border-blue-200/10 bg-blue-500/[0.06] blur-3xl" />
      <div className="absolute h-72 w-72 rounded-full border border-blue-200/10" />

      <div ref={morphRef} className="pointer-events-none absolute left-1/2 top-1/2 z-30">
        {Array.from({ length: morphParticleCount }, (_, index) => (
          <span
            key={index}
            ref={(particle) => {
              if (particle) {
                particleRefs.current[index] = particle;
              }
            }}
            className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100 shadow-[0_0_20px_rgba(96,165,250,0.95)]"
          />
        ))}
      </div>

      <div
        ref={coreRef}
        className="relative z-20 h-32 w-32 rounded-full border border-blue-100/25 bg-blue-300/[0.08] shadow-[inset_0_0_34px_rgba(147,197,253,0.12),0_0_72px_rgba(37,99,235,0.35)] backdrop-blur-xl"
        style={{
          filter: "drop-shadow(0 0 28px rgba(59, 130, 246, 0.72))",
        }}
      />

      <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute h-0 w-0">
        <path ref={phonePathRef} d={phonePathData} />
      </svg>
    </div>
  );
}

function ServicesMorph() {
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const particleRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const vanPath = pathRef.current;
    const particles = particleRefs.current;

    if (!stage || !vanPath || particles.length === 0) {
      return;
    }

    let visibilityObserver: IntersectionObserver | undefined;

    const animation = gsap.context(() => {
      const pathLength = vanPath.getTotalLength();
      const vanPoints = particles.map((_, index) => {
        const point = vanPath.getPointAtLength(
          (pathLength * index) / particles.length,
        );

        return {
          x: (point.x - 127) * 1.25,
          y: (point.y - 67) * 1.25,
        };
      });

      particles.forEach((particle, index) => {
        const angle = (Math.PI * 2 * index) / particles.length;
        const scatterRadius = 156 + (index % 8) * 18;

        gsap.set(particle, {
          x: Math.cos(angle) * scatterRadius,
          y: Math.sin(angle) * scatterRadius * 0.58,
          opacity: 0.12 + (index % 6) * 0.1,
          scale: 0.42 + (index % 5) * 0.12,
        });
      });

      const vanTimeline = gsap
        .timeline({
          paused: true,
          repeat: -1,
          repeatDelay: 0.9,
        })
        .to(particles, {
          duration: 2.1,
          x: (index) => vanPoints[index].x,
          y: (index) => vanPoints[index].y,
          opacity: 0.96,
          scale: (index) => 0.62 + (index % 5) * 0.12,
          stagger: {
            each: 0.004,
            from: "random",
          },
          ease: "power3.inOut",
        })
        .to(
          particles,
          {
            duration: 2.35,
            x: (index) => vanPoints[index].x * 1.01,
            y: (index) => vanPoints[index].y * 1.01,
            ease: "sine.inOut",
          },
          2.05,
        )
        .to(
          particles,
          {
            duration: 2.5,
            x: (index) => {
              const angle =
                (Math.PI * 2 * index) / particles.length + Math.PI / 10;
              const radius = 160 + (index % 8) * 19;

              return Math.cos(angle) * radius;
            },
            y: (index) => {
              const angle =
                (Math.PI * 2 * index) / particles.length + Math.PI / 10;
              const radius = 160 + (index % 8) * 19;

              return Math.sin(angle) * radius * 0.58;
            },
            opacity: (index) => 0.1 + (index % 6) * 0.09,
            scale: (index) => 0.42 + (index % 5) * 0.12,
            stagger: {
              each: 0.006,
              from: "center",
            },
            ease: "power2.inOut",
          },
          4.35,
        );

      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            vanTimeline.restart();
            return;
          }

          vanTimeline.pause(0);
        },
        {
          threshold: 0.3,
        },
      );

      visibilityObserver.observe(stage);
    }, stage);

    return () => {
      visibilityObserver?.disconnect();
      animation.revert();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative flex min-h-[22rem] items-center justify-center overflow-hidden"
    >
      <div className="absolute h-80 w-80 bg-blue-500/10 blur-3xl" />
      <div className="absolute h-64 w-64 rounded-full border border-blue-200/10" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10">
        {Array.from({ length: serviceMorphParticleCount }, (_, index) => (
          <span
            key={index}
            ref={(particle) => {
              if (particle) {
                particleRefs.current[index] = particle;
              }
            }}
            className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100 shadow-[0_0_18px_rgba(96,165,250,0.95)]"
          />
        ))}
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 254 134"
        className="absolute h-0 w-0"
      >
        <path ref={pathRef} d={vanPathData} />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <ParticlesProvider init={particlesInit}>
      <main className="relative min-h-screen overflow-hidden bg-black text-white">
        <section className="relative isolate flex h-screen items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-[#020817] to-black" />

          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-[62vh] w-full overflow-hidden"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 105% 48% at 50% 8%, black 0%, black 53%, transparent 80%)",
              maskImage:
                "radial-gradient(ellipse 105% 48% at 50% 8%, black 0%, black 53%, transparent 80%)",
            }}
          >
            <Particles
              id="cosmic-wave"
              options={waveParticlesOptions}
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 42%, transparent 88%)",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 42%, transparent 88%)",
            }}
          >
            <Particles
              id="ambient-dust"
              options={ambientParticlesOptions}
              className="absolute inset-0 h-full w-full"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 z-10">
            <span className="absolute left-[24%] top-[4%] h-2 w-2 rounded-full bg-blue-200 shadow-[0_0_28px_10px_rgba(59,130,246,0.8)]" />
            <span className="absolute left-[57%] top-[5%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_22px_8px_rgba(96,165,250,0.85)]" />
            <span className="absolute right-[15%] top-[12%] h-1.5 w-1.5 rounded-full bg-blue-200 shadow-[0_0_24px_8px_rgba(37,99,235,0.8)]" />
            <span className="absolute right-[38%] top-[22%] h-1 w-1 rounded-full bg-blue-300 shadow-[0_0_18px_6px_rgba(59,130,246,0.75)]" />
          </div>

          <div className="pointer-events-none absolute bottom-[-12rem] left-1/2 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

          <header className="absolute left-0 top-0 z-30 flex w-full items-center justify-between px-8 py-6">
            <div>
              <h1 className="text-xl uppercase tracking-[0.35em]">
                KAMIL PERKOSZ
              </h1>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-zinc-400">
                Usługi Transportowe
              </p>
            </div>

            <nav className="hidden gap-8 text-sm text-zinc-300 md:flex">
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
          </header>

          <div className="relative z-30 px-6 text-center">
            <p className="mb-6 text-sm uppercase tracking-[0.4em] text-blue-400">
              Premium Logistics & Express Delivery
            </p>

            <h2 className="mb-6 text-6xl font-semibold leading-tight md:text-8xl">
              Premium Transport
              <br />
              Across Poland
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400">
              Fast, secure and reliable transport services for packages,
              airport logistics and express deliveries across Poland.
            </p>

            <a
              href="#contact"
              className="inline-flex rounded-full border border-zinc-700 px-8 py-4 transition hover:border-white"
            >
              Contact Now
            </a>
          </div>

          <div className="absolute -bottom-28 z-20 w-full md:-bottom-36">
            <Van />
          </div>
        </section>

        <section
          id="services"
          className="relative isolate scroll-mt-8 overflow-hidden border-t border-white/10 bg-black px-6 py-24 md:px-8 md:py-32"
        >
          <div className="absolute left-1/2 top-[-10rem] -z-10 h-[30rem] w-[min(72rem,100%)] -translate-x-1/2 bg-blue-500/10 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-[#020817] to-transparent" />

          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
              <div className="max-w-2xl">
                <p className="mb-4 text-sm uppercase tracking-[0.35em] text-blue-400">
                  Services
                </p>
                <h2 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                  Transport built for urgent moves
                </h2>
                <p className="mt-5 text-base leading-7 text-zinc-400 md:text-lg">
                  Premium delivery support for shipments that need speed,
                  security and reliable timing.
                </p>
              </div>

              <ServicesMorph />
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              <article className="border border-white/15 bg-white/[0.03] p-6 transition hover:border-blue-300 hover:bg-blue-400/10 md:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-blue-300">
                  01
                </p>
                <h3 className="mt-8 text-2xl font-medium text-white">
                  Express Delivery
                </h3>
                <p className="mt-4 leading-7 text-zinc-400">
                  Fast transport of packages and urgent shipments across
                  Poland.
                </p>
              </article>

              <article className="border border-white/15 bg-white/[0.03] p-6 transition hover:border-blue-300 hover:bg-blue-400/10 md:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-blue-300">
                  02
                </p>
                <h3 className="mt-8 text-2xl font-medium text-white">
                  Airport Transport
                </h3>
                <p className="mt-4 leading-7 text-zinc-400">
                  Reliable transport services to and from airports.
                </p>
              </article>

              <article className="border border-white/15 bg-white/[0.03] p-6 transition hover:border-blue-300 hover:bg-blue-400/10 md:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-blue-300">
                  03
                </p>
                <h3 className="mt-8 text-2xl font-medium text-white">
                  Premium Logistics
                </h3>
                <p className="mt-4 leading-7 text-zinc-400">
                  Secure handling of valuable and time-sensitive cargo.
                </p>
              </article>

              <article className="border border-white/15 bg-white/[0.03] p-6 transition hover:border-blue-300 hover:bg-blue-400/10 md:p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-blue-300">
                  04
                </p>
                <h3 className="mt-8 text-2xl font-medium text-white">
                  VIP Priority Shipping
                </h3>
                <p className="mt-4 leading-7 text-zinc-400">
                  Priority transport with rapid delivery times.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="relative isolate scroll-mt-8 overflow-hidden border-t border-white/10 bg-black px-6 py-24 md:px-8 md:py-32"
        >
          <div className="absolute right-[-12rem] top-1/2 -z-10 h-[34rem] w-[34rem] -translate-y-1/2 bg-blue-500/10 blur-3xl" />
          <div className="absolute left-[-14rem] top-16 -z-10 h-80 w-80 bg-cyan-300/5 blur-3xl" />
          <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />

          <FadeIn>
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16">
              <div>
                <p className="mb-4 text-sm uppercase tracking-[0.35em] text-blue-400">
                  About
                </p>
                <h2 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                  About Us
                </h2>
              </div>

              <div className="border-l border-blue-200/20 bg-white/[0.025] px-6 py-8 shadow-[0_0_80px_rgba(37,99,235,0.08)] md:px-10 md:py-10">
                <p className="text-base leading-8 text-zinc-300 md:text-lg">
                  Kamil Perkosz Usługi Transportowe provides fast, secure and
                  reliable transport services across Poland.
                </p>
                <p className="mt-5 text-base leading-8 text-zinc-400 md:text-lg">
                  We specialize in express deliveries, airport transport and
                  premium logistics solutions for both individuals and
                  businesses.
                </p>
                <p className="mt-5 text-base leading-8 text-white md:text-lg">
                  Our priority is speed, safety and professional service with
                  every delivery.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        <section
          id="contact"
          className="relative isolate scroll-mt-8 overflow-hidden border-t border-white/10 bg-black px-6 py-24 md:px-8 md:py-32"
        >
          <div className="absolute left-1/2 top-[-8rem] -z-10 h-[36rem] w-[min(70rem,100%)] -translate-x-1/2 bg-blue-500/10 blur-3xl" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(12,42,104,0.28),transparent_46%)]" />

          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.08fr] lg:gap-14">
            <ContactMorph />

            <div className="relative overflow-hidden border border-white/15 bg-white/[0.06] p-6 shadow-[0_0_90px_rgba(37,99,235,0.12)] backdrop-blur-2xl sm:p-8 md:p-10">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/70 to-transparent" />

              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-blue-400">
                Contact
              </p>
              <h2 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                Book your transport
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300 md:text-lg">
                Call or email for fast, secure transport and premium logistics
                support across Poland.
              </p>

              <a
                href="tel:+48796168842"
                className="mt-8 inline-flex items-center justify-center border border-blue-200/35 bg-blue-400/15 px-7 py-4 text-sm font-medium uppercase tracking-[0.24em] text-blue-50 shadow-[0_0_38px_rgba(59,130,246,0.24)] transition hover:border-blue-100 hover:bg-blue-300/25"
              >
                Call now
              </a>

              <div className="mt-8 grid gap-4">
                <a
                  href="tel:+48796168842"
                  className="group border border-white/15 bg-black/20 p-5 transition hover:border-blue-200 hover:bg-blue-400/10"
                >
                  <span className="block text-xs uppercase tracking-[0.3em] text-zinc-500">
                    Phone
                  </span>
                  <span className="mt-3 block text-2xl font-medium text-white transition group-hover:text-blue-100">
                    796 168 842
                  </span>
                </a>

                <a
                  href="mailto:kamillo19922@gmail.com"
                  className="group border border-white/15 bg-black/20 p-5 transition hover:border-blue-200 hover:bg-blue-400/10"
                >
                  <span className="block text-xs uppercase tracking-[0.3em] text-zinc-500">
                    Email
                  </span>
                  <span className="mt-3 block break-all text-base font-medium text-white transition group-hover:text-blue-100 sm:break-normal md:text-lg">
                    kamillo19922@gmail.com
                  </span>
                </a>
              </div>

            </div>
          </div>
        </section>
      </main>
    </ParticlesProvider>
  );
}
