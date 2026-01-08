import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

interface AIAssistantProps {
  onClose: () => void;
  onAddNode: (type: string, label: string, x?: number, y?: number) => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestedPrompts = [
  "Build a workflow that scrapes a website and summarizes the content",
  "Create a lead enrichment flow",
  "Set up email automation with AI classification",
  "Help me extract data from PDFs"
];

export function AIAssistant({ onClose, onAddNode }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Gummie, your AI workflow assistant. 🌟 I can help you build powerful automation flows. What would you like to create today?"
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      // Add nodes based on the response
      if (response.nodes) {
        response.nodes.forEach((node, index) => {
          setTimeout(() => {
            onAddNode(node.type, node.label, 150 + index * 280, 150);
          }, 500 + index * 300);
        });
      }
    }, 1000);
  };

  const generateResponse = (userInput: string): { message: string; nodes?: Array<{ type: string; label: string }> } => {
    const lower = userInput.toLowerCase();
    
    if (lower.includes('scrape') || lower.includes('website')) {
      return {
        message: "Great! I'll help you build a web scraping workflow. I'm adding the nodes to your canvas now:\n\n1. Web Scrape - to extract data from your target URL\n2. Extract Data - to parse and structure the content\n3. Summarize - to create a concise summary\n\nYou can configure each node by clicking on it!",
        nodes: [
          { type: 'web-scrape', label: 'Web Scrape' },
          { type: 'extract', label: 'Extract Data' },
          { type: 'summarize', label: 'Summarize' }
        ]
      };
    }
    
    if (lower.includes('email') || lower.includes('lead')) {
      return {
        message: "Perfect! I'll set up an email automation workflow for you:\n\n1. Email - to receive incoming emails\n2. AI Chat - to analyze and classify\n3. Send Email - to send automated responses\n\nConnect them together to complete the flow!",
        nodes: [
          { type: 'email', label: 'Email' },
          { type: 'ai-chat', label: 'AI Chat' },
          { type: 'send-email', label: 'Send Email' }
        ]
      };
    }

    if (lower.includes('data') || lower.includes('extract')) {
      return {
        message: "I'll help you build a data extraction pipeline:\n\n1. Database - your data source\n2. Extract Data - to pull specific fields\n3. Save to File - to store the results\n\nLet me add these to your canvas!",
        nodes: [
          { type: 'database', label: 'Database' },
          { type: 'extract', label: 'Extract Data' },
          { type: 'save-file', label: 'Save to File' }
        ]
      };
    }

    return {
      message: "I can help you build that! Try being more specific about:\n\n• What data source you're using (website, email, database, API)\n• What you want to do with the data (summarize, classify, extract)\n• Where you want to send the results\n\nOr click one of the suggested prompts below!"
    };
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="w-96 bg-white border-l border-slate-200 flex flex-col">
      <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div>Gummie AI</div>
            <div className="text-xs text-slate-500">Your AI Assistant</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-100 text-slate-900'
              }`}
            >
              <div className="text-sm whitespace-pre-line">{message.content}</div>
            </div>
          </div>
        ))}

        {messages.length === 1 && (
          <div className="space-y-2">
            <div className="text-xs text-slate-500">Try these:</div>
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedPrompt(prompt)}
                className="w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe your workflow..."
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-purple-400"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
