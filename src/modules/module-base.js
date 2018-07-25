import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

class Base extends React.Component {
  componentDidMount() {
    this.setupRefs()
  }

  setupRefs() {
    this.node = ReactDOM.findDOMNode(this)  // eslint-disable-line
    if (typeof this.props.node === 'function') {
      this.props.node(this.node)
    }
    const refs = this.node.querySelectorAll('*[data-ref]')
    this.refs = {}
    for (let i = 0; i < refs.length; i += 1) {
      const ref = refs[i]
      const refName = ref.getAttribute('data-ref')
      if (!this.refs[refName]) {
        this.refs[refName] = ref
      } else if (!Array.isArray(this.refs[refName])) {
        const myRef = this.refs[refName]
        this.refs[refName] = [myRef, ref]
      } else if (Array.isArray(this.refs[refName])) {
        this.refs[refName].push(ref)
      }
    }
  }

  render() {
    return (
      <h1>Override this</h1>
    )
  }
}

export default Base
