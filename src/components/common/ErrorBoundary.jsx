import { Component } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('AHEZA Error Boundary:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark flex items-center justify-center px-4">
          <motion.div
            className="glass rounded-2xl p-10 max-w-md w-full text-center border border-red-500/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">
              Something went wrong
            </h2>
            <p className="text-neutral-400 text-sm mb-8">
              {this.state.error?.message || 'An unexpected error occurred. Please try again.'}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="flex items-center gap-2 px-5 py-2.5 glass border border-neutral-700 text-neutral-300 hover:text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <Home className="w-4 h-4" /> Go Home
              </button>
            </div>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}