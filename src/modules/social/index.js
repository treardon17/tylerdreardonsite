import React from 'react'
import Base from '../module-base'
import './index.scss'

import Facebook from '../../assets/icon/social/facebook.svg'
import LinkedIn from '../../assets/icon/social/linkedin.svg'
import GitHub from '../../assets/icon/social/github.svg'
import Folder from '../../assets/icon/social/folder.svg'

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
          <LinkedIn />
        </a>
        <a
          className="icon"
          target="_blank"
          href="https://github.com/treardon17"
        >
          <GitHub />
        </a>
        <a
          className="icon"
          href="/assets/downloads/Resume-TylerReardon-12-5-18.pdf"
          download
        >
          <Folder />
        </a>
      </div>
    )
  }
}
