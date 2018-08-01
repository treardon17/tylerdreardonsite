import { TimelineLite, Sine } from 'gsap'
import React from 'react'
import Base from '../module-base'
import './animated-text.scss'


class AnimatedText extends Base {
  componentDidMount() {
    super.componentDidMount()
    this.setupAnimation()
  }

  // Helpers
  spanTextFromArray(array, refname) {
    const spanArray = []
    for (let i = 0; i < array.length; i += 1) {
      const word = array[i]
      spanArray.push((<span key={`${refname}-${i}`} data-ref={refname}>{word}</span>))
    }
    return spanArray
  }

  // Pieces
  get text() {
    const array = (this.props.array || [])
    return (
      <div className="intro-text">
        {this.spanTextFromArray(array, 'text')}
      </div>
    )
  }

  setupAnimation() {
    this.timeline = new TimelineLite()
    for (let i = 0; i < this.refs.text.length; i += 1) {
      const ref = this.refs.text[i]
      const time = 1
      const subtract = `-=${time * 0.9}`
      this.timeline.fromTo(ref, time, { y: -10, opacity: 0 }, { y: 0, opacity: 1, ease: Sine.easeInOut }, subtract)
    }
  }

  render() {
    return (
      <div className="animated-text">
        {this.text}
      </div>
    )
  }
}

export default AnimatedText
