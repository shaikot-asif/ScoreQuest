import React from "react";
import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import KeyFeatures from "./container/KeyFeatures";
import HowItWorks from "./container/HowItWorks";
import TodayMatch from "./container/TodayMatch";
import FinishedMatch from "./container/FinishedMatch";
import CTA from "./container/CTA";
import HowToUse from "./container/components/HowToUse";
import PulseStrip from "./container/PulseStrip";
import CommandCenter from "./container/CommandCenter";
import AudienceSection from "./container/AudienceSection";
import FAQSection from "./container/FAQSection";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="scorequest-shell overflow-hidden">
        <Hero />
        <TodayMatch />
        <PulseStrip />
        <KeyFeatures />
        <CommandCenter />
        <HowItWorks />
        <AudienceSection />
        <HowToUse />
        <FinishedMatch />
        <FAQSection />
        <CTA />
      </div>
    </MainLayout>
  );
};

export default HomePage;
