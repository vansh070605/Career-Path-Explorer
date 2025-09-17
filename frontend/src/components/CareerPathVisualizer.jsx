import React, { useState, useCallback, useLayoutEffect } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import { getLayoutedElements } from './layout.js';
import 'reactflow/dist/style.css';
import './CareerPathVisualizer.css';

// --- Custom Node with Icon ---
const IconNode = ({ data }) => (
    <div className="icon-node">
        {data.icon && <i className={`node-icon ${data.icon}`}></i>}
        <div className="node-label">{data.label}</div>
    </div>
);
const nodeTypes = { iconNode: IconNode };

// --- Comprehensive Data Structure (with new descriptions) ---
const fullDataset = {
    nodes: [
        { id: 'sub-Maths', type: 'input', data: { label: 'Maths', icon: 'fas fa-calculator', description: 'The study of numbers, quantity, and space. Essential for logical reasoning and problem-solving in tech and finance.' } },
        { id: 'sub-Physics', type: 'input', data: { label: 'Physics', icon: 'fas fa-atom', description: 'The science of matter and energy. Forms the basis for all engineering disciplines.' } },
        { id: 'sub-Computer Science', type: 'input', data: { label: 'Computer Science', icon: 'fas fa-laptop-code', description: 'The study of computers and computational systems, including algorithms and data structures.' } },
        { id: 'sub-Biology', type: 'input', data: { label: 'Biology', icon: 'fas fa-dna', description: 'The study of living organisms. Foundational for careers in medicine and life sciences.' } },
        { id: 'sub-Economics', type: 'input', data: { label: 'Economics', icon: 'fas fa-chart-line', description: 'Analyzes the production, distribution, and consumption of goods and services. Key for finance and policy.' } },
        
        { id: 'deg-B.Tech CSE', data: { label: 'B.Tech CSE', icon: 'fas fa-graduation-cap', description: 'A 4-year engineering degree focused on software development, algorithms, and networking.' } },
        { id: 'deg-B.Tech Mechanical', data: { label: 'B.Tech Mechanical', icon: 'fas fa-cogs', description: 'An engineering branch dealing with the design, construction, and use of machines.' } },
        { id: 'deg-MBBS', data: { label: 'MBBS', icon: 'fas fa-stethoscope', description: 'A 5.5-year undergraduate medical degree to become a certified doctor.' } },
        { id: 'deg-B.Com', data: { label: 'B.Com', icon: 'fas fa-file-invoice-dollar', description: 'A 3-year degree in commerce, covering subjects like accounting, finance, and taxation.' } },

        { id: 'car-Software Engineer', type: 'output', data: { label: 'Software Engineer', icon: 'fas fa-briefcase', description: 'Designs, develops, and maintains software applications. Requires strong coding skills.' } },
        { id: 'car-Data Scientist', type: 'output', data: { label: 'Data Scientist', icon: 'fas fa-chart-pie', description: 'Analyzes large datasets to extract meaningful insights. Involves statistics and machine learning.' } },
        { id: 'car-Doctor', type: 'output', data: { label: 'Doctor', icon: 'fas fa-user-md', description: 'Diagnoses and treats illnesses and injuries. Requires extensive medical training.' } },
        { id: 'car-Financial Analyst', type: 'output', data: { label: 'Financial Analyst', icon: 'fas fa-money-check-alt', description: 'Provides guidance to businesses and individuals making investment decisions.' } },
    ],
    edges: [
        { id: 'e1', source: 'sub-Maths', target: 'deg-B.Tech CSE' },
        { id: 'e2', source: 'sub-Computer Science', target: 'deg-B.Tech CSE' },
        { id: 'e3', source: 'sub-Maths', target: 'deg-B.Tech Mechanical' },
        { id: 'e4', source: 'sub-Physics', target: 'deg-B.Tech Mechanical' },
        { id: 'e5', source: 'sub-Biology', target: 'deg-MBBS' },
        { id: 'e6', source: 'sub-Economics', target: 'deg-B.Com' },
        { id: 'e7', source: 'deg-B.Tech CSE', target: 'car-Software Engineer' },
        { id: 'e8', source: 'deg-B.Tech CSE', target: 'car-Data Scientist' },
        { id: 'e9', source: 'deg-MBBS', target: 'car-Doctor' },
        { id: 'e10', source: 'deg-B.Com', target: 'car-Financial Analyst' },
    ]
};

// --- Side Panel Component ---
const SidePanel = ({ node, onClose }) => {
    if (!node) return null;
    return (
        <div className="side-panel">
            <button className="close-button" onClick={onClose}><i className="fas fa-times"></i></button>
            <div className="panel-content">
                <div className="panel-header">
                    <i className={`panel-icon ${node.data.icon}`}></i>
                    <h3>{node.data.label}</h3>
                </div>
                <p>{node.data.description}</p>
                {/* Future enhancement: Link to other parts of the app */}
            </div>
        </div>
    );
};


const CareerPathVisualizer = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // Auto-layout effect
  useLayoutEffect(() => {
    getLayoutedElements(fullDataset.nodes, fullDataset.edges).then(({ nodes, edges }) => {
      setNodes(nodes);
      setEdges(edges);
    });
  }, []);

  const onNodeMouseEnter = useCallback((event, node) => {
    setEdges(prevEdges => prevEdges.map(edge => {
        // Find upstream and downstream connections
        if (edge.source === node.id || edge.target === node.id) {
            return { ...edge, animated: true, style: { ...edge.style, stroke: 'var(--highlight-accent)', strokeWidth: 3 } };
        }
        return edge;
    }));
  }, [setEdges]);

  const onNodeMouseLeave = useCallback((event, node) => {
    setEdges(prevEdges => prevEdges.map(edge => ({ ...edge, animated: false, style: { ...edge.style, stroke: 'var(--text-secondary)', strokeWidth: 2 } })));
  }, [setEdges]);
  
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h2>Dynamic Career Path Visualizer</h2>
        <p>Hover over a node to highlight its path. Click to learn more!</p>
      </div>
      <div className="visualizer-wrapper">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <div className="visualizer-legend">
            <div className="legend-item"><span className="color-box subjects"></span>Subjects</div>
            <div className="legend-item"><span className="color-box degrees"></span>Degrees</div>
            <div className="legend-item"><span className="color-box careers"></span>Careers</div>
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