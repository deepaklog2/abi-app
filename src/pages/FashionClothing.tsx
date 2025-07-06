
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bell, ShirtIcon, Calendar, MapPin, Star, AlertCircle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ClothingItem {
  name: string;
  tailorPrice: number;
  readymadePrice: number;
  category: string;
}

interface SeasonalOutfit {
  season: string;
  items: string[];
  estimatedCost: number;
  description: string;
}

interface SaleAlert {
  store: string;
  discount: string;
  validUntil: string;
  category: string;
  location: string;
}

const FashionClothing = () => {
  const { toast } = useToast();
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [familyMembers, setFamilyMembers] = useState<number>(4);
  const [budget, setBudget] = useState<number>(5000);
  const [selectedClothingType, setSelectedClothingType] = useState<string>('');
  const [clothingSize, setClothingSize] = useState<string>('');

  // Sample data for clothing price comparison
  const clothingPrices: ClothingItem[] = [
    { name: 'Men\'s Shirt', tailorPrice: 800, readymadePrice: 1200, category: 'formal' },
    { name: 'Women\'s Kurti', tailorPrice: 600, readymadePrice: 900, category: 'casual' },
    { name: 'Men\'s Pants', tailorPrice: 1000, readymadePrice: 1500, category: 'formal' },
    { name: 'Women\'s Saree Blouse', tailorPrice: 500, readymadePrice: 800, category: 'traditional' },
    { name: 'Kids T-Shirt', tailorPrice: 300, readymadePrice: 500, category: 'kids' },
    { name: 'Men\'s Lungi', tailorPrice: 400, readymadePrice: 600, category: 'casual' },
    { name: 'Women\'s Salwar', tailorPrice: 700, readymadePrice: 1100, category: 'traditional' },
    { name: 'School Uniform', tailorPrice: 600, readymadePrice: 900, category: 'kids' }
  ];

  // Sample seasonal outfits for Chennai climate
  const seasonalOutfits: SeasonalOutfit[] = [
    {
      season: 'Summer (Mar-Jun)',
      items: ['Cotton T-shirts (3)', 'Light cotton pants (2)', 'Cotton shorts (2)', 'Sandals (1)', 'Sun hat (1)'],
      estimatedCost: 3500,
      description: 'Light, breathable cotton clothing perfect for Chennai\'s hot summer'
    },
    {
      season: 'Monsoon (Jul-Sep)',
      items: ['Quick-dry shirts (2)', 'Waterproof jacket (1)', 'Rain boots (1)', 'Umbrella (1)', 'Light sweater (1)'],
      estimatedCost: 4200,
      description: 'Water-resistant and quick-dry clothing for rainy season'
    },
    {
      season: 'Winter (Oct-Feb)',
      items: ['Long sleeve shirts (3)', 'Light jacket (1)', 'Jeans (2)', 'Closed shoes (1)', 'Warm shawl (1)'],
      estimatedCost: 4800,
      description: 'Comfortable clothing for Chennai\'s mild winter season'
    },
    {
      season: 'School Reopening (Jun)',
      items: ['School uniforms (3 sets)', 'White shoes (1)', 'School bags (1)', 'Socks (6 pairs)', 'Ties/Belts (2)'],
      estimatedCost: 3200,
      description: 'Complete school uniform and accessories package'
    }
  ];

  // Sample sale alerts
  const saleAlerts: SaleAlert[] = [
    {
      store: 'Big Bazaar T.Nagar',
      discount: '40% OFF',
      validUntil: '2025-07-15',
      category: 'Kids Wear',
      location: '2.3 km away'
    },
    {
      store: 'Lifestyle Phoenix Mall',
      discount: 'Buy 2 Get 1 Free',
      validUntil: '2025-07-20',
      category: 'Formal Wear',
      location: '5.1 km away'
    },
    {
      store: 'Saravana Stores',
      discount: '30% OFF',
      validUntil: '2025-07-12',
      category: 'Traditional Wear',
      location: '1.8 km away'
    },
    {
      store: 'Amazon Fashion',
      discount: 'Up to 50% OFF',
      validUntil: '2025-07-25',
      category: 'All Categories',
      location: 'Online'
    }
  ];

  const handleSeasonalBudget = () => {
    const selectedOutfit = seasonalOutfits.find(outfit => outfit.season === selectedSeason);
    if (!selectedOutfit) return;

    const totalCost = selectedOutfit.estimatedCost * familyMembers;
    const budgetStatus = totalCost <= budget ? 'within' : 'exceeds';
    
    toast({
      title: "Seasonal Budget Calculated",
      description: `Total cost for ${familyMembers} members: ₹${totalCost}. This ${budgetStatus} your budget of ₹${budget}.`,
    });
  };

  const getSelectedClothingData = () => {
    return clothingPrices.find(item => item.name === selectedClothingType);
  };

  const generatePDF = () => {
    toast({
      title: "PDF Generated",
      description: "Your seasonal clothing budget has been saved as PDF.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <ShirtIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Fashion & Clothing
          </h1>
          <p className="text-muted-foreground">Smart clothing budget planning and price comparison</p>
        </div>
      </div>

      <Tabs defaultValue="seasonal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="seasonal" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Seasonal Budgeter
          </TabsTrigger>
          <TabsTrigger value="price-checker" className="flex items-center gap-2">
            <ShirtIcon className="h-4 w-4" />
            Price Checker
          </TabsTrigger>
          <TabsTrigger value="sale-alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Sale Alerts
          </TabsTrigger>
        </TabsList>

        {/* Seasonal Clothing Budgeter */}
        <TabsContent value="seasonal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Seasonal Clothing Budgeter
              </CardTitle>
              <CardDescription>
                Plan your clothing budget for different seasons in Chennai
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="season">Select Season</Label>
                  <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose season" />
                    </SelectTrigger>
                    <SelectContent>
                      {seasonalOutfits.map((outfit) => (
                        <SelectItem key={outfit.season} value={outfit.season}>
                          {outfit.season}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="members">Family Members</Label>
                  <Input
                    type="number"
                    value={familyMembers}
                    onChange={(e) => setFamilyMembers(parseInt(e.target.value) || 1)}
                    min="1"
                    max="10"
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Total Budget (₹)</Label>
                  <Input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
              </div>

              {selectedSeason && (
                <div className="space-y-4">
                  {seasonalOutfits
                    .filter(outfit => outfit.season === selectedSeason)
                    .map((outfit) => {
                      const totalCost = outfit.estimatedCost * familyMembers;
                      const budgetUsage = (totalCost / budget) * 100;
                      
                      return (
                        <Card key={outfit.season} className="border-l-4 border-l-primary">
                          <CardContent className="pt-6">
                            <h3 className="text-lg font-semibold mb-2">{outfit.season}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{outfit.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Items Needed:</h4>
                                <ul className="space-y-1">
                                  {outfit.items.map((item, index) => (
                                    <li key={index} className="text-sm flex items-center gap-2">
                                      <Star className="h-3 w-3 text-yellow-500" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span>Cost per person:</span>
                                  <span className="font-semibold">₹{outfit.estimatedCost}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Total cost ({familyMembers} members):</span>
                                  <span className="font-semibold text-lg">₹{totalCost}</span>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Budget Usage:</span>
                                    <span>{budgetUsage.toFixed(1)}%</span>
                                  </div>
                                  <Progress 
                                    value={Math.min(budgetUsage, 100)} 
                                    className="h-2"
                                  />
                                  {budgetUsage > 100 && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                      <AlertCircle className="h-3 w-3" />
                                      Budget exceeded by ₹{totalCost - budget}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={handleSeasonalBudget} disabled={!selectedSeason}>
                  Calculate Budget
                </Button>
                <Button variant="outline" onClick={generatePDF} disabled={!selectedSeason}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tailor vs Ready-made Price Checker */}
        <TabsContent value="price-checker" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShirtIcon className="h-5 w-5" />
                Tailor vs Ready-made Price Checker
              </CardTitle>
              <CardDescription>
                Compare costs between custom tailoring and ready-made clothing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clothing-type">Clothing Type</Label>
                  <Select value={selectedClothingType} onValueChange={setSelectedClothingType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select clothing type" />
                    </SelectTrigger>
                    <SelectContent>
                      {clothingPrices.map((item) => (
                        <SelectItem key={item.name} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="size">Size</Label>
                  <Select value={clothingSize} onValueChange={setClothingSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XS">XS</SelectItem>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                      <SelectItem value="XXL">XXL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedClothingType && (
                <div className="space-y-4">
                  {(() => {
                    const clothingData = getSelectedClothingData();
                    if (!clothingData) return null;

                    const savings = clothingData.readymadePrice - clothingData.tailorPrice;
                    const savingsPercent = ((savings / clothingData.readymadePrice) * 100).toFixed(1);

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border-2 border-green-200 bg-green-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-green-700">Tailor Made</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="text-3xl font-bold text-green-700">
                                ₹{clothingData.tailorPrice}
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-green-600" />
                                  Custom fit guaranteed
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-green-600" />
                                  Choice of fabric & design
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-green-600" />
                                  Local tailor support
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-green-600" />
                                  7-10 days delivery
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border-2 border-blue-200 bg-blue-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-blue-700">Ready-made</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="text-3xl font-bold text-blue-700">
                                ₹{clothingData.readymadePrice}
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-blue-600" />
                                  Immediate availability
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-blue-600" />
                                  Brand guarantee
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-blue-600" />
                                  Easy returns/exchange
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-blue-600" />
                                  Same day purchase
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })()}

                  {(() => {
                    const clothingData = getSelectedClothingData();
                    if (!clothingData) return null;

                    const savings = clothingData.readymadePrice - clothingData.tailorPrice;
                    const savingsPercent = ((savings / clothingData.readymadePrice) * 100).toFixed(1);

                    return (
                      <Card className="bg-yellow-50 border-yellow-200">
                        <CardContent className="pt-6">
                          <div className="text-center space-y-2">
                            <h3 className="text-lg font-semibold text-yellow-700">
                              💰 You Save ₹{savings} with Tailor Made!
                            </h3>
                            <p className="text-yellow-600">
                              That's {savingsPercent}% savings compared to ready-made
                            </p>
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                              {clothingData.category} clothing
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })()}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clothing Sale Alerts */}
        <TabsContent value="sale-alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Clothing Sale Alerts
              </CardTitle>
              <CardDescription>
                Current deals and discounts from nearby stores and online platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {saleAlerts.map((alert, index) => (
                  <Card key={index} className="border-l-4 border-l-red-500 bg-red-50">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">{alert.store}</h3>
                          <Badge variant="destructive" className="bg-red-600">
                            {alert.discount}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <ShirtIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{alert.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{alert.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Valid until: {alert.validUntil}</span>
                          </div>
                        </div>
                        
                        <Button size="sm" className="w-full">
                          <Bell className="h-4 w-4 mr-2" />
                          Set Reminder
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-2">💡 Money-Saving Tips</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• End-of-season sales offer up to 70% discounts</li>
                  <li>• Festival seasons (Diwali, Pongal) have special offers</li>
                  <li>• Local markets in T.Nagar offer better bargaining options</li>
                  <li>• Compare online prices before visiting physical stores</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FashionClothing;
