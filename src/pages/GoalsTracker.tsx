
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Target, Calendar, TrendingUp, Flag, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'completed' | 'paused';
  monthlyContribution: number;
}

const GoalsTracker = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      description: '6 months of expenses for financial security',
      targetAmount: 200000,
      currentAmount: 85000,
      category: 'Emergency',
      deadline: '2024-12-31',
      priority: 'high',
      status: 'active',
      monthlyContribution: 10000
    },
    {
      id: '2',
      title: 'Dream Vacation',
      description: 'Europe trip for 2 weeks',
      targetAmount: 150000,
      currentAmount: 45000,
      category: 'Travel',
      deadline: '2024-10-15',
      priority: 'medium',
      status: 'active',
      monthlyContribution: 8000
    },
    {
      id: '3',
      title: 'New Laptop',
      description: 'MacBook Pro for work',
      targetAmount: 120000,
      currentAmount: 120000,
      category: 'Technology',
      deadline: '2024-06-30',
      priority: 'high',
      status: 'completed',
      monthlyContribution: 15000
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetAmount: '',
    category: '',
    deadline: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    monthlyContribution: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const categories = [
    'Emergency', 'Travel', 'Technology', 'Education', 'Health', 
    'Home', 'Investment', 'Car', 'Wedding', 'Other'
  ];

  useEffect(() => {
    const saved = localStorage.getItem('financialGoals');
    if (saved) {
      setGoals(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('financialGoals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      category: newGoal.category,
      deadline: newGoal.deadline,
      priority: newGoal.priority,
      status: 'active',
      monthlyContribution: parseFloat(newGoal.monthlyContribution) || 0
    };

    setGoals(prev => [goal, ...prev]);
    setNewGoal({
      title: '', description: '', targetAmount: '', category: '',
      deadline: '', priority: 'medium', monthlyContribution: ''
    });
    setShowAddForm(false);
    
    toast({
      title: "Goal Added",
      description: `${goal.title} has been added to your goals`,
    });
  };

  const updateGoalAmount = (id: string, amount: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        const updatedAmount = Math.min(amount, goal.targetAmount);
        const isCompleted = updatedAmount >= goal.targetAmount;
        
        if (isCompleted && goal.status !== 'completed') {
          toast({
            title: "Goal Completed! 🎉",
            description: `Congratulations! You've achieved your goal: ${goal.title}`,
          });
        }
        
        return {
          ...goal,
          currentAmount: updatedAmount,
          status: isCompleted ? 'completed' : goal.status
        };
      }
      return goal;
    }));
  };

  const getProgress = (goal: Goal) => (goal.currentAmount / goal.targetAmount) * 100;

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const getRequiredMonthlyContribution = (goal: Goal) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    const daysRemaining = getDaysRemaining(goal.deadline);
    const monthsRemaining = Math.max(1, daysRemaining / 30);
    return remaining / monthsRemaining;
  };

  const totalGoalsValue = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const activeGoals = goals.filter(g => g.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Financial Goals Tracker</h1>
        <Button onClick={() => setShowAddForm(true)} className="gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Goals Value</p>
                <p className="text-2xl font-bold text-blue-600">₹{totalGoalsValue.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Saved</p>
                <p className="text-2xl font-bold text-green-600">₹{totalSaved.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Goals</p>
                <p className="text-2xl font-bold text-purple-600">{completedGoals}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
                <p className="text-2xl font-bold text-orange-600">{activeGoals}</p>
              </div>
              <Flag className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Goal Form */}
      {showAddForm && (
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Add New Financial Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label>Goal Title *</Label>
                  <Input
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Emergency Fund"
                    className="bg-white/80"
                  />
                </div>

                <div>
                  <Label>Target Amount (₹) *</Label>
                  <Input
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                    placeholder="100000"
                    className="bg-white/80"
                  />
                </div>

                <div>
                  <Label>Category</Label>
                  <Select value={newGoal.category} onValueChange={(value) => setNewGoal(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Monthly Contribution (₹)</Label>
                  <Input
                    type="number"
                    value={newGoal.monthlyContribution}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, monthlyContribution: e.target.value }))}
                    placeholder="5000"
                    className="bg-white/80"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your goal..."
                    className="bg-white/80"
                  />
                </div>

                <div>
                  <Label>Target Date *</Label>
                  <Input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                    className="bg-white/80"
                  />
                </div>

                <div>
                  <Label>Priority</Label>
                  <Select value={newGoal.priority} onValueChange={(value: 'high' | 'medium' | 'low') => setNewGoal(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={addGoal} className="gradient-primary">
                Add Goal
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = getProgress(goal);
          const daysRemaining = getDaysRemaining(goal.deadline);
          const requiredMonthly = getRequiredMonthlyContribution(goal);
          const isPastDeadline = daysRemaining < 0;
          
          return (
            <Card key={goal.id} className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{goal.title}</h3>
                      <Badge variant={goal.priority === 'high' ? 'destructive' : goal.priority === 'medium' ? 'default' : 'secondary'}>
                        {goal.priority} priority
                      </Badge>
                      <Badge variant={goal.status === 'completed' ? 'default' : 'outline'}>
                        {goal.status === 'completed' ? 'Completed' : 'Active'}
                      </Badge>
                    </div>
                    {goal.description && (
                      <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {isPastDeadline ? `${Math.abs(daysRemaining)} days overdue` : `${daysRemaining} days left`}
                      </span>
                      <span>{goal.category}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      ₹{goal.currentAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      of ₹{goal.targetAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress: {progress.toFixed(1)}%</span>
                    {isPastDeadline && goal.status !== 'completed' && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Overdue
                      </Badge>
                    )}
                  </div>
                  <Progress value={progress} className="h-3" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Remaining Amount</p>
                      <p className="font-bold text-blue-600">
                        ₹{(goal.targetAmount - goal.currentAmount).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Required Monthly</p>
                      <p className="font-bold text-orange-600">
                        ₹{requiredMonthly.toFixed(0)}
                      </p>
                    </div>
                    
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Current Monthly</p>
                      <p className="font-bold text-green-600">
                        ₹{goal.monthlyContribution.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {goal.status !== 'completed' && (
                    <div className="flex gap-2 mt-4">
                      <Input
                        type="number"
                        placeholder="Add amount"
                        className="flex-1"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const amount = parseFloat((e.target as HTMLInputElement).value);
                            if (amount > 0) {
                              updateGoalAmount(goal.id, goal.currentAmount + amount);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                      <Button
                        onClick={(e) => {
                          const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                          const amount = parseFloat(input.value);
                          if (amount > 0) {
                            updateGoalAmount(goal.id, goal.currentAmount + amount);
                            input.value = '';
                          }
                        }}
                        className="gradient-primary"
                      >
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsTracker;
