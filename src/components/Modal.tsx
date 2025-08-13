import React, { ReactNode, useEffect } from 'react';
import { Card, Button, Icon, Scrim } from '../design-system';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  showCloseButton = true 
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Scrim onScrimClick={onClose}>
      <Card 
        onClick={(e) => e.stopPropagation()}
        className="modal-content"
        style={{
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--spacing-md)',
          paddingBottom: 'var(--spacing-md)',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <h3 className="modal-header" style={{ margin: 0 }}>{title}</h3>
          {showCloseButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Close modal"
              style={{ padding: 'var(--spacing-xs)' }}
            >
              <Icon name="close" size={20} />
            </Button>
          )}
        </div>
        <div className="modal-body">
          {children}
        </div>
      </Card>
    </Scrim>
  );
};

export default Modal; 