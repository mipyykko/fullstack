import React from 'react';
import './App.css';

let store

const Statistiikka = () => {
  const data = store.getState()

  const palautteita = Object.keys(data).reduce((prev, key) => prev + data[key], 0)
  const pos = data.good / palautteita * 100
  const keskiarvo = (data.good - data.bad) / palautteita

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{data.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{data.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{data.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo.toFixed(2)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{pos.toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    store = props.store
  }

  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

export default App;
