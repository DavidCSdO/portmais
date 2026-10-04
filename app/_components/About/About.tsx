import Image from "next/image";
import AboutIntro from "../AboutIntro";
import "./About.css";

export default function About() {
  return (
    <section className="about" id="about">
      {/* Background Mountain Image */}
      <div className="about__bg-wrapper">
        <Image
          src="/images/BACK2.jpg"
          alt="Paisagem montanhosa com neve e nuvens"
          fill
          priority={false}
          className="about__bg"
          sizes="100vw"
        />
      </div>

      <div className="about__container">
        {/* Top 4-point star logo */}
        <div className="about__star-wrapper">
          <Image
            src="/images/LOGO.png"
            alt="Estrela de quatro pontas"
            width={140}
            height={140}
            className="about__star"
          />
        </div>

        {/* Two-column layout: Left greeting, Right bio card */}
        <div className="about__content">
          <div className="about__left">
            <AboutIntro />
          </div>

          <div className="about__right">
            <div className="about__card">
              <p>
                Eu gosto de criar coisas.<br />
                Sites, sistemas, experiências, ideias.
              </p>

              <p>
                Às vezes começa com um problema. Às vezes só com uma ideia que eu quero ver funcionando.
              </p>

              <p>
                Eu acredito em começar simples.<br />
                Testar. Errar. Ajustar.<br />
                E transformar uma ideia em algo que realmente funciona.
              </p>

              <p>
                Gosto de tecnologia, mas principalmente do que dá para fazer com ela.<br />
                React. Java. SQL. APIs. Automação. IA.<br />
                Um pouco de tudo que me ajude a construir melhor.
              </p>

              <p>
                Também crio para empresas.<br />
                Websites, sistemas e soluções digitais pensadas para cada negócio.<br />
                Sem depender de template pronto.<br />
                Se precisa ser criado, eu gosto de descobrir como fazer.
              </p>

              <p>
                A tecnologia me ajuda a ir mais rápido.<br />
                A IA me ajuda a explorar mais possibilidades.<br />
                Mas ainda sou eu quem pensa, testa, quebra e constrói.
              </p>

              <p>
                Eu gosto de entender o problema antes de escolher a ferramenta.<br />
                Porque código por código não significa muita coisa.<br />
                O resultado é o que importa.
              </p>

              <p>
                No fim, sou eu por trás de tudo.<br />
                Do primeiro rascunho ao último detalhe.<br />
                Sem complicar. Sem fazer só por fazer.
              </p>

              <p>
                Tenho uma ideia?<br />
                Eu provavelmente já estou pensando em como construir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
