"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  opacity: number
}

export function FallingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const particleCount = 50
    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 12,
        size: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.5,
      })
    }

    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-fall"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: `rgba(239, 68, 68, ${particle.opacity})`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(239, 68, 68, ${particle.opacity * 0.5})`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
