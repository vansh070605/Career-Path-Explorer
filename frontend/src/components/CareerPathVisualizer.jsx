import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, MarkerType } from 'reactflow';
import { getLayoutedElements } from './layout.js';
import 'reactflow/dist/style.css';
import './CareerPathVisualizer.css';
import { useTranslation } from 'react-i18next';

// --- Custom Node without Expansion Indicators ---
const IconNode = ({ data }) => (
  <div className={`icon-node leaf ${data.isPath ? 'active-path-node' : ''}`}>
    {data.icon && <i className={`node-icon ${data.icon}`}></i>}
    <div className="node-label">{data.label}</div>
  </div>
);
const nodeTypes = { iconNode: IconNode, input: IconNode, output: IconNode, default: IconNode };

const fullDataset = {
  nodes: [
    // Level 0: Class 10th
    { id: '10th', type: 'input', data: { label: 'Class 10th', icon: 'fas fa-school', description: 'Secondary School Certification.' } },

    // Level 1: Class 12th
    { id: '12-sci-pcm', data: { label: '12th Science (PCM)', icon: 'fas fa-atom', description: 'Physics, Chemistry, Maths.' } },
    { id: '12-sci-pcb', data: { label: '12th Science (PCB)', icon: 'fas fa-dna', description: 'Physics, Chemistry, Biology.' } },
    { id: '12-comm', data: { label: '12th Commerce', icon: 'fas fa-chart-bar', description: 'Business, Accounts, Economics.' } },
    { id: '12-arts', data: { label: '12th Arts', icon: 'fas fa-paint-brush', description: 'History, Pol Sci, Psychology.' } },

    // Level 2: Bachelors (UG)
    { id: 'ug-btech-cse', data: { label: 'B.Tech CSE', icon: 'fas fa-code', description: 'B.Tech Computer Science.' } },
    { id: 'ug-btech-mech', data: { label: 'B.Tech Mech', icon: 'fas fa-cogs', description: 'B.Tech Mechanical.' } },
    { id: 'ug-mbbs', data: { label: 'MBBS', icon: 'fas fa-user-md', description: 'Medicine & Surgery.' } },
    { id: 'ug-bsc-bio', data: { label: 'B.Sc Biology', icon: 'fas fa-microscope', description: 'B.Sc in Life Sciences.' } },
    { id: 'ug-bcom', data: { label: 'B.Com / BBA', icon: 'fas fa-briefcase', description: 'Commerce / Business Admin.' } },
    { id: 'ug-ba-psych', data: { label: 'BA Psychology', icon: 'fas fa-brain', description: 'Psychology.' } },
    { id: 'ug-ba-polsci', data: { label: 'BA Pol. Science', icon: 'fas fa-globe', description: 'Political Science.' } },

    // Level 3: Masters (PG)
    { id: 'pg-mtech', data: { label: 'M.Tech', icon: 'fas fa-microchip', description: 'Masters in Technology.' } },
    { id: 'pg-mba', data: { label: 'MBA', icon: 'fas fa-user-tie', description: 'Masters in Business Admin.' } },
    { id: 'pg-md', data: { label: 'MD / MS', icon: 'fas fa-hospital', description: 'Medical Specialization.' } },
    { id: 'pg-ma', data: { label: 'MA / MSc', icon: 'fas fa-book-open', description: 'Masters in Arts/Science.' } },

    // Level 4: Jobs
    { id: 'job-swe', type: 'output', data: { label: 'Software Engineer', icon: 'fas fa-laptop-code', description: 'Builds software & apps.' } },
    { id: 'job-datasci', type: 'output', data: { label: 'Data Scientist', icon: 'fas fa-database', description: 'Analyzes big data.' } },
    { id: 'job-mech-eng', type: 'output', data: { label: 'Mech. Engineer', icon: 'fas fa-tools', description: 'Mechanical systems design.' } },
    { id: 'job-doctor', type: 'output', data: { label: 'Doctor', icon: 'fas fa-stethoscope', description: 'Specialized medical practitioner.' } },
    { id: 'job-researcher', type: 'output', data: { label: 'Researcher', icon: 'fas fa-flask', description: 'Scientific research.' } },
    { id: 'job-banker', type: 'output', data: { label: 'Inv. Banker / CA', icon: 'fas fa-money-bill-wave', description: 'Finance & Auditing.' } },
    { id: 'job-manager', type: 'output', data: { label: 'Product Manager', icon: 'fas fa-tasks', description: 'Product strategy & leadership.' } },
    { id: 'job-civil', type: 'output', data: { label: 'Civil Servant', icon: 'fas fa-university', description: 'Govt. Administration.' } },
    { id: 'job-psych', type: 'output', data: { label: 'Psychologist', icon: 'fas fa-head-side-virus', description: 'Mental health therapy.' } },
  ],
  edges: [
    // 10th -> 12th
    { id: 'e1', source: '10th', target: '12-sci-pcm' },
    { id: 'e2', source: '10th', target: '12-sci-pcb' },
    { id: 'e3', source: '10th', target: '12-comm' },
    { id: 'e4', source: '10th', target: '12-arts' },

    // 12th -> UG
    { id: 'e5', source: '12-sci-pcm', target: 'ug-btech-cse' },
    { id: 'e6', source: '12-sci-pcm', target: 'ug-btech-mech' },
    { id: 'e7', source: '12-sci-pcm', target: 'ug-bcom' },
    { id: 'e8', source: '12-sci-pcb', target: 'ug-mbbs' },
    { id: 'e9', source: '12-sci-pcb', target: 'ug-bsc-bio' },
    { id: 'e10', source: '12-comm', target: 'ug-bcom' },
    { id: 'e11', source: '12-arts', target: 'ug-ba-psych' },
    { id: 'e12', source: '12-arts', target: 'ug-ba-polsci' },

    // UG -> PG
    { id: 'e13', source: 'ug-btech-cse', target: 'pg-mtech' },
    { id: 'e14', source: 'ug-btech-cse', target: 'pg-mba' },
    { id: 'e15', source: 'ug-btech-mech', target: 'pg-mba' },
    { id: 'e16', source: 'ug-mbbs', target: 'pg-md' },
    { id: 'e17', source: 'ug-bsc-bio', target: 'pg-ma' },
    { id: 'e18', source: 'ug-bcom', target: 'pg-mba' },
    { id: 'e19', source: 'ug-ba-psych', target: 'pg-ma' },
    { id: 'e20', source: 'ug-ba-polsci', target: 'pg-ma' },

    // UG -> Job
    { id: 'e21', source: 'ug-btech-cse', target: 'job-swe' },
    { id: 'e22', source: 'ug-btech-mech', target: 'job-mech-eng' },
    { id: 'e23', source: 'ug-bcom', target: 'job-banker' },

    // PG -> Job
    { id: 'e24', source: 'pg-mtech', target: 'job-datasci' },
    { id: 'e25', source: 'pg-mtech', target: 'job-swe' },
    { id: 'e26', source: 'pg-mba', target: 'job-manager' },
    { id: 'e27', source: 'pg-mba', target: 'job-banker' },
    { id: 'e28', source: 'pg-md', target: 'job-doctor' },
    { id: 'e29', source: 'pg-ma', target: 'job-researcher' },
    { id: 'e30', source: 'pg-ma', target: 'job-psych' },
    { id: 'e31', source: 'pg-ma', target: 'job-civil' },
    { id: 'e32', source: 'ug-ba-polsci', target: 'job-civil' },
  ]
};

