import { useState } from 'react'
import styles from './App.module.css'
import Header from './components/Header/Header'
import ListCard from './components/ListCard/ListCard'

function App() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={styles.margin}>
    <Header isOpen={isOpen} setOpen={setOpen}/>
    <ListCard isOpen={isOpen} setOpen={setOpen}/>
    </div>
  )
}

export default App
