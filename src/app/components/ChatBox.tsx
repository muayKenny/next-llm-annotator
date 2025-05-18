'use client';

export default function ChatBox() {
  return (
    <div className='flex flex-col h-full p-4 space-y-4 justify-between'>
      {/* Header */}
      {/* <div className='text-lg font-semibold'>AI Tutor Chat</div> */}

      {/* Chat messages */}
      <div className='flex-1 overflow-y-auto bg-gray-50 rounded p-4 space-y-2 shadow-inner'>
        <div className='bg-white p-2 rounded shadow text-sm'>
          <strong>AI:</strong> Hello! Upload a PDF to begin.
        </div>
        <div className='bg-blue-100 p-2 rounded shadow text-sm self-end'>
          <strong>You:</strong> What is a virus?
        </div>
      </div>

      {/* Input box */}
      <form className='flex gap-2'>
        <input
          type='text'
          placeholder='Ask something...'
          className='flex-1 border rounded p-2 text-sm'
          disabled
        />
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 text-sm rounded disabled:opacity-50'
          disabled
        >
          Send
        </button>
      </form>
    </div>
  );
}
