import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

// Layout Components
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'

// Page Components
import Dashboard from './components/pages/Dashboard'
import Medicos from './components/pages/Medicos'
import Especialidades from './components/pages/Especialidades'
import Procedimentos from './components/pages/Procedimentos'
import Leads from './components/pages/Leads'
import Relatorios from './components/pages/Relatorios'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header onMenuClick={() => setSidebarOpen(true)} />
          
          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/medicos" element={<Medicos />} />
              <Route path="/especialidades" element={<Especialidades />} />
              <Route path="/procedimentos" element={<Procedimentos />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/relatorios" element={<Relatorios />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App

