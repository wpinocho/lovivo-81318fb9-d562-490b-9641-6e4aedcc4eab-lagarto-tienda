import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="bg-white border border-reptile-200 overflow-hidden hover:border-reptile-300 transition-all duration-300 hover:shadow-lg group">
      <CardContent className="p-0">
        <div className="aspect-[4/3] bg-reptile-50 overflow-hidden relative">
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
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
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-reptile-800 font-bold text-xl line-clamp-1 group-hover:text-reptile-700 transition-colors">
              {collection.name}
            </h3>
            {collection.featured && (
              <span className="bg-earth-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Destacado
              </span>
            )}
          </div>
          
          {collection.description && (
            <p className="text-reptile-600 text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            variant="outline" 
            className="w-full text-reptile-700 border-reptile-300 hover:bg-reptile-50 hover:border-reptile-400 transition-colors group/btn"
            onClick={() => onViewProducts(collection.id)}
          >
            <span>Ver Productos</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}