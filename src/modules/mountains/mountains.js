import React from 'react'
import Base from '../module-base'
import Mountain from '../mountain/mountain'
import './mountains.scss'


class Mountains extends Base {
  componentDidMount() {
    super.componentDidMount()
    this.setDefaults()
    this.setBinds()
  }

  setDefaults() {}
  setBinds() {}
  render() {
    return (
      <div className="mountains">
        <Mountain />
      </div>
    )
  }
}

export default Mountains
