import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Logo and title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Y</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Younv Clinical CRM</h1>
              <p className="text-sm text-gray-500">Sistema de Gestão de Clínicas</p>
            </div>
          </div>
        </div>
        
        {/* User info */}
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">Clínica Demo</p>
            <p className="text-xs text-gray-500">CNPJ: 12.345.678/0001-90</p>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium text-sm">CD</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

