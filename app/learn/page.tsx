import type { Metadata, Viewport } from "next";
import { SiteNav } from "../../components/site-nav";
import { HomeFooter } from "../../components/home-sections";
import shell from "../page.module.css";
import s from "./learn.module.css";

export const viewport: Viewport = { themeColor: "#fafaf8" };

export const metadata: Metadata = {
  title: "Explore Technology Learning | OpenByte",
  description:
    "Explore OpenByte's real Arduino and introductory web/AI workshops, plus ideas for future learning in Python, game design, cybersecurity, robotics, apps, and digital skills.",
  alternates: { canonical: "/learn/" },
};

const suggestUrl =
  "mailto:team@openbyte-np.org?subject=OpenByte%20Workshop%20Idea";

const shortcuts = [
  { number: "01", label: "Make a game", href: "#games" },
  { number: "02", label: "Teach a robot", href: "#robotics" },
  { number: "03", label: "Understand AI", href: "#ai" },
  { number: "04", label: "Stay safer online", href: "#safety" },
] as const;

const ideas = [
  {
    id: "python",
    number: "01",
    field: "Programming",
    title: "Python & automation",
    description:
      "Start with the basics, then write a small program that solves a problem or takes care of a repetitive task.",
    outcome: "A useful mini-tool",
  },
  {
    id: "games",
    number: "02",
    field: "Creative technology",
    title: "Game design & creative coding",
    description:
      "Build characters, rules, and interactions while learning how code, art, and problem-solving fit together.",
    outcome: "A playable prototype",
  },
  {
    id: "ai",
    number: "03",
    field: "Emerging technology",
    title: "AI & responsible technology",
    description:
      "Explore what AI can and cannot do, how to check its output, and how to use it thoughtfully in real projects.",
    outcome: "An AI literacy project",
  },
  {
    id: "safety",
    number: "04",
    field: "Digital wellbeing",
    title: "Cybersecurity & digital safety",
    description:
      "Practice recognizing phishing, securing accounts, protecting privacy, and understanding how everyday security works.",
    outcome: "A personal safety toolkit",
  },
  {
    id: "robotics",
    number: "05",
    field: "Physical computing",
    title: "Robotics & sensors",
    description:
      "Combine code with sensors and moving parts to make a device react to the world around it.",
    outcome: "A responsive prototype",
  },
  {
    id: "apps",
    number: "06",
    field: "Design & software",
    title: "Websites, apps & interface design",
    description:
      "Turn an idea into a simple, usable experience. Learn to plan layouts and test what you build with others.",
    outcome: "A working digital experience",
  },
  {
    id: "data",
    number: "07",
    field: "Data & discovery",
    title: "Data science & visualization",
    description:
      "Find patterns, make clear charts, and learn to tell an honest story with data from everyday life.",
    outcome: "A data story",
  },
  {
    id: "digital",
    number: "08",
    field: "Everyday technology",
    title: "Digital confidence",
    description:
      "Practice practical technology skills—from organizing files and using online services to spotting suspicious messages.",
    outcome: "More confidence with technology",
  },
] as const;

