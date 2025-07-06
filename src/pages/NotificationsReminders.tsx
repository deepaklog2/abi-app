import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Bell, Calendar, IndianRupee, GraduationCap, Zap, Plane, Gift, ShoppingCart, Home, Heart, Plus, Trash2, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Reminder {
  id: string;
  title: string;
  message: string;
  category: 'school' | 'bills' | 'travel' | 'festival' | 'grocery' | 'medical' | 'rent' | 'custom';
  amount?: number;
  dueDate: string;
  isActive: boolean;
  priority: 'high' | 'medium' | 'low';
  recurring?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  createdAt: string;
}

const NotificationsReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Pani Malar College Fees',
      message: 'Pay School Fees Next Week - Semester fees due',
      category: 'school',
      amount: 75000,
      dueDate: '2024-02-15',
      isActive: true,
      priority: 'high',
      recurring: 'monthly',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'TNEB Electricity Bill',
      message: 'Pay Electricity Bill Today - Chennai EB connection',
      category: 'bills',
      amount: 2500,
      dueDate: '2024-01-20',
      isActive: true,
      priority: 'high',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      title: 'Travel Budget Alert',
      message: 'Your Travel Budget is Almost Over - Only ₹500 left for Chennai Metro',
      category: 'travel',
      amount: 500,
      dueDate: '2024-01-25',
      isActive: true,
      priority: 'medium',
      createdAt: '2024-01-15'
    },
    {
      id: '4',
      title: 'Pongal Festival Savings',
      message: 'Festival is Coming – Save ₹5000 for Pongal celebrations',
      category: 'festival',
      amount: 5000,
      dueDate: '2024-01-14',
      isActive: true,
      priority: 'medium',
      createdAt: '2024-01-01'
    },
    {
      id: '5',
      title: 'Monthly Groceries',
      message: 'Grocery shopping reminder - Spencer\'s Plaza or Express Avenue',
      category: 'grocery',
      amount: 8000,
      dueDate: '2024-01-30',
      isActive: true,
      priority: 'low',
      recurring: 'monthly',
      createdAt: '2024-01-15'
    }
  ]);

  const [newReminder, setNewReminder] = useState({
    title: '',
    message: '',
    category: 'custom' as Reminder['category'],
    amount: '',
    dueDate: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    recurring: undefined as Reminder['recurring']
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<'all' | Reminder['category']>('all');

  useEffect(() => {
    const saved = localStorage.getItem('chennai-reminders');
    if (saved) {
      setReminders(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chennai-reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = () => {
    if (!newReminder.title || !newReminder.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and due date",
        variant: "destructive"
      });
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title,
      message: newReminder.message || newReminder.title,
      category: newReminder.category,
      amount: newReminder.amount ? parseFloat(newReminder.amount) : undefined,
      dueDate: newReminder.dueDate,
      isActive: true,
      priority: newReminder.priority,
      recurring: newReminder.recurring,
      createdAt: new Date().toISOString()
    };

    setReminders(prev => [reminder, ...prev]);
    setNewReminder({
      title: '',
      message: '',
      category: 'custom',
      amount: '',
      dueDate: '',
      priority: 'medium',
      recurring: undefined
    });
    setShowAddForm(false);
    
    toast({
      title: "Reminder Added",
      description: `${reminder.title} has been set`,
    });
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, isActive: !reminder.isActive } : reminder
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
    toast({
      title: "Reminder Deleted",
      description: "Reminder has been removed",
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'school': return <GraduationCap className="h-4 w-4" />;
      case 'bills': return <Zap className="h-4 w-4" />;
      case 'travel': return <Plane className="h-4 w-4" />;
      case 'festival': return <Gift className="h-4 w-4" />;
      case 'grocery': return <ShoppingCart className="h-4 w-4" />;
      case 'medical': return <Heart className="h-4 w-4" />;
      case 'rent': return <Home className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'school': return 'bg-blue-100 text-blue-800';
      case 'bills': return 'bg-yellow-100 text-yellow-800';
      case 'travel': return 'bg-green-100 text-green-800';
      case 'festival': return 'bg-purple-100 text-purple-800';
      case 'grocery': return 'bg-orange-100 text-orange-800';
      case 'medical': return 'bg-red-100 text-red-800';
      case 'rent': return 'bg-gray-100 text-gray-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const filteredReminders = filter === 'all' 
    ? reminders 
    : reminders.filter(r => r.category === filter);

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getActiveRemindersCount = () => reminders.filter(r => r.isActive).length;
  const getOverdueCount = () => reminders.filter(r => getDaysUntilDue(r.dueDate) < 0 && r.isActive).length;
  const getUpcomingCount = () => reminders.filter(r => getDaysUntilDue(r.dueDate) <= 7 && getDaysUntilDue(r.dueDate) >= 0 && r.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Notifications & Reminders</h1>
          <Badge variant="default" className="bg-blue-600">
            Chennai Based
          </Badge>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Reminders</p>
                <p className="text-2xl font-bold text-blue-600">{getActiveRemindersCount()}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{getOverdueCount()}</p>
              </div>
              <Clock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-orange-600">{getUpcomingCount()}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-green-600">7</p>
              </div>
              <Gift className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Reminder Form */}
      {showAddForm && (
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Create New Reminder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={newReminder.title}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., College Fees Payment"
                    className="bg-white/80"
                  />
                </div>

                <div>
                  <Label>Category</Label>
                  <Select value={newReminder.category} onValueChange={(value: Reminder['category']) => setNewReminder(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school">School/College</SelectItem>
                      <SelectItem value="bills">Bills</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="grocery">Grocery</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Amount (₹) - Optional</Label>
                  <Input
                    type="number"
                    value={newReminder.amount}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="5000"
                    className="bg-white/80"
                  />
                </div>

                <div>
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={newReminder.dueDate}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="bg-white/80"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Message</Label>
                  <Textarea
                    value={newReminder.message}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Custom reminder message"
                    className="bg-white/80"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Priority</Label>
                  <Select value={newReminder.priority} onValueChange={(value: 'high' | 'medium' | 'low') => setNewReminder(prev => ({ ...prev, priority: value }))}>
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

                <div>
                  <Label>Recurring - Optional</Label>
                  <Select value={newReminder.recurring || ''} onValueChange={(value: string) => setNewReminder(prev => ({ ...prev, recurring: value === '' ? undefined : value as Reminder['recurring'] }))}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue placeholder="Select if recurring" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={addReminder} className="gradient-primary">
                Create Reminder
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Section */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              All ({reminders.length})
            </Button>
            {['school', 'bills', 'travel', 'festival', 'grocery', 'medical', 'rent', 'custom'].map(category => (
              <Button 
                key={category}
                variant={filter === category ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter(category as Reminder['category'])}
                className="capitalize"
              >
                {getCategoryIcon(category)}
                <span className="ml-1">{category} ({reminders.filter(r => r.category === category).length})</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.map((reminder) => {
          const daysUntil = getDaysUntilDue(reminder.dueDate);
          const isOverdue = daysUntil < 0;
          const isUpcoming = daysUntil <= 7 && daysUntil >= 0;

          return (
            <Card key={reminder.id} className={`gradient-card border-0 shadow-lg border-l-4 ${getPriorityColor(reminder.priority)}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(reminder.category)}
                        <h3 className="font-semibold text-lg">{reminder.title}</h3>
                      </div>
                      <Badge className={getCategoryColor(reminder.category)}>
                        {reminder.category}
                      </Badge>
                      <Badge variant={reminder.priority === 'high' ? 'destructive' : reminder.priority === 'medium' ? 'default' : 'secondary'}>
                        {reminder.priority}
                      </Badge>
                      {reminder.recurring && (
                        <Badge variant="outline">
                          {reminder.recurring}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{reminder.message}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {new Date(reminder.dueDate).toLocaleDateString()}</span>
                      </div>
                      {reminder.amount && (
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          <span>₹{reminder.amount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-600' : isUpcoming ? 'text-orange-600' : 'text-green-600'}`}>
                        <Clock className="h-4 w-4" />
                        <span>
                          {isOverdue ? `${Math.abs(daysUntil)} days overdue` : 
                           daysUntil === 0 ? 'Due today' : 
                           `${daysUntil} days left`}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={reminder.isActive}
                      onCheckedChange={() => toggleReminder(reminder.id)}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteReminder(reminder.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredReminders.length === 0 && (
        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No reminders found for the selected filter.</p>
            <Button onClick={() => setShowAddForm(true)} className="mt-4 gradient-primary">
              Create Your First Reminder
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationsReminders;
