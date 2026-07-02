import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen p-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-white p-8 shadow-md">
            <h2 className="text-xl font-semibold text-red-600">Something went wrong</h2>
            <p className="mt-2 text-sm text-zinc-600">An unexpected error occurred while rendering the dashboard. Check the browser console for details.</p>
            <pre className="mt-4 overflow-auto text-xs text-red-600">{String(this.state.error)}</pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
