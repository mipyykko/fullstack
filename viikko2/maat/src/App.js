import React from 'react'
import axios from 'axios'

const Countries = ({ countries, setFilter }) => {
    if (countries.length > 10) {
        return (
            <div>Too many matches</div>
        )
    } else if (countries.length > 1) {
        return (
            <div>
            <ul>
                {countries.map(country => <li key={country.name}><div onClick={() => setFilter(country.name)}>{country.name}</div></li>)}
            </ul>    
            </div>
        )
    } else if (countries.length === 1) {
        const country = countries[0]
        return (
            <div>
                <h2>{country.nativeName} {country.name}</h2>
                <img src={country.flag} alt={country.name} width='80%' />
                <div>capital: {country.capital}</div>
                <div>population: {country.population}</div>
            </div>
        )
    }

    return(
        <div>No matches!</div>
    )
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: '',
            countries: [],
            filteredCountries: []
        }
    }

    updateFilter = (filter) => {
        this.setState({ 
            filteredCountries: 
                this.state.countries.length > 0 
              ? this.state.countries.filter(
                  country => country.name.trim().toLowerCase()
                                .indexOf(filter.trim().toLowerCase()) >= 0)
              : [],
            filter
         })
    }

    handleCountryChange = (event) => {
        this.updateFilter(event.target.value)
    }

    componentWillMount() {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                this.setState({ countries: response.data })
            })
            .catch(error => console.err(error))
    }

    render() {
        return(
            <div>
                <div>
                    find countries: 
                    <input value={this.state.filter}
                        onChange={this.handleCountryChange}
                    />
                </div>
                <Countries countries={this.state.filteredCountries} setFilter={this.updateFilter} /> 
            </div>
        )
    }

}