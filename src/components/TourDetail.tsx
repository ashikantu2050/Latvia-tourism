import React, { useState } from 'react';
import { ArrowLeft, MapPin, Star, Clock, Users, Calendar, Heart, Share2, Phone, CheckCircle, XCircle, Languages, Award, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TourDetailProps {
  tour: any;
  onBack: () => void;
}

export function TourDetail({ tour, onBack }: TourDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2024-02-15',
      comment: 'Absolutely fantastic tour! Our guide was incredibly knowledgeable and passionate about Riga\'s history.',
      helpful: 12,
      avatar: 'woman tourist happy'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 5,
      date: '2024-02-10',
      comment: 'Perfect introduction to the city. The pace was just right and we saw all the highlights.',
      helpful: 8,
      avatar: 'man tourist satisfied'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      rating: 4,
      date: '2024-02-05',
      comment: 'Great tour with beautiful architecture. Would have loved a bit more time at each stop.',
      helpful: 5,
      avatar: 'woman traveler content'
    }
  ];

  const upcomingDates = [
    { date: '2024-03-15', time: '10:00 AM', spots: 8 },
    { date: '2024-03-16', time: '10:00 AM', spots: 3 },
    { date: '2024-03-17', time: '10:00 AM', spots: 12 },
    { date: '2024-03-18', time: '10:00 AM', spots: 0 },
    { date: '2024-03-19', time: '10:00 AM', spots: 7 }
  ];

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
        {/* Hero Image */}
        <div className="relative h-80 bg-muted overflow-hidden">
          <ImageWithFallback 
            src={`https://source.unsplash.com/800x600/?${encodeURIComponent(tour.image)}`}
            alt={tour.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center justify-between">
              <Badge className="glass-morphism text-white border-white/20 backdrop-blur-md">
                {tour.category}
              </Badge>
              {tour.originalPrice > tour.price && (
                <Badge className="bg-green-500 text-white border-0 rounded-xl">
                  Save €{tour.originalPrice - tour.price}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          {/* Title and Basic Info */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-medium pr-4 tracking-tight">{tour.name}</h1>
              <div className="text-right">
                {tour.originalPrice > tour.price && (
                  <span className="text-lg text-muted-foreground line-through mr-2">€{tour.originalPrice}</span>
                )}
                <span className="text-3xl font-medium text-primary">€{tour.price}</span>
                <p className="text-sm text-muted-foreground">per person</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-2xl w-fit mb-6">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-medium">{tour.rating}</span>
              <span className="text-muted-foreground">({tour.reviewCount} reviews)</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">{tour.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Group Size</p>
                  <p className="text-sm text-muted-foreground">{tour.groupSize}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Meeting Point</p>
                  <p className="text-sm text-muted-foreground">{tour.meetingPoint}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Languages className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Languages</p>
                  <p className="text-sm text-muted-foreground">{tour.languages.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-700 border-0 rounded-xl px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                {tour.difficulty}
              </Badge>
              <Badge className="bg-green-100 text-green-700 border-0 rounded-xl px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                {tour.cancellation.split(' ').slice(0, 3).join(' ')}
              </Badge>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="overview" className="mb-10">
            <TabsList className="liquid-card border-0 rounded-3xl p-2 w-full">
              <TabsTrigger value="overview" className="rounded-2xl">Overview</TabsTrigger>
              <TabsTrigger value="included" className="rounded-2xl">What's Included</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-2xl">Reviews</TabsTrigger>
              <TabsTrigger value="booking" className="rounded-2xl">Booking</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="liquid-card rounded-3xl p-6">
                <h3 className="text-xl font-medium mb-4 tracking-tight">Tour Highlights</h3>
                <div className="space-y-3 mb-6">
                  {tour.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Tour Operator</p>
                      <p className="text-muted-foreground">{tour.operator}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Availability</p>
                      <p className="text-muted-foreground">{tour.availability}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="included">
              <div className="liquid-card rounded-3xl p-6">
                <h3 className="text-xl font-medium mb-4 tracking-tight">What's Included</h3>
                <div className="space-y-3 mb-6">
                  {tour.includes.map((item: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <h4 className="font-medium mb-3">Not Included</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span>Personal expenses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span>Gratuities (optional)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span>Hotel pickup and drop-off</span>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <h4 className="font-medium mb-2 text-blue-800">Cancellation Policy</h4>
                  <p className="text-sm text-blue-700">{tour.cancellation}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="liquid-card rounded-3xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-muted rounded-2xl overflow-hidden flex-shrink-0">
                        <ImageWithFallback 
                          src={`https://source.unsplash.com/100x100/?${encodeURIComponent(review.avatar)}`}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3">{review.comment}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{new Date(review.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{review.helpful} found this helpful</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="booking">
              <div className="liquid-card rounded-3xl p-6">
                <h3 className="text-xl font-medium mb-6 tracking-tight">Available Dates</h3>
                <div className="space-y-3">
                  {upcomingDates.map((slot, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                        slot.spots === 0 
                          ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-50' 
                          : selectedDate === slot.date
                          ? 'bg-primary/10 border-primary'
                          : 'bg-background border-muted hover:bg-accent/50'
                      }`}
                      onClick={() => slot.spots > 0 && setSelectedDate(slot.date)}
                    >
                      <div>
                        <p className="font-medium">{new Date(slot.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                        <p className="text-sm text-muted-foreground">{slot.time}</p>
                      </div>
                      <div className="text-right">
                        {slot.spots === 0 ? (
                          <Badge variant="secondary" className="bg-red-100 text-red-700 border-0">
                            Sold Out
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
                            {slot.spots} spots left
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedDate && (
                  <div className="mt-6 p-4 bg-primary/5 rounded-2xl">
                    <h4 className="font-medium mb-2">Booking Summary</h4>
                    <div className="flex justify-between items-center">
                      <span>Selected Date: {new Date(selectedDate).toLocaleDateString()}</span>
                      <span className="font-medium">€{tour.price}</span>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Floating Bottom Booking Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 pointer-events-none">
        <div className="floating-nav rounded-3xl mx-auto max-w-sm pointer-events-auto">
          <div className="p-4">
            <Button 
              className="w-full h-14 rounded-2xl text-base font-medium hover:scale-[1.02] transition-transform duration-200"
              disabled={!selectedDate}
            >
              {selectedDate ? 'Book Now' : 'Select Date to Book'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}