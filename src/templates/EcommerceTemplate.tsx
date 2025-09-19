import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { Input } from '@/components/ui/input'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template con diseño reptiliano para Mundo Reptil
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 bg-white/95 backdrop-blur-sm border-b border-reptile-200 sticky top-0 z-40 ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="text-2xl">🦎</div>
              <div>
                <div className="text-xl font-bold text-reptile-800">Mundo Reptil</div>
                <div className="text-xs text-reptile-600">Especialistas en lagartos</div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-reptile-700 hover:text-reptile-800 transition-colors font-medium"
              >
                Inicio
              </Link>
              <Link 
                to="/blog" 
                className="text-reptile-700 hover:text-reptile-800 transition-colors font-medium"
              >
                Guías de Cuidado
              </Link>
            </nav>
          </div>

          {/* Cart */}
          {showCart && (
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative hover:bg-reptile-100"
            >
              <ShoppingCart className="h-5 w-5 text-reptile-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-reptile-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Button>
          )}
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-reptile-800">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-reptile-800 text-white py-12 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">🦎</div>
              <div>
                <div className="text-xl font-bold">Mundo Reptil</div>
                <div className="text-sm text-reptile-200">Especialistas en lagartos</div>
              </div>
            </div>
            <p className="text-reptile-200 mb-4 max-w-md">
              Tu tienda de confianza para lagartos, terrarios y todo lo necesario 
              para el cuidado de reptiles. Criamos con amor y vendemos con garantía.
            </p>
            <SocialLinks />
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Navegación</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-reptile-200 hover:text-white transition-colors"
              >
                Inicio
              </Link>
              <Link 
                to="/blog" 
                className="block text-reptile-200 hover:text-white transition-colors"
              >
                Guías de Cuidado
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contacto</h3>
            <div className="space-y-2 text-reptile-200 text-sm">
              <p>📧 info@mundoreptil.com</p>
              <p>📱 WhatsApp: +57 300 123 4567</p>
              <p>🕒 Lun-Sáb: 9AM-6PM</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-reptile-700 text-center text-reptile-200">
          <p>&copy; 2024 Mundo Reptil. Todos los derechos reservados.</p>
          <p className="text-sm mt-2">Criamos con responsabilidad, vendemos con garantía 🦎</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}