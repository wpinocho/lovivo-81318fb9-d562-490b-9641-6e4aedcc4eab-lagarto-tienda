import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import { Heart, Star } from "lucide-react"
import type { Product } from "@/lib/supabase"

/**
 * EDITABLE UI COMPONENT - ProductCardUI
 * 
 * Tarjeta de producto con diseño reptiliano para Mundo Reptil
 */

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="bg-white border border-reptile-200 hover:border-reptile-300 transition-all duration-300 hover:shadow-lg group overflow-hidden">
          <CardContent className="p-0">
            <Link to={`/products/${logic.product.slug}`} className="block">
              <div className="aspect-square bg-reptile-50 overflow-hidden relative">
                {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                  <img
                    src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-reptile-400">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🦎</div>
                      <div className="text-sm">Sin imagen</div>
                    </div>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {logic.discountPercentage && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                      -{logic.discountPercentage}%
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-earth-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Destacado
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                      Agotado
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                  <Heart className="h-4 w-4 text-reptile-600" />
                </button>
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/products/${logic.product.slug}`} className="block mb-3">
                <h3 className="text-reptile-800 font-semibold text-base mb-2 line-clamp-2 group-hover:text-reptile-700 transition-colors">
                  {logic.product.title}
                </h3>
                {logic.product.description && (
                  <p className="text-reptile-600 text-sm mb-3 line-clamp-2">
                    {logic.product.description.replace(/<[^>]*>/g, '')}
                  </p>
                )}
              </Link>

              {logic.hasVariants && logic.options && (
                <div className="mb-4 space-y-3">
                  {logic.options.map((opt) => (
                    <div key={opt.id}>
                      <div className="text-xs font-medium text-reptile-700 mb-2">{opt.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                          const isSelected = logic.selected[opt.name] === val
                          const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                          if (swatch) {
                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => logic.handleOptionChange(opt.name, val)}
                                title={`${opt.name}: ${val}`}
                                className={`h-6 w-6 rounded-full border-2 ${
                                  isSelected ? 'border-reptile-600' : 'border-reptile-300'
                                } ${
                                  logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''
                                }`}
                                style={{ 
                                  backgroundColor: swatch
                                }}
                                aria-label={`${opt.name}: ${val}`}
                              />
                            )
                          }

                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              className={`border rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                                isSelected 
                                  ? 'border-reptile-600 bg-reptile-600 text-white' 
                                  : logic.selected[opt.name] && !isSelected
                                    ? 'border-reptile-300 bg-white text-reptile-500 opacity-40'
                                    : 'border-reptile-300 bg-white text-reptile-700 hover:border-reptile-400'
                              }`}
                              aria-pressed={isSelected}
                              aria-label={`${opt.name}: ${val}`}
                              title={`${opt.name}: ${val}`}
                            >
                              {val}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-reptile-800 font-bold text-lg">
                    {logic.formatMoney(logic.currentPrice)}
                  </span>
                  {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                    <span className="text-reptile-400 text-sm line-through">
                      {logic.formatMoney(logic.currentCompareAt)}
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    logic.onAddToCartSuccess()
                    logic.handleAddToCart()
                  }}
                  disabled={!logic.canAddToCart}
                  className={`${
                    logic.inStock 
                      ? 'bg-reptile-600 hover:bg-reptile-700 text-white' 
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  } transition-colors font-medium`}
                >
                  {logic.inStock ? 'Agregar' : 'Agotado'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}