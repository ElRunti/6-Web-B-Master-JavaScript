import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)

let db

export async function connectDB() {
  try {
    await client.connect()
    db = client.db('chatcito')
    console.log('Conectado a MongoDB ✅')
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message)
    process.exit(1)
  }
}

export function getDB() {
  return db
}