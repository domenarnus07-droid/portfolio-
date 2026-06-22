"use client";

// Pas s statistiko in animiranim štetjem (sproži se, ko pride v vidno polje).
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/projects";
import { skills } from "@/lib/siteConfig";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function Stats() {
  const liveCount = projects.filter((p) => p.live).length;
  const items = [
    { value: projects.length, suffix: "", label: "Projektov" },
    { value: liveCount, suffix: "", label: "V živo" },
    { value: skills.length, suffix: "+", label: "Tehnologij" },
    { value: 100, suffix: "%", label: "Predanost" },
  ];

  return (
    <section className="border-y border-border bg-surface/40">
      <div className="container-px grid grid-cols-2 gap-6 py-12 md:grid-cols-4">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="text-3xl font-bold text-gradient sm:text-4xl">
              <Counter to={it.value} suffix={it.suffix} />
            </div>
            <div className="mt-1 text-sm text-muted">{it.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
