import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    event.preventDefault()
    this.props.updateFilter(event.target.value)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateFilter
}

export default connect(null, mapDispatchToProps)(Filter)