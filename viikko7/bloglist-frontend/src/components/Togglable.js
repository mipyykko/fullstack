import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

export default class Togglable extends React.Component {
  static propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hide = { display: this.state.visible ? 'none' : '' }
    const show = { display: this.state.visible ? '' : 'none' }

    return(
      <div>
        <div style={hide}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={show}>
          {this.props.children}
          <Button onClick={this.toggleVisibility}>cancel</Button>
        </div>
      </div>
    )
  }
}

