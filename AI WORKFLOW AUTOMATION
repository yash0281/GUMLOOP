import { useState } from 'react';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { NodePalette } from './components/NodePalette';
import { AIAssistant } from './components/AIAssistant';
import { TopBar } from './components/TopBar';
import { OnboardingModal } from './components/OnboardingModal';

export interface WorkflowNode {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  config?: Record<string, any>;
}

export interface Connection {
  id: string;
  from: string;
  to: string;
}

export default function App() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [credits, setCredits] = useState(1000);
  const [showAssistant, setShowAssistant] = useState(false);

  const addNode = (type: string, label: string, x?: number, y?: number) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type,
      label,
      x: x ?? 100,
      y: y ?? 100,
      config: {}
    };
    setNodes([...nodes, newNode]);
  };

  const updateNodePosition = (id: string, x: number, y: number) => {
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, x, y } : node
    ));
  };

  const deleteNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id));
    setConnections(connections.filter(conn => conn.from !== id && conn.to !== id));
    if (selectedNode === id) {
      setSelectedNode(null);
    }
  };

  const addConnection = (from: string, to: string) => {
    const newConnection: Connection = {
      id: `conn-${Date.now()}`,
      from,
      to
    };
    setConnections([...connections, newConnection]);
  };

  const clearCanvas = () => {
    setNodes([]);
    setConnections([]);
    setSelectedNode(null);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <TopBar 
        credits={credits}
        onClearCanvas={clearCanvas}
        onToggleAssistant={() => setShowAssistant(!showAssistant)}
        showAssistant={showAssistant}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <NodePalette onAddNode={addNode} />
        
        <WorkflowCanvas
          nodes={nodes}
          connections={connections}
          selectedNode={selectedNode}
          onSelectNode={setSelectedNode}
          onUpdateNodePosition={updateNodePosition}
          onDeleteNode={deleteNode}
          onAddConnection={addConnection}
        />

        {showAssistant && (
          <AIAssistant 
            onClose={() => setShowAssistant(false)}
            onAddNode={addNode}
          />
        )}
      </div>

      {showOnboarding && (
        <OnboardingModal 
          onClose={() => setShowOnboarding(false)}
          onEarnCredits={(amount) => setCredits(credits + amount)}
        />
      )}
    </div>
  );
}
