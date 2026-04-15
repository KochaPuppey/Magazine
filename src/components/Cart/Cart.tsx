import styles from './Cart.module.css'
import Counter from '../../UI/Counter'
import BaseCloseButton from '../../UI/BaseCloseButton'
import cartEmptyImg from '../../assets/cart_empty.png'

type Card = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  selected: number;
}

type CartProps = {
  cart: Card[];
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  setCount: (value: number, id: number) => void;
}

function Cart({ cart, isOpen, setOpen, setCount }: CartProps) {  
  if (!isOpen) return null;

  const totalSum = cart.reduce((acc,item) => acc + (item.price * item.selected),0)

  return (
    <div className={styles.container}>
      <BaseCloseButton onClick={() => setOpen(false)} />

      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
        <img src={cartEmptyImg}/>
        <p>Пустая корзина</p>
        </div>
      ) : (
        <>
          {cart.map((card) => {
            const [title, weight] = card.name.split(' - ');

          return (
              <div key={card.id} className={styles.item}>
                <div className={styles.left}>
                  <img src={card.image} alt={title} height="50" width="50" />
                  <div className={styles.info}>
                    {title}
                    <span className={styles.price}>$ {card.price}</span>
                  </div>
                  <span className={styles.weight}>{weight}</span>
                </div>

                <div className={styles.right}>
                  <Counter count ={card.selected} setCount={(value) => setCount(card.id, value)}/>
                </div>
              </div>
            );
          })}

          <div className={styles.line}></div>

          <div className={styles.total}>
            <span>Total:</span> <span> $ {totalSum}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;