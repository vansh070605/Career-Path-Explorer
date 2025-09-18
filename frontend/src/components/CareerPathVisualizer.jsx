import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import { getLayoutedElements } from './layout.js';
import 'reactflow/dist/style.css';
import './CareerPathVisualizer.css';
import { useTranslation } from 'react-i18next';

// --- Custom Node with Icon ---
const IconNode = ({ data }) => (
    <div className="icon-node">
        {data.icon && <i className={`node-icon ${data.icon}`}></i>}
        <div className="node-label">{data.label}</div>
    </div>
);
const nodeTypes = { iconNode: IconNode };

// --- Comprehensive Data Structure (with new descriptions) ---
// --- NEW DATA ADDED ---
const fullDataset = {
    nodes: [
        // Subjects (Inputs)
        { id: 'sub-Maths', type: 'input', data: { label: 'Maths', icon: 'fas fa-calculator', description: 'The study of numbers, quantity, and space. Essential for logical reasoning and problem-solving in tech and finance.' } },
        { id: 'sub-Physics', type: 'input', data: { label: 'Physics', icon: 'fas fa-atom', description: 'The science of matter and energy. Forms the basis for all engineering disciplines.' } },
        { id: 'sub-Computer Science', type: 'input', data: { label: 'Computer Science', icon: 'fas fa-laptop-code', description: 'The study of computers and computational systems, including algorithms and data structures.' } },
        { id: 'sub-Biology', type: 'input', data: { label: 'Biology', icon: 'fas fa-dna', description: 'The study of living organisms. Foundational for careers in medicine and life sciences.' } },
        { id: 'sub-Economics', type: 'input', data: { label: 'Economics', icon: 'fas fa-chart-line', description: 'Analyzes the production, distribution, and consumption of goods and services. Key for finance and policy.' } },
        
        // Degrees
        { id: 'deg-B.Tech CSE', data: { label: 'B.Tech CSE', icon: 'fas fa-graduation-cap', description: 'A 4-year engineering degree focused on software development, algorithms, and networking.' } },
        { id: 'deg-B.Tech Mechanical', data: { label: 'B.Tech Mechanical', icon: 'fas fa-cogs', description: 'An engineering branch dealing with the design, construction, and use of machines.' } },
        { id: 'deg-MBBS', data: { label: 'MBBS', icon: 'fas fa-stethoscope', description: 'A 5.5-year undergraduate medical degree to become a certified doctor.' } },
        { id: 'deg-B.Com', data: { label: 'B.Com', icon: 'fas fa-file-invoice-dollar', description: 'A 3-year degree in commerce, covering subjects like accounting, finance, and taxation.' } },
        { id: 'deg-BBA', data: { label: 'BBA', icon: 'fas fa-briefcase', description: 'A 3-year degree focused on business administration and management principles.' } },
        { id: 'deg-BSc-Physics', data: { label: 'B.Sc. Physics', icon: 'fas fa-flask', description: 'A 3-year science degree exploring the fundamental principles of the universe.' } },
        { id: 'deg-MBA', data: { label: 'MBA (Postgrad)', icon: 'fas fa-user-tie', description: 'A postgraduate degree providing theoretical and practical training for business management.' } },

        // Careers (Outputs)
        { id: 'car-Software Engineer', type: 'output', data: { label: 'Software Engineer', icon: 'fas fa-code', description: 'Designs, develops, and maintains software applications. Requires strong coding skills.' } },
        { id: 'car-Data Scientist', type: 'output', data: { label: 'Data Scientist', icon: 'fas fa-chart-pie', description: 'Analyzes large datasets to extract meaningful insights. Involves statistics and machine learning.' } },
        { id: 'car-Doctor', type: 'output', data: { label: 'Doctor', icon: 'fas fa-user-md', description: 'Diagnoses and treats illnesses and injuries. Requires extensive medical training.' } },
        { id: 'car-Financial Analyst', type: 'output', data: { label: 'Financial Analyst', icon: 'fas fa-money-check-alt', description: 'Provides guidance to businesses and individuals making investment decisions.' } },
        { id: 'car-Consultant', type: 'output', data: { label: 'Management Consultant', icon: 'fas fa-users', description: 'Helps organizations solve problems, improve performance, and maximize growth.' } },
        { id: 'car-PM', type: 'output', data: { label: 'Product Manager', icon: 'fas fa-rocket', description: 'Oversees the development of a product from conception to launch, bridging business and tech.' } },
        { id: 'car-Researcher', type: 'output', data: { label: 'Research Scientist', icon: 'fas fa-microscope', description: 'Conducts experiments and analysis to advance knowledge in a particular scientific field.' } },
    ],
    edges: [
        // Engineering Paths
        { id: 'e1', source: 'sub-Maths', target: 'deg-B.Tech CSE' },
        { id: 'e2', source: 'sub-Computer Science', target: 'deg-B.Tech CSE' },
        { id: 'e3', source: 'sub-Maths', target: 'deg-B.Tech Mechanical' },
        { id: 'e4', source: 'sub-Physics', target: 'deg-B.Tech Mechanical' },
        { id: 'e7', source: 'deg-B.Tech CSE', target: 'car-Software Engineer' },
        { id: 'e8', source: 'deg-B.Tech CSE', target: 'car-Data Scientist' },
        
        // Medical Path
        { id: 'e5', source: 'sub-Biology', target: 'deg-MBBS' },
        { id: 'e9', source: 'deg-MBBS', target: 'car-Doctor' },

        // Commerce/Finance Path
        { id: 'e6', source: 'sub-Economics', target: 'deg-B.Com' },
        { id: 'e10', source: 'deg-B.Com', target: 'car-Financial Analyst' },
        
        // --- NEW EDGES ---
        // Business Paths
        { id: 'e11', source: 'sub-Economics', target: 'deg-BBA' },
        { id: 'e12', source: 'sub-Maths', target: 'deg-BBA' },
        { id: 'e13', source: 'deg-BBA', target: 'deg-MBA' },
        { id: 'e14', source: 'deg-B.Tech CSE', target: 'deg-MBA' }, // Common path
        { id: 'e15', source: 'deg-MBA', target: 'car-Consultant' },
        { id: 'e16', source: 'deg-MBA', target: 'car-PM' },
        { id: 'e17', source: 'deg-B.Tech CSE', target: 'car-PM' }, // Direct path
        
        // Research Path
        { id: 'e18', source: 'sub-Physics', target: 'deg-BSc-Physics' },
        { id: 'e19', source: 'sub-Maths', target: 'deg-BSc-Physics' },
        { id: 'e20', source: 'deg-BSc-Physics', target: 'car-Researcher' },
    ]
};

