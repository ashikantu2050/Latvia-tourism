import React, { useState } from 'react';
import { ArrowLeft, MapPin, Star, Clock, Play, Pause, Navigation, Share2, Heart, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DestinationDetailProps {
  destination: any;
  onBack: () => void;
}

export function DestinationDetail({ destination, onBack }: DestinationDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const recommendedTours = [
    {
      id: 1,
      name: 'Historic Walking Tour',
      duration: '2 hours',
      price: '€25',
      rating: 4.7,
      image: 'historic walking tour riga',
      includes: destination.name
    },
    {
      id: 2,
      name: 'Photography Experience',
      duration: '3 hours',
      price: '€45',
      rating: 4.9,
      image: 'photography tour latvia',
      includes: destination.name
    },
    {
      id: 3,
      name: 'Cultural Heritage Tour',
      duration: '4 hours',
      price: '€35',
      rating: 4.6,
      image: 'cultural heritage tour',
      includes: destination.name
    }
  ];

  const openInMaps = () => {
    const { lat, lng } = destination.coordinates;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isIOS) {
      window.open(`maps://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`);
    } else if (isAndroid) {
      window.open(`geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(destination.name)})`);
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-40 header-glass">
        <div className="flex items-center justify-between p-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="rounded-2xl hover:scale-105 transition-transform duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsLiked(!isLiked)}
              className="rounded-2xl hover:scale-105 transition-transform duration-200"
            >
              <Heart className={`w-5 h-5 transition-colors duration-200 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-2xl hover:scale-105 transition-transform duration-200">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="pb-32">
        {/* Hero Image with Glass Overlay */}
        <div className="relative h-80 bg-muted overflow-hidden">
          <ImageWithFallback 
            src={`https://source.unsplash.com/800x600/?${encodeURIComponent(destination.image)}`}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 right-6">
            <Badge className="glass-morphism text-white border-white/20 backdrop-blur-md">
              {destination.category}
            </Badge>
          </div>
        </div>

        <div className="px-6 py-8">
          {/* Title and Basic Info */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-medium pr-4 tracking-tight">{destination.name}</h1>
              <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-2xl">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-medium">{destination.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-primary/10 rounded-lg">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span>{destination.location} • {destination.distance} km away</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 bg-primary/10 rounded-lg">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <span>{destination.openingHours}</span>
              </div>
            </div>

            <Badge 
              variant={destination.price === 'Free' ? 'secondary' : 'default'}
              className={`text-base px-6 py-2 rounded-2xl border-0 ${
                destination.price === 'Free' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {destination.price} Entry
            </Badge>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h2 className="text-2xl font-medium mb-4 tracking-tight">About</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {destination.description}
            </p>
          </div>

          {/* Audio Guide */}
          <div className="mb-10">
            <h2 className="text-2xl font-medium mb-4 tracking-tight">Audio Guide</h2>
            <div className="liquid-card rounded-3xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-6">
                  <Button 
                    size="icon" 
                    className="rounded-2xl w-16 h-16 hover:scale-105 transition-transform duration-200"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg mb-2 tracking-tight">Discover {destination.name}</h3>
                    <p className="text-muted-foreground">
                      Learn about the history and significance
                    </p>
                  </div>
                  <span className="text-muted-foreground text-lg font-medium">3:42</span>
                </div>
                
                {/* Audio Progress Bar */}
                <div className="mt-6 bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-1/3 transition-all duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-10">
            <h2 className="text-2xl font-medium mb-4 tracking-tight">Location</h2>
            <div className="liquid-card rounded-3xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2 tracking-tight">{destination.name}</h3>
                    <p className="text-muted-foreground">{destination.location}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={openInMaps}
                    className="rounded-2xl border-0 liquid-card hover:scale-105 transition-transform duration-200 px-6 py-3"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                </div>
                
                {/* Mini Map Placeholder */}
                <div className="bg-muted rounded-2xl h-40 flex items-center justify-center">
                  <div className="text-center">
                    <div className="p-4 bg-primary/10 rounded-2xl mx-auto mb-4 w-fit">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground font-medium">Interactive Map</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          {destination.price === 'Paid' && (
            <div className="mb-10">
              <h2 className="text-2xl font-medium mb-4 tracking-tight">Contact</h2>
              <div className="liquid-card rounded-3xl overflow-hidden">
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-xl">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-lg">+371 67 123 456</span>
                    </div>
                    <Separator />
                    <p className="text-muted-foreground">
                      Advance booking recommended during peak season
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recommended Tours */}
          <div className="mb-10">
            <h2 className="text-2xl font-medium mb-6 tracking-tight">Recommended Tours</h2>
            <div className="space-y-4">
              {recommendedTours.map((tour) => (
                <div 
                  key={tour.id}
                  className="liquid-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex p-4">
                    <div className="relative w-24 h-24 bg-muted flex-shrink-0 rounded-2xl overflow-hidden">
                      <ImageWithFallback 
                        src={`https://source.unsplash.com/400x400/?${encodeURIComponent(tour.image)}`}
                        alt={tour.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="flex-1 px-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-lg mb-2 tracking-tight">{tour.name}</h3>
                          <div className="flex items-center gap-4 text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{tour.duration}</span>
                            </div>
                            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                            <span className="font-medium">{tour.price}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-xl w-fit">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{tour.rating}</span>
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

      {/* Floating Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 pointer-events-none">
        <div className="floating-nav rounded-3xl mx-auto max-w-sm pointer-events-auto">
          <div className="p-4">
            <Button className="w-full h-14 rounded-2xl text-base font-medium hover:scale-[1.02] transition-transform duration-200" onClick={openInMaps}>
              <Navigation className="w-5 h-5 mr-3" />
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}