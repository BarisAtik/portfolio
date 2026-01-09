'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const nodesRef = useRef<Node[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Initialize nodes (neural network neurons)
    const nodeCount = 80
    const nodes: Node[] = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
      })
    }

    nodesRef.current = nodes

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationId: number

    const animate = () => {
      // Dynamically check current theme
      const isLightTheme = document.documentElement.classList.contains('light')

      // Clear with theme-appropriate background
      ctx.fillStyle = isLightTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(10, 10, 11, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Mouse interaction
        const dx = mouseRef.current.x - node.x
        const dy = mouseRef.current.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const angle = Math.atan2(dy, dx)
          const force = (150 - distance) / 150
          node.vx -= Math.cos(angle) * force * 0.02
          node.vy -= Math.sin(angle) * force * 0.02
        }

        // Draw connections to nearby nodes
        nodes.forEach((otherNode, j) => {
          if (i === j) return

          const dx = otherNode.x - node.x
          const dy = otherNode.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = 1 - distance / 120
            ctx.beginPath()
            // Subtle monochrome connections
            ctx.strokeStyle = isLightTheme
              ? `rgba(24, 24, 27, ${opacity * 0.3})`
              : `rgba(245, 245, 245, ${opacity * 0.1})`
            ctx.lineWidth = opacity * 1.5
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.stroke()
          }
        })

        // Draw node - minimal and clean
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = isLightTheme ? '#27272a' : '#a1a1aa'
        ctx.fill()

        // Very subtle glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8)
        gradient.addColorStop(0, isLightTheme ? 'rgba(39, 39, 42, 0.3)' : 'rgba(161, 161, 170, 0.1)')
        gradient.addColorStop(1, isLightTheme ? 'rgba(39, 39, 42, 0)' : 'rgba(161, 161, 170, 0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2)
        ctx.fill()

        // Subtle pulse on mouse proximity
        if (distance < 150) {
          const pulseRadius = 12 + (150 - distance) / 15
          const pulseGradient = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            pulseRadius
          )
          pulseGradient.addColorStop(0, isLightTheme ? 'rgba(24, 24, 27, 0.35)' : 'rgba(245, 245, 245, 0.15)')
          pulseGradient.addColorStop(1, isLightTheme ? 'rgba(24, 24, 27, 0)' : 'rgba(245, 245, 245, 0)')
          ctx.fillStyle = pulseGradient
          ctx.beginPath()
          ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full"
    />
  )
}
