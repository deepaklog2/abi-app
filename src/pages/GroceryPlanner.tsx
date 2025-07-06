
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ShoppingCart, TrendingDown, Star, AlertTriangle, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  estimated_price: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

interface PriceComparison {
  platform: string;
  price: number;
  rating: number;
  availability: string;
  delivery: string;
  offer?: string;
}

const GroceryPlanner = () => {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    estimated_price: '',
    category: 'Vegetables',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });
  const [searchProduct, setSearchProduct] = useState('');
  const [priceResults, setPriceResults] = useState<PriceComparison[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState(5000);
  const [isSearching, setIsSearching] = useState(false);

  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Spices', 'Snacks', 'Beverages', 'Cleaning', 'Personal Care'];
  const units = ['kg', 'grams', 'litres', 'pieces', 'packets'];

  // Dummy price comparison data
  const dummyPriceData: { [key: string]: PriceComparison[] } = {
    'rice': [
      { platform: 'Amazon', price: 85, rating: 4.2, availability: 'In Stock', delivery: '2 days', offer: '5% off' },
      { platform: 'Flipkart', price: 82, rating: 4.0, availability: 'In Stock', delivery: '3 days', offer: 'Free delivery' },
      { platform: 'DMart', price: 78, rating: 4.3, availability: 'In Stock', delivery: 'Same day', offer: '10% cashback' },
      { platform: 'BigBasket', price: 80, rating: 4.1, availability: 'In Stock', delivery: '1 day' }
    ],
    'oil': [
      { platform: 'Amazon', price: 185, rating: 4.4, availability: 'In Stock', delivery: '2 days' },
      { platform: 'Flipkart', price: 180, rating: 4.2, availability: 'In Stock', delivery: '3 days', offer: '3% off' },
      { platform: 'DMart', price: 175, rating: 4.5, availability: 'In Stock', delivery: 'Same day', offer: 'Best Price' },
      { platform: 'BigBasket', price: 178, rating: 4.3, availability: 'In Stock', delivery: '1 day' }
    ]
  };

  useEffect(() => {
    const saved = localStorage.getItem('groceryList');
    if (saved) {
      setGroceryList(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
  }, [groceryList]);

  const addItem = () => {
    if (!newItem.name || !newItem.quantity) {
      toast({
        title: "Missing Information",
        description: "Please enter item name and quantity",
        variant: "destructive"
      });
      return;
    }

    const item: GroceryItem = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: parseFloat(newItem.quantity),
      unit: newItem.unit,
      estimated_price: parseFloat(newItem.estimated_price) || 0,
      category: newItem.category,
      priority: newItem.priority
    };

    setGroceryList(prev => [...prev, item]);
    setNewItem({ name: '', quantity: '', unit: 'kg', estimated_price: '', category: 'Vegetables', priority: 'medium' });
    
    toast({
      title: "Item Added",
      description: `${item.name} added to your grocery list`,
    });
  };

  const searchProductPrices = () => {
    if (!searchProduct.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const productKey = searchProduct.toLowerCase();
      const results = dummyPriceData[productKey] || [
        { platform: 'Amazon', price: Math.floor(Math.random() * 200) + 50, rating: 4.1, availability: 'In Stock', delivery: '2 days' },
        { platform: 'Flipkart', price: Math.floor(Math.random() * 200) + 50, rating: 4.0, availability: 'In Stock', delivery: '3 days' },
        { platform: 'DMart', price: Math.floor(Math.random() * 200) + 50, rating: 4.2, availability: 'In Stock', delivery: 'Same day' },
        { platform: 'BigBasket', price: Math.floor(Math.random() * 200) + 50, rating: 4.3, availability: 'In Stock', delivery: '1 day' }
      ];
      
      setPriceResults(results.sort((a, b) => a.price - b.price));
      setIsSearching(false);
      
      toast({
        title: "Price Comparison Ready",
        description: `Found prices for ${searchProduct} across 4 platforms`,
      });
    }, 1500);
  };

  const getTotalEstimated = () => groceryList.reduce((sum, item) => sum + item.estimated_price, 0);
  const getBudgetProgress = () => Math.min((getTotalEstimated() / monthlyBudget) * 100, 100);

  const getBestRecommendation = () => {
    if (priceResults.length === 0) return null;
    
    // Quality & cost balanced recommendation (considering price and rating)
    const scored = priceResults.map(item => ({
      ...item,
      score: (item.rating * 20) - (item.price * 0.1) // Higher rating good, lower price good
    }));
    
    return scored.sort((a, b) => b.score - a.score)[0];
  };

  const bestRecommendation = getBestRecommendation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Smart Grocery Planner</h1>
        <Badge variant="outline" className="text-lg px-4 py-2">
          Budget: ₹{monthlyBudget.toLocaleString()}
        </Badge>
      </div>

      <Tabs defaultValue="planner" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="planner">Grocery Planner</TabsTrigger>
          <TabsTrigger value="price-finder">Price Finder</TabsTrigger>
        </TabsList>

        <TabsContent value="price-finder" className="space-y-6">
          {/* Lowest Price Product Finder */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Lowest Price Product Finder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Product Name</Label>
                  <Input
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    placeholder="e.g., Rice, Oil, Sugar"
                    className="bg-white/80"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={searchProductPrices} 
                    disabled={isSearching}
                    className="gradient-primary"
                  >
                    {isSearching ? 'Searching...' : 'Compare Prices'}
                  </Button>
                </div>
              </div>

              {/* Best Recommendation */}
              {bestRecommendation && (
                <Alert className="border-green-200 bg-green-50">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Best Quality & Cost Balance:</strong> {bestRecommendation.platform} - 
                    ₹{bestRecommendation.price} ({bestRecommendation.rating}★ rating)
                    {bestRecommendation.offer && ` • ${bestRecommendation.offer}`}
                  </AlertDescription>
                </Alert>
              )}

              {/* Price Comparison Results */}
              {priceResults.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {priceResults.map((result, index) => (
                    <Card key={index} className={`relative ${index === 0 ? 'border-green-400 bg-green-50' : 'bg-white/80'}`}>
                      <CardContent className="p-4">
                        {index === 0 && (
                          <Badge className="absolute -top-2 left-4 bg-green-600">Lowest Price</Badge>
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{result.platform}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{result.rating}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Price:</span>
                            <span className="font-bold text-green-600">₹{result.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery:</span>
                            <span>{result.delivery}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <Badge variant="outline" className="text-green-600">{result.availability}</Badge>
                          </div>
                          {result.offer && (
                            <div className="text-center">
                              <Badge variant="secondary">{result.offer}</Badge>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planner" className="space-y-6">
          {/* Budget Overview */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Monthly Grocery Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label>Budget Limit</Label>
                  <Input
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(parseInt(e.target.value) || 0)}
                    className="bg-white/80"
                  />
                </div>
                <div className="flex-1">
                  <Label>Estimated Total</Label>
                  <div className="text-2xl font-bold text-orange-600">₹{getTotalEstimated()}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Budget Usage</span>
                  <span>{getBudgetProgress().toFixed(1)}%</span>
                </div>
                <Progress value={getBudgetProgress()} className="h-3" />
              </div>
              {getTotalEstimated() > monthlyBudget && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    You've exceeded your budget by ₹{(getTotalEstimated() - monthlyBudget).toLocaleString()}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Add New Item */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Add Grocery Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div>
                  <Label>Item Name</Label>
                  <Input
                    value={newItem.name}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Rice, Oil, etc."
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>Unit</Label>
                  <select
                    value={newItem.unit}
                    onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full p-2 border rounded-md bg-white/80"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Est. Price (₹)</Label>
                  <Input
                    type="number"
                    value={newItem.estimated_price}
                    onChange={(e) => setNewItem(prev => ({ ...prev, estimated_price: e.target.value }))}
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2 border rounded-md bg-white/80"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button onClick={addItem} className="gradient-primary w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grocery List */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Your Grocery List ({groceryList.length} items)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {groceryList.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.priority === 'high' ? 'bg-red-500' : 
                        item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} {item.unit} • {item.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{item.estimated_price}</p>
                      <Badge variant="outline" className={`text-xs ${
                        item.priority === 'high' ? 'text-red-600' : 
                        item.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {item.priority}
                      </Badge>
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

export default GroceryPlanner;
