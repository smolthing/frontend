import React from "react";
import { LegalSection, Page, Seo } from "gatsby-theme-portfolio-minimal";

export default function ImprintPage() {
  return (
    <>
      <Seo title="About" useTitleTemplate={true} noIndex={true} />
      <Page>
        <LegalSection sectionId="about" heading="About" />
      </Page>
    </>
  );
}
