import { useChatContext } from '../context/ChatContext'

function Header() {
  const { dispatch, messageCount } = useChatContext()

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="text-lg font-semibold">Mi ChatGPT Clone</h1>
      <span className="text-xs text-gray-400">{messageCount} mensajes</span>
      <button
        onClick={() => dispatch({ type: 'CLEAR_CHAT' })}
        className="text-sm text-red-500 hover:underline"
      >
        Limpiar chat
      </button>
    </div>
  )
}

export default Header