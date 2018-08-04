import THREE from 'three.js'
import React from 'react'
import Base from '../module-base'
import './mountain.scss'


class Mountain extends Base {
  componentDidMount() {
    super.componentDidMount()
    this.setDefaults()
    this.setBinds()
  }

  setDefaults() {
    // scene
    this.scene = new THREE.Scene()

    // renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(500, 500)

    // camera
    this.camera = new THREE.PerspectiveCamera(45, 500 / 500, 0.1, 20000)
    this.camera.position.set(0, 6, 0)
    this.scene.add(this.camera)

    // lighting
    this.light = new THREE.PointLight(0xffffff)
    this.light.position.set(-100, 200, 100)
    this.scene.add(this.light)

    this.container.appendChild(this.renderer.domElement)
  }

  setBinds() {}
  render() {
    return (
      <div className="mountain" ref={(ref) => { this.container = ref }} />
    )
  }
}

export default Mountain
