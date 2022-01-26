import React from 'react'
import ReactDOM from 'react-dom'
import './index.module.css'
import App from './App'
import AuthService from './service/auth_service'
import ImageUploader from './service/image_upload'
import ImageFileInput from './components/image_file_input/image_file_input'
import CardRepository from './service/card_repository'
import { firebaseApp } from './service/firebase'

const authService = new AuthService(firebaseApp)
const cardRepository = new CardRepository(firebaseApp)
const imageUploader = new ImageUploader()

const Fileinput = (props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
)

ReactDOM.render(
  <React.StrictMode>
    <App
      authService={authService}
      Fileinput={Fileinput}
      cardRepository={cardRepository}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
