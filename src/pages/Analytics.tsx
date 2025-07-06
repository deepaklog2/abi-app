
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon, BarChart3, Lightbulb } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  // Sample data for different time ranges
  const monthlyData = [
    { period: 'Jan', income: 45000, expenses: 38000, savings: 7000 },
    { period: 'Feb', income: 45000, expenses: 35000, savings: 10000 },
    { period: 'Mar', income: 47000, expenses: 40000, savings: 7000 },
    { period: 'Apr', income: 45000, expenses: 42000, savings: 3000 },
    { period: 'May', income: 48000, expenses: 39000, savings: 9000 },
    { period: 'Jun', income: 45000, expenses: 37000, savings: 8000 },
  ];

  const weeklyData = [
    { period: 'Week 1', income: 11250, expenses: 9500, savings: 1750 },
    { period: 'Week 2', income: 11250, expenses: 8750, savings: 2500 },
    { period: 'Week 3', income: 11250, expenses: 9250, savings: 2000 },
    { period: 'Week 4', income: 11250, expenses: 9750, savings: 1500 },
  ];

  const dailyData = [
    { period: 'Mon', expenses: 1200 },
    { period: 'Tue', expenses: 850 },
    { period: 'Wed', expenses: 1100 },
    { period: 'Thu', expenses: 950 },
    { period: 'Fri', expenses: 1300 },
    { period: 'Sat', expenses: 2100 },
    { period: 'Sun', expenses: 1800 },
  ];

  const categoryData = [
    { name: 'Food & Dining', value: 12000, color: '#8884d8', trend: '+5%' },
    { name: 'Transportation', value: 8000, color: '#82ca9d', trend: '-2%' },
    { name: 'Utilities', value: 6000, color: '#ffc658', trend: '+1%' },
    { name: 'Healthcare', value: 4000, color: '#ff7300', trend: '-8%' },
    { name: 'Entertainment', value: 3000, color: '#00ff88', trend: '+12%' },
    { name: 'Shopping', value: 5000, color: '#ff0088', trend: '+3%' },
  ];

  const getCurrentData = () => {
    switch (timeRange) {
      case 'weekly': return weeklyData;
      case 'daily': return dailyData;
      default: return monthlyData;
    }
  };

  const savingsRate = 18;
  const expenseGrowth = -3.2;
  const avgDailySpending = 1328;

  const aiInsights = [
    {
      type: 'warning',
      title: 'High Entertainment Spending',
      description: 'Your entertainment expenses increased by 12% this month. Consider setting a stricter limit.',
      suggestion: 'Try the envelope budgeting method for entertainment expenses.'
    },
    {
      type: 'success',
      title: 'Great Healthcare Savings',
      description: 'You saved 8% on healthcare costs this month compared to last month.',
      suggestion: 'Continue using generic medicines and preventive care.'
    },
    {
      type: 'info',
      title: 'Weekend Spending Pattern',
      description: 'You tend to spend 60% more on weekends. Plan weekend activities in advance.',
      suggestion: 'Set a weekend budget limit of ₹3,000 to control impulse spending.'
    }
  ];

  const savingsSuggestions = [
    {
      title: 'Switch to Annual Subscriptions',
      potential: 2400,
      description: 'Save ₹200/month by switching streaming services to annual plans'
    },
    {
      title: 'Cook More at Home',
      potential: 4800,
      description: 'Reduce dining out frequency from 12 to 8 times per month'
    },
    {
      title: 'Use Public Transport',
      potential: 1800,
      description: 'Use metro/bus 3 days a week instead of cab/personal vehicle'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Smart Analytics Dashboard</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Savings Rate</p>
                <p className="text-2xl font-bold text-green-600">{savingsRate}%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.1% from last month
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Expense Growth</p>
                <p className="text-2xl font-bold text-orange-600">{expenseGrowth}%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Decreased spending
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Daily Spending</p>
                <p className="text-2xl font-bold text-blue-600">₹{avgDailySpending}</p>
                <p className="text-xs text-muted-foreground">
                  This month average
                </p>
              </div>
              <PieChartIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Budget Adherence</p>
                <p className="text-2xl font-bold text-purple-600">87%</p>
                <Badge variant="default" className="text-xs">
                  Good Performance
                </Badge>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          {/* Income vs Expenses Trend */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Income vs Expenses Trend ({timeRange})</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                {timeRange === 'daily' ? (
                  <BarChart data={getCurrentData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, '']} />
                    <Bar dataKey="expenses" fill="#f59e0b" />
                  </BarChart>
                ) : (
                  <AreaChart data={getCurrentData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, '']} />
                    <Area type="monotone" dataKey="income" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="expenses" stackId="2" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="savings" stackId="3" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Savings Trend */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Savings Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getCurrentData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Savings']} />
                  <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {/* Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${value}`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Category Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{category.value.toLocaleString()}</p>
                        <Badge 
                          variant={category.trend.startsWith('+') ? "destructive" : "default"}
                          className="text-xs"
                        >
                          {category.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {/* AI-Generated Insights */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI-Generated Spending Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, index) => (
                <Alert key={index} variant={insight.type === 'warning' ? 'destructive' : 'default'}>
                  <div className="space-y-2">
                    <div className="font-semibold">{insight.title}</div>
                    <AlertDescription>{insight.description}</AlertDescription>
                    <div className="text-sm font-medium text-blue-600">
                      💡 Suggestion: {insight.suggestion}
                    </div>
                  </div>
                </Alert>
              ))}
            </CardContent>
          </Card>

          {/* Savings Suggestions */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Savings Optimization Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savingsSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-green-800">{suggestion.title}</h3>
                      <Badge variant="default" className="bg-green-600">
                        Save ₹{suggestion.potential}/year
                      </Badge>
                    </div>
                    <p className="text-sm text-green-700">{suggestion.description}</p>
                  </div>
                ))}
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">Total Potential Savings</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{savingsSuggestions.reduce((sum, s) => sum + s.potential, 0).toLocaleString()}/year
                  </p>
                  <p className="text-sm text-blue-700">
                    That's ₹{Math.round(savingsSuggestions.reduce((sum, s) => sum + s.potential, 0) / 12).toLocaleString()}/month in additional savings!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          {/* Future Expense Predictions */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Future Expense Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">Next Month Forecast</h3>
                  <p className="text-2xl font-bold text-orange-600">₹39,500</p>
                  <p className="text-sm text-orange-700">Based on current spending patterns</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Quarterly Projection</h3>
                  <p className="text-2xl font-bold text-blue-600">₹1,18,500</p>
                  <p className="text-sm text-blue-700">Including seasonal variations</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Annual Estimate</h3>
                  <p className="text-2xl font-bold text-purple-600">₹4,74,000</p>
                  <p className="text-sm text-purple-700">With inflation adjustments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Spending Pattern Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Peak Spending Days:</strong> Fridays and Saturdays account for 35% of weekly expenses
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <PieChartIcon className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Seasonal Trend:</strong> Food expenses typically increase by 15% during festival months
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <BarChart3 className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Budget Efficiency:</strong> You're most disciplined with healthcare and utilities budgets (95% adherence)
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
