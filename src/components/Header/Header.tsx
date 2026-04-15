import BaseButton from '../../UI/BaseButton'

import styles from './Header.module.css'

type HeaderProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

function Header ({isOpen, setOpen}:HeaderProps) {
return (
  <div className = {styles.container}>
  <BaseButton>Магазин овощей </BaseButton>
  <BaseButton onClick={() => setOpen(!isOpen)}>Корзина </BaseButton>
  </div>
)
}

export default Header