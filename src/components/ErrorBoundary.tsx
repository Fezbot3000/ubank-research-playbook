import React, { Component, ReactNode } from 'react';
import { Button, Card } from '../design-system';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, errorInfo: React.ErrorInfo) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback && this.state.error && this.state.errorInfo) {
        return this.props.fallback(this.state.error, this.state.errorInfo);
      }

      return (
        <div style={{ 
          padding: 'var(--spacing-xl)', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh'
        }}>
          <Card style={{ textAlign: 'center', maxWidth: '600px' }}>
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Something went wrong</h2>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="primary"
            >
              Refresh Page
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 