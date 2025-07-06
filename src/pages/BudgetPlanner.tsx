
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { toast } from '@/hooks/use-toast';

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  limit: number;
}

interface FamilyBudget {
  rent: number;
  food: number;
  transport: number;
  education: number;
  medical: number;
  utilities: number;
  entertainment: number;
  savings: number;
}

const BudgetPlanner = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(45000);
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: '1', name: 'Food & Dining', allocated: 12000, spent: 8500, limit: 12000 },
    { id: '2', name: 'Transportation', allocated: 6000, spent: 4200, limit: 6000 },
    { id: '3', name: 'Utilities', allocated: 4000, spent: 3800, limit: 4000 },
    { id: '4', name: 'Entertainment', allocated: 3000, spent: 2100, limit: 3000 },
    { id: '5', name: 'Healthcare', allocated: 2000, spent: 500, limit: 2000 },
  ]);

  const [familyBudget, setFamilyBudget] = useState<FamilyBudget>({
    rent: 15000,
    food: 12000,
    transport: 6000,
    education: 8000,
    medical: 3000,
    utilities: 4000,
    entertainment: 3000,
    savings: 9000,
  });

  // 50-30-20 Rule Calculations
  const needs = monthlyIncome * 0.5;
  const wants = monthlyIncome * 0.3;
  const savings = monthlyIncome * 0.2;

  const updateCategorySpent = (id: string, newSpent: number) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, spent: newSpent } : cat
    ));
  };

  const getTotalAllocated = () => categories.reduce((sum, cat) => sum + cat.allocated, 0);
  const getTotalSpent = () => categories.reduce((sum, cat) => sum + cat.spent, 0);
  const getRemainingBudget = () => monthlyIncome - getTotalSpent();

  const pieData = categories.map(cat => ({
    name: cat.name,
    value: cat.allocated,
    spent: cat.spent,
    color: cat.spent > cat.limit ? '#ef4444' : '#10b981'
  }));

  const budgetData = [
    { name: 'Needs (50%)', budgeted: needs, actual: familyBudget.rent + familyBudget.food + familyBudget.utilities + familyBudget.medical },
    { name: 'Wants (30%)', budgeted: wants, actual: familyBudget.entertainment + familyBudget.transport },
    { name: 'Savings (20%)', budgeted: savings, actual: familyBudget.savings },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Budget Planner</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="family">Family Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Monthly Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Monthly Income</p>
                  <p className="text-2xl font-bold text-blue-600">₹{monthlyIncome.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Total Allocated</p>
                  <p className="text-2xl font-bold text-purple-600">₹{getTotalAllocated().toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-orange-600">₹{getTotalSpent().toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                  <p className={`text-2xl font-bold ${getRemainingBudget() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{getRemainingBudget().toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 50-30-20 Rule Visualization */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>50-30-20 Budget Rule Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-700">Needs (50%)</h3>
                    <p className="text-2xl font-bold text-green-600">₹{needs.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Rent, Food, Utilities, Healthcare</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-yellow-700">Wants (30%)</h3>
                    <p className="text-2xl font-bold text-yellow-600">₹{wants.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Entertainment, Dining, Shopping</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-700">Savings (20%)</h3>
                    <p className="text-2xl font-bold text-blue-600">₹{savings.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Emergency Fund, Investments</p>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, '']} />
                    <Bar dataKey="budgeted" fill="#3b82f6" name="Recommended" />
                    <Bar dataKey="actual" fill="#10b981" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Budget Distribution Pie Chart */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Budget Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${value}`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {/* Budget Categories */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Budget Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((category) => {
                const progress = (category.spent / category.allocated) * 100;
                const isOverBudget = category.spent > category.limit;
                
                return (
                  <div key={category.id} className="p-4 bg-white/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{category.name}</h3>
                      <Badge variant={isOverBudget ? "destructive" : "default"}>
                        {isOverBudget ? 'Over Budget' : 'On Track'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <Label className="text-xs">Allocated</Label>
                        <p className="text-sm font-medium">₹{category.allocated.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-xs">Spent</Label>
                        <Input
                          type="number"
                          value={category.spent}
                          onChange={(e) => updateCategorySpent(category.id, parseInt(e.target.value) || 0)}
                          className="h-8 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Remaining</Label>
                        <p className={`text-sm font-medium ${(category.allocated - category.spent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ₹{(category.allocated - category.spent).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={Math.min(progress, 100)} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="family" className="space-y-6">
          {/* Monthly Family Budget Blueprint */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Monthly Family Budget Blueprint</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Essential Expenses (Needs)</h3>
                  
                  <div>
                    <Label>Rent/Housing</Label>
                    <Input
                      type="number"
                      value={familyBudget.rent}
                      onChange={(e) => setFamilyBudget(prev => ({ ...prev, rent: parseInt(e.target.value) || 0 }))}
                      className="bg-white/80"
                    />
                  </div>

                  <div>
                    <Label>Food & Groceries</Label>
                    <Input
                      type="number"
                      value={familyBudget.food}
                      onChange={(e) => setFamilyBudget(prev => ({ ...prev, food: parseInt(e.target.value) || 0 }))}
                      className="bg-white/80"
                    />
                  </div>

                  <div>
                    <Label>Utilities (Electric, Water, Gas)</Label>
                    <Input
                      type="number"
                      value={familyBudget.utilities}
                      onChange={(e) => setFamilyBudget(prev => ({ ...prev, utilities: parseInt(e.target.value) || 0 }))}
                      className="bg-white/80"
                    />
                  </div>

                  <div>
                    <Label>Medical & Healthcare</Label>
                    <Input
                      type="number"
                      value={familyBudget.medical}
                      onChange={(e) => setFamilyBudget(prev => ({ ...prev, medical: parseInt(e.target.value) || 0 }))}
                      className="bg-white/80"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Discretionary Expenses</h3>
                  
                  <div>
                    <Label>Transportation</Label>
                    <Input
                      type="number"
                      value={familyBudget.transport}
                      onChange={(e) => setFamilyBudget(prev => ({ ...prev, transport: parseInt(e.target.value) || 0 }))}
                      className="bg-white/80"
                    />
                  </div>

                  <div>
                    <Label>School/College Fees</Label>
                    <Input
                      type="number"
                      value={familyBudget.education}
                      onChange={(e) => setFamilyBudget(prev => ({ ...prev, education: parseInt(e.target.value) || 0 }))}
                      className="bg-white/80"
                    />
                  </div>

                  <div>
                    <Label>Entertainment & Recreation</Label>
                    <Input
                      type="number"
                      value={familyBudget.entertainment}
                      onChange={(e) => setFamilyBudget(prev => ({ ...prev, entertainment: parseInt(e.target.value) || 0 }))}
                      className="bg-white/80"
                    />
                  </div>

                  <div>
                    <Label>Savings & Investments</Label>
                    <Input
                      type="number"
                      value={familyBudget.savings}
                      onChange={(e) => setFamilyBudget(prev => ({ ...prev, savings: parseInt(e.target.value) || 0 }))}
                      className="bg-white/80"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Budget Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                    <p className="text-lg font-bold">₹{Object.values(familyBudget).reduce((a, b) => a + b, 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Income</p>
                    <p className="text-lg font-bold">₹{monthlyIncome.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className={`text-lg font-bold ${(monthlyIncome - Object.values(familyBudget).reduce((a, b) => a + b, 0)) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{(monthlyIncome - Object.values(familyBudget).reduce((a, b) => a + b, 0)).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Savings Rate</p>
                    <p className="text-lg font-bold text-blue-600">
                      {((familyBudget.savings / monthlyIncome) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetPlanner;
