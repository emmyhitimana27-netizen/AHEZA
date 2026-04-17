import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { useAuthStore } from '@store/useStore'
import { authService } from '@services/authService'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const { user, token, isAuthed, setAuth, clearAuth, updateUser } =
    useAuthStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /* ── Rehydrate session on mount ──────────────────────── */
  useEffect(() => {
    const storedToken = localStorage.getItem('aheza_token')
    if (!storedToken) {
      setLoading(false)
      return
    }

    const rehydrate = async () => {
      try {
        const data = await authService.getProfile()
        setAuth(data.user, storedToken)
      } catch {
        clearAuth()
      } finally {
        setLoading(false)
      }
    }

    rehydrate()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Register ─────────────────────────────────────────── */
  const register = useCallback(async (userData) => {
    try {
      setError(null)
      const data = await authService.register(userData)
      setAuth(data.user, data.token)
      toast.success('Account created successfully!')
      return data
    } catch (err) {
      const msg = err?.message || 'Registration failed'
      setError(msg)
      throw err
    }
  }, [setAuth])

  /* ── Login ────────────────────────────────────────────── */
  const login = useCallback(async (credentials) => {
    try {
      setError(null)
      const data = await authService.login(credentials)
      setAuth(data.user, data.token)
      toast.success(`Welcome back, ${data.user?.firstName || 'there'}!`)
      return data
    } catch (err) {
      const msg = err?.message || 'Login failed'
      setError(msg)
      throw err
    }
  }, [setAuth])

  /* ── Logout ───────────────────────────────────────────── */
  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } catch {
      // proceed regardless
    } finally {
      clearAuth()
      toast.success('Logged out successfully.')
    }
  }, [clearAuth])

  /* ── Update Profile ───────────────────────────────────── */
  const updateProfile = useCallback(async (updates) => {
    try {
      const data = await authService.updateProfile(updates)
      updateUser(data.user)
      toast.success('Profile updated!')
      return data
    } catch (err) {
      const msg = err?.message || 'Failed to update profile'
      setError(msg)
      throw err
    }
  }, [updateUser])

  /* ── Forgot Password ──────────────────────────────────── */
  const forgotPassword = useCallback(async (email) => {
    try {
      const data = await authService.forgotPassword(email)
      toast.success('Password reset link sent to your email.')
      return data
    } catch (err) {
      const msg = err?.message || 'Failed to send reset link'
      setError(msg)
      throw err
    }
  }, [])

  /* ── Reset Password ───────────────────────────────────── */
  const resetPassword = useCallback(async (resetToken, password) => {
    try {
      const data = await authService.resetPassword(resetToken, password)
      toast.success('Password reset successfully. Please log in.')
      return data
    } catch (err) {
      const msg = err?.message || 'Failed to reset password'
      setError(msg)
      throw err
    }
  }, [])

  /* ── Clear error ──────────────────────────────────────── */
  const clearError = useCallback(() => setError(null), [])

  const value = {
    user,
    token,
    isAuthed,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword,
    clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthContext