"use client"

import { useEffect, useRef, useCallback, useMemo } from "react"
import * as THREE from "three"

interface DNAGlobeProps {
  width?: number
  height?: number
  className?: string
}

export default function DNAGlobe({ width = 500, height = 500, className = "" }: DNAGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const createDNAStrand = useCallback((offset = 0, color: THREE.Color) => {
    const points: THREE.Vector3[] = []
    const numPoints = 50
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
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(100))
    const material = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
    })

    return new THREE.Line(geometry, material)
  }, [])

  const createScene = useMemo(() => {
    return () => {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      camera.position.z = 30

      const strand1 = createDNAStrand(0, new THREE.Color("#00FFFF"))
      const strand2 = createDNAStrand(Math.PI, new THREE.Color("#FF00FF"))
      scene.add(strand1, strand2)

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
          color: 0x00ff00,
          shininess: 200,
          transparent: true,
          opacity: 0.8,
        })

        const bar = new THREE.Mesh(geometry, material)
        bar.position.set((x1 + x2) / 2, y, (z1 + z2) / 2)
        bar.rotation.set(Math.PI / 2, 0, Math.atan2(z2 - z1, x2 - x1))

        bars.push(bar)
        scene.add(bar)
      }

      const particles = new THREE.Group()
      const particleCount = 50
      const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8)
      const particleMaterial = new THREE.MeshPhongMaterial({
        color: 0xffff00,
        transparent: true,
        opacity: 0.8,
      })

      for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial)
        particle.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40)
        particles.add(particle)
      }
      scene.add(particles)

      scene.add(new THREE.AmbientLight(0xffffff, 0.5))
      const pointLight1 = new THREE.PointLight(0x00ffff, 3, 50)
      pointLight1.position.set(10, 10, 10)
      const pointLight2 = new THREE.PointLight(0xff00ff, 3, 50)
      pointLight2.position.set(-10, -10, -10)
      const pointLight3 = new THREE.PointLight(0xffffff, 2, 100)
      pointLight3.position.set(0, 20, 0)
      scene.add(pointLight1, pointLight2, pointLight3)

      return { scene, camera, bars, particles }
    }
  }, [width, height, createDNAStrand])

  useEffect(() => {
    if (!canvasRef.current) return

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    })

    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)

    const { scene, camera, bars, particles } = createScene()

    let lastRenderTime = 0
    const targetFPS = 30
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      requestAnimationFrame(animate)

      if (currentTime - lastRenderTime < frameInterval) return

      const phi = (currentTime / 1000) * 0.5
      scene.rotation.y = phi

      particles.children.forEach((particle, index) => {
        particle.position.y += 0.03
        if (particle.position.y > 20) particle.position.y = -20
        particle.position.x += Math.sin(phi + index * 0.1) * 0.02
        particle.position.z += Math.cos(phi + index * 0.1) * 0.02
      })

      bars.forEach((bar, i) => {
        const scale = 1 + Math.sin(phi * 3 + i * 0.2) * 0.1
        bar.scale.set(scale, 1, scale)
      })

      renderer.render(scene, camera)
      lastRenderTime = currentTime
    }

    animate(0)

    const handleResize = () => {
      if (canvasRef.current) {
        const newWidth = canvasRef.current.clientWidth
        const newHeight = canvasRef.current.clientHeight
        camera.aspect = newWidth / newHeight
        camera.updateProjectionMatrix()
        renderer.setSize(newWidth, newHeight)
      }
    }

    const debouncedHandleResize = debounce(handleResize, 250)

    window.addEventListener("resize", debouncedHandleResize)

    return () => {
      window.removeEventListener("resize", debouncedHandleResize)
      renderer.dispose()
    }
  }, [width, height, createScene])

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

function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null
      func(...args)
    }
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