export default function LearnPage() {
  return (
    <div className={shell.page}>
      <a className={shell.skipLink} href="#main-content">Skip to main content</a>
      <SiteNav />
      <main className={s.main} id="main-content" tabIndex={-1}>
        <section className={s.hero} aria-labelledby="learn-title">
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>OPENBYTE / EXPLORE LEARNING</p>
            <h1 id="learn-title">Technology has more than <em>one doorway.</em></h1>
            <p className={s.heroLead}>
              Some students want to build a robot. Others want to make a game,
              understand AI, or feel more confident online. We start with
              curiosity, then build something real.
            </p>
            <div className={s.heroActions}>
              <a className={s.primaryLink} href="#possibilities">
                Explore the possibilities <span aria-hidden="true">↘</span>
              </a>
              <a className={s.secondaryLink} href="#our-work">See what we&apos;ve taught</a>
            </div>
          </div>
          <div className={s.choiceBoard} aria-label="Four examples of what technology learners might create">
            <div className={s.boardTop}>
              <span>START WITH WHAT EXCITES YOU</span>
              <span>FOUR WAYS IN ↗</span>
            </div>
            <div className={s.choiceGrid}>
              {shortcuts.map((item) => (
                <a key={item.number} href={item.href} className={s.choiceTile}>
                  <span className={s.choiceNumber}>{item.number} / IDEA</span>
                  <strong>{item.label}</strong>
                  <span className={s.choiceArrow} aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            <p className={s.boardFoot}>Explore first. Find your direction as you go.</p>
          </div>
        </section>

        <section className={s.proof} id="our-work" aria-labelledby="proof-title">
          <div className={s.sectionIntro}>
            <p className={s.eyebrow}>WHAT WE&apos;VE ACTUALLY TAUGHT</p>
            <h2 id="proof-title">Real workshops. Real first steps.</h2>
            <p>
              This is our documented starting point—not a claim that every
              topic below already has a class or an enrollment date.
            </p>
          </div>
          <div className={s.proofGrid}>
            <article className={s.proofCard}>
              <div className={s.proofPhoto}>
                <img
                  src="/media/openbyte-workshops/workshop-overview.webp"
                  width={640}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  alt="Students working with laptops and electronics during an OpenByte Arduino class"
                />
              </div>
              <div className={s.proofText}>
                <p className={s.proofLabel}>FALL 2026 / HANDS-ON PROGRAM</p>
                <h3>Arduino & electronics</h3>
                <p>
                  Students explored circuits and microcontrollers, including LEDs
                  and programming in the Arduino IDE.
                </p>
                <a href="/classes/">Explore the Arduino program <span aria-hidden="true">↗</span></a>
              </div>
            </article>
            <article className={s.proofCard}>
              <div className={s.proofGraphic} aria-hidden="true">
                <span className={s.proofGraphicTag}>INTRO WORKSHOP / 2026</span>
                <span className={s.proofGraphicBig}>idea <span>→</span> code</span>
                <span className={s.proofGraphicBottom}>CREATE / QUESTION / TEST</span>
              </div>
              <div className={s.proofText}>
                <p className={s.proofLabel}>JULY 2026 / INTRODUCTORY WORKSHOP</p>
                <h3>Responsible AI & web basics</h3>
                <p>
                  Our introductory workshop covered responsible AI and web
                  development. It was a workshop, not an ongoing class series.
                </p>
                <a href={suggestUrl}>Ask about future workshops <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          </div>
        </section>

        <section className={s.possibilities} id="possibilities" aria-labelledby="ideas-title">
          <div className={s.sectionIntro}>
            <p className={s.eyebrow}>POSSIBLE NEXT TOPICS</p>
            <h2 id="ideas-title">Not just one kind of tech.</h2>
            <p>
              These are ideas we could develop with interested learners,
              volunteers, and partners. They are <strong>not scheduled or open for registration</strong>.
            </p>
          </div>
          <div className={s.ideaGrid}>
            {ideas.map((idea) => (
              <article className={s.ideaCard} key={idea.id} id={idea.id}>
                <div className={s.cardTop}>
                  <span>{idea.number} / {idea.field}</span>
                  <span aria-label="Future workshop idea">IDEA</span>
                </div>
                <h3>{idea.title}</h3>
                <p>{idea.description}</p>
                <div className={s.cardOutcome}>
                  <span>WHAT YOU COULD MAKE</span>
                  <strong>{idea.outcome}</strong>
                </div>
              </article>
            ))}
          </div>
          <p className={s.honestyNote}>
            Topics, age groups, instructors, locations, and dates will be
            announced only if a workshop is confirmed.
          </p>
        </section>

        <section className={s.approach} aria-labelledby="approach-title">
          <div>
            <p className={s.eyebrow}>THE OPENBYTE WAY</p>
            <h2 id="approach-title">Start small. Build together. Share what works.</h2>
          </div>
          <ol>
            <li><span>01</span><div><h3>Make it approachable.</h3><p>Clear explanations and room to ask questions.</p></div></li>
            <li><span>02</span><div><h3>Learn by doing.</h3><p>Projects and practice instead of just watching slides.</p></div></li>
            <li><span>03</span><div><h3>Make it useful.</h3><p>Take away a skill, a project, or more confidence.</p></div></li>
          </ol>
        </section>

        <section className={s.cta} aria-labelledby="suggest-title">
          <div>
            <p className={s.eyebrow}>HELP SHAPE WHAT COMES NEXT</p>
            <h2 id="suggest-title">What would you want to learn?</h2>
            <p>
              Interested in a topic, teaching a workshop, or hosting one at a
              school or library? Tell our student team. Suggestions are welcome;
              no future classes are confirmed yet.
            </p>
          </div>
          <a className={s.primaryLink} href={suggestUrl}>
            Suggest a workshop <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
      <HomeFooter homePath="/" />
    </div>
  );
}