// Side Panel
const SidePanel = ({ node, onClose }) => {
  if (!node) return null;
  return (
    <div className={`side-panel ${node ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}><i className="fas fa-times"></i></button>
      <div className="panel-content">
        <div className="panel-header">
          <i className={`panel-icon ${node.data.icon}`}></i>
          <h3>{node.data.label}</h3>
        </div>
        <p>{node.data.description}</p>
      </div>
    </div>
  );
};

const CareerPathVisualizer = () => {
  const { t } = useTranslation();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    // 1. Identify active path nodes and edges
    let pathNodeIds = new Set();
    let pathEdgeIds = new Set();

    if (selectedNode) {
      pathNodeIds.add(selectedNode.id);
      const findAncestors = (nodeId) => {
        const incoming = fullDataset.edges.filter(e => e.target === nodeId);
        incoming.forEach(e => {
          pathEdgeIds.add(e.id);
          pathNodeIds.add(e.source);
          findAncestors(e.source);
        });
      };
      findAncestors(selectedNode.id);

      const findDescendants = (nodeId) => {
        const outgoing = fullDataset.edges.filter(e => e.source === nodeId);
        outgoing.forEach(e => {
          pathEdgeIds.add(e.id);
          pathNodeIds.add(e.target);
          findDescendants(e.target);
        });
      };
      findDescendants(selectedNode.id);
    }

    // 2. Map Nodes (Apply styling)
    const currentNodes = fullDataset.nodes.map(n => {
      const isPath = pathNodeIds.has(n.id);
      const isDimmed = selectedNode && !isPath;

      return {
        ...n,
        data: { ...n.data, isPath },
        style: {
          opacity: isDimmed ? 0.3 : 1,
          border: isPath && selectedNode ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
        }
      };
    });

    // 3. Map Edges (Apply styling - IMPORTANT: Force visibility via style)
    const currentEdges = fullDataset.edges.map(e => {
      const isPath = pathEdgeIds.has(e.id);
      const isDimmed = selectedNode && !isPath;

      return {
        ...e,
        type: 'smoothstep', // Orthogonal
        animated: isPath,
        style: {
          stroke: isPath ? '#FFD700' : '#475569', // Gold vs Slate-600
          strokeWidth: isPath ? 4 : 2,
          opacity: isDimmed ? 0.1 : 1, // Dim others
          strokeDasharray: isPath ? '10 8' : 'none',
        },
        zIndex: isPath ? 999 : 1, // High z-index for active path
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isPath ? '#FFD700' : '#475569',
        },
      };
    });

    // 4. Calculate Layout
    getLayoutedElements(currentNodes, currentEdges).then(({ nodes: layoutedNodes }) => {
      setNodes(layoutedNodes);
      // DIRECTLY set edges here, bypassing any potential layout filtering
      setEdges(currentEdges);
    });

  }, [selectedNode, setNodes, setEdges]); // Rerun when selection changes

  const onNodeClick = useCallback((event, node) => {
    // Toggle selection or select new
    setSelectedNode(prev => (prev?.id === node.id ? null : node));
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h2>{t('visualizer.title')}</h2>
        <p>Click on any career stage to visualize the complete path from Class 10th to your Dream Job!</p>
      </div>
      <div className="visualizer-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          minZoom={0.5}
        >
          <div className="visualizer-legend">
            <div className="legend-item"><span className="color-box stages"></span>Stages</div>
            <div className="legend-item"><span className="color-box path"></span>Active Dotted Path</div>
          </div>
          <Controls />
          <Background variant="dots" gap={24} size={1} />
        </ReactFlow>
        <SidePanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      </div>
    </div>
  );
};

export default CareerPathVisualizer;