import { Database, Brain, Globe, FileText, Mail, MessageSquare, Image, Code, Zap } from 'lucide-react';

interface NodePaletteProps {
  onAddNode: (type: string, label: string) => void;
}

const nodeCategories = [
  {
    title: 'AI Actions',
    nodes: [
      { type: 'ai-chat', label: 'AI Chat', icon: Brain, color: 'purple' },
      { type: 'summarize', label: 'Summarize', icon: FileText, color: 'blue' },
      { type: 'classify', label: 'Classify', icon: Zap, color: 'amber' },
      { type: 'extract', label: 'Extract Data', icon: Code, color: 'green' }
    ]
  },
  {
    title: 'Data Sources',
    nodes: [
      { type: 'web-scrape', label: 'Web Scrape', icon: Globe, color: 'cyan' },
      { type: 'database', label: 'Database', icon: Database, color: 'indigo' },
      { type: 'email', label: 'Email', icon: Mail, color: 'red' },
      { type: 'api', label: 'API Call', icon: MessageSquare, color: 'orange' }
    ]
  },
  {
    title: 'Outputs',
    nodes: [
      { type: 'save-file', label: 'Save to File', icon: FileText, color: 'slate' },
      { type: 'send-email', label: 'Send Email', icon: Mail, color: 'pink' },
      { type: 'webhook', label: 'Webhook', icon: Zap, color: 'violet' }
    ]
  }
];

export function NodePalette({ onAddNode }: NodePaletteProps) {
  return (
    <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm text-slate-500 mb-4">Add Nodes</h2>
        
        {nodeCategories.map((category) => (
          <div key={category.title} className="mb-6">
            <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-2">
              {category.title}
            </h3>
            <div className="space-y-1">
              {category.nodes.map((node) => {
                const Icon = node.icon;
                return (
                  <button
                    key={node.type}
                    onClick={() => onAddNode(node.type, node.label)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors group"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-${node.color}-100 flex items-center justify-center group-hover:bg-${node.color}-200 transition-colors`}>
                      <Icon className={`w-4 h-4 text-${node.color}-600`} />
                    </div>
                    <span className="text-sm text-slate-700">{node.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
