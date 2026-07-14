import { useForm } from 'react-hook-form'

function ChatForm({ onSend }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    onSend(data.message)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 p-4 border-t">
      <input
        {...register('message', { required: 'Escribe un mensaje' })}
        className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Escribe tu mensaje..."
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Enviar
      </button>
      {errors.message && (
        <p className="text-red-500 text-sm">{errors.message.message}</p>
      )}
    </form>
  )
}

export default ChatForm