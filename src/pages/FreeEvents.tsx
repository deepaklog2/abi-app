
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Clock, Users, Filter, Search } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const FreeEvents = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const events = [
    {
      id: 1,
      title: 'Free Yoga Session in Park',
      category: 'Health & Fitness',
      date: '2024-01-15',
      time: '07:00 AM',
      location: 'Central Park, Chennai',
      description: 'Join us for a refreshing morning yoga session. All levels welcome.',
      attendees: 25,
      cost: 'Free',
      organizer: 'Chennai Wellness Group'
    },
    {
      id: 2,
      title: 'Tamil Literature Reading',
      category: 'Culture & Arts',
      date: '2024-01-16',
      time: '06:00 PM',
      location: 'City Library, Coimbatore',
      description: 'Poetry reading session featuring local Tamil poets.',
      attendees: 40,
      cost: 'Free',
      organizer: 'Tamil Literary Society'
    },
    {
      id: 3,
      title: 'Community Cooking Workshop',
      category: 'Food & Cooking',
      date: '2024-01-17',
      time: '10:00 AM',
      location: 'Community Center, Madurai',
      description: 'Learn traditional South Indian recipes with local ingredients.',
      attendees: 30,
      cost: '₹50 (ingredient cost)',
      organizer: 'Madurai Food Lovers'
    },
    {
      id: 4,
      title: 'Photography Walk',
      category: 'Hobbies',
      date: '2024-01-18',
      time: '05:30 AM',
      location: 'Marina Beach, Chennai',
      description: 'Capture the sunrise and learn photography techniques.',
      attendees: 20,
      cost: 'Free',
      organizer: 'Chennai Photo Club'
    },
    {
      id: 5,
      title: 'Financial Literacy Workshop',
      category: 'Education',
      date: '2024-01-19',
      time: '02:00 PM',
      location: 'Online Event',
      description: 'Learn basic financial planning and budgeting strategies.',
      attendees: 100,
      cost: 'Free',
      organizer: 'Smart Money India'
    },
    {
      id: 6,
      title: 'Kids Art & Craft Session',
      category: 'Family & Kids',
      date: '2024-01-20',
      time: '04:00 PM',
      location: 'Children Park, Trichy',
      description: 'Creative art session for children aged 5-12 years.',
      attendees: 15,
      cost: '₹30 (material cost)',
      organizer: 'Little Artists Club'
    }
  ];

  const categories = ['all', 'Health & Fitness', 'Culture & Arts', 'Food & Cooking', 'Hobbies', 'Education', 'Family & Kids'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCostColor = (cost: string) => {
    if (cost === 'Free') return 'bg-green-100 text-green-800';
    if (cost.includes('₹')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Free Events & Activities</h1>
        <p className="text-gray-600">Discover free and low-cost community events near you</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search events, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-xs">
                  {event.category}
                </Badge>
                <Badge className={getCostColor(event.cost)}>
                  {event.cost}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 text-sm line-clamp-2">{event.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(event.date).toLocaleDateString('en-IN')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  {event.attendees} attendees
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Organized by:</p>
                <p className="text-sm font-medium">{event.organizer}</p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Join Event
                </Button>
                <Button variant="outline" size="sm">
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No events found matching your criteria.</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {events.filter(e => e.cost === 'Free').length}
            </div>
            <p className="text-gray-600">Completely Free Events</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {events.filter(e => e.cost.includes('₹')).length}
            </div>
            <p className="text-gray-600">Low-Cost Activities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {events.reduce((sum, e) => sum + e.attendees, 0)}
            </div>
            <p className="text-gray-600">Total Participants</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreeEvents;
