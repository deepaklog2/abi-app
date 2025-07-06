
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Calculator, 
  MapPin, 
  ChefHat, 
  ShoppingCart, 
  Recycle, 
  PieChart,
  TrendingDown,
  Bell,
  Flame,
  Calendar,
  Heart,
  Users,
  Download,
  Plus,
  Clock,
  IndianRupee,
  Star,
  Utensils
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MealCost {
  familyMembers: number;
  mealType: 'veg' | 'non-veg';
  frequency: 'daily' | 'weekly';
  dailyCost: number;
  weeklyCost: number;
  monthlyCost: number;
}

interface MessLocation {
  id: string;
  name: string;
  type: 'tiffin' | 'amma-canteen' | 'ngo' | 'community';
  breakfastPrice?: number;
  lunchPrice?: number;
  dinnerPrice?: number;
  distance: number;
  rating: number;
  timings: string;
}

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  cost: number;
  cookingTime: number;
  calories: number;
  protein: number;
  type: 'veg' | 'non-veg' | 'vegan';
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface GroceryItem {
  id: string;
  name: string;
  category: 'grains' | 'pulses' | 'vegetables' | 'dairy' | 'spices' | 'other';
  quantity: string;
  estimatedPrice: number;
}

const FoodKitchen = () => {
  const [mealCost, setMealCost] = useState<MealCost>({
    familyMembers: 4,
    mealType: 'veg',
    frequency: 'daily',
    dailyCost: 0,
    weeklyCost: 0,
    monthlyCost: 0
  });

  const [budget, setBudget] = useState(200);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [leftoverInput, setLeftoverInput] = useState('');
  const [fuelType, setFuelType] = useState<'lpg' | 'electricity' | 'firewood'>('lpg');

  // Sample data
  const messLocations: MessLocation[] = [
    {
      id: '1',
      name: 'Amma Canteen - T.Nagar',
      type: 'amma-canteen',
      breakfastPrice: 5,
      lunchPrice: 10,
      dinnerPrice: 10,
      distance: 0.8,
      rating: 4.2,
      timings: '7AM-8PM'
    },
    {
      id: '2',
      name: 'Community Kitchen - Adyar',
      type: 'community',
      lunchPrice: 15,
      dinnerPrice: 15,
      distance: 1.2,
      rating: 4.0,
      timings: '11AM-3PM, 6PM-9PM'
    },
    {
      id: '3',
      name: 'Anna Dhanam (NGO) - Velachery',
      type: 'ngo',
      lunchPrice: 0,
      dinnerPrice: 0,
      distance: 2.1,
      rating: 4.5,
      timings: '12PM-2PM, 7PM-9PM'
    },
    {
      id: '4',
      name: 'Saravana Bhavan Tiffin - Mylapore',
      type: 'tiffin',
      breakfastPrice: 25,
      lunchPrice: 45,
      dinnerPrice: 40,
      distance: 1.5,
      rating: 4.3,
      timings: '6AM-10PM'
    }
  ];

  const sampleRecipes: Recipe[] = [
    {
      id: '1',
      name: 'Dal Rice',
      ingredients: ['Rice', 'Dal', 'Onion', 'Turmeric'],
      cost: 35,
      cookingTime: 30,
      calories: 320,
      protein: 12,
      type: 'veg',
      difficulty: 'easy',
      category: 'lunch'
    },
    {
      id: '2',
      name: 'Vegetable Poha',
      ingredients: ['Poha', 'Onion', 'Potato', 'Peas'],
      cost: 25,
      cookingTime: 15,
      calories: 280,
      protein: 8,
      type: 'veg',
      difficulty: 'easy',
      category: 'breakfast'
    },
    {
      id: '3',
      name: 'Egg Curry',
      ingredients: ['Eggs', 'Onion', 'Tomato', 'Spices'],
      cost: 60,
      cookingTime: 25,
      calories: 400,
      protein: 20,
      type: 'non-veg',
      difficulty: 'medium',
      category: 'lunch'
    }
  ];

  const groceryList: GroceryItem[] = [
    { id: '1', name: 'Rice (5kg)', category: 'grains', quantity: '5kg', estimatedPrice: 200 },
    { id: '2', name: 'Wheat Flour (2kg)', category: 'grains', quantity: '2kg', estimatedPrice: 80 },
    { id: '3', name: 'Toor Dal (1kg)', category: 'pulses', quantity: '1kg', estimatedPrice: 120 },
    { id: '4', name: 'Onions (2kg)', category: 'vegetables', quantity: '2kg', estimatedPrice: 60 },
    { id: '5', name: 'Tomatoes (1kg)', category: 'vegetables', quantity: '1kg', estimatedPrice: 40 },
    { id: '6', name: 'Milk (1L)', category: 'dairy', quantity: '1L', estimatedPrice: 50 },
    { id: '7', name: 'Cooking Oil (1L)', category: 'other', quantity: '1L', estimatedPrice: 150 },
    { id: '8', name: 'Turmeric Powder', category: 'spices', quantity: '100g', estimatedPrice: 30 }
  ];

  const availableIngredients = [
    'Rice', 'Dal', 'Onion', 'Tomato', 'Potato', 'Eggs', 'Milk', 'Flour', 
    'Oil', 'Spices', 'Vegetables', 'Chicken', 'Fish', 'Paneer'
  ];

  // Calculate meal costs
  const calculateMealCost = () => {
    const baseVegCost = 80; // per person per day
    const baseNonVegCost = 120; // per person per day
    
    const baseCost = mealCost.mealType === 'veg' ? baseVegCost : baseNonVegCost;
    const dailyCost = baseCost * mealCost.familyMembers;
    const weeklyCost = dailyCost * 7;
    const monthlyCost = dailyCost * 30;

    setMealCost(prev => ({
      ...prev,
      dailyCost,
      weeklyCost,
      monthlyCost
    }));
  };

  useEffect(() => {
    calculateMealCost();
  }, [mealCost.familyMembers, mealCost.mealType]);

  const getFilteredRecipes = () => {
    return sampleRecipes.filter(recipe => 
      recipe.cost <= budget && 
      (selectedIngredients.length === 0 || 
       recipe.ingredients.some(ingredient => 
         selectedIngredients.some(selected => 
           ingredient.toLowerCase().includes(selected.toLowerCase())
         )
       ))
    );
  };

  const getFuelCostEstimate = () => {
    const estimates = {
      lpg: { monthly: 800, tips: ['Use pressure cooker', 'Cook in batches', 'Use lids on pans'] },
      electricity: { monthly: 1200, tips: ['Use induction cooktop efficiently', 'Cook during off-peak hours'] },
      firewood: { monthly: 400, tips: ['Use dry wood', 'Maintain proper airflow', 'Use efficient stoves'] }
    };
    return estimates[fuelType];
  };

  const exportToPDF = (data: any, filename: string) => {
    toast({
      title: "Export Initiated",
      description: `${filename} export feature would be implemented with a PDF library`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Food & Kitchen Services</h1>
        <Badge variant="default" className="bg-orange-600">
          Chennai Kitchen Helper
        </Badge>
      </div>

      <Tabs defaultValue="meal-calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="meal-calculator">Calculator</TabsTrigger>
          <TabsTrigger value="mess-finder">Mess Finder</TabsTrigger>
          <TabsTrigger value="recipe-planner">Recipes</TabsTrigger>
          <TabsTrigger value="grocery-list">Grocery</TabsTrigger>
          <TabsTrigger value="expense-tracker">Expenses</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        {/* Meal Cost Calculator */}
        <TabsContent value="meal-calculator" className="space-y-6">
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Meal Cost Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Family Members</Label>
                  <Input
                    type="number"
                    value={mealCost.familyMembers}
                    onChange={(e) => setMealCost(prev => ({ ...prev, familyMembers: parseInt(e.target.value) || 1 }))}
                    min="1"
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>Meal Type</Label>
                  <Select value={mealCost.mealType} onValueChange={(value: 'veg' | 'non-veg') => setMealCost(prev => ({ ...prev, mealType: value }))}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veg">Vegetarian</SelectItem>
                      <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Frequency</Label>
                  <Select value={mealCost.frequency} onValueChange={(value: 'daily' | 'weekly') => setMealCost(prev => ({ ...prev, frequency: value }))}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Daily Cost</p>
                    <p className="text-2xl font-bold text-blue-600">₹{mealCost.dailyCost}</p>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Weekly Cost</p>
                    <p className="text-2xl font-bold text-orange-600">₹{mealCost.weeklyCost}</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Monthly Cost</p>
                    <p className="text-2xl font-bold text-green-600">₹{mealCost.monthlyCost}</p>
                  </CardContent>
                </Card>
              </div>

              <Button onClick={() => exportToPDF(mealCost, 'meal-cost-breakdown')} className="gradient-primary">
                <Download className="h-4 w-4 mr-2" />
                Export as PDF
              </Button>
            </CardContent>
          </Card>

          {/* Cooking Fuel Cost Estimator */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5" />
                Cooking Fuel Cost Estimator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Fuel Type</Label>
                <Select value={fuelType} onValueChange={(value: 'lpg' | 'electricity' | 'firewood') => setFuelType(value)}>
                  <SelectTrigger className="bg-white/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lpg">LPG Gas</SelectItem>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="firewood">Firewood</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Monthly Estimated Cost</span>
                    <span className="text-xl font-bold text-yellow-600">₹{getFuelCostEstimate().monthly}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Fuel-saving Tips:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {getFuelCostEstimate().tips.map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Local Mess Finder */}
        <TabsContent value="mess-finder" className="space-y-6">
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Local Mess & Community Kitchen Finder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messLocations.map((mess) => (
                  <Card key={mess.id} className="bg-white/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{mess.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{mess.distance} km away</span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{mess.rating}</span>
                          </div>
                        </div>
                        <Badge variant={mess.type === 'ngo' ? 'default' : 'secondary'}>
                          {mess.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        {mess.breakfastPrice && (
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Breakfast</p>
                            <p className="font-bold text-green-600">₹{mess.breakfastPrice}</p>
                          </div>
                        )}
                        {mess.lunchPrice !== undefined && (
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Lunch</p>
                            <p className="font-bold text-blue-600">
                              {mess.lunchPrice === 0 ? 'FREE' : `₹${mess.lunchPrice}`}
                            </p>
                          </div>
                        )}
                        {mess.dinnerPrice !== undefined && (
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Dinner</p>
                            <p className="font-bold text-orange-600">
                              {mess.dinnerPrice === 0 ? 'FREE' : `₹${mess.dinnerPrice}`}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>{mess.timings}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Set Reminder
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recipe Planner */}
        <TabsContent value="recipe-planner" className="space-y-6">
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                Budget Recipe Planner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Budget (₹)</Label>
                  <Input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>Available Ingredients</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableIngredients.map((ingredient) => (
                      <Badge
                        key={ingredient}
                        variant={selectedIngredients.includes(ingredient) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedIngredients(prev => 
                            prev.includes(ingredient) 
                              ? prev.filter(i => i !== ingredient)
                              : [...prev, ingredient]
                          );
                        }}
                      >
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Suggested Recipes</h3>
                {getFilteredRecipes().map((recipe) => (
                  <Card key={recipe.id} className="bg-white/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{recipe.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {recipe.ingredients.join(', ')}
                          </p>
                        </div>
                        <Badge variant={recipe.type === 'veg' ? 'default' : 'secondary'}>
                          {recipe.type}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Cost</p>
                          <p className="font-bold text-green-600">₹{recipe.cost}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time</p>
                          <p className="font-bold">{recipe.cookingTime}min</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Calories</p>
                          <p className="font-bold">{recipe.calories}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Protein</p>
                          <p className="font-bold">{recipe.protein}g</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leftover Optimizer */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle className="h-5 w-5" />
                Leftover Food Optimizer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Enter your leftovers (e.g., "rice, 1 potato, some dal")</Label>
                <Textarea
                  value={leftoverInput}
                  onChange={(e) => setLeftoverInput(e.target.value)}
                  placeholder="rice, 1 potato, some dal"
                  className="bg-white/80"
                />
              </div>
              
              {leftoverInput && (
                <Alert>
                  <Heart className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Suggested recipes:</strong> Rice Balls, Potato Paratha, Dal Pancakes
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Smart Grocery List */}
        <TabsContent value="grocery-list" className="space-y-6">
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Smart Grocery List Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['grains', 'pulses', 'vegetables', 'dairy', 'spices', 'other'].map((category) => (
                  <div key={category}>
                    <h3 className="font-semibold capitalize mb-2">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {groceryList.filter(item => item.category === category).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2 bg-white/50 rounded">
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">({item.quantity})</span>
                          </div>
                          <span className="font-bold text-green-600">₹{item.estimatedPrice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">Total Estimated Cost:</span>
                  <span className="text-xl font-bold text-green-600">
                    ₹{groceryList.reduce((sum, item) => sum + item.estimatedPrice, 0)}
                  </span>
                </div>

                <Button onClick={() => exportToPDF(groceryList, 'grocery-list')} className="gradient-primary w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download/Print Grocery List
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expense Tracker */}
        <TabsContent value="expense-tracker" className="space-y-6">
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Monthly Kitchen Expense Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Grocery</p>
                    <p className="text-xl font-bold text-blue-600">₹8,500</p>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Eating Out</p>
                    <p className="text-xl font-bold text-orange-600">₹2,200</p>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Gas & Utilities</p>
                    <p className="text-xl font-bold text-green-600">₹800</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">Snacks</p>
                    <p className="text-xl font-bold text-purple-600">₹1,500</p>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <TrendingDown className="h-4 w-4" />
                <AlertDescription>
                  You've saved ₹1,200 this month compared to last month by cooking more at home!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Food Alerts */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Food Alert & Refill Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="border-yellow-200 bg-yellow-50">
                  <Bell className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Rice is running low</strong> - Only 1kg left. Time to restock!
                  </AlertDescription>
                </Alert>

                <Alert className="border-red-200 bg-red-50">
                  <Bell className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Buy onions</strong> - Less than 3 pieces in stock
                  </AlertDescription>
                </Alert>

                <Alert className="border-blue-200 bg-blue-50">
                  <Bell className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Milk expires tomorrow</strong> - Use it up or buy fresh stock
                  </AlertDescription>
                </Alert>

                <Card className="bg-white/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Inventory Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Rice Stock</span>
                        <div className="flex items-center gap-2">
                          <Progress value={20} className="w-20" />
                          <span className="text-sm">1kg left</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Oil Stock</span>
                        <div className="flex items-center gap-2">
                          <Progress value={60} className="w-20" />
                          <span className="text-sm">600ml left</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Dal Stock</span>
                        <div className="flex items-center gap-2">
                          <Progress value={80} className="w-20" />
                          <span className="text-sm">800g left</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Nutrition Tips */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Daily Nutrition Tips & Local Substitutes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <Heart className="h-4 w-4" />
                  <AlertDescription>
                    <strong>₹20 Breakfast Idea:</strong> Ragi Porridge with banana - High in calcium and fiber!
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-white/50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Low-Cost Substitutes</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Use banana instead of apple</li>
                        <li>• Ragi instead of oats</li>
                        <li>• Jaggery instead of sugar</li>
                        <li>• Groundnut oil instead of olive oil</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Festival Meal Planner</h4>
                      <div className="space-y-2">
                        <Button size="sm" variant="outline" className="w-full">Pongal Menu - ₹500</Button>
                        <Button size="sm" variant="outline" className="w-full">Diwali Sweets - ₹800</Button>
                        <Button size="sm" variant="outline" className="w-full">Onam Sadhya - ₹1200</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FoodKitchen;
