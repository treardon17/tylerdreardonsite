import React from 'react'
import Base from '../module-base'
import './index.scss'


export default class Template extends Base {
  componentDidMount() {
    super.componentDidMount()
    this.setDefaults()
    this.setBinds()
  }

  setDefaults() {}
  setBinds() {}
  render() {}
}
