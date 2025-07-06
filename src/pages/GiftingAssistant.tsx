
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Heart, Users, Baby, GraduationCap, Briefcase, Star, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const GiftingAssistant = () => {
  const { t } = useLanguage();
  const [selectedBudget, setSelectedBudget] = useState('100');
  const [selectedRecipient, setSelectedRecipient] = useState('friend');

  const budgetRanges = [
    { value: '100', label: 'Under ₹100', color: 'bg-green-100 text-green-800' },
    { value: '250', label: 'Under ₹250', color: 'bg-blue-100 text-blue-800' },
    { value: '500', label: 'Under ₹500', color: 'bg-purple-100 text-purple-800' }
  ];

  const recipients = [
    { value: 'friend', label: 'Friend', icon: Users },
    { value: 'family', label: 'Family Member', icon: Heart },
    { value: 'colleague', label: 'Colleague', icon: Briefcase },
    { value: 'child', label: 'Child', icon: Baby },
    { value: 'student', label: 'Student', icon: GraduationCap },
    { value: 'elder', label: 'Elder', icon: Star }
  ];

  const giftSuggestions = {
    '100': {
      friend: [
        { name: 'Personalized Keychain', price: '₹50-80', description: 'Custom engraved with name or photo', category: 'Personalized' },
        { name: 'Scented Candles', price: '₹60-90', description: 'Relaxing aromatherapy candles', category: 'Wellness' },
        { name: 'Small Succulent Plant', price: '₹40-70', description: 'Low-maintenance desk plant', category: 'Plants' },
        { name: 'Handmade Bookmark', price: '₹30-60', description: 'Beautiful bookmarks for book lovers', category: 'Handmade' },
        { name: 'Tea/Coffee Sampler', price: '₹70-95', description: 'Variety pack of flavored teas', category: 'Food & Drink' }
      ],
      family: [
        { name: 'Photo Frame', price: '₹60-90', description: 'Elegant frame for family photos', category: 'Home Decor' },
        { name: 'Homemade Sweets Box', price: '₹50-80', description: 'Traditional homemade sweets', category: 'Food & Drink' },
        { name: 'Prayer Items Set', price: '₹40-85', description: 'Small puja items or religious books', category: 'Spiritual' },
        { name: 'Kitchen Spice Rack', price: '₹70-95', description: 'Small organizer for spices', category: 'Kitchen' },
        { name: 'Handwritten Letter', price: '₹20-40', description: 'Heartfelt personal message', category: 'Personal' }
      ],
      colleague: [
        { name: 'Desk Organizer', price: '₹60-90', description: 'Small desk accessories holder', category: 'Office' },
        { name: 'Motivational Book', price: '₹80-100', description: 'Inspiring self-help book', category: 'Books' },
        { name: 'Coffee Mug', price: '₹50-80', description: 'Stylish ceramic mug', category: 'Drinkware' },
        { name: 'Pen Set', price: '₹40-70', description: 'Quality writing pens', category: 'Stationery' },
        { name: 'Desktop Calendar', price: '₹30-60', description: 'Motivational desk calendar', category: 'Office' }
      ],
      child: [
        { name: 'Coloring Books & Crayons', price: '₹40-70', description: 'Creative art supplies', category: 'Arts & Crafts' },
        { name: 'Small Puzzle Game', price: '₹60-90', description: 'Age-appropriate puzzle', category: 'Educational' },
        { name: 'Storybook', price: '₹50-80', description: 'Illustrated children\'s book', category: 'Books' },
        { name: 'Toy Car/Doll', price: '₹70-95', description: 'Small toy for playtime', category: 'Toys' },
        { name: 'Stickers Set', price: '₹30-60', description: 'Fun decorative stickers', category: 'Arts & Crafts' }
      ],
      student: [
        { name: 'Notebook Set', price: '₹40-70', description: 'Quality notebooks for studies', category: 'Stationery' },
        { name: 'Study Planner', price: '₹60-90', description: 'Academic planning diary', category: 'Organization' },
        { name: 'Highlighter Set', price: '₹50-80', description: 'Colorful study highlighters', category: 'Stationery' },
        { name: 'Motivational Poster', price: '₹30-60', description: 'Inspiring study room decor', category: 'Decor' },
        { name: 'Energy Snacks Box', price: '₹70-95', description: 'Healthy study snacks', category: 'Food & Drink' }
      ],
      elder: [
        { name: 'Herbal Tea Set', price: '₹60-90', description: 'Soothing herbal teas', category: 'Wellness' },
        { name: 'Reading Glasses Case', price: '₹40-70', description: 'Protective case for glasses', category: 'Accessories' },
        { name: 'Small Prayer Book', price: '₹30-60', description: 'Spiritual reading material', category: 'Spiritual' },
        { name: 'Comfortable Slippers', price: '₹70-95', description: 'Soft indoor footwear', category: 'Comfort' },
        { name: 'Photo Album', price: '₹50-80', description: 'Memory keeping album', category: 'Personal' }
      ]
    },
    '250': {
      friend: [
        { name: 'Bluetooth Speaker', price: '₹150-220', description: 'Portable music speaker', category: 'Electronics' },
        { name: 'Skincare Gift Set', price: '₹180-240', description: 'Natural skincare products', category: 'Beauty' },
        { name: 'Decorative Lamp', price: '₹120-200', description: 'Ambient lighting for room', category: 'Home Decor' },
        { name: 'Board Game', price: '₹160-230', description: 'Fun group activity game', category: 'Games' },
        { name: 'Artisan Chocolate Box', price: '₹140-210', description: 'Premium chocolate assortment', category: 'Food & Drink' }
      ],
      family: [
        { name: 'Traditional Brass Item', price: '₹180-240', description: 'Decorative brass showpiece', category: 'Traditional' },
        { name: 'Silk Scarf/Stole', price: '₹150-220', description: 'Elegant silk accessory', category: 'Fashion' },
        { name: 'Pressure Cooker Whistle Set', price: '₹120-180', description: 'Useful kitchen accessory', category: 'Kitchen' },
        { name: 'Family Board Game', price: '₹160-230', description: 'Fun for family gatherings', category: 'Games' },
        { name: 'Organic Food Hamper', price: '₹200-250', description: 'Healthy organic products', category: 'Food & Drink' }
      ],
      colleague: [
        { name: 'Professional Planner', price: '₹120-180', description: 'Executive planning diary', category: 'Office' },
        { name: 'Desk Plant with Pot', price: '₹100-160', description: 'Office-friendly plant', category: 'Plants' },
        { name: 'Insulated Water Bottle', price: '₹150-220', description: 'Temperature-maintaining bottle', category: 'Drinkware' },
        { name: 'Business Card Holder', price: '₹80-140', description: 'Professional card organizer', category: 'Office' },
        { name: 'Gourmet Coffee Beans', price: '₹180-240', description: 'Premium coffee selection', category: 'Food & Drink' }
      ],
      child: [
        { name: 'Educational Board Game', price: '₹160-230', description: 'Learning through play', category: 'Educational' },
        { name: 'Art Supply Kit', price: '₹180-240', description: 'Complete drawing set', category: 'Arts & Crafts' },
        { name: 'Building Blocks Set', price: '₹140-200', description: 'Creative construction toy', category: 'Toys' },
        { name: 'Children\'s Books Set', price: '₹120-180', description: 'Collection of storybooks', category: 'Books' },
        { name: 'Musical Instrument Toy', price: '₹150-220', description: 'Mini keyboard or guitar', category: 'Music' }
      ],
      student: [
        { name: 'Study Lamp', price: '₹150-220', description: 'Adjustable reading light', category: 'Study' },
        { name: 'Backpack/Study Bag', price: '₹180-240', description: 'Durable school bag', category: 'Accessories' },
        { name: 'Scientific Calculator', price: '₹120-180', description: 'Advanced calculation tool', category: 'Study' },
        { name: 'Reference Book Set', price: '₹160-230', description: 'Subject-specific guides', category: 'Books' },
        { name: 'Ergonomic Study Chair Cushion', price: '₹100-160', description: 'Comfort for long study hours', category: 'Comfort' }
      ],
      elder: [
        { name: 'Comfortable Cushion', price: '₹120-180', description: 'Back support cushion', category: 'Comfort' },
        { name: 'Traditional Music Collection', price: '₹100-160', description: 'Classical music CDs', category: 'Music' },
        { name: 'Health Monitoring Kit', price: '₹180-240', description: 'Basic health check tools', category: 'Health' },
        { name: 'Warm Shawl/Blanket', price: '₹150-220', description: 'Cozy winter accessory', category: 'Comfort' },
        { name: 'Spiritual Books Set', price: '₹80-140', description: 'Religious texts collection', category: 'Spiritual' }
      ]
    },
    '500': {
      friend: [
        { name: 'Wireless Earbuds', price: '₹300-450', description: 'High-quality audio experience', category: 'Electronics' },
        { name: 'Premium Skincare Set', price: '₹350-480', description: 'Luxury beauty products', category: 'Beauty' },
        { name: 'Designer Wall Art', price: '₹250-400', description: 'Stylish room decoration', category: 'Home Decor' },
        { name: 'Gourmet Food Hamper', price: '₹400-500', description: 'Premium food collection', category: 'Food & Drink' },
        { name: 'Fitness Tracker', price: '₹350-480', description: 'Basic health monitoring device', category: 'Health' }
      ],
      family: [
        { name: 'Traditional Jewelry', price: '₹300-450', description: 'Ethnic ornamental piece', category: 'Jewelry' },
        { name: 'Kitchen Appliance', price: '₹350-480', description: 'Useful cooking gadget', category: 'Kitchen' },
        { name: 'Home Decor Set', price: '₹250-400', description: 'Coordinated decorative items', category: 'Home Decor' },
        { name: 'Premium Fabric Material', price: '₹300-450', description: 'Quality cloth for tailoring', category: 'Fashion' },
        { name: 'Religious Idol/Frame', price: '₹200-350', description: 'Spiritual decorative piece', category: 'Spiritual' }
      ],
      colleague: [
        { name: 'Professional Briefcase', price: '₹350-480', description: 'Executive office bag', category: 'Office' },
        { name: 'Desk Accessories Set', price: '₹250-400', description: 'Complete desk organization', category: 'Office' },
        { name: 'Premium Pen Set', price: '₹200-350', description: 'High-quality writing instruments', category: 'Stationery' },
        { name: 'Power Bank', price: '₹300-450', description: 'Portable device charging', category: 'Electronics' },
        { name: 'Coffee Machine', price: '₹400-500', description: 'Personal coffee maker', category: 'Appliances' }
      ],
      child: [
        { name: 'Educational Tablet', price: '₹400-500', description: 'Learning-focused device', category: 'Electronics' },
        { name: 'Professional Art Set', price: '₹300-450', description: 'Complete drawing kit', category: 'Arts & Crafts' },
        { name: 'Science Experiment Kit', price: '₹250-400', description: 'Hands-on learning set', category: 'Educational' },
        { name: 'Sports Equipment', price: '₹350-480', description: 'Cricket bat, football, etc.', category: 'Sports' },
        { name: 'Musical Instrument', price: '₹300-450', description: 'Recorder, harmonica, etc.', category: 'Music' }
      ],
      student: [
        { name: 'Study Table Organizer', price: '₹250-400', description: 'Complete study setup', category: 'Study' },
        { name: 'Online Course Subscription', price: '₹300-450', description: 'Skill development courses', category: 'Education' },
        { name: 'Professional Books Set', price: '₹350-480', description: 'Career-oriented reading', category: 'Books' },
        { name: 'Laptop Accessories Kit', price: '₹300-450', description: 'Mouse, pad, stand set', category: 'Electronics' },
        { name: 'Professional Clothing', price: '₹400-500', description: 'Interview/workplace attire', category: 'Fashion' }
      ],
      elder: [
        { name: 'Massage Chair Pad', price: '₹350-480', description: 'Relaxation and comfort', category: 'Health' },
        { name: 'Premium Tea Set', price: '₹250-400', description: 'Complete tea serving set', category: 'Food & Drink' },
        { name: 'Health Monitor Device', price: '₹300-450', description: 'BP monitor, thermometer', category: 'Health' },
        { name: 'Comfortable Footwear', price: '₹200-350', description: 'Orthopedic-friendly shoes', category: 'Comfort' },
        { name: 'Spiritual Gift Set', price: '₹150-300', description: 'Prayer items collection', category: 'Spiritual' }
      ]
    }
  };

  const currentGifts = giftSuggestions[selectedBudget as keyof typeof giftSuggestions][selectedRecipient as keyof typeof giftSuggestions['100']] || [];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Electronics': 'bg-blue-100 text-blue-800',
      'Beauty': 'bg-pink-100 text-pink-800',
      'Home Decor': 'bg-yellow-100 text-yellow-800',
      'Food & Drink': 'bg-orange-100 text-orange-800',
      'Books': 'bg-purple-100 text-purple-800',
      'Fashion': 'bg-red-100 text-red-800',
      'Health': 'bg-green-100 text-green-800',
      'Office': 'bg-gray-100 text-gray-800',
      'Toys': 'bg-indigo-100 text-indigo-800',
      'Arts & Crafts': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Affordable Gifting Assistant</h1>
        <p className="text-gray-600">Find perfect gifts within your budget for every occasion</p>
      </div>

      {/* Budget Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Your Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetRanges.map(budget => (
              <Card 
                key={budget.value}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedBudget === budget.value ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedBudget(budget.value)}
              >
                <CardContent className="p-6 text-center">
                  <Badge className={budget.color}>{budget.label}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recipient Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Who are you gifting to?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recipients.map(recipient => (
              <Card 
                key={recipient.value}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedRecipient === recipient.value ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedRecipient(recipient.value)}
              >
                <CardContent className="p-4 text-center">
                  <recipient.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">{recipient.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gift Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            Gift Ideas for {recipients.find(r => r.value === selectedRecipient)?.label} 
            <Badge className={budgetRanges.find(b => b.value === selectedBudget)?.color}>
              {budgetRanges.find(b => b.value === selectedBudget)?.label}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentGifts.map((gift, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{gift.name}</h3>
                    <Badge className={getCategoryColor(gift.category)}>
                      {gift.category}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3 text-sm">{gift.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-primary">{gift.price}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Find Stores
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gifting Tips */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>💡 Smart Gifting Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Budget-Friendly Ideas</h3>
              <ul className="space-y-2 text-sm">
                <li>• Personalized gifts often mean more than expensive ones</li>
                <li>• Consider experiences like movie tickets or restaurant vouchers</li>
                <li>• Handmade gifts show thoughtfulness and care</li>
                <li>• Group gifts can help you afford something special</li>
                <li>• Shop during sales and festivals for better deals</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-3">Shopping Smart</h3>
              <ul className="space-y-2 text-sm">
                <li>• Compare prices across different stores</li>
                <li>• Look for combo offers and bulk discounts</li>
                <li>• Check online reviews before purchasing</li>
                <li>• Consider local artisans for unique gifts</li>
                <li>• Keep gift receipts for exchanges if needed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GiftingAssistant;
