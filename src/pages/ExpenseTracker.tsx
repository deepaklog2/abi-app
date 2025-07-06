
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Plus, TrendingUp, TrendingDown, Bell, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

interface DailyBudget {
  limit: number;
  spent: number;
  date: string;
}

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [dailyBudget, setDailyBudget] = useState<DailyBudget>({ limit: 1000, spent: 0, date: new Date().toDateString() });
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: '',
    description: '',
    type: 'expense' as 'income' | 'expense'
  });

  const categories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment',
    'Bills & Utilities', 'Healthcare', 'Education', 'Travel',
    'Groceries', 'Rent', 'Other'
  ];

  const incomeCategories = [
    'Salary', 'Freelance', 'Part-time', 'Business', 'Investment', 'Other'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
    
    const savedBudget = localStorage.getItem('dailyBudget');
    if (savedBudget) {
      setDailyBudget(JSON.parse(savedBudget));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // Calculate today's spending
    const today = new Date().toDateString();
    const todayExpenses = expenses.filter(e => 
      new Date(e.date).toDateString() === today && e.type === 'expense'
    );
    const todaySpent = todayExpenses.reduce((sum, e) => sum + e.amount, 0);
    
    const updatedBudget = { ...dailyBudget, spent: todaySpent, date: today };
    setDailyBudget(updatedBudget);
    localStorage.setItem('dailyBudget', JSON.stringify(updatedBudget));

    // Alert if daily limit crossed
    if (todaySpent > dailyBudget.limit) {
      toast({
        title: "Daily Budget Alert!",
        description: `You've exceeded your daily budget by ₹${todaySpent - dailyBudget.limit}`,
        variant: "destructive"
      });
    }
  }, [expenses]);

  const addExpense = () => {
    if (!newExpense.amount || !newExpense.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in amount and category",
        variant: "destructive"
      });
      return;
    }

    const expense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      description: newExpense.description,
      date: new Date().toISOString(),
      type: newExpense.type
    };

    setExpenses(prev => [expense, ...prev]);
    setNewExpense({ amount: '', category: '', description: '', type: 'expense' });
    
    toast({
      title: `${newExpense.type === 'income' ? 'Income' : 'Expense'} Added`,
      description: `₹${newExpense.amount} for ${newExpense.category}`,
    });
  };

  const getTotalIncome = () => expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const getTotalExpenses = () => expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const getBalance = () => getTotalIncome() - getTotalExpenses();

  const dailyProgress = Math.min((dailyBudget.spent / dailyBudget.limit) * 100, 100);
  const isOverBudget = dailyBudget.spent > dailyBudget.limit;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Expense Tracker</h1>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <Badge variant={isOverBudget ? "destructive" : "default"}>
            Daily Budget: {isOverBudget ? 'Exceeded' : 'On Track'}
          </Badge>
        </div>
      </div>

      {/* Real-time Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                <p className={`text-2xl font-bold ${getBalance() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{getBalance().toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-blue-600">₹{getTotalIncome().toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-orange-600">₹{getTotalExpenses().toLocaleString()}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Spent</p>
                <p className={`text-2xl font-bold ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                  ₹{dailyBudget.spent.toLocaleString()}
                </p>
              </div>
              <AlertTriangle className={`h-8 w-8 ${isOverBudget ? 'text-red-600' : 'text-green-600'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Budget Limiter */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Daily Budget Limiter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label>Daily Budget Limit</Label>
              <Input
                type="number"
                value={dailyBudget.limit}
                onChange={(e) => setDailyBudget(prev => ({ ...prev, limit: parseInt(e.target.value) || 0 }))}
                className="bg-white/80"
              />
            </div>
            <div className="flex-1">
              <Label>Spent Today</Label>
              <div className="text-2xl font-bold text-orange-600">₹{dailyBudget.spent}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{dailyProgress.toFixed(1)}%</span>
            </div>
            <Progress value={dailyProgress} className="h-3" />
          </div>
          {isOverBudget && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You've exceeded your daily budget by ₹{(dailyBudget.spent - dailyBudget.limit).toLocaleString()}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Add New Transaction */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label>Type</Label>
              <Select value={newExpense.type} onValueChange={(value: 'income' | 'expense') => setNewExpense(prev => ({ ...prev, type: value }))}>
                <SelectTrigger className="bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount (₹)</Label>
              <Input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                className="bg-white/80"
                placeholder="1000"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={newExpense.category} onValueChange={(value) => setNewExpense(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="bg-white/80">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {(newExpense.type === 'income' ? incomeCategories : categories).map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={newExpense.description}
                onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                className="bg-white/80"
                placeholder="Optional description"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addExpense} className="gradient-primary w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {expenses.slice(0, 10).map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${expense.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="font-medium">{expense.category}</p>
                    {expense.description && <p className="text-sm text-muted-foreground">{expense.description}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseTracker;
