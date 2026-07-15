import { useState } from 'react'

const OLLAMA_URL = 'http://localhost:11434/api/generate'
const MODEL = 'deepseek-r1:1.5b'

export function useOllama() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const askOllama = async (prompt) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          prompt,
          stream: false,
        }),
      })

      if (!response.ok) throw new Error('Error al conectar con Ollama')

      const data = await response.json()
      return data.response
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { askOllama, isLoading, error }
}