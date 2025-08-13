import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decisionTree, DecisionNode, DecisionOption } from '../data/decisionTree';
import { methods } from '../data/methods';
import { Card, Button, Icon } from '../design-system';
import Modal from './Modal';

export default function DecisionTree() {
  const [currentNode, setCurrentNode] = useState('start');
  const [path, setPath] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string }>({ title: '', message: '' });
  const navigate = useNavigate();

  const node = decisionTree[currentNode];

  const handleOptionClick = (option: DecisionOption) => {
    if (option.method) {
      // Navigate to method page
      navigate(`/methods/${option.method}`);
    } else if (option.next) {
      // Move to next question
      setPath([...path, currentNode]);
      setCurrentNode(option.next);
    } else if (option.action) {
      // Handle special actions
      if (option.action === 'contactHelp') {
        setModalContent({
          title: 'Research Planning Help',
          message: 'Contact Matt for personalized research planning assistance. We can help you choose the right method and plan your study effectively.'
        });
        setModalOpen(true);
      } else if (option.action === 'reviewResearch') {
        setModalContent({
          title: 'Review Existing Research',
          message: 'Check the research archive for existing studies that might inform your project. This can help you build on previous insights and avoid duplicating efforts.'
        });
        setModalOpen(true);
      }
    }
  };

  const goBack = () => {
    if (path.length > 0) {
      const previousNode = path[path.length - 1];
      setCurrentNode(previousNode);
      setPath(path.slice(0, -1));
    }
  };

  const restart = () => {
    setCurrentNode('start');
    setPath([]);
  };

  return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>

      <Card style={{ 
        padding: 'var(--spacing-xl)'
      }}>

        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{node.question}</h3>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'var(--spacing-md)' 
        }}>
          {node.options.map((option, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => handleOptionClick(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOptionClick(option);
                }
              }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--spacing-md) var(--spacing-lg)',
                minHeight: '60px',
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--font-size-base)',
                fontWeight: 'var(--font-weight-medium)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-background-secondary)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-background)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-light)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>{option.text}</span>
              {option.method && (
                <Icon 
                  name="arrow-right" 
                  size={20} 
                  style={{ 
                    marginLeft: 'var(--spacing-md)',
                    flexShrink: 0,
                    color: 'var(--color-text-secondary)'
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-md)', 
          marginTop: 'var(--spacing-xl)',
          paddingTop: 'var(--spacing-lg)',
          borderTop: '1px solid var(--color-border)'
        }}>
          {path.length > 0 && (
            <Button
              variant="ghost"
              onClick={goBack}
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}
            >
              <Icon name="arrow-left" size={16} />
              Back
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={restart}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}
          >
            <Icon name="refresh" size={16} />
            Start Over
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
      >
        <p>{modalContent.message}</p>
        <Button 
          variant="primary"
          onClick={() => setModalOpen(false)}
          style={{ marginTop: 'var(--spacing-md)' }}
        >
          Got it
        </Button>
      </Modal>
    </div>
  );
} 