import { useState } from 'react'

const API_URL = 'http://localhost:3000/api/chat'

export function useOllama() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const askOllama = async (prompt) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) throw new Error('Error al conectar con el servidor')

      const data = await response.json()
      return data.respuesta
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { askOllama, isLoading, error }
}