// --- Side Panel Component (No Change) ---
const SidePanel = ({ node, onClose }) => {
    const { t } = useTranslation();
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
            </div>
        </div>
    );
};

const CareerPathVisualizer = () => {
  const { t } = useTranslation();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  
  // --- MODIFIED LOGIC ---
  // State to track the node whose path is currently being displayed
  const [activeNodeId, setActiveNodeId] = useState(null);

  // Auto-layout effect (runs once on mount)
  useLayoutEffect(() => {
    getLayoutedElements(fullDataset.nodes, fullDataset.edges).then(({ nodes, edges }) => {
      setNodes(nodes);
      setEdges(edges);
    });
  }, []);

  const onNodeMouseEnter = useCallback((event, node) => {
    setEdges(prevEdges => prevEdges.map(edge => {
        if (edge.source === node.id || edge.target === node.id) {
            return { ...edge, animated: true, style: { ...edge.style, stroke: 'var(--highlight-accent)', strokeWidth: 3 } };
        }
        return edge;
    }));
  }, [setEdges]);

  const onNodeMouseLeave = useCallback((event, node) => {
    setEdges(prevEdges => prevEdges.map(edge => ({ ...edge, animated: false, style: { ...edge.style, stroke: 'var(--text-secondary)', strokeWidth: 2 } })));
  }, [setEdges]);
  
  // Effect to apply styles when the active node changes
  useEffect(() => {
    if (activeNodeId === null) {
      // Reset all styles if no node is active
      setNodes(nds => nds.map(n => ({ ...n, className: '' })));
      setEdges(eds => eds.map(e => ({ ...e, animated: false, className: '' })));
      return;
    }

    // Find all connected nodes and edges for the active node
    const connectedNodeIds = fullDataset.edges.reduce((acc, edge) => {
        if (edge.source === activeNodeId) acc.add(edge.target);
        if (edge.target === activeNodeId) acc.add(edge.source);
        return acc;
    }, new Set([activeNodeId]));

    // Apply 'highlighted' or 'faded' classes based on connectivity
    setNodes(nds => nds.map(n => ({
        ...n,
        className: connectedNodeIds.has(n.id) ? 'highlighted' : 'faded'
    })));

    setEdges(eds => eds.map(edge => ({
        ...edge,
        animated: edge.source === activeNodeId || edge.target === activeNodeId,
        className: edge.source === activeNodeId || edge.target === activeNodeId ? 'highlighted' : 'faded',
    })));

  }, [activeNodeId, setNodes, setEdges]);

  // Handle node click: set it as active for path display and for the side panel
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setActiveNodeId(node.id);
  }, []);

  // Handle pane click: reset the view
  const onPaneClick = useCallback(() => {
    setActiveNodeId(null);
    setSelectedNode(null);
  }, []);

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <h2>{t('visualizer.title')}</h2>
        <p>{t('visualizer.subtitle')}</p>
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
          paneClassName={activeNodeId ? 'clickable' : ''} // Add class for cursor change
        >
          <div className="visualizer-legend">
            <div className="legend-item"><span className="color-box subjects"></span>{t('visualizer.legendSubjects')}</div>
            <div className="legend-item"><span className="color-box degrees"></span>{t('visualizer.legendDegrees')}</div>
            <div className="legend-item"><span className="color-box careers"></span>{t('visualizer.legendCareers')}</div>
          </div>
          <Controls />
          <Background variant="dots" gap={24} size={1} />
        </ReactFlow>
        <SidePanel node={selectedNode} onClose={() => { setSelectedNode(null); setActiveNodeId(null); }} />
      </div>
    </div>
  );
};

export default CareerPathVisualizer;