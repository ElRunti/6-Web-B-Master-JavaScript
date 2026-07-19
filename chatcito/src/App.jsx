import { ChatProvider, useChatContext } from './context/ChatContext'
import { useOllama } from './hooks/useOllama'
import ChatForm from './components/ChatForm'
import MessageList from './components/MessageList'
import History from './components/History'
import Header from './components/Header'

function ChatApp() {
  const { state, dispatch } = useChatContext()
  const { askOllama, isLoading } = useOllama()

  const handleSend = async (text) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { text, isUser: true } })
    const respuesta = await askOllama(text)
    if (respuesta) {
      dispatch({ type: 'ADD_MESSAGE', payload: { text: respuesta, isUser: false } })
    }
  }

  const handleSelectHistory = (text) => {
    handleSend(text)
  }

  return (
    <div className="min-h-screen flex max-w-5xl mx-auto">
      <aside className="w-64 border-r hidden md:block">
        <History onSelect={handleSelectHistory} />
      </aside>

      <div className="flex-1 flex flex-col">
        <Header />
        <MessageList messages={state.messages} />
        {isLoading && <p className="text-sm text-gray-400 px-4">Escribiendo...</p>}
        <ChatForm onSend={handleSend} />
      </div>
    </div>
  )
}

function App() {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  )
}

export default App