import React from "react";
import {
  AboutSection,
  ArticlesSection,
  ContactSection,
  HeroSection,
  // InterestsSection,
  Page,
  ProjectsSection,
  Seo,
} from "gatsby-theme-portfolio-minimal";
import AnimationSection from "./animation/animationSection";
import * as classes from "./style.module.css";

const mainSectionStyle = {
  position: "relative",
  border: "1px solid black",
};

export default function IndexPage() {
  const mainSection = (
    <div className={classes.mainSection}>
      <AnimationSection />
      <div>
        <HeroSection sectionId="hero" />
      </div>
    </div>
  );

  return (
    <>
      <Seo title="Frontend" />
      <Page>
        {mainSection}
        <ArticlesSection sectionId="blog" heading="TIL" sources={["Blog"]} />
        <AboutSection sectionId="about" heading="Getting Started" />
        {/* <InterestsSection sectionId="details" heading="Details" /> */}
        <ProjectsSection sectionId="apps" heading="Apps" />
        <ContactSection sectionId="contact" heading="Contact" />
      </Page>
    </>
  );
}
