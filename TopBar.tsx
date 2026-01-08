import { Sparkles, Trash2, Download, Play } from 'lucide-react';

interface TopBarProps {
  credits: number;
  onClearCanvas: () => void;
  onToggleAssistant: () => void;
  showAssistant: boolean;
}

export function TopBar({ credits, onClearCanvas, onToggleAssistant, showAssistant }: TopBarProps) {
  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl">FlowBuilder</span>
        </div>
        
        <div className="h-8 w-px bg-slate-200" />
        
        <input 
          type="text" 
          placeholder="Untitled Flow" 
          className="px-3 py-1 rounded border border-slate-200 focus:outline-none focus:border-purple-400"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm text-purple-900">{credits.toLocaleString()} credits</span>
        </div>

        <button
          onClick={onToggleAssistant}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            showAssistant 
              ? 'bg-purple-600 text-white' 
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Gummie AI
        </button>

        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Download className="w-5 h-5 text-slate-600" />
        </button>

        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={onClearCanvas}>
          <Trash2 className="w-5 h-5 text-slate-600" />
        </button>

        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center gap-2 transition-colors">
          <Play className="w-4 h-4" />
          Run Flow
        </button>
      </div>
    </div>
  );
}
