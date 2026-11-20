import type { Metadata, Viewport } from "next";
import { SiteNav } from "../../components/site-nav";
import { HomeFooter } from "../../components/home-sections";
import { GiftBuilder } from "./gift-builder";
import shell from "../page.module.css";
import s from "./donate.module.css";

const title = "Donate to OpenByte";
const description = "Help fund hands-on coding, electronics and community technology programs in Northern Virginia. Preview your gift and give securely through HCB.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/donate/" },
  openGraph: { title, description, url: "/donate/", images: ["/media/openbyte-workshops/workshop-mentoring-wide.webp"] },
  twitter: { card: "summary_large_image", title, description, images: ["/media/openbyte-workshops/workshop-mentoring-wide.webp"] },
};
export const viewport: Viewport = { themeColor: "#fafaf8" };

export default function Donate() {
  return (
    <div className={shell.page}>
      <a className={shell.skipLink} href="#main-content">Skip to main content</a>
      <SiteNav />
      <main id="main-content" tabIndex={-1} className={s.layout}>
        <section className={s.story} aria-labelledby="campaign-title">
          <img src="/media/openbyte-workshops/workshop-mentoring.webp" alt="Two students working through an Arduino circuit at an OpenByte workshop" width={1000} height={750} fetchPriority="high" />
          <div className={s.storyText}>
            <h1 id="campaign-title">Give to OpenByte.</h1>
            <p>Your gift puts electronics kits on workshop tables, helps older adults learn everyday tech, and gets donated devices ready for their next home.</p>
          </div>
        </section>
        <GiftBuilder />
      </main>
      <HomeFooter homePath="/" />
    </div>
  );
}
