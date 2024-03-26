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
        <AboutSection sectionId="about" heading="Getting Started (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧" />
        {/* <InterestsSection sectionId="details" heading="Details" /> */}
        <ProjectsSection sectionId="apps" heading="Apps" />
        <AboutSection sectionId="about" heading="Getting Started (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧" />
        <ContactSection sectionId="illustration" heading="Thank you for visiting, see you again." />
      </Page>
    </>
  );
}
