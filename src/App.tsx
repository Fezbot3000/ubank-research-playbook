import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MethodPage from './pages/MethodPage';
import ResourcesPage from './pages/ResourcesPage';
import ResourcePage from './pages/ResourcePage';
import DecisionTreeAnalysisPage from './pages/DecisionTreeAnalysisPage';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/methods/:slug" element={
            <ErrorBoundary>
              <MethodPage />
            </ErrorBoundary>
          } />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:slug" element={
            <ErrorBoundary>
              <ResourcePage />
            </ErrorBoundary>
          } />
          <Route path="/analysis" element={
            <ErrorBoundary>
              <DecisionTreeAnalysisPage />
            </ErrorBoundary>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
} 