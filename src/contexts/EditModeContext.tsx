import React, { createContext, useContext, useState, ReactNode } from 'react';
import ConfirmationDialog from '../components/ConfirmationDialog';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: (skipConfirmation?: boolean) => void;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (value: boolean) => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const toggleEditMode = (skipConfirmation: boolean = false) => {
    if (!skipConfirmation && isEditMode && hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      const newEditMode = !isEditMode;
      setIsEditMode(newEditMode);
      if (!newEditMode) {
        setHasUnsavedChanges(false);
      }
    }
  };

  const handleConfirmExit = () => {
    setIsEditMode(false);
    setHasUnsavedChanges(false);
    setShowConfirmDialog(false);
  };

  return (
    <EditModeContext.Provider value={{ 
      isEditMode, 
      toggleEditMode, 
      hasUnsavedChanges, 
      setHasUnsavedChanges 
    }}>
      {children}
      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmExit}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to exit edit mode?"
        confirmText="Exit Without Saving"
        cancelText="Continue Editing"
        variant="warning"
      />
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
}; 