import React, { useState, useEffect, useRef } from 'react';
import { useEditMode } from '../contexts/EditModeContext';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  tag?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  className?: string;
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  tag: Tag = 'span',
  style,
  className,
  multiline = false
}) => {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update edit value when external value changes
  useEffect(() => {
    if (!isEditing) {
      setEditValue(value);
    }
  }, [value, isEditing]);

  useEffect(() => {
    if (!isEditMode && isEditing) {
      setIsEditing(false);
    }
  }, [isEditMode, isEditing]);

  // Auto-resize textarea
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [editValue, isEditing]);

  // Handle clicks outside to close editor
  useEffect(() => {
    if (!isEditing) return;

    const handleClickOutside = (e: MouseEvent) => {
      // Don't close if clicking on Grammarly elements
      const target = e.target as HTMLElement;
      if (target.closest('[data-grammarly-part]') || 
          target.closest('.gr_') || 
          target.closest('[class*="grammarly"]')) {
        return;
      }

      // Don't close if clicking inside our container
      if (containerRef.current && containerRef.current.contains(target)) {
        return;
      }

      // Close the editor
      setIsEditing(false);
      if (editValue !== value) {
        onChange(editValue);
      }
    };

    // Add a small delay to avoid immediate closure on open
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, editValue, value, onChange]);

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.select();
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      setIsEditing(false);
      if (editValue !== value) {
        onChange(editValue);
      }
    }
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditValue(e.target.value);
  };

  // Create wrapper class for edit mode styling
  const wrapperClassName = `editable-text ${isEditMode && !isEditing ? 'editable-text--hoverable' : ''} ${className || ''}`;

  if (isEditing) {
    return (
      <div ref={containerRef} className="editable-text__container">
        <textarea
          ref={textareaRef}
          value={editValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="editable-text__textarea"
          rows={1}
          spellCheck={true}
          style={{
            font: 'inherit',
            ...style
          }}
        />
      </div>
    );
  }

  const Element = Tag === 'h1' || Tag === 'h2' || Tag === 'h3' || Tag === 'h4' || Tag === 'p' ? Tag : 'div';

  return (
    <Element
      onClick={handleClick}
      style={style}
      className={wrapperClassName}
    >
      {editValue}
    </Element>
  );
}; 