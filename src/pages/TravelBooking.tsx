import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plane, Train, Bus, Star, Clock, IndianRupee } from 'lucide-react';

const TravelBooking = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const trainResults = [
    { name: 'Rajdhani Express', time: '06:00 - 14:30', price: 1850, rating: 4.5 },
    { name: 'Duronto Express', time: '22:15 - 06:45', price: 1650, rating: 4.2 },
    { name: 'Shatabdi Express', time: '14:30 - 20:15', price: 980, rating: 4.7 }
  ];

  const busResults = [
    { name: 'Volvo A/C Sleeper', time: '21:00 - 08:30', price: 850, rating: 4.3 },
    { name: 'RedBus Premium', time: '20:30 - 07:00', price: 750, rating: 4.1 },
    { name: 'Government Bus', time: '19:00 - 06:30', price: 450, rating: 3.8 }
  ];

  const flightResults = [
    { name: 'IndiGo', time: '08:30 - 10:45', price: 4850, rating: 4.4 },
    { name: 'SpiceJet', time: '16:20 - 18:35', price: 3950, rating: 4.1 },
    { name: 'Air India Express', time: '06:15 - 08:30', price: 3650, rating: 4.0 }
  ];

  const offers = [
    { title: 'Student Discount', description: '25% off on AC train tickets', code: 'STUDENT25' },
    { title: 'Early Bird Offer', description: 'Book 30 days in advance for 15% off', code: 'EARLY15' },
    { title: 'Festival Special', description: 'Flat ₹500 off on flights', code: 'FESTIVE500' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-black mb-6">Travel Booking Assistant</h1>
      
      {/* Search Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-black">Plan Your Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="From (City/Station)"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="text-black"
            />
            <Input
              placeholder="To (City/Station)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="text-black"
            />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-black"
            />
            <Button className="gradient-primary text-white">
              Search Routes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Offers */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-black flex items-center gap-2">
            <Star className="h-5 w-5" />
            Seasonal Offers & Concessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offers.map((offer, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                <h3 className="font-semibold text-black mb-2">{offer.title}</h3>
                <p className="text-sm text-black mb-3">{offer.description}</p>
                <Badge variant="outline" className="text-black">
                  Code: {offer.code}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <Tabs defaultValue="train" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="train" className="flex items-center gap-2 text-black">
            <Train className="h-4 w-4" />
            Trains
          </TabsTrigger>
          <TabsTrigger value="bus" className="flex items-center gap-2 text-black">
            <Bus className="h-4 w-4" />
            Buses
          </TabsTrigger>
          <TabsTrigger value="flight" className="flex items-center gap-2 text-black">
            <Plane className="h-4 w-4" />
            Flights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="train">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Train Options (IRCTC)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainResults.map((train, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-black">{train.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-black">
                          <Clock className="h-4 w-4" />
                          {train.time}
                        </span>
                        <span className="flex items-center gap-1 text-black">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {train.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xl font-bold text-black">
                        <IndianRupee className="h-5 w-5" />
                        {train.price}
                      </div>
                      <Button className="mt-2 gradient-primary text-white" size="sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bus">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Bus Options (RedBus/Government)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {busResults.map((bus, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-black">{bus.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-black">
                          <Clock className="h-4 w-4" />
                          {bus.time}
                        </span>
                        <span className="flex items-center gap-1 text-black">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {bus.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xl font-bold text-black">
                        <IndianRupee className="h-5 w-5" />
                        {bus.price}
                      </div>
                      <Button className="mt-2 gradient-primary text-white" size="sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flight">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Flight Options (Low-cost Airlines)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flightResults.map((flight, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-black">{flight.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-black">
                          <Clock className="h-4 w-4" />
                          {flight.time}
                        </span>
                        <span className="flex items-center gap-1 text-black">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {flight.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xl font-bold text-black">
                        <IndianRupee className="h-5 w-5" />
                        {flight.price}
                      </div>
                      <Button className="mt-2 gradient-primary text-white" size="sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TravelBooking;
