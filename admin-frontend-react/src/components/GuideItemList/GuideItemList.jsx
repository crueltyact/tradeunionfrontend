import "./GuideItemList.css"
import GuideItem from "../GuideItem/GuideItem"
const GuideItemList = ({activeTab, guides}) => {
    const currentTabData = guides[activeTab];
    if (!currentTabData || currentTabData.length === 0) return <p>Справочные материалы не найдены</p>
    return (
        <div className="guide-list">
            {currentTabData.map((section) => (
                <div key={section.id} className="guide-section">
                    <h3 style={{fontSize: "32px"}}>{section.label}</h3>
                    <ul className="guide-themes">
                    {section.themes.map((theme) => (
                        <GuideItem theme={theme} />
                    ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default GuideItemList;