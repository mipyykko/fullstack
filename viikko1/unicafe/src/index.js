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

    lisaa = (value) => {
        return () => {
            this.setState({ [value]: this.state[value] + 1})
        }
    }

    render() {
        
        return (
            <div>
                <h1>anna palautetta</h1>
                <div>
                    <Button handleClick={this.lisaa('hyva')} title="hyvä" />
                    <Button handleClick={this.lisaa('neutraali')} title="neutraali" />
                    <Button handleClick={this.lisaa('huono')} title="huono" />
                </div>
                <Statistics state={this.state} />
            </div>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('root'));
