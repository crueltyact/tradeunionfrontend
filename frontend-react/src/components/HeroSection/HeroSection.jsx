import "./HeroSection.css"
const HeroSection = ({title, style, titleStyle = {}}) => {
    return (
        <section style={style} className="hero-section">
            <div className="container hero-section__inner">     
                <h1 style={titleStyle} className="hero-section__title">
                    {title}
                </h1>
            </div>
        </section>
    );
}
export default HeroSection;