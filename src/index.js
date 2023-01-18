import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reduxThunk from 'redux-thunk'
import quizReducer from './redux/quiz/quiz.reducer'
const clientStore = configureStore({
  reducer: { quizReducer: quizReducer },
  middleware: [reduxThunk],
})
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
const app = () => {
  root.render(
    <Provider store={clientStore}>
      <App />
    </Provider>
  )
}
app()
