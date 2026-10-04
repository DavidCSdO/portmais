import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Title — handwritten reveal behind mountains */}
      <h1 className="hero__title" aria-label="DAVID">
        {["D", "A", "V", "I", "D"].map((char, index) => (
          <span
            key={index}
            className="hero__char"
            style={{ "--char-index": index } as React.CSSProperties}
          >
            <span className="hero__char-stroke" aria-hidden="true">{char}</span>
            <span className="hero__char-fill" aria-hidden="true">{char}</span>
          </span>
        ))}
      </h1>

      {/* Mountain landscape — behind logo, covers title */}
      <div className="hero__mountain-wrapper">
        <Image
          src="/images/BACK1.png"
          alt="Paisagem montanhosa"
          width={2560}
          height={1080}
          className="hero__mountain"
          priority
        />
      </div>

      {/* Opening transition curtain — elegant black screen reveal */}
      <div className="hero__curtain" aria-hidden="true" />

      {/* Logo (4-point star) — in front of everything, starts center and glides to final position */}
      <div className="hero__logo-wrapper">
        <Image
          src="/images/LOGO.png"
          alt="Logo estrela de quatro pontas"
          width={500}
          height={500}
          className="hero__logo"
          priority
        />
      </div>
    </section>
  );
}
