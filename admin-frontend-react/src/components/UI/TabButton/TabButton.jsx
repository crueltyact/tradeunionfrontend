import './TabButton.css';
const TabButton = ({children, isActive, color, ...props}) => {
    return ( 
        <button
        className={`tab-button ${isActive ? 'active' : ''}`}
        style={{'--btn-color': color}}
        {...props} 
        >
           {children}
        </button>
    );
}

export default TabButton;