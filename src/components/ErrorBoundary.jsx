import { Component } from 'react'
import ErrorMessage from './ErrorMessage.jsx'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled UI error:', error, info)
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          message={this.props.message || 'Something went wrong while displaying this page.'}
          onRetry={this.handleRetry}
        />
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
