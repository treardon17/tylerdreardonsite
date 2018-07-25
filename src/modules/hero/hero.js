import { TimelineLite, Power3, Back } from 'gsap'
import React from 'react'
import ReactDOM from 'react-dom'
import Base from '../module-base'
import AnimatedText from '../animated-text/animated-text'
import './hero.scss'

const profileImage = require('../../assets/img/hero/profile.jpg')
const profileCutImage = require('../../assets/img/hero/profile-cut.png')


class Hero extends Base {
  componentDidMount() {
    super.componentDidMount()
    this.setupAnimation()
  }

  // Animations
  setupAnimation = () => {
    this.timeline = new TimelineLite({
      onComplete: this.animateNameClock.bind(this, 2000)
    })
    this.timeline
      .add(this.animationText.timeline)
      .fromTo(this.refs.profile, 3, { y: 50, filter: 'blur(20px)' }, { y: 0, filter: 'blur(0)', ease: Power3.easeInOut }, 'profile')
      .fromTo(this.refs.profileCut, 3, { y: 50, filter: 'blur(20px)' }, { y: 0, filter: 'blur(0)', ease: Power3.easeInOut }, 'profile')
  }

  animateNameClock(pause = 0) {
    setTimeout(() => {
      this.rotateTimeline = new TimelineLite()
      this.rotateBy = 360 / 60
      this.currentRotation = 0
      this.nameClockInterval = setInterval(() => {
        if (this.animationText) {
          this.currentRotation += this.rotateBy
          this.rotateTimeline.to(this.animationTextNode, 0.2, { rotation: this.currentRotation, ease: Back.easeOut })
        }
      }, 1000)
    }, pause)
  }

  stopClock() {
    clearInterval(this.nameClockInterval)
  }

  render() {
    return (
      <div className="hero">
        <div data-ref="profileInner" className="hero__profile-inner">
          <div data-ref="profileContainer" className="hero__profile-container">
            <img data-ref="profile" className="hero__profile" src={profileImage} />
            <img data-ref="profileCut" className="hero__profile-cut" src={profileCutImage} />
          </div>
          <AnimatedText node={(ref) => { this.animationTextNode = ref }} ref={(ref) => { this.animationText = ref }} array={'hello, my name is tyler'.split('')} />
        </div>
      </div>
    )
  }
}

export default Hero
