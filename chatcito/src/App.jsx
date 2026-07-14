import { useState } from 'react'
import ChatForm from './ChatForm'

function App() {
  const [messages, setMessages] = useState([])

  const handleSend = (text) => {
    setMessages((prev) => [...prev, text])
  }

  return (
    <div className="min-h-screen flex flex-col justify-end max-w-2xl mx-auto">
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-2 w-fit">
            {msg}
          </div>
        ))}
      </div>
      <ChatForm onSend={handleSend} />
    </div>
  )
}

export default App