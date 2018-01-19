import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => (
    <div>
        <h1>{props.kurssi}</h1>
    </div>
)

const Osa = (props) => (
    <div>
        <p>{props.osa} {props.tehtavat}</p>
    </div>
)
const Sisalto = (props) => (
    <div>
        <Osa osa={props.osat[0].nimi} tehtavat={props.osat[0].tehtavia} />
        <Osa osa={props.osat[1].nimi} tehtavat={props.osat[1].tehtavia} />
        <Osa osa={props.osat[2].nimi} tehtavat={props.osat[2].tehtavia} />
    </div>
)

const Yhteensa = (props) => (
    <div>
        <p>yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} tehtävää</p>
    </div>
)

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
    
    return (
    <div>
        <Otsikko kurssi={kurssi} />
        <Sisalto osat={osat} />
        <Yhteensa osat={osat} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)