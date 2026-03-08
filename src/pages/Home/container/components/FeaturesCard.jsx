import React from "react";
import { motion } from "framer-motion";

const FeaturesCard = ({
  icon,
  title,
  text,
  eyebrow,
  stat,
  delay = 0,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className={`scorequest-glass group relative h-full overflow-hidden rounded-[28px] p-6 ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary-goldenPoppy/70 to-transparent" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary-goldenPoppy text-3xl text-slate-950 shadow-[0_18px_32px_rgba(253,199,0,0.2)] transition duration-300 group-hover:scale-105">
          {icon}
        </div>

        {stat && (
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
            {stat}
          </div>
        )}
      </div>

      {eyebrow && (
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-secondary-goldenPoppy">
          {eyebrow}
        </p>
      )}

      <h4 className="mt-3 text-xl font-bold text-white">{title}</h4>
      <p className="scorequest-section-copy mt-3 text-sm leading-7 sm:text-base">
        {text}
      </p>
    </motion.div>
  );
};

export default FeaturesCard;
