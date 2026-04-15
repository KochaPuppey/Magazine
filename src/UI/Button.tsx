type ButtonProps = {
  children?: React.ReactNode
  onClick?: () => void;
}
import styles from './Button.module.css';

const Button = ({children,onClick}: ButtonProps) => {
  return (
    <button
    className = {styles.button_gradient}
    onClick={onClick}
    >
      {children}
    </button>
  )
}


export default Button;