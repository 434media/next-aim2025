"use client"

import { useEffect, useRef, useState } from "react"
import { useMediaQuery } from "../../hooks/useMediaQuery"

type Cell = {
  alive: boolean
  opacity: number
}

type Grid = Cell[][]

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  // Responsive canvas size based on viewport
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Make canvas responsive
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let lastUpdateTime = 0
    const updateInterval = 125 // ms between grid updates

    // Adjust cell size based on device
    const cellSize = isMobile ? 4 : 6

    // Initialize grid
    const initializeGrid = (): Grid => {
      const cols = Math.floor(canvas.width / cellSize)
      const rows = Math.floor(canvas.height / cellSize)

      return Array(rows)
        .fill(null)
        .map(() =>
          Array(cols)
            .fill(null)
            .map(() => {
              const isAlive = Math.random() > 0.85
              return {
                alive: isAlive,
                opacity: isAlive ? 0.5 : 0,
              }
            }),
        )
    }

    let grid = initializeGrid()

    // Count neighbors for Game of Life rules
    const countNeighbors = (grid: Grid, x: number, y: number): number => {
      const rows = grid.length
      const cols = grid[0].length
      let sum = 0

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          // Skip the cell itself
          if (i === 0 && j === 0) continue

          const row = (x + i + rows) % rows
          const col = (y + j + cols) % cols
          sum += grid[row][col].alive ? 1 : 0
        }
      }

      return sum
    }

    // Update the grid based on Game of Life rules
    const updateGrid = (grid: Grid): Grid => {
      return grid.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = countNeighbors(grid, i, j)
          const willBeAlive = cell.alive ? neighbors >= 2 && neighbors <= 3 : neighbors === 3

          return {
            alive: willBeAlive,
            opacity: cell.opacity,
          }
        }),
      )
    }

    // Update cell opacities for smooth transitions
    const updateOpacities = (grid: Grid, transitionSpeed: number): void => {
      const rows = grid.length
      const cols = grid[0].length

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cell = grid[i][j]
          if (cell.alive && cell.opacity < 0.5) {
            cell.opacity = Math.min(cell.opacity + transitionSpeed, 0.5)
          } else if (!cell.alive && cell.opacity > 0) {
            cell.opacity = Math.max(cell.opacity - transitionSpeed, 0)
          }
        }
      }
    }

    // Draw the grid on canvas
    const drawGrid = (grid: Grid): void => {
      // Clear canvas with background color
      ctx.fillStyle = "#F9FAFB"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const rows = grid.length
      const cols = grid[0].length

      // Draw cells
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cell = grid[i][j]
          if (cell.opacity > 0) {
            ctx.fillStyle = `rgba(0, 0, 0, ${cell.opacity})`
            ctx.beginPath()
            ctx.arc(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, isMobile ? 0.8 : 1, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }

    // Animation loop
    const animate = (timestamp: number) => {
      if (!isPaused) {
        // Update grid at fixed intervals
        if (timestamp - lastUpdateTime >= updateInterval) {
          updateOpacities(grid, 0.2)

          // Only update grid state if not using reduced motion
          if (!prefersReducedMotion) {
            grid = updateGrid(grid)
          }

          lastUpdateTime = timestamp
        }

        drawGrid(grid)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation
    animationFrameId = requestAnimationFrame(animate)

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [isPaused, prefersReducedMotion, isMobile])

  // Pause animation when component is not visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current)
      }
    }
  }, [])

  return (
    <div className="mask pointer-events-none overflow-hidden select-none w-full h-full">
      <canvas ref={canvasRef} aria-hidden="true" className="w-full h-full" />
    </div>
  )
}

export default HeroBackground

