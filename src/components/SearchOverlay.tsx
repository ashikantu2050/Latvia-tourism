import React, { useState } from 'react';
import { Search, ArrowLeft, MapPin, Clock, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  userLocation: string;
}

export function SearchOverlay({ isOpen, onClose, userLocation }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Destinations', 'Restaurants', 'Tours', 'Events', 'Museums', 'Hotels'
  ];

  const inspirationItems = [
    {
      id: 1,
      title: 'Riga Art Nouveau',
      subtitle: 'Architecture tour',
      image: 'riga art nouveau architecture',
      category: 'Cultural',
      distance: '2.3 km'
    },
    {
      id: 2,
      title: 'Latvian National Opera',
      subtitle: 'Tonight\'s performance',
      image: 'latvian opera house riga',
      category: 'Events',
      distance: '1.8 km'
    },
    {
      id: 3,
      title: 'Central Market',
      subtitle: 'Local food experience',
      image: 'riga central market food',
      category: 'Food',
      distance: '0.9 km'
    }
  ];

  const recentSearches = [
    'Sigulda Castle',
    'Latvian cuisine',
    'Beach activities'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 header-glass">
        <div className="flex items-center gap-4 p-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-2xl hover:scale-105 transition-transform duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1 bg-primary/10 rounded-xl">
              <Search className="w-4 h-4 text-primary" />
            </div>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations, restaurants, tours..."
              className="pl-14 glass-morphism border-0 rounded-3xl h-14 text-base"
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Categories */}
        <div className="mb-10">
          <h3 className="text-xl font-medium mb-6 tracking-tight">Categories</h3>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="h-16 liquid-card border-0 rounded-3xl hover:scale-[1.02] transition-all duration-300 justify-start text-base font-medium"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-medium mb-6 flex items-center gap-3 tracking-tight">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              Recent Searches
            </h3>
            <div className="space-y-3">
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-foreground h-auto py-4 px-6 rounded-2xl hover:bg-accent/50 transition-all duration-200"
                >
                  <div className="p-2 bg-muted rounded-xl mr-4">
                    <Search className="w-4 h-4" />
                  </div>
                  <span className="text-base">{search}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Find Some Inspiration */}
        <div className="mb-10">
          <h3 className="text-xl font-medium mb-6 flex items-center gap-3 tracking-tight">
            <div className="p-2 bg-primary/10 rounded-xl">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            Find Some Inspiration
          </h3>
          <div className="space-y-4">
            {inspirationItems.map((item) => (
              <div 
                key={item.id}
                className="liquid-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center p-4">
                  <div className="relative w-24 h-24 bg-muted flex-shrink-0 rounded-2xl overflow-hidden">
                    <ImageWithFallback 
                      src={`https://source.unsplash.com/400x400/?${encodeURIComponent(item.image)}`}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 px-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-lg mb-2 tracking-tight">{item.title}</h4>
                        <p className="text-muted-foreground mb-3">{item.subtitle}</p>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-0 rounded-xl">
                            {item.category}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{item.distance}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}