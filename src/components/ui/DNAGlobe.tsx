"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface DNAGlobeProps {
  width?: number
  height?: number
  className?: string
}

export default function DNAGlobe({ width = 500, height = 500, className = "" }: DNAGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    })

    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)

    // Camera position
    camera.position.z = 30

    // Create DNA strands
    const createDNAStrand = (offset = 0, color: THREE.Color) => {
      const points: THREE.Vector3[] = []
      const numPoints = 100
      const radius = 8
      const height = 20
      const turns = 2

      for (let i = 0; i < numPoints; i++) {
        const t = (i / numPoints) * Math.PI * 2 * turns
        const x = Math.cos(t + offset) * radius
        const y = (i / numPoints) * height - height / 2
        const z = Math.sin(t + offset) * radius
        points.push(new THREE.Vector3(x, y, z))
      }

      const curve = new THREE.CatmullRomCurve3(points)
      const geometry = new THREE.TubeGeometry(curve, 100, 0.3, 8, false)
      const material = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 100,
        transparent: true,
        opacity: 0.8,
      })

      return new THREE.Mesh(geometry, material)
    }

    // Create DNA strands
    const strand1 = createDNAStrand(0, new THREE.Color("#00FFFF")) // Vibrant cyan
    const strand2 = createDNAStrand(Math.PI, new THREE.Color("#FF00FF")) // Vibrant magenta
    scene.add(strand1)
    scene.add(strand2)

    // Create connecting bars
    const createBars = () => {
      const bars: THREE.Mesh[] = []
      const numBars = 20
      const radius = 8

      for (let i = 0; i < numBars; i++) {
        const t = (i / numBars) * Math.PI * 2 * 2
        const y = (i / numBars) * 20 - 10

        const x1 = Math.cos(t) * radius
        const z1 = Math.sin(t) * radius
        const x2 = Math.cos(t + Math.PI) * radius
        const z2 = Math.sin(t + Math.PI) * radius

        const geometry = new THREE.CylinderGeometry(0.15, 0.15, radius * 2, 8)
        const material = new THREE.MeshPhongMaterial({
          color: 0x00ff00, // Vibrant green
          shininess: 200,
          transparent: true,
          opacity: 0.8,
        })

        const bar = new THREE.Mesh(geometry, material)
        bar.position.y = y

        // Calculate rotation to point from one strand to the other
        const direction = new THREE.Vector3(x2 - x1, 0, z2 - z1)
        const rotation = new THREE.Euler(Math.PI / 2, 0, Math.atan2(direction.z, direction.x))
        bar.rotation.copy(rotation)

        bar.position.x = (x1 + x2) / 2
        bar.position.z = (z1 + z2) / 2

        bars.push(bar)
        scene.add(bar)
      }
      return bars
    }

    const bars = createBars()

    // Create particles
    const particles = new THREE.Group()
    const particleCount = 100
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8)
    const particleMaterial = new THREE.MeshPhongMaterial({
      color: 0xffff00, // Vibrant yellow
      transparent: true,
      opacity: 0.8,
    })

    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial)
      particle.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40)
      // Store original position for animation
      ;(particle as any).originalY = particle.position.y
      ;(particle as any).speed = Math.random() * 0.02 + 0.01
      particles.add(particle)
    }
    scene.add(particles)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const light1 = new THREE.PointLight(0x00ffff, 3, 50) // Brighter cyan light
    light1.position.set(10, 10, 10)
    scene.add(light1)

    const light2 = new THREE.PointLight(0xff00ff, 3, 50) // Brighter magenta light
    light2.position.set(-10, -10, -10)
    scene.add(light2)

    const light3 = new THREE.PointLight(0xffffff, 2, 100) // Additional white light
    light3.position.set(0, 20, 0)
    scene.add(light3)

    // Animation
    let phi = 0
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate DNA
      phi += 0.005
      scene.rotation.y = phi

      // Animate particles
      particles.children.forEach((particle: THREE.Object3D) => {
        particle.position.y += (particle as any).speed
        if (particle.position.y > 20) {
          particle.position.y = -20
        }
        particle.position.x += Math.sin(phi + particle.position.y * 0.1) * 0.02
        particle.position.z += Math.cos(phi + particle.position.y * 0.1) * 0.02
      })

      // Pulse effect on bars
      bars.forEach((bar, i) => {
        const scale = 1 + Math.sin(phi * 3 + i * 0.2) * 0.1
        bar.scale.x = scale
        bar.scale.z = scale
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
    }
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      width={width * 2}
      height={height * 2}
      className={className}
    />
  )
}

