import { useState, useRef } from 'react';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import { WorkflowNode as WorkflowNodeType } from '../App';

interface WorkflowNodeProps {
  node: WorkflowNodeType;
  isSelected: boolean;
  isConnecting: boolean;
  onDragStart: () => void;
  onDrag: (id: string, deltaX: number, deltaY: number) => void;
  onDelete: () => void;
  onConnectStart: (e: React.MouseEvent) => void;
  onConnectEnd: () => void;
}

const nodeColors: Record<string, string> = {
  'ai-chat': 'purple',
  'summarize': 'blue',
  'classify': 'amber',
  'extract': 'green',
  'web-scrape': 'cyan',
  'database': 'indigo',
  'email': 'red',
  'api': 'orange',
  'save-file': 'slate',
  'send-email': 'pink',
  'webhook': 'violet'
};

export function WorkflowNode({
  node,
  isSelected,
  isConnecting,
  onDragStart,
  onDrag,
  onDelete,
  onConnectStart,
  onConnectEnd
}: WorkflowNodeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const color = nodeColors[node.type] || 'slate';

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.node-actions')) return;
    
    e.stopPropagation();
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    onDragStart();

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - dragStartPos.current.x;
      const deltaY = moveEvent.clientY - dragStartPos.current.y;
      dragStartPos.current = { x: moveEvent.clientX, y: moveEvent.clientY };
      onDrag(node.id, deltaX, deltaY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleConnectorMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConnectStart(e);
  };

  const handleNodeMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isConnecting) {
      onConnectEnd();
    }
  };

  return (
    <div
      className={`absolute cursor-move select-none transition-shadow ${
        isSelected ? 'ring-2 ring-purple-500 ring-offset-2' : ''
      } ${isDragging ? 'shadow-2xl' : 'shadow-md'}`}
      style={{
        left: node.x,
        top: node.y,
        width: 240
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleNodeMouseUp}
    >
      <div className={`bg-white rounded-lg border-2 border-${color}-200 overflow-hidden`}>
        <div className={`bg-${color}-50 border-b border-${color}-200 px-3 py-2 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <GripVertical className={`w-4 h-4 text-${color}-400`} />
            <span className={`text-sm text-${color}-900`}>{node.label}</span>
          </div>
          <button
            className="node-actions p-1 hover:bg-red-100 rounded transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="w-3 h-3 text-red-600" />
          </button>
        </div>
        
        <div className="p-3">
          <div className="text-xs text-slate-500 mb-2">Configure this node</div>
          <input 
            type="text" 
            placeholder="Enter configuration..." 
            className="w-full px-2 py-1 text-sm border border-slate-200 rounded focus:outline-none focus:border-purple-400"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Input connector */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="w-3 h-3 bg-slate-400 rounded-full border-2 border-white" />
      </div>

      {/* Output connector */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 cursor-pointer hover:scale-110 transition-transform"
        onMouseDown={handleConnectorMouseDown}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`w-6 h-6 bg-${color}-500 rounded-full border-2 border-white flex items-center justify-center shadow-md`}>
          <Plus className="w-3 h-3 text-white" />
        </div>
      </button>
    </div>
  );
}
