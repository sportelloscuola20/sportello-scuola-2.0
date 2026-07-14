import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen flex items-center justify-center bg-surface p-8">
            <div className="max-w-md text-center space-y-4">
              <div className="text-4xl">⚠️</div>
              <h1 className="text-xl font-semibold text-foreground">
                Qualcosa è andato storto
              </h1>
              <p className="text-sm text-muted">
                Si è verificato un errore imprevisto. Prova a ricaricare la pagina.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Ricarica pagina
              </button>
              {this.state.error && (
                <details className="text-xs text-muted mt-4 text-left bg-muted/50 rounded-lg p-3">
                  <summary className="cursor-pointer mb-1">Dettagli errore</summary>
                  <pre className="whitespace-pre-wrap break-words">
                    {this.state.error.message}
                    {'\n'}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
