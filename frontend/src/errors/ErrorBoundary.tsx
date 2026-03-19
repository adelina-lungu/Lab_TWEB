import { Component, type ErrorInfo, type ReactNode } from "react";
import { ServerCrash, RotateCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("[ErrorBoundary]", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    const errorMessage = this.state.error?.message ?? "A aparut o eroare neasteptata.";
    const componentStack = this.state.errorInfo?.componentStack ?? "";

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-stone-950 px-6 text-center">
        <button onClick={this.handleReset} className="absolute top-6 left-6 cursor-pointer font-serif text-2xl font-semibold tracking-[0.2em] text-stone-100 transition-colors hover:text-gold-400">
          LUMINA
        </button>

        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/5">
          <ServerCrash size={36} className="text-red-400/60" />
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900/50 px-4 py-1.5 text-xs font-medium tracking-wide text-stone-400">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          Eroare de executie
        </div>

        <h1 className="font-serif text-8xl font-bold text-stone-800/50 sm:text-9xl">ERR</h1>

        <h2 className="mt-4 font-serif text-2xl font-semibold text-stone-100 sm:text-3xl">
          Aplicatia s-a oprit neasteptat
        </h2>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400 sm:text-base">
          Ceva nu a functionat corect la afisarea paginii. Incearca sa reincarci — daca problema persista, contacteaza suportul.
        </p>

        {(errorMessage || componentStack) && (
          <div className="mt-6 w-full max-w-lg rounded-lg border border-stone-800 bg-stone-900/50 px-5 py-4 text-left">
            <p className="mb-2 text-xs font-medium tracking-wide uppercase text-stone-500">Detalii eroare</p>
            <code className="block whitespace-pre-wrap text-xs leading-relaxed text-red-400/80">
              {errorMessage}
              {componentStack && `\n\nComponent Stack:${componentStack.substring(0, 300)}...`}
            </code>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button onClick={this.handleReload} className="flex cursor-pointer items-center justify-center gap-2 border border-gold-400/40 bg-gold-400/10 px-6 py-3 text-sm font-medium tracking-widest uppercase text-gold-400 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/20">
            <RotateCw size={16} />
            Reincarca
          </button>
          <button onClick={this.handleReset} className="flex cursor-pointer items-center justify-center gap-2 border border-stone-700 px-6 py-3 text-sm font-medium tracking-widest uppercase text-stone-400 transition-all duration-300 hover:border-stone-600 hover:text-stone-200">
            <Home size={16} />
            Acasa
          </button>
        </div>

        <p className="absolute bottom-6 text-xs text-stone-700">
          &copy; 2026 Lumina Studio. Toate drepturile rezervate.
        </p>
      </div>
    );
  }
}