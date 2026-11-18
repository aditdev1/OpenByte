import s from "./learning-preview.module.css";

const examples = [
  { number: "01", prompt: "I want to...", action: "make a game.", detail: "CREATIVE CODING" },
  { number: "02", prompt: "I want to...", action: "automate a task.", detail: "PYTHON & PROBLEM-SOLVING" },
  { number: "03", prompt: "I want to...", action: "understand AI.", detail: "AI LITERACY" },
  { number: "04", prompt: "I want to...", action: "build something that moves.", detail: "ROBOTICS & SENSORS" },
] as const;

export function LearningPreview() {
  return (
    <section className={s.preview} id="learning-paths" aria-labelledby="learning-preview-title">
      <div className={s.head}>
        <div>
          <p className={s.kicker}>EXPLORE LEARNING / MORE THAN ONE STARTING POINT</p>
          <h2 id="learning-preview-title">What would you like to make?</h2>
        </div>
        <div className={s.side}>
          <p>
            We&apos;ve introduced students to circuits, responsible AI, and web
            basics. We&apos;re also collecting ideas for what to teach next.
          </p>
          <a href="/learn/">Explore all learning topics <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className={s.cards}>
        {examples.map((item) => (
          <a href="/learn/#possibilities" className={s.card} key={item.number}>
            <span className={s.number}>{item.number} / POSSIBILITY</span>
            <span className={s.prompt}>{item.prompt}</span>
            <strong>{item.action}</strong>
            <span className={s.detail}>{item.detail} <span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>
      <p className={s.note}>Ideas for future workshops, not currently scheduled classes or open registrations.</p>
    </section>
  );
}
