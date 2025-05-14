import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <video autoPlay muted loop playsInline className="hero__video">
        <source src="/video-bg.mp4" type="video/mp4" />
      </video>
      <div className="container hero__inner">
        <div className="hero__titles">
            <h1 className="hero__title">
                Профорганизация Московского Политеха
            </h1>
            <h2 className="hero__subtitle">Стремление к совершенству</h2>
        </div>
      </div>
    </section>
  );
};

export default Hero;