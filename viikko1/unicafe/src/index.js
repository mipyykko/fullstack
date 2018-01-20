import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, title }) => {
    return (
        <button onClick={handleClick}>{title}</button>
    )
}

const Statistic = ({ title, value }) => {
    return (
        <li>{title} {value}</li>
    )
}

const Statistics = (props) => {
    const maara = () => props.state.hyva + props.state.neutraali + props.state.huono
    const keskiarvo = () => maara() === 0 ? 0 : (props.state.hyva - props.state.huono) / maara()
    const positiiviset = () => maara() === 0 ? 0 : props.state.hyva / maara() * 100 + '%'
    
    if (maara() === 0) {
        return (
            <div>
                <h1>statistiikka</h1>
                <p>ei yhtään palautetta annettu</p>
            </div>
        )
    }
    
    return (
        <div>
            <h1>statistiikka</h1>
            <ul>
                <Statistic title="hyvä" value={props.state.hyva} />
                <Statistic title="neutraali" value={props.state.neutraali} />
                <Statistic title="huono" value={props.state.huono} />
                <Statistic title="keskiarvo" value={keskiarvo()} />
                <Statistic title="positiiviset" value={positiiviset()} />
            </ul>
        </div>
    )
}
class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = ({
            hyva: 0,
            neutraali: 0,
            huono: 0
        })
    }


    lisaaHyva = () => {
        return () => {
            this.setState({ hyva: this.state.hyva + 1 })
        }
    }

    lisaaNeutraali = () => {
        return () => {
            this.setState({ neutraali: this.state.neutraali + 1 })
        }
    }

    lisaaHuono = () => {
        return () => {
            this.setState({ huono: this.state.huono + 1 })
        }
    }

    render() {
        
        return (
            <div>
                <h1>anna palautetta</h1>
                <div>
                    <Button handleClick={this.lisaaHyva()} title="hyvä" />
                    <Button handleClick={this.lisaaNeutraali()} title="neutraali" />
                    <Button handleClick={this.lisaaHuono()} title="huono" />
                </div>
                <Statistics state={this.state} />
            </div>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('root'));
