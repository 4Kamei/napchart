// data lives here (no it doesn't)

import React from 'react'
import Elements from './Elements.jsx'
import uuid from 'uuid'
import Napchart from 'napchart-canvas'

export default class Chart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: uuid.v4()
    }
  }

  componentDidMount () {
    // this.updateDimensions()

    var resizer = document.getElementById('resizer')
    this.updateDimensions(() =>
      this.initializeChart()
    )

    
    window.addEventListener("resize", () => {
      this.updateDimensions(() =>
        this.state.napchart.updateDimensions()
      )
    });
  }

  componentWillMount () {
    
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  componentWillUpdate (nextProps, nextState) {
    if(typeof this.state.napchart == 'undefined'){
      // not yet initialized! will probably happen soon
    }else{
      this.state.napchart.update(nextProps.data)
    }
  }

  render () {
    var blurClass = ''
    if(this.props.loading){
      blurClass = 'blur'
    }
    return (
      <div id="resizer">
        <canvas className={"canvas " + blurClass} width={this.state.width} height={this.state.height} ref={this.state.id}>
          A chart
        </canvas>
      </div>)
  }

  updateDimensions = (callback) => {
    var resizer = document.getElementById('resizer')
    this.setState({
      width: resizer.clientWidth,
      height: resizer.clientHeight,
    }, callback)
  }

  initializeChart () {
    var canvas = this.refs[this.state.id]
    var ctx = canvas.getContext('2d')
    var napchart = Napchart.init(ctx, this.props.data)
    napchart.onElementUpdate(this.props.onElementUpdate)

    napchart.onSetSelected(this.props.onSetSelected)
    napchart.onDeselect(this.props.onDeselect)
    napchart.onSetActive(this.props.onSetActive)

    window.napchart = napchart

    this.state.napchart = napchart

    this.initDeleteKey()

    canvas.oncontextmenu = function(event) {
         event.preventDefault()
         event.stopPropagation()
         return false
    }
  }

  initDeleteKey() {
    document.onkeydown = (evt) => {
        evt = evt || window.event;
        if (evt.keyCode == 46) {
            this.props.onDeleteSelected(this.props.data.selected)
        }
    }
  }
}
