import React from 'react';
import { Card, Button, Icon } from '../design-system';
import Modal from './Modal';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  showCancelButton?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  showCancelButton = true
}) => {
  const getIconName = () => {
    switch (variant) {
      case 'danger':
        return 'alert-triangle';
      case 'warning':
        return 'alert-circle';
      case 'info':
        return 'info-circle';
      default:
        return 'alert-triangle';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'danger':
        return 'var(--color-error)';
      case 'warning':
        return 'var(--color-warning)';
      case 'info':
        return 'var(--color-primary)';
      default:
        return 'var(--color-error)';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" showCloseButton={false}>
      <div style={{ 
        maxWidth: '400px',
        margin: 'auto'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-md)',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <Icon 
            name={getIconName() as any} 
            size={48} 
            color={getIconColor()}
          />
          
          <h2 style={{
            margin: 0,
            fontSize: 'var(--font-xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)'
          }}>
            {title}
          </h2>
          
          <p style={{
            margin: 0,
            fontSize: 'var(--font-md)',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.5'
          }}>
            {message}
          </p>
          
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-sm)',
            width: '100%',
            marginTop: 'var(--spacing-md)'
          }}>
            {showCancelButton && (
              <Button
                variant="ghost"
                onClick={onClose}
                style={{ flex: 1 }}
              >
                {cancelText}
              </Button>
            )}
            <Button
              variant={variant === 'danger' ? 'primary' : 'primary'}
              onClick={() => {
                onConfirm();
                onClose();
              }}
              style={{ 
                flex: 1,
                backgroundColor: variant === 'danger' ? 'var(--color-error)' : undefined,
                borderColor: variant === 'danger' ? 'var(--color-error)' : undefined,
                width: !showCancelButton ? '100%' : undefined
              }}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog; 