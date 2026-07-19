import { createContext, useContext, useReducer } from 'react'

const ChatContext = createContext()

const initialState = {
  messages: [],
}

function chatReducer(state, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    case 'CLEAR_CHAT':
      return { ...state, messages: [] }
    default:
      return state
  }
}

// Este contexto evita pasar `messages` y `dispatch` como props
// a través de múltiples niveles de componentes (prop drilling).
// Cualquier componente hijo de ChatProvider puede acceder
// directamente al estado con el hook useChatContext().
export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)
  const messageCount = state.messages.length

  return (
    <ChatContext.Provider value={{ state, dispatch, messageCount }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext debe usarse dentro de un ChatProvider')
  }
  return context
}