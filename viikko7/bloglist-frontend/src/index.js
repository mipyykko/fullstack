import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { Container } from 'semantic-ui-react'
import './index.css'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Container>
      <App />
    </Container>
  </Provider>,
  document.getElementById('root'))