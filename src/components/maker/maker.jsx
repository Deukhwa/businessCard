import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Editor from '../editor/editor'
import Footer from '../footer/footer'
import Header from '../header/header'
import Preview from '../preview/preview'
import styles from './maker.module.css'

const Maker = ({ Fileinput, authService, cardRepository }) => {
  const navigateState = useLocation().state
  const [cards, setCards] = useState({})
  const [userId, setUserId] = useState(navigateState && navigateState.id)

  const navigate = useNavigate()
  const onLogout = () => {
    authService.logout()
  }

  useEffect(() => {
    if (!userId) {
      return
    }
    const stopSync = cardRepository.syncCard(userId, (cards) => {
      setCards(cards)
    })
    return () => {
      stopSync()
    }
  }, [userId])

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        navigate('/')
      }
    })
  })

  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards }
      updated[card.id] = card
      return updated
    })
    cardRepository.saveCard(userId, card)
  }

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards }
      delete updated[card.id]
      return updated
    })
    cardRepository.removeCard(userId, card)
  }

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          Fileinput={Fileinput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  )
}

export default Maker
