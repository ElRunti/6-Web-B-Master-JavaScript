import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const file = path.join(__dirname, 'db.json')

const adapter = new JSONFile(file)
const defaultData = { mensajes: [] }

const db = new Low(adapter, defaultData)

await db.read()

export default db