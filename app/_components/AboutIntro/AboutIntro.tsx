import "./AboutIntro.css";

export default function AboutIntro() {
  return (
    <div className="intro">
      <div className="intro__index">
        <span className="intro__index-num">01</span>
        <span className="intro__index-line" aria-hidden="true" />
        <span className="intro__index-label">Sobre</span>
      </div>

      <p className="intro__greeting">David Cardoso · Desenvolvedor web</p>

      <h2 className="intro__statement">
        Sites e sistemas web <em>sob medida</em>.
      </h2>

      <p className="intro__summary">
        Desenvolvimento de ponta a ponta para apresentar serviços, simplificar processos e
        conectar ferramentas — do planejamento à publicação.
      </p>

      <div className="intro__footer">
        <a href="#contato" className="intro__link">
          <span className="intro__link-text">Solicitar um projeto</span>
          <span className="intro__link-arrow" aria-hidden="true">→</span>
        </a>

        <span className="intro__signature" aria-hidden="true">David</span>
      </div>
    </div>
  );
}
