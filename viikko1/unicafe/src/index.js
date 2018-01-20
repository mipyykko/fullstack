import React from 'react';
import ReactDOM from 'react-dom';

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
                    <button onClick={this.lisaaHyva()}>hyvä</button>
                    <button onClick={this.lisaaNeutraali()}>neutraali</button>
                    <button onClick={this.lisaaHuono()}>huono</button>
                </div>
                <h1>statistiikka</h1>
                <div>
                    <ul style={{ listStyleType: 'none' }}>
                        <li>hyvä {this.state.hyva}</li>
                        <li>neutraali {this.state.neutraali}</li>
                        <li>huono {this.state.huono}</li>
                    </ul>
                </div>        
            </div>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('root'));
