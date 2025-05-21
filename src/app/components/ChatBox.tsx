'use client';

import { useRef, useState, useEffect } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! Ask me something about the PDF.' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Append user message
    setMessages((msgs) => [...msgs, { role: 'user', content: input.trim() }]);
    setInput('');

    // Placeholder: simulate assistant response
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { role: 'assistant', content: "I'll respond based on the PDF soon..." },
      ]);
    }, 300);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='flex flex-col h-full'>
      {/* Messages */}
      <div className='flex-1 overflow-y-auto space-y-2 p-4 bg-gray-50'>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-[80%] text-sm ${
              msg.role === 'user'
                ? 'bg-blue-100 self-end'
                : 'bg-white self-start'
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className='p-4 border-t flex gap-2 bg-white shrink-0'
      >
        <input
          type='text'
          className='flex-1 border rounded p-2 text-sm'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ask a question...'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 text-sm rounded'
        >
          Send
        </button>
      </form>
    </div>
  );
}
