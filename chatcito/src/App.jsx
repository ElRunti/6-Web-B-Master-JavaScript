import { ChatProvider, useChatContext } from './context/ChatContext'
import { useOllama } from './hooks/useOllama'
import ChatForm from './components/ChatForm'
import MessageList from './components/MessageList'
import History from './components/History'

function ChatApp() {
  const { state, dispatch } = useChatContext()
  const { askOllama, isLoading } = useOllama()

  const handleSend = async (text) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { text, isUser: true } })

    const respuesta = await askOllama(text)

    if (respuesta) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: { text: respuesta, isUser: false },
      })
    }
  }

  const handleClear = () => {
    dispatch({ type: 'CLEAR_CHAT' })
  }

  // Reutilizar un prompt anterior: lo vuelve a enviar
  const handleSelectHistory = (text) => {
    handleSend(text)
  }

  return (
    <div className="min-h-screen flex max-w-5xl mx-auto">
      {/* Sidebar */}
      <aside className="w-64 border-r hidden md:block">
        <History onSelect={handleSelectHistory} />
      </aside>

      {/* Chat principal */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-lg font-semibold">Yarvis 4.5ñ</h1>
          <button
            onClick={handleClear}
            className="text-sm text-red-500 hover:underline"
          >
            Limpiar chat
          </button>
        </div>

        <MessageList messages={state.messages} />
        {isLoading && (
          <p className="text-sm text-gray-400 px-4">Escribiendo...</p>
        )}
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