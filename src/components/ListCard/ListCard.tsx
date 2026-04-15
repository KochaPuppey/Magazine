import ky from 'ky'; 
import { useEffect, useState } from 'react';
import BaseButton from '../../UI/BaseButton'
import styles from './ListCard.module.css'
import Counter from '../../UI/Counter'
import BaseLoader from '../../UI/BaseLoader'
import Cart from '../Cart/Cart';

type Card = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  selected: number;
}

type ListCard = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

function ListCard ({isOpen, setOpen}:ListCard ) {
  const [cards, setCards] = useState <Card []>([]);
  const [loader, setLoader] = useState (false);
  const [cart, setCart] = useState <Card []>([]);
  const [counts, setCounts] = useState <Record <number, number>>({});
  useEffect ( () => {
    const fetchCards = async () => {
      try {
    const data = await ky ('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json').json <Card []>();
    setCards(data);
    setLoader(true);
      }
      catch (error) {
        if (error instanceof Error) {
          console.log(error.message)
        }
        else console.log(`Какая-то ошибка`)
      }
    }
    setTimeout(fetchCards,1000) // Специально для тестирования loader
  },[])
  function handleClick (card:Card) {
    const count = counts[card.id] ?? 1
    setCart((prev) => {
      const alreadyAdd = prev.find((item) => item.id === card.id);
      if (alreadyAdd) {
        return prev.map ((item) => item.id === card.id ? ({...item, selected: (item.selected ?? 0) + count}) : item)
      }
      return [...prev, {...card, selected: count}]
  })
    setOpen (true)
  }
  function handleCartCount(id: number, value: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: value } : item
      )
    );
  }
  return (
    <div className={styles.container}>
      <Cart cart ={cart}
      isOpen = {isOpen}
      setOpen = {setOpen} 
      setCount = {handleCartCount}/>
    <h2 className={styles.title}>Каталог</h2>
    <div className = {styles.list}>
  { loader ? (
    cards.map((card) => {
    const [title, weight] = card.name.split(' - ')
    return (
    <div key={card.id} className={styles.card}> 
    <img src = {card.image} alt={card.name} width='150px' height='150px'/> 
    <div className={styles.name}>
      <b>{title}</b> <span style = {{fontWeight:100, color:'grey'}}>{weight}</span>
    <Counter count={counts[card.id] ?? 1} setCount={(value) => setCounts(prev => ({...prev, [card.id]:value} ))}/>
    </div>
    <div className={styles.price}>
    <b>$ {card.price}</b>
    <BaseButton variant = 'light' onClick={() => handleClick(card)}>Добавить в корзину</BaseButton>
    </div>
    </div>
    )
    }
    )
  ):(
   <BaseLoader/>
  )}
</div>
  </div>
  );
}

export default ListCard