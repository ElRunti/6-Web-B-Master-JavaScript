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

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
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