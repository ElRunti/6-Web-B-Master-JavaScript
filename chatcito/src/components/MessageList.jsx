import Message from './Message'

function MessageList({ messages }) {
  return (
    <div className="flex-1 p-4 space-y-2 overflow-y-auto">
      {messages.map((msg, i) => (
        <Message key={i} text={msg.text} isUser={msg.isUser} />
      ))}
    </div>
  )
}

export default MessageList