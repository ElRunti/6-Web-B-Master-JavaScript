import { useChatContext } from '../context/ChatContext'

function History({ onSelect }) {
  const { state } = useChatContext()

  const userPrompts = state.messages.filter((msg) => msg.isUser)

  if (userPrompts.length === 0) {
    return (
      <div className="p-4 text-sm text-gray-400">
        No hay consultas previas todavía.
      </div>
    )
  }

  return (
    <div className="p-4 space-y-1 overflow-y-auto">
      <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2">
        Historial
      </h2>
      {userPrompts.map((msg, i) => (
        <button
          key={i}
          onClick={() => onSelect(msg.text)}
          className="w-full text-left text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1 truncate"
        >
          {msg.text}
        </button>
      ))}
    </div>
  )
}

export default History