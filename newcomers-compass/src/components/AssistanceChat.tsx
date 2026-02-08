'use client';

import { useEffect, useRef, useState } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AssistanceChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm the Newcomer's Compass assistant. Ask me about resources, spotlights, submissions, or TSA documents."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  const canSend = input.trim().length > 0 && !isLoading;
  const handleSubmit = async (messageText: string) => {
    const content = messageText.trim();
    if (!content || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content }];
    const contextMessages = nextMessages.slice(-12);
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: contextMessages })
      });

      if (!response.ok) {
        throw new Error('Unable to reach the assistant. Please try again.');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col w-full h-[70vh] md:h-[520px] bg-white rounded-3xl shadow-2xl border overflow-hidden"
      style={{borderColor: '#EBD9D1'}}
    >
      <div className="px-6 py-4 border-b bg-white" style={{borderColor: '#EBD9D1'}}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{backgroundColor: '#B87C4C'}}>
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a7 7 0 00-4.95 11.95l-.85 2.55a1 1 0 001.3 1.27l2.53-.85A7 7 0 109 2zm-.5 4a1 1 0 112 0c0 .6-.3 1.02-.77 1.38-.3.23-.73.54-.73.97v.4a1 1 0 11-2 0v-.45c0-1.02.64-1.57 1.1-1.9.25-.18.4-.34.4-.4zM9 12a1.2 1.2 0 110 2.4A1.2 1.2 0 019 12z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{color: '#B87C4C'}}>Get Assistance</h2>
            <p className="text-xs" style={{color: '#748DAE'}}>
              Ask about resources, submissions, or TSA requirements.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto" style={{backgroundColor: '#FCF9EA'}}>
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className="max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm"
              style={{
                backgroundColor: message.role === 'assistant' ? '#FFFFFF' : '#BADFDB',
                color: '#333'
              }}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl text-sm shadow-sm" style={{backgroundColor: '#FFFFFF', color: '#333'}}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="px-6 py-4 border-t bg-white" style={{borderColor: '#EBD9D1'}}>
        {error && (
          <div className="mb-3 text-xs text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(input);
          }}
          className="space-y-3"
        >
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question..."
              rows={2}
              className="flex-1 px-4 py-3 border rounded-2xl focus:ring-2 focus:border-transparent transition-all resize-none"
              style={{borderColor: '#EBD9D1', color: '#333'}}
            />
            <button
              type="submit"
              disabled={!canSend}
              className="px-5 py-3 rounded-2xl font-semibold transition-all shadow-lg disabled:opacity-50"
              style={{backgroundColor: '#B87C4C', color: 'white'}}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
