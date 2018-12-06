import { Power2, Linear, TweenMax } from 'gsap'
import React from 'react'
import Base from '../module-base'
import StarParticle from '../star-particle/star-particle'
import './star-field.scss'


class StarField extends Base {
  componentDidMount() {
    super.componentDidMount()
    this.setDefaults()
    this.setBinds()
    this.draw()
    this.animateBackground()
  }

  setDefaults() {
    this.ctx = this.canvas.getContext('2d')
    this.canvasHovering = false
    this.canvasHoverTimeout = null
    this.numColumns = 35
    this.numRows = 35
    this.mouseParticle = new StarParticle({ canvas: this.canvas, ctx: this.ctx, x: 0, y: 0, size: 0 })
    this.createParticles()
    this.setParticleSizesFromMousePosition()
  }

  setBinds() {
    this.canvas.addEventListener('mousemove', this.canvasHover.bind(this))
    this.canvas.addEventListener('touchmove', this.canvasHover.bind(this))
  }

  createParticles() {
    this.particles = []
    const numParticles = this.numColumns * this.numRows
    let currentColIndex = 0
    let currentRowIndex = 0
    for (let i = 0; i < numParticles; i += 1) {
      if (i % this.numColumns === 0) {
        currentColIndex = 0
        currentRowIndex += 1
      }
      const xOffset = 1 / (this.numColumns * 2)
      const yOffset = 1 / (this.numRows * 2)
      const xPercent = (currentColIndex / this.numColumns) + xOffset
      const yPercent = (currentRowIndex / this.numRows) - yOffset
      const particle = new StarParticle({ canvas: this.canvas, ctx: this.ctx, xPercent, yPercent, color: '#146e85' })
      this.particles.push(particle)
      currentColIndex += 1
    }
  }

  getDistance({ x1, y1, x2, y2 }) {
    const xDistance = x1 - x2
    const yDistance = y1 - y2
    return Math.sqrt((xDistance ** 2) + (yDistance ** 2))
  }

  setParticleSizesFromMousePosition() {
    const maxDistance = this.props.width > this.props.height ? this.props.width : this.props.height
    for (let i = 0; i < this.particles.length; i += 1) {
      const particle = this.particles[i]
      const xDistance = particle.xPos - this.mouseParticle.xPos
      const yDistance = particle.yPos - this.mouseParticle.yPos
      const distance = this.getDistance({ x1: particle.xPos, x2: this.mouseParticle.xPos, y1: particle.yPos, y2: this.mouseParticle.yPos })
      // The closer you are, the smaller the proportion
      const proportion = (distance / maxDistance)
      // Inverse of the proportion
      let percent = 1 - proportion
      if (percent < 0) percent = 0
      particle.size = particle.originalSize * percent
      // particle.xOffset = (((xDistance * proportion) * 2.5) - ((xDistance * percent) * 0.5))
      // particle.yOffset = (((yDistance * proportion) * 2.5) - ((yDistance * percent) * 0.5))
      particle.xOffset = -((xDistance * percent) * 0.15)
      particle.yOffset = -((yDistance * percent) * 0.15)
    }
  }

  animateBackground() {
    this.animateBackgroundX()
    this.animateBackgroundY()
  }

  animateBackgroundX() {
    const x = Math.floor(Math.random() * this.props.width)
    const duration = (Math.random() * 5) + 2
    this.bgAnimationTweenX = this.animateBackgroundParticles({
      x,
      ease: Linear.easeNone,
      duration,
      callback: () => {
        this.animateBackgroundX()
      }
    })
  }

  animateBackgroundY() {
    const y = Math.floor(Math.random() * this.props.height)
    const duration = (Math.random() * 5) + 2
    this.bgAnimationTweenY = this.animateBackgroundParticles({
      y,
      ease: Linear.easeNone,
      duration,
      callback: () => {
        this.animateBackgroundY()
      }
    })
  }

  cancelAnimateBackground() {
    if (this.bgAnimationTweenX) {
      this.bgAnimationTweenX.kill()
      this.bgAnimationTweenX = null
    }
    if (this.bgAnimationTweenY) {
      this.bgAnimationTweenY.kill()
      this.bgAnimationTweenY = null
    }
  }

  animateBackgroundParticles({ x, y, duration = 0.035, callback, ease = Power2.easeInOut }) {
    const obj = { x: this.mouseParticle.x, y: this.mouseParticle.y }
    return TweenMax.to(obj, duration, {
      x,
      y,
      ease,
      onUpdate: () => {
        if (x != null) { this.mouseParticle.x = obj.x }
        if (y != null) { this.mouseParticle.y = obj.y }
      },
      onComplete: () => {
        if (typeof callback === 'function') {
          callback()
        }
      }
    })
  }

  canvasHover(e) {
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    this.cancelAnimateBackground()
    clearTimeout(this.canvasHoverTimeout)
    this.canvasHovering = true
    this.canvasHoverTimeout = setTimeout(() => {
      this.canvasHovering = false
      this.animateBackground()
    }, 1000)

    this.animateBackgroundParticles({ x, y })
  }

  drawBackground() {
    this.ctx.fillStyle = '#FF0000'
    this.ctx.fillRect(0, 0, this.props.width, this.props.height)
  }

  drawParticles() {
    for (let i = 0; i < this.particles.length; i += 1) {
      const particle = this.particles[i]
      // const size = (this.props.width / (this.numColumns * 10 || 1))
      // particle.size = size
      particle.draw()
    }
  }

  draw() {
    if (this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      // this.drawBackground()
      this.drawParticles()
      this.mouseParticle.draw()
      this.setParticleSizesFromMousePosition()
    }
    requestAnimationFrame(this.draw.bind(this))
  }

  render() {
    return (
      <div className="star-field">
        <canvas width={this.props.width} height={this.props.height} ref={(ref) => { this.canvas = ref }} />
      </div>
    )
  }
}

export default StarField
