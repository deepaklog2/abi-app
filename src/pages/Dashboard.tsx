import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3,
  Bell,
  Calendar,
  Heart,
  Flag,
  Plus
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

const Dashboard = () => {
  // Dummy data for charts
  const expenseData = [
    { month: 'Jan', income: 45000, expenses: 38000 },
    { month: 'Feb', income: 45000, expenses: 35000 },
    { month: 'Mar', income: 47000, expenses: 40000 },
    { month: 'Apr', income: 45000, expenses: 42000 },
    { month: 'May', income: 48000, expenses: 39000 },
    { month: 'Jun', income: 45000, expenses: 37000 },
  ];

  const categoryData = [
    { name: 'Food', value: 12000, color: '#8884d8' },
    { name: 'Transport', value: 8000, color: '#82ca9d' },
    { name: 'Utilities', value: 6000, color: '#ffc658' },
    { name: 'Healthcare', value: 4000, color: '#ff7300' },
    { name: 'Entertainment', value: 3000, color: '#00ff88' },
  ];

  const dailyExpenses = [
    { day: 'Mon', amount: 850 },
    { day: 'Tue', amount: 1200 },
    { day: 'Wed', amount: 950 },
    { day: 'Thu', amount: 1100 },
    { day: 'Fri', amount: 1300 },
    { day: 'Sat', amount: 2100 },
    { day: 'Sun', amount: 1800 },
  ];

  const goals = [
    { name: 'Emergency Fund', current: 75000, target: 100000, progress: 75 },
    { name: 'Vacation Fund', current: 25000, target: 50000, progress: 50 },
    { name: 'New Laptop', current: 35000, target: 70000, progress: 50 },
  ];

  const alerts = [
    { type: 'warning', message: 'Monthly food budget 85% used', time: '2 hours ago' },
    { type: 'info', message: 'Electricity bill due in 3 days', time: '5 hours ago' },
    { type: 'success', message: 'Savings goal target achieved!', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                <p className="text-2xl font-bold text-green-600">₹1,25,000</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Income</p>
                <p className="text-2xl font-bold text-blue-600">₹45,000</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Plus className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month Spent</p>
                <p className="text-2xl font-bold text-orange-600">₹37,000</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Savings Rate</p>
                <p className="text-2xl font-bold text-purple-600">18%</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Flag className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Chart */}
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, '']} />
                <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="expenses" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Spending Chart */}
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
      </div>

      {/* Daily Expenses & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Expenses */}
        <Card className="gradient-card border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle>This Week's Daily Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailyExpenses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                <Bar dataKey="amount" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Financial Goals */}
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Financial Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{goal.name}</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹{goal.current.toLocaleString()}</span>
                  <span>₹{goal.target.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Notifications */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Recent Alerts & Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/50">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={alert.type === 'warning' ? 'destructive' : alert.type === 'success' ? 'default' : 'secondary'}
                  >
                    {alert.type}
                  </Badge>
                  <span className="text-sm">{alert.message}</span>
                </div>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2 gradient-primary">
              <Plus className="h-5 w-5" />
              Add Expense
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-white/80">
              <Calendar className="h-5 w-5" />
              Plan Budget
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-white/80">
              <Flag className="h-5 w-5" />
              Set Goal
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 bg-white/80">
              <Heart className="h-5 w-5" />
              Family Budget
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
