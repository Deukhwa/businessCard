import Login from './components/login/login'
import styles from './app.module.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Maker from './components/maker/maker'

function App({ Fileinput, authService, cardRepository }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login authService={authService} />} />
          <Route
            path="/maker"
            element={
              <Maker
                Fileinput={Fileinput}
                authService={authService}
                cardRepository={cardRepository}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
