import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import images from "../constants/images";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Today's Match", to: "/today-match" },
  { label: "Finished Matches", to: "/finished-match" },
  { label: "Upcoming Matches", to: "/upcoming-match" },
  { label: "Player Rank", to: "/player-rank" },
];

const socialLinks = [
  {
    label: "Facebook",
    to: "https://www.facebook.com/shaikotahmed.22.asif/",
    icon: <FaFacebook size={18} />,
  },
];

const Footer = () => {
  return (
    <footer className="px-4 pb-8 pt-10 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="scorequest-glass rounded-[32px] px-6 py-8 sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.7fr_0.85fr]">
            <div>
              <img
                src={images.ScoreQuest}
                width={170}
                alt="ScoreQuest"
                className="h-auto"
              />
              <p className="scorequest-section-copy mt-5 max-w-md text-sm leading-7 sm:text-base">
                ScoreQuest is a live cricket scoring platform for local clubs,
                academies, and community tournaments. Score every ball, keep
                player records updated, and let viewers follow the match in
                realtime.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <div className="mt-4 space-y-3">
                {quickLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block text-sm text-slate-300 transition duration-300 hover:text-secondary-goldenPoppy"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Contact</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:asif522666@gmail.com"
                    className="transition duration-300 hover:text-secondary-goldenPoppy"
                  >
                    asif522666@gmail.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:+8801857610902"
                    className="transition duration-300 hover:text-secondary-goldenPoppy"
                  >
                    +8801857610902
                  </a>
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.to}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:border-secondary-goldenPoppy hover:text-secondary-goldenPoppy"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5 text-sm text-slate-400">
            Developed by{" "}
            <a
              href="https://www.facebook.com/shaikotahmed.22.asif/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-slate-200 transition duration-300 hover:text-secondary-goldenPoppy"
            >
              Shaikot Ahmed Asif
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
