import { useState } from 'react'
import { 
  Home, 
  Users, 
  UserPlus, 
  Stethoscope, 
  FileText, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  Calendar,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import younvLogo from '@/assets/younv-logo.png'

const Sidebar = ({ activeItem, onItemClick, isCollapsed, onToggleCollapse }) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      badge: null,
      description: 'Visão geral'
    },
    { 
      id: 'leads', 
      label: 'Leads', 
      icon: UserPlus, 
      badge: '12',
      description: 'Gestão de leads'
    },
    { 
      id: 'medicos', 
      label: 'Médicos', 
      icon: Stethoscope, 
      badge: null,
      description: 'Profissionais'
    },
    { 
      id: 'especialidades', 
      label: 'Especialidades', 
      icon: Activity, 
      badge: null,
      description: 'Áreas médicas'
    },
    { 
      id: 'procedimentos', 
      label: 'Procedimentos', 
      icon: FileText, 
      badge: null,
      description: 'Serviços'
    },
    { 
      id: 'relatorios', 
      label: 'Relatórios', 
      icon: BarChart3, 
      badge: null,
      description: 'Análises'
    }
  ]

  const quickStats = [
    { label: 'Leads Hoje', value: '8', icon: UserPlus, color: 'text-blue-400' },
    { label: 'Agendamentos', value: '15', icon: Calendar, color: 'text-green-400' },
    { label: 'Receita', value: 'R$ 12.5k', icon: DollarSign, color: 'text-yellow-400' }
  ]

  return (
    <div className={`bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen flex flex-col shadow-xl`}>
      
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img 
                src={younvLogo} 
                alt="Younv" 
                className="h-8 w-auto filter brightness-0 invert"
              />
              <div>
                <h2 className="font-bold text-lg">Clinical CRM</h2>
                <p className="text-xs text-slate-400">v2.0</p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-slate-400 group-hover:text-slate-300">
                        {item.description}
                      </div>
                    </div>
                    
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="bg-blue-500 text-white text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700">
          <h3 className="text-sm font-semibold text-slate-400 mb-3">Resumo Rápido</h3>
          <div className="space-y-3">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-slate-800/50">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        {!isCollapsed ? (
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors">
              <Settings className="h-4 w-4" />
              <span className="text-sm">Configurações</span>
            </button>
            
            <div className="text-center pt-2">
              <div className="text-xs text-slate-500">
                © 2024 Younv Clinical CRM
              </div>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-400">Sistema Online</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-slate-700"
              title="Configurações"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar

