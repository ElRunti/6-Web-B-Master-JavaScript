import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB, getDB } from './mongo.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

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

// CREATE
app.post('/api/mensajes', async (req, res) => {
  const { text, isUser } = req.body
  if (!text) {
    return res.status(400).json({ error: 'El campo "text" es requerido' })
  }

  const nuevoMensaje = {
    text,
    isUser: Boolean(isUser),
    fecha: new Date().toISOString(),
  }

  const db = getDB()
  const resultado = await db.collection('mensajes').insertOne(nuevoMensaje)

  res.status(201).json({ ok: true, mensaje: { ...nuevoMensaje, _id: resultado.insertedId } })
})

// READ
app.get('/api/mensajes', async (req, res) => {
  const db = getDB()
  const mensajes = await db.collection('mensajes').find().toArray()
  res.status(200).json({ ok: true, mensajes })
})

// DELETE puntual
app.delete('/api/mensajes/:id', async (req, res) => {
  const { ObjectId } = await import('mongodb')
  const db = getDB()
  const resultado = await db.collection('mensajes').deleteOne({ _id: new ObjectId(req.params.id) })

  if (resultado.deletedCount === 0) {
    return res.status(404).json({ error: 'Mensaje no encontrado' })
  }
  res.status(200).json({ ok: true, mensaje: 'Mensaje eliminado' })
})

// DELETE todo
app.delete('/api/mensajes', async (req, res) => {
  const db = getDB()
  await db.collection('mensajes').deleteMany({})
  res.status(200).json({ ok: true, mensaje: 'Historial limpiado' })
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  })
})