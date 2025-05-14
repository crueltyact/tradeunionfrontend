import classes from './Button.module.css';
const Button = ({children, ...props}) => {
    return ( 
       <a {...props} className={classes.Btn}>
           {children}
       </a>
    );
}

export default Button;