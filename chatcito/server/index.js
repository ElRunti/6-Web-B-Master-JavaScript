import express from 'express'

const app = express()
const PORT = 3000

// Middleware: permite que Express parsee JSON en el body de las peticiones
app.use(express.json())

// Middleware personalizado: loguea cada petición que llega
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

  res.status(200).json({
    ok: true,
    mensajeRecibido: text,
  })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})