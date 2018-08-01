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
  }

  setDefaults() {
    this.ctx = this.canvas.getContext('2d')
    this.numColumns = 25
    this.numRows = 25
    this.mouseParticle = new StarParticle({ canvas: this.canvas, ctx: this.ctx, x: 0, y: 0, size: 0 })
    this.createParticles()
  }

  setBinds() {
    this.canvas.addEventListener('mousemove', this.canvasHover.bind(this))
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
      const particle = new StarParticle({ canvas: this.canvas, ctx: this.ctx, xPercent, yPercent, color: 'rgba(255,255,255,0.5)' })
      this.particles.push(particle)
      currentColIndex += 1
    }
  }

  setParticleSizesFromMousePosition() {
    const maxDistance = this.props.width > this.props.height ? this.props.width : this.props.height
    for (let i = 0; i < this.particles.length; i += 1) {
      const particle = this.particles[i]
      const xDistance = particle.xPos - this.mouseParticle.xPos
      const yDistance = particle.yPos - this.mouseParticle.yPos
      const distance = Math.sqrt((xDistance ** 2) + (yDistance ** 2))
      const proportion = (distance / maxDistance)
      let percent = 1 - proportion
      if (percent < 0) percent = 0
      particle.size = particle.originalSize * percent
      particle.xOffset = xDistance * proportion
      particle.yOffset = yDistance * proportion
    }
  }

  canvasHover(e) {
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    this.mouseParticle.x = x
    this.mouseParticle.y = y

    this.setParticleSizesFromMousePosition()
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
