
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Gift, Utensils, ShirtIcon, Home, Users, PiggyBank, Calendar, Star } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const FestivalPlanner = () => {
  const { t } = useLanguage();
  const [selectedFestival, setSelectedFestival] = useState('diwali');
  const [budget, setBudget] = useState('');
  const [customBudget, setCustomBudget] = useState<{ [key: string]: string }>({});

  const festivals = {
    diwali: {
      name: 'Diwali',
      icon: Sparkles,
      color: 'text-yellow-500',
      categories: [
        { name: 'Decorations & Lights', percentage: 25, icon: Home, tips: ['Buy LED lights for energy efficiency', 'Make DIY rangoli instead of expensive materials', 'Reuse last year\'s decorations'] },
        { name: 'Gifts & Sweets', percentage: 35, icon: Gift, tips: ['Set a per-person gift limit', 'Make homemade sweets', 'Consider group gifts for expensive items'] },
        { name: 'Clothing', percentage: 20, icon: ShirtIcon, tips: ['Shop during pre-festival sales', 'Consider ethnic wear rentals', 'Mix new pieces with existing wardrobe'] },
        { name: 'Food & Feast', percentage: 15, icon: Utensils, tips: ['Plan potluck-style celebrations', 'Buy ingredients in bulk', 'Focus on 2-3 special dishes'] },
        { name: 'Miscellaneous', percentage: 5, icon: Star, tips: ['Keep emergency fund for unexpected expenses', 'Account for transportation costs'] }
      ]
    },
    holi: {
      name: 'Holi',
      icon: Sparkles,
      color: 'text-pink-500',
      categories: [
        { name: 'Colors & Supplies', percentage: 40, icon: Sparkles, tips: ['Buy natural/organic colors', 'Make colors at home using turmeric, beetroot', 'Buy in bulk with friends'] },
        { name: 'Food & Drinks', percentage: 25, icon: Utensils, tips: ['Prepare traditional gujiya at home', 'Make thandai in large batches', 'Plan simple snacks'] },
        { name: 'Clothing', percentage: 15, icon: ShirtIcon, tips: ['Wear old white clothes', 'Buy inexpensive white kurtas', 'Don\'t spend on expensive clothes'] },
        { name: 'Gifts & Treats', percentage: 15, icon: Gift, tips: ['Give homemade sweets', 'Small token gifts only', 'Focus on experiences over material gifts'] },
        { name: 'Miscellaneous', percentage: 5, icon: Star, tips: ['Include cleaning supplies budget', 'Account for potential clothing damage'] }
      ]
    },
    onam: {
      name: 'Onam',
      icon: Sparkles,
      color: 'text-green-500',
      categories: [
        { name: 'Flowers & Pookalam', percentage: 20, icon: Sparkles, tips: ['Buy flowers early morning for better prices', 'Grow flowers in your garden', 'Share flower costs with neighbors'] },
        { name: 'Onam Sadhya', percentage: 40, icon: Utensils, tips: ['Cook at home instead of ordering', 'Share preparation with family members', 'Buy vegetables from local markets'] },
        { name: 'New Clothes', percentage: 25, icon: ShirtIcon, tips: ['Buy during Onam sales', 'Consider handloom options', 'One new outfit per person rule'] },
        { name: 'Gifts & Bonuses', percentage: 10, icon: Gift, tips: ['Set gift limits for children', 'Focus on traditional items', 'Handmade gifts are appreciated'] },
        { name: 'Decorations', percentage: 5, icon: Home, tips: ['Use natural decorations', 'Reuse items from previous years', 'DIY traditional lamps'] }
      ]
    }
  };

  const budgetSuggestions = [
    { range: '₹2,000 - ₹5,000', level: 'Basic', description: 'Simple celebration with family' },
    { range: '₹5,000 - ₹10,000', level: 'Moderate', description: 'Traditional celebration with some extras' },
    { range: '₹10,000 - ₹20,000', level: 'Elaborate', description: 'Grand celebration with all traditions' },
    { range: '₹20,000+', level: 'Premium', description: 'Luxurious celebration with premium items' }
  ];

  const festival = festivals[selectedFestival as keyof typeof festivals];
  const totalBudget = budget ? parseInt(budget) : 0;

  const calculateCategoryBudget = (percentage: number) => {
    return Math.round((totalBudget * percentage) / 100);
  };

  const SavingTips = ({ tips }: { tips: string[] }) => (
    <div className="space-y-2">
      <h4 className="font-medium text-sm text-gray-700">💡 Saving Tips:</h4>
      <ul className="space-y-1">
        {tips.map((tip, index) => (
          <li key={index} className="text-sm text-gray-600 flex items-start">
            <span className="text-green-500 mr-2">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Festival Spending Planner</h1>
        <p className="text-gray-600">Plan your festival budget and get money-saving tips</p>
      </div>

      {/* Festival Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Festival</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(festivals).map(([key, fest]) => (
            <Card 
              key={key} 
              className={`cursor-pointer transition-all duration-200 ${
                selectedFestival === key ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedFestival(key)}
            >
              <CardContent className="p-6 text-center">
                <fest.icon className={`h-12 w-12 mx-auto mb-3 ${fest.color}`} />
                <h3 className="font-semibold">{fest.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Budget Input */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Set Your Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Total Festival Budget (₹)</label>
              <Input
                type="number"
                placeholder="Enter your budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="max-w-xs"
              />
            </div>
            
            {/* Budget Suggestions */}
            <div>
              <h3 className="font-medium mb-3">Budget Suggestions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {budgetSuggestions.map((suggestion, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <Badge variant="outline" className="mb-2">{suggestion.level}</Badge>
                        <p className="font-semibold text-sm">{suggestion.range}</p>
                        <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Breakdown */}
      {totalBudget > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <festival.icon className={`h-6 w-6 ${festival.color}`} />
              {festival.name} Budget Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {festival.categories.map((category, index) => {
                const categoryBudget = calculateCategoryBudget(category.percentage);
                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <category.icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{categoryBudget.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{category.percentage}% of budget</p>
                      </div>
                    </div>
                    
                    <Progress value={category.percentage} className="mb-4" />
                    
                    <SavingTips tips={category.tips} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Savings Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-6 w-6 text-green-600" />
            Festival Savings Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Start Saving Now</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm">If you save ₹500/month:</span>
                  <span className="font-semibold text-green-600">₹6,000/year</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm">If you save ₹1,000/month:</span>
                  <span className="font-semibold text-blue-600">₹12,000/year</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm">If you save ₹1,500/month:</span>
                  <span className="font-semibold text-purple-600">₹18,000/year</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Money-Saving Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Start shopping 2-3 months before festivals for better deals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Compare prices online and offline before buying</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Buy in bulk with friends and family to get discounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Focus on experiences and traditions over expensive items</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Set spending limits and stick to them</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FestivalPlanner;
