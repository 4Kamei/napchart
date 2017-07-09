import React from 'react'

import TypesContainer from '../containers/TypesContainer.jsx'
import Expandable from './Expandable.jsx'


export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      active: 'types'
    }
  }

  render () {
  	return (
      <div>
      	<Expandable title="Types" onToggle={this.onToggle.bind(null, 'types')} active={this.isActive('types')}>
      		<TypesContainer />
      	</Expandable>

        <Expandable title="Feedback" onToggle={this.onToggle.bind(null, 'feedback')} active={this.isActive('feedback')}>
          Submit feedback here
        </Expandable>
      </div>
    )
  }

  onToggle = (key) => {
    this.setState({
      active: key
    })
  }

  isActive = key => this.state.active == key
}