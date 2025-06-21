import { useState } from 'react'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      setError('')
      
      // Validação simples
      if (!formData.email || !formData.password) {
        setError('Por favor, preencha todos os campos.')
        return
      }

      // Simular login (como funcionava antes das melhorias)
      console.log('Tentando login com:', formData.email)
      
      // Redirecionar para dashboard
      window.location.href = '/dashboard'
      
    } catch (err) {
      console.error('Erro no login:', err)
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/src/assets/younv-logo.png" 
              alt="Younv" 
              className="h-16 w-auto"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'block'
              }}
            />
            <div style={{display: 'none'}} className="text-4xl font-bold text-blue-600">
              younv
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Clinical CRM
          </h1>
          <p className="text-gray-600">
            Sistema de Gestão de Clínicas
          </p>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            🏢 Acesso Profissional
          </div>
        </div>

        {/* Card de Login */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Entrar na Plataforma
            </h2>
            <p className="text-gray-600 mt-2">
              Faça login para acessar seu painel
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Esqueceu sua senha?{' '}
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Recuperar acesso
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 Younv Clinical CRM. Todos os direitos reservados.
          </p>
          <div className="flex justify-center space-x-4 mt-2 text-xs text-gray-400">
            <button className="hover:text-gray-600">Termos de Uso</button>
            <span>•</span>
            <button className="hover:text-gray-600">Política de Privacidade</button>
            <span>•</span>
            <button className="hover:text-gray-600">Suporte</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

