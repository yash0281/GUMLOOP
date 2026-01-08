import { useRef, useState } from 'react';
import { WorkflowNode as WorkflowNodeType, Connection } from '../App';
import { WorkflowNode } from './WorkflowNode';

interface WorkflowCanvasProps {
  nodes: WorkflowNodeType[];
  connections: Connection[];
  selectedNode: string | null;
  onSelectNode: (id: string | null) => void;
  onUpdateNodePosition: (id: string, x: number, y: number) => void;
  onDeleteNode: (id: string) => void;
  onAddConnection: (from: string, to: string) => void;
}

export function WorkflowCanvas({
  nodes,
  connections,
  selectedNode,
  onSelectNode,
  onUpdateNodePosition,
  onDeleteNode,
  onAddConnection
}: WorkflowCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [tempLine, setTempLine] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  const handleNodeDragStart = (id: string) => {
    onSelectNode(id);
  };

  const handleNodeDrag = (id: string, deltaX: number, deltaY: number) => {
    const node = nodes.find(n => n.id === id);
    if (node) {
      onUpdateNodePosition(id, node.x + deltaX, node.y + deltaY);
    }
  };

  const handleConnectStart = (nodeId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setConnectingFrom(nodeId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (connectingFrom && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const fromNode = nodes.find(n => n.id === connectingFrom);
      if (fromNode) {
        setTempLine({
          x1: fromNode.x + 120,
          y1: fromNode.y + 40,
          x2: e.clientX - rect.left,
          y2: e.clientY - rect.top
        });
      }
    }
  };

  const handleConnectEnd = (toNodeId: string) => {
    if (connectingFrom && connectingFrom !== toNodeId) {
      onAddConnection(connectingFrom, toNodeId);
    }
    setConnectingFrom(null);
    setTempLine(null);
  };

  const handleCanvasClick = () => {
    onSelectNode(null);
    setConnectingFrom(null);
    setTempLine(null);
  };

  return (
    <div 
      ref={canvasRef}
      className="flex-1 relative bg-slate-50 overflow-hidden"
      onMouseMove={handleMouseMove}
      onClick={handleCanvasClick}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgb(226, 232, 240) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(226, 232, 240) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map(conn => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          const x1 = fromNode.x + 120;
          const y1 = fromNode.y + 40;
          const x2 = toNode.x;
          const y2 = toNode.y + 40;

          const midX = (x1 + x2) / 2;

          return (
            <g key={conn.id}>
              <path
                d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              <circle cx={x2} cy={y2} r="4" fill="#94a3b8" />
            </g>
          );
        })}
        
        {tempLine && (
          <path
            d={`M ${tempLine.x1} ${tempLine.y1} L ${tempLine.x2} ${tempLine.y2}`}
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        )}
      </svg>

      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-slate-400 mb-2">Your canvas is empty</div>
            <div className="text-sm text-slate-400">Add nodes from the left panel to get started</div>
          </div>
        </div>
      )}

      {nodes.map(node => (
        <WorkflowNode
          key={node.id}
          node={node}
          isSelected={selectedNode === node.id}
          isConnecting={connectingFrom !== null}
          onDragStart={() => handleNodeDragStart(node.id)}
          onDrag={handleNodeDrag}
          onDelete={() => onDeleteNode(node.id)}
          onConnectStart={(e) => handleConnectStart(node.id, e)}
          onConnectEnd={() => handleConnectEnd(node.id)}
        />
      ))}
    </div>
  );
}
