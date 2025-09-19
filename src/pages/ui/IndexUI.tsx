import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Shield, Truck, Heart, Star } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * EDITABLE UI - IndexUI
 * 
 * Homepage con temática reptiliana y diseño especializado en lagartos
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    blogs,
    loading,
    loadingCollections,
    loadingBlogs,
    searchTerm,
    selectedCollectionId,
    filteredProducts,
    setSearchTerm,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* Hero Section - Reptile Themed */}
      <section className="relative bg-gradient-to-br from-reptile-50 via-reptile-100 to-earth-50 py-20 overflow-hidden">
        <div className="absolute inset-0 reptile-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-reptile-800 mb-6 leading-tight">
              🦎 Mundo Reptil
            </h1>
            <p className="text-xl md:text-2xl text-reptile-700 mb-4 font-medium">
              Tu tienda especializada en lagartos
            </p>
            <p className="text-lg text-reptile-600 mb-8 max-w-3xl mx-auto">
              Descubre nuestra selección premium de lagartos criados en cautiverio, 
              terrarios profesionales y todo lo necesario para el cuidado de reptiles
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-8 animate-fade-in-up">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-reptile-500 h-5 w-5" />
            <Input 
              type="text" 
              placeholder="Buscar lagartos, terrarios..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="pl-10 h-12 text-lg border-reptile-300 focus:border-reptile-500 focus:ring-reptile-500"
            />
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up">
            <div className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <Shield className="h-6 w-6 text-reptile-600" />
              <span className="text-reptile-700 font-medium">Criados en Cautiverio</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <Heart className="h-6 w-6 text-reptile-600" />
              <span className="text-reptile-700 font-medium">Garantía de Salud</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <Truck className="h-6 w-6 text-reptile-600" />
              <span className="text-reptile-700 font-medium">Envío Especializado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-reptile-800 mb-4">
                Nuestras Categorías
              </h2>
              <p className="text-lg text-reptile-600 max-w-2xl mx-auto">
                Explora nuestra amplia gama de productos especializados para el mundo reptil
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {collections.map((collection, index) => (
                <div 
                  key={collection.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CollectionCard 
                    collection={collection} 
                    onViewProducts={handleViewCollectionProducts} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section className="py-16 bg-gradient-to-br from-reptile-50 to-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-reptile-800 mb-4">
                {selectedCollectionId 
                  ? `${collections.find(c => c.id === selectedCollectionId)?.name || 'Productos'}` 
                  : 'Productos Destacados'
                }
              </h2>
              <p className="text-lg text-reptile-600">
                {selectedCollectionId 
                  ? 'Productos seleccionados de esta categoría'
                  : 'Los mejores productos para tu reptil'
                }
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
                className="border-reptile-300 text-reptile-700 hover:bg-reptile-50"
              >
                Ver Todos los Productos
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl h-96 animate-pulse shadow-sm"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-fade-in-up hover:animate-scale-pulse"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🦎</div>
              <p className="text-xl text-reptile-600 mb-2">
                {searchTerm 
                  ? 'No encontramos productos que coincidan con tu búsqueda' 
                  : 'Pronto tendremos más productos disponibles'
                }
              </p>
              <p className="text-reptile-500">
                {searchTerm 
                  ? 'Intenta con otros términos de búsqueda'
                  : 'Mantente atento a nuestras novedades'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-reptile-800 mb-4">
              ¿Por qué elegir Mundo Reptil?
            </h2>
            <p className="text-lg text-reptile-600 max-w-2xl mx-auto">
              Somos especialistas en reptiles con años de experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-reptile-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-reptile-200 transition-colors">
                <Star className="h-8 w-8 text-reptile-600" />
              </div>
              <h3 className="text-xl font-semibold text-reptile-800 mb-2">Calidad Premium</h3>
              <p className="text-reptile-600">Todos nuestros reptiles son criados en cautiverio con los más altos estándares</p>
            </div>

            <div className="text-center group">
              <div className="bg-reptile-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-reptile-200 transition-colors">
                <Shield className="h-8 w-8 text-reptile-600" />
              </div>
              <h3 className="text-xl font-semibold text-reptile-800 mb-2">Garantía Total</h3>
              <p className="text-reptile-600">Certificados de salud y garantía en todos nuestros animales</p>
            </div>

            <div className="text-center group">
              <div className="bg-reptile-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-reptile-200 transition-colors">
                <Heart className="h-8 w-8 text-reptile-600" />
              </div>
              <h3 className="text-xl font-semibold text-reptile-800 mb-2">Asesoría Experta</h3>
              <p className="text-reptile-600">Te acompañamos en el cuidado de tu nueva mascota reptil</p>
            </div>

            <div className="text-center group">
              <div className="bg-reptile-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-reptile-200 transition-colors">
                <Truck className="h-8 w-8 text-reptile-600" />
              </div>
              <h3 className="text-xl font-semibold text-reptile-800 mb-2">Envío Seguro</h3>
              <p className="text-reptile-600">Transporte especializado para garantizar el bienestar animal</p>
            </div>
          </div>
        </div>
      </section>

      <FloatingCart />
    </EcommerceTemplate>
  );
};