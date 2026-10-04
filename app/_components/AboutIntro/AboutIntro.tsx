import "./AboutIntro.css";

const SPECS: { label: string; value: string }[] = [
  { label: "Faço", value: "Sites, sistemas e produtos digitais sob medida" },
  { label: "Uso", value: "React, Next.js, Java, SQL, APIs, automação e IA" },
  { label: "Para", value: "Pessoas e empresas com uma ideia para tirar do papel" },
  { label: "Agora", value: "Aceitando novos projetos — 2026" },
];

export default function AboutIntro() {
  return (
    <div className="intro">
      <div className="intro__index">
        <span className="intro__index-num">01</span>
        <span className="intro__index-line" aria-hidden="true" />
        <span className="intro__index-label">Sobre</span>
      </div>

      <h2 className="intro__greeting">Oi, eu sou o David.</h2>

      <p className="intro__statement">
        Eu transformo ideias em coisas <em>que funcionam</em>.
      </p>

      <dl className="intro__specs">
        {SPECS.map((row) => (
          <div key={row.label} className="intro__row">
            <dt className="intro__row-label">{row.label}</dt>
            <dd className="intro__row-value">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="intro__footer">
        <a href="#contato" className="intro__link">
          <span className="intro__link-text">Vamos conversar</span>
          <span className="intro__link-arrow" aria-hidden="true">→</span>
        </a>

        <span className="intro__signature" aria-hidden="true">David</span>
      </div>
    </div>
  );
}
