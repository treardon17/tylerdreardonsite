import './star-particle.scss'

class StarParticle {
  constructor({ canvas, ctx, x, y, xPercent, yPercent, xOffset = 0, yOffset = 0, size = 2, color = '#fff' }) {
    this.canvas = canvas
    this.ctx = ctx
    this.xOffset = xOffset
    this.yOffset = yOffset
    this.x = x
    this.y = y
    this.xPercent = xPercent
    this.yPercent = yPercent
    this.originalSize = size
    this.size = size
    this.color = color
  }

  get xPos() {
    return (this.x != null) ? this.x : this.canvas.width * this.xPercent
  }

  get yPos() {
    return (this.y != null) ? this.y : this.canvas.height * this.yPercent
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.fillStyle = this.color
    const { xPos, yPos } = this
    const x = (xPos >= 0 ? xPos : 0) + this.xOffset
    const y = (yPos >= 0 ? yPos : 0) + this.yOffset
    this.ctx.arc(x, y, this.size, 0, Math.PI * 2, true)
    this.ctx.closePath()
    this.ctx.fill()
  }
}

export default StarParticle
