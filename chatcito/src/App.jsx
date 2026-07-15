import { useState } from 'react'
import ChatForm from './components/ChatForm'
import MessageList from './components/MessageList'

function App() {
  const [messages, setMessages] = useState([])

  const handleSend = (text) => {
    setMessages((prev) => [...prev, { text, isUser: true }])
  }

  const handleClear = () => {
    setMessages([])
  }

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-lg font-semibold">Mi ChatGPT Clone</h1>
        <button
          onClick={handleClear}
          className="text-sm text-red-500 hover:underline"
        >
          Limpiar chat
        </button>
      </div>

      <MessageList messages={messages} />
      <ChatForm onSend={handleSend} />
    </div>
  )
}

export default App