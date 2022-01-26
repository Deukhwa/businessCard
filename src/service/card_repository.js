// import { getDatabase, ref, set, remove, onValue, off } from 'firebase/database'

// class CardRepository {
//   constructor(app) {
//     this.db = getDatabase(app)
//   }
//   syncCards(userId, onUpdate) {
//     const query = ref(this.db, `${userId}/cards`)
//     onValue(query, (snapshot) => {
//       const value = snapshot.val()
//       value && onUpdate(value)
//     })
//     return () => off(query)
//   }
//   saveCard(userId, card) {
//     set(ref(this.db), `{userId}/cards/${card.id}`, card)
//   }
//   removeCard(userId, card) {
//     remove(ref(this.db), `{userId}/cards/${card.id}`)
//   }
// }

// export default CardRepository

import { getDatabase, ref, set, remove, onValue, off } from 'firebase/database'

import { app } from './firebase'

class CardRepository {
  syncCard(userId, onUpdate) {
    const db = getDatabase()
    const query = ref(db, `${userId}/cards`)
    onValue(query, (snapshot) => {
      const value = snapshot.val()
      value && onUpdate(value)
    })
    return () => off(query)
  }

  saveCard(userId, card) {
    const db = getDatabase()

    set(ref(db, `${userId}/cards/${card.id}`), card)
  }

  removeCard(userId, card) {
    const db = getDatabase()

    const cardRef = ref(db, `${userId}/cards/${card.id}`)

    remove(cardRef)
  }
}

export default CardRepository
