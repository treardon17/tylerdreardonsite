import React from 'react'
import SVG from 'react-inlinesvg'
import Base from '../module-base'
import './index.scss'

// import LinkedIn from '../../assets/icon/social/linkedin.svg'
// import GitHub from '../../assets/icon/social/github.svg'
// import Folder from '../../assets/icon/social/folder.svg'

export default class Template extends Base {
  componentDidMount() {
    super.componentDidMount()
    this.setDefaults()
    this.setBinds()
  }

  setDefaults() {}
  setBinds() {}
  render() {
    return (
      <div className="social">
        <a
          className="icon"
          target="_blank"
          href="https://www.linkedin.com/in/tyler-reardon-55417429/"
        >
          <SVG src="/assets/icon/social/linkedin.svg" />
        </a>
        <a
          className="icon"
          target="_blank"
          href="https://github.com/treardon17"
        >
          <SVG src="/assets/icon/social/github.svg" />
        </a>
        <a
          className="icon"
          href="/assets/downloads/Resume-TylerReardon-12-5-18.pdf"
          download
        >
          <SVG src="/assets/icon/social/folder.svg" />
        </a>
      </div>
    )
  }
}
