import type { Metadata, Viewport } from "next";
import { SiteNav } from "../../components/site-nav";
import { HomeFooter } from "../../components/home-sections";
import { HomeMotion } from "../../components/home-motion";
import { BLINK_CODE, CLASS_INQUIRY_URL, LESSONS } from "../../lib/site-content";
import shell from "../page.module.css";
import s from "./classes.module.css";

export const viewport: Viewport = { themeColor: "#fafaf8" };

export const metadata: Metadata = {
  title: "Beginner Arduino & Electronics Classes | OpenByte",
  description:
    "Explore OpenByte’s beginner Arduino curriculum for grades 6–9, from a first LED circuit to a distance detector, four-note piano, and reaction-time game.",
  alternates: { canonical: "/classes/" },
};

export default function Classes() {
  return (
    <div className={shell.page}>
      <a className={shell.skipLink} href="#main-content">
        Skip to main content
      </a>
      <SiteNav />
      <HomeMotion />
      <main id="main-content" tabIndex={-1} className={s.content}>
        <section className="class-hero">
          <div className="shell">
            <a className="back-link" href="/#programs">
              ← All programs
            </a>
            <div className="class-hero-grid">
              <div>
                <p className="mono eyebrow">OpenByte education · Grades 6–9</p>
                <h1>
                  Beginner Arduino
                  <br />
                  &amp; Electronics.
                </h1>
                <p className="class-hero-sub">
                  Start with an LED on a breadboard. Then write the code that makes a buzzer play a note, measures the distance to your hand, or times how quickly you press a button.
                </p>
                <div className={s.classActions}>
                  <a className="btn btn-primary" href="#projects">Explore the projects</a>
                  <a className={s.simpleLink} href={CLASS_INQUIRY_URL}>Ask about the next class</a>
                </div>
              </div>
              <figure className={s.workshopPhotos}>
                <div>
                  <img src="/media/openbyte-workshops/workshop-mentoring.webp" width={640} height={853} fetchPriority="high" alt="Two students checking their wiring at an OpenByte Arduino workshop" />
                  <img src="/media/openbyte-workshops/workshop-arduino-build.webp" width={640} height={853} alt="A student assembling a circuit next to an open electronics kit" />
                </div>
                <figcaption>At the workbench in OpenByte’s fall Arduino program.</figcaption>
              </figure>
            </div>
            <div className="course-notice">
              <span className="mono">Fall 2026 · Grades 6–9</span>
              <p>17 students registered for the six-session program. New cohort dates will be shared when they’re confirmed.</p>
            </div>
          </div>
        </section>
        <section id="projects" className="section" aria-labelledby="projects-title">
          <div className="shell">
            <div className="section-heading">
              <h2 id="projects-title">Inside the fall lab guide.</h2>
              <p>These builds from classes five and six connect the code on a laptop to something you can hear, measure, or play.</p>
            </div>
            <div className={s.labs}>
              <article><p>Class 5 · Distance</p><h3>Measure an echo</h3><p>Move a hand toward an ultrasonic sensor and watch the distance reading change.</p></article>
              <article><p>Class 5 · Sound</p><h3>Play a four-note piano</h3><p>Wire four buttons to different inputs. Each button tells the buzzer to play a different note.</p></article>
              <article><p>Class 6 · Timing</p><h3>Test your reaction time</h3><p>Wait for the signal, then press a button to measure your reaction. A second lab turns a button into a buzzer switch.</p></article>
            </div>
          </div>
        </section>
        <section className="section" aria-labelledby="timeline-title">
          <div className="shell">
            <div className="section-heading">
              <div>
                <h2 id="timeline-title">The first two lessons.</h2>
              </div>
              <p>
                Our October online sessions started with wiring a circuit, then added a few lines of Arduino code.
              </p>
            </div>
            <ol className="course-timeline">
              {LESSONS.map((lesson, i) => (
                <li key={lesson.id} id={lesson.id} data-reveal>
                  <div className="timeline-meta">
                    <span className="mono">Lesson 0{i + 1} / Completed</span>
                    <time dateTime={lesson.iso}>{lesson.date}</time>
                  </div>
                  <div>
                    <h3>{lesson.title}</h3>
                    <p>{lesson.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="section" aria-labelledby="parts-title">
          <div className="shell class-grid">
            <div data-reveal>
              <h2 id="parts-title">
                A few parts.
                <br />A first working circuit.
              </h2>
              <p className="body class-intro">
                In the blinking-LED lesson, a resistor limits current through the LED. The program switches the Arduino output on and off every half second.
              </p>
              <ul className="parts-list">
                <li>
                  <span className="mono">01</span>
                  <strong>LED</strong>
                  <span>Light output</span>
                </li>
                <li>
                  <span className="mono">02</span>
                  <strong>Resistor</strong>
                  <span>Current limiting</span>
                </li>
                <li>
                  <span className="mono">03</span>
                  <strong>Microcontroller</strong>
                  <span>Arduino programming</span>
                </li>
              </ul>
            </div>
            <div className="class-code" data-reveal>
              <div className="code-caption mono">
                <span>Example sketch</span>
                <span>blink.ino</span>
              </div>
              <pre>
                <code>{BLINK_CODE}</code>
              </pre>
              <p className="code-footnote">
                500 ms on. 500 ms off. This example switches an LED on and off
                repeatedly.
              </p>
            </div>
          </div>
        </section>
        <section className="section" aria-labelledby="details-title">
          <div className="shell class-grid">
            <div>
              <h2 id="details-title">Class details.</h2>
              <dl className="specs">
                <div>
                  <dt>Who</dt>
                  <dd>Grades 6–9</dd>
                </div>
                <div>
                  <dt>Experience</dt>
                  <dd>No previous electronics experience required</dd>
                </div>
                <div>
                  <dt>Fall 2026 fee</dt>
                  <dd>$100, including a take-home starter kit</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>
                    Online instruction and hands-on starter-kit projects
                  </dd>
                </div>
              </dl>
            </div>
            <div className="class-faq">
              <details>
                <summary>Can I register for the next class?</summary>
                <p>
                  Dates and locations for the next cohort are still to be announced.{" "}
                  <a href={CLASS_INQUIRY_URL}>Contact our team for updates</a>.
                </p>
              </details>
              <details>
                <summary>What projects are in the curriculum?</summary>
                <p>
                  The curriculum starts with current, resistance, and blinking LEDs. Later lab guides introduce ultrasonic distance readings, a four-note piano, a reaction-time game, and a push-button buzzer.
                </p>
              </details>
              <details>
                <summary>Do students need electronics experience?</summary>
                <p>
                  No previous electronics experience is required. This beginner
                  class is for students in grades 6–9.
                </p>
              </details>
              <details>
                <summary>Can my school or library work with you?</summary>
                <p>
                  Yes. We can talk about hosting a class, organizing a
                  collection, providing space, or supporting outreach. Email{" "}
                  <a href="mailto:team@openbyte-np.org">team@openbyte-np.org</a>
                  .
                </p>
              </details>
            </div>
          </div>
        </section>
        <section className="section class-contact">
          <div className="shell">
            <h2>Bring electronics to your community.</h2>
            <p>
              Ask about hosting a class or help OpenByte put more kits and workshop supplies on the table.
            </p>
            <div className={s.classActions}>
              <a className="btn btn-primary" href={CLASS_INQUIRY_URL}>Email OpenByte</a>
              <a className={s.simpleLink} href="/donate/">Support our workshops</a>
            </div>
          </div>
        </section>
      </main>
      <HomeFooter homePath="/" />
    </div>
  );
}
