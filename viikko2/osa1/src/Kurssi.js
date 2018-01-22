import React from 'react'

const Otsikko = (props) => (
    <div>
        <h1>{props.kurssi.nimi}</h1>
    </div>
)

const Osa = (props) => (
    <div>
        <p>{props.osa} {props.tehtavat}</p>
    </div>
)
const Sisalto = (props) => (
    <div>
        {props.kurssi.osat.map((osa) => <Osa osa={osa.nimi} tehtavat={osa.tehtavia} />)}
    </div>
)

const Yhteensa = (props) => (
    <div>
         <p>yhteensä {props.kurssi.osat.reduce((a, b) => a + b.tehtavia, 0)} tehtävää</p>
    </div>
)

export default class Kurssi extends React.Component {

    constructor(props) {
        super(props)
    }

        
    render() {
        return(
            <div>
                <Otsikko kurssi={this.props.kurssi} />
                <Sisalto kurssi={this.props.kurssi} />
                <Yhteensa kurssi={this.props.kurssi} />
            </div>
        )
    }
}
