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

export default function IndexPage() {
  return (
    <>
      <Seo title="Portfolio" />
      <Page>
        <HeroSection sectionId="hero"/>
        <ArticlesSection sectionId="blog" heading="TIL" sources={['Blog']} />
        <AboutSection sectionId="about" heading="Getting Started" />
        {/* <InterestsSection sectionId="details" heading="Details" /> */}
        <ProjectsSection sectionId="apps" heading="Apps" />
        <ContactSection sectionId="contact" heading="Contact" />
      </Page>
    </>
  );
}
