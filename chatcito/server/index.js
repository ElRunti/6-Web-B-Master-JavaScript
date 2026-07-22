import express from 'express'
import cors from 'cors'
import db from './db.js'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
}
app.use(logger)

app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

app.post('/api/mensaje', (req, res) => {
  const { text } = req.body
  if (!text) {
    return res.status(400).json({ error: 'El campo "text" es requerido' })
  }
  console.log('Mensaje recibido:', text)
  res.status(200).json({ ok: true, mensajeRecibido: text })
})

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body
  if (!prompt) {
    return res.status(400).json({ error: 'El campo "prompt" es requerido' })
  }
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'deepseek-r1:1.5b', prompt, stream: false }),
    })
    if (!response.ok) throw new Error('Error al conectar con Ollama')
    const data = await response.json()
    res.status(200).json({ ok: true, respuesta: data.response })
  } catch (error) {
    console.error('Error consultando Ollama:', error.message)
    res.status(500).json({ error: 'Error al procesar la solicitud con Ollama' })
  }
})

app.post('/api/mensajes', async (req, res) => {
  const { text, isUser } = req.body
  if (!text) {
    return res.status(400).json({ error: 'El campo "text" es requerido' })
  }
  const nuevoMensaje = {
    id: Date.now().toString(),
    text,
    isUser: Boolean(isUser),
    fecha: new Date().toISOString(),
  }
  db.data.mensajes.push(nuevoMensaje)
  await db.write()
  res.status(201).json({ ok: true, mensaje: nuevoMensaje })
})

app.get('/api/mensajes', async (req, res) => {
  await db.read()
  res.status(200).json({ ok: true, mensajes: db.data.mensajes })
})

app.delete('/api/mensajes/:id', async (req, res) => {
  const { id } = req.params
  const existe = db.data.mensajes.some((m) => m.id === id)
  if (!existe) {
    return res.status(404).json({ error: 'Mensaje no encontrado' })
  }
  db.data.mensajes = db.data.mensajes.filter((m) => m.id !== id)
  await db.write()
  res.status(200).json({ ok: true, mensaje: 'Mensaje eliminado' })
})

app.delete('/api/mensajes', async (req, res) => {
  db.data.mensajes = []
  await db.write()
  res.status(200).json({ ok: true, mensaje: 'Historial limpiado' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})