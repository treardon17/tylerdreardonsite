import { TimelineLite, Power3, Back } from 'gsap'
import React from 'react'
import ReactDOM from 'react-dom'
import Base from '../module-base'
import AnimatedText from '../animated-text/animated-text'
import Social from '../../modules/social'
import AppState from '../../state/AppState'
import StarField from '../star-field/star-field'
import './hero.scss'

const profileImage = require('../../assets/img/hero/profile.jpg')
// const profileCutImage = require('../../assets/img/hero/profile-cut.png')

class Hero extends Base {
  componentDidMount() {
    super.componentDidMount()
    this.setupAnimation()
  }

  get ticks() {
    const numTicks = 8
    const ticks = []
    const rotateBy = 360 / (numTicks || 1)
    for (let i = 0; i < numTicks; i += 1) {
      ticks.push(<div key={`tick${i}`} data-ref="clockTick" className="clock-tick" style={{ transform: `translate3d(-50%, 0, 0) rotate(${rotateBy * i}deg)` }} />)
    }
    return ticks
  }

  // Animations
  setupAnimation = () => {
    this.timeline = new TimelineLite({
      // onComplete: this.animateNameClock.bind(this, 2000)
    })
    const offsetY = 50
    this.timeline
      .add(this.animationText.timeline)
      .staggerFromTo([this.refs.profile, this.socialNode.node], 1, { y: offsetY, autoAlpha: 0, }, { y: 0, autoAlpha: 1, ease: Power3.easeInOut }, 0.1)
      // .fromTo(this.refs.profile, 2, { y: offsetY, autoAlpha: 0, filter: 'blur(30px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0)', ease: Power3.easeInOut }, 'profile')
      // .fromTo(this.refs.profileCut, 2, { y: 50, filter: 'blur(30px)' }, { y: 0, filter: 'blur(0)', ease: Power3.easeInOut }, 'profile')
      // .fromTo(this.socialNode.node, 1, { y: offsetY, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Power3.easeInOut })
      .fromTo(this.starFieldNode, 1, { autoAlpha: 0 }, { autoAlpha: 1, ease: Power3.easeInOut })
      // .add(this.getClockTicksTimeline())
  }

  getClockTicksTimeline() {
    const ticks = this.refs.clockTick
    const timeline = new TimelineLite()
    const duration = 1
    const subtract = `-=${duration * 0.95}`
    for (let i = 0; i < ticks.length; i += 1) {
      const tick = ticks[i]
      timeline.fromTo(tick, duration, { width: 0, opacity: 0 }, { width: '120%', opacity: 1, ease: Power3.easeInOut }, subtract)
    }
    return timeline
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
        <StarField node={ref => this.starFieldNode = ref} width={AppState.browserWindow.width} height={AppState.browserWindow.height} />
        <div data-ref="profileInner" className="hero__profile-inner">
          <AnimatedText node={(ref) => { this.animationTextNode = ref }} ref={(ref) => { this.animationText = ref }} array={'hello, my name is tyler'.split('')} />
          <div data-ref="profileContainer" className="hero__profile-container">
            <img data-ref="profile" className="hero__profile" src={profileImage} />
            {/* <img data-ref="profileCut" className="hero__profile-cut" src={profileCutImage} /> */}
          </div>
          {/* <div className="clock-ticks">
            {this.ticks}
          </div> */}
        </div>
        <Social ref={ref => this.socialNode = ref} />
      </div>
    )
  }
}

export default Hero
