
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Recycle, 
  Trash2, 
  Leaf, 
  TrendingUp, 
  Calendar, 
  Plus,
  AlertTriangle,
  Award
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface WasteEntry {
  id: string;
  type: string;
  weight: number;
  date: string;
  category: 'recyclable' | 'organic' | 'hazardous' | 'general';
  disposed: boolean;
  method: string;
}

const WasteManagement = () => {
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    type: '',
    weight: '',
    category: 'recyclable' as 'recyclable' | 'organic' | 'hazardous' | 'general',
    method: 'Municipal Collection'
  });
  const [monthlyGoal, setMonthlyGoal] = useState(50); // kg

  const wasteCategories = [
    { value: 'recyclable', label: '♻️ Recyclable', color: 'text-green-600' },
    { value: 'organic', label: '🌱 Organic', color: 'text-yellow-600' },
    { value: 'hazardous', label: '☢️ Hazardous', color: 'text-red-600' },
    { value: 'general', label: '🗑️ General', color: 'text-gray-600' }
  ] as const;

  const disposalMethods = [
    'Municipal Collection',
    'Recycling Center',
    'Composting',
    'Donation',
    'Hazardous Waste Facility',
    'Sell to Kabadiwala'
  ];

  const ecoTips = [
    "Separate wet and dry waste at home - helps recycling process",
    "Use both sides of paper before disposing",
    "Convert organic waste into compost for plants",
    "Donate clothes and books instead of throwing away",
    "Use reusable bags to reduce plastic waste",
    "Fix items when possible instead of buying new ones",
    "Sell newspapers, bottles, and metals to local kabadiwala"
  ];

  useEffect(() => {
    const saved = localStorage.getItem('wasteEntries');
    if (saved) {
      setWasteEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wasteEntries', JSON.stringify(wasteEntries));
  }, [wasteEntries]);

  const addWasteEntry = () => {
    if (!newEntry.type || !newEntry.weight) {
      toast({
        title: "Missing Information",
        description: "Please enter waste type and weight",
        variant: "destructive"
      });
      return;
    }

    const entry: WasteEntry = {
      id: Date.now().toString(),
      type: newEntry.type,
      weight: parseFloat(newEntry.weight),
      date: new Date().toISOString(),
      category: newEntry.category,
      disposed: false,
      method: newEntry.method
    };

    setWasteEntries(prev => [entry, ...prev]);
    setNewEntry({ type: '', weight: '', category: 'recyclable', method: 'Municipal Collection' });
    
    toast({
      title: "Waste Entry Added",
      description: `${entry.weight}kg of ${entry.type} logged`,
    });
  };

  const markAsDisposed = (id: string) => {
    setWasteEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, disposed: true } : entry
      )
    );
    toast({
      title: "Waste Disposed",
      description: "Entry marked as properly disposed",
    });
  };

  const getCurrentMonthTotal = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return wasteEntries
      .filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
      })
      .reduce((sum, entry) => sum + entry.weight, 0);
  };

  const getWasteByCategory = () => {
    return wasteCategories.map(category => ({
      ...category,
      total: wasteEntries
        .filter(entry => entry.category === category.value)
        .reduce((sum, entry) => sum + entry.weight, 0)
    }));
  };

  const getRecyclingRate = () => {
    const recyclableWaste = wasteEntries.filter(entry => 
      entry.category === 'recyclable' || entry.category === 'organic'
    ).reduce((sum, entry) => sum + entry.weight, 0);
    
    const totalWaste = wasteEntries.reduce((sum, entry) => sum + entry.weight, 0);
    
    return totalWaste > 0 ? (recyclableWaste / totalWaste) * 100 : 0;
  };

  const currentMonthTotal = getCurrentMonthTotal();
  const goalProgress = Math.min((currentMonthTotal / monthlyGoal) * 100, 100);
  const wasteByCategory = getWasteByCategory();
  const recyclingRate = getRecyclingRate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Waste Management Tracker</h1>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Leaf className="h-4 w-4 mr-2" />
          Eco Friendly
        </Badge>
      </div>

      <Tabs defaultValue="tracker" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tracker">Waste Tracker</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="tips">Eco Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="tracker" className="space-y-6">
          {/* Monthly Goal */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Monthly Waste Reduction Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label>Goal Limit (kg)</Label>
                  <Input
                    type="number"
                    value={monthlyGoal}
                    onChange={(e) => setMonthlyGoal(parseInt(e.target.value) || 0)}
                    className="bg-white/80"
                  />
                </div>
                <div className="flex-1">
                  <Label>Current Month</Label>
                  <div className="text-2xl font-bold text-orange-600">{currentMonthTotal}kg</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Goal</span>
                  <span>{goalProgress.toFixed(1)}%</span>
                </div>
                <Progress value={goalProgress} className="h-3" />
              </div>
              {currentMonthTotal > monthlyGoal && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    You've exceeded your monthly goal by {(currentMonthTotal - monthlyGoal).toFixed(1)}kg
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Add New Waste Entry */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Log Waste Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label>Waste Type</Label>
                  <Input
                    value={newEntry.type}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, type: e.target.value }))}
                    placeholder="Plastic bottles, food waste"
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>Weight (kg)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={newEntry.weight}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="2.5"
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <select
                    value={newEntry.category}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full p-2 border rounded-md bg-white/80"
                  >
                    {wasteCategories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Disposal Method</Label>
                  <select
                    value={newEntry.method}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, method: e.target.value }))}
                    className="w-full p-2 border rounded-md bg-white/80"
                  >
                    {disposalMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button onClick={addWasteEntry} className="gradient-primary w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Log Entry
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Entries */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Recent Waste Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {wasteEntries.slice(0, 10).map((entry) => {
                  const category = wasteCategories.find(cat => cat.value === entry.category);
                  return (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          entry.category === 'recyclable' ? 'bg-green-500' :
                          entry.category === 'organic' ? 'bg-yellow-500' :
                          entry.category === 'hazardous' ? 'bg-red-500' : 'bg-gray-500'
                        }`} />
                        <div>
                          <p className="font-medium">{entry.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {entry.weight}kg • {category?.label} • {entry.method}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString()}
                          </p>
                          <Badge variant={entry.disposed ? "default" : "secondary"}>
                            {entry.disposed ? 'Disposed' : 'Pending'}
                          </Badge>
                        </div>
                        {!entry.disposed && (
                          <Button
                            variant="outline" 
                            size="sm"
                            onClick={() => markAsDisposed(entry.id)}
                          >
                            Mark Disposed
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Waste</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {wasteEntries.reduce((sum, e) => sum + e.weight, 0).toFixed(1)}kg
                    </p>
                  </div>
                  <Trash2 className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Recycling Rate</p>
                    <p className="text-2xl font-bold text-green-600">{recyclingRate.toFixed(1)}%</p>
                  </div>
                  <Recycle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Entries This Month</p>
                    <p className="text-2xl font-bold text-blue-600">{wasteEntries.filter(e => 
                      new Date(e.date).getMonth() === new Date().getMonth()
                    ).length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Eco Score</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {Math.max(100 - currentMonthTotal, 0).toFixed(0)}
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Waste by Category */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Waste by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wasteByCategory.map((category) => (
                  <div key={category.value} className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`font-medium ${category.color}`}>{category.label}</span>
                      <span>{category.total.toFixed(1)}kg</span>
                    </div>
                    <Progress 
                      value={category.total > 0 ? (category.total / Math.max(...wasteByCategory.map(c => c.total))) * 100 : 0} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          {/* Eco Tips */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                Eco-Friendly Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ecoTips.map((tip, index) => (
                  <Card key={index} className="bg-white/80">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-green-600">{index + 1}</span>
                        </div>
                        <p className="text-sm">{tip}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Environmental Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Recycle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-medium">Recycling Hero</h4>
                  <p className="text-sm text-muted-foreground">
                    {recyclingRate > 50 ? 'Achieved!' : `${(50 - recyclingRate).toFixed(1)}% to go`}
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium">Waste Reducer</h4>
                  <p className="text-sm text-muted-foreground">
                    {currentMonthTotal < monthlyGoal ? 'On Track!' : 'Keep Trying!'}
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Leaf className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-medium">Eco Warrior</h4>
                  <p className="text-sm text-muted-foreground">
                    {wasteEntries.length >= 10 ? 'Achieved!' : `${10 - wasteEntries.length} entries to go`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WasteManagement;
