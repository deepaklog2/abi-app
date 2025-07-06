
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, AlertTriangle, TrendingUp, TrendingDown, DollarSign, Calendar, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AlertRule {
  id: string;
  type: 'budget' | 'goal' | 'bill' | 'savings';
  title: string;
  description: string;
  threshold: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
  lastTriggered?: string;
}

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  category: string;
}

const Alerts = () => {
  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: '1',
      type: 'budget',
      title: 'Daily Budget Alert',
      description: 'Alert when daily spending exceeds limit',
      threshold: 1000,
      frequency: 'daily',
      isActive: true,
      lastTriggered: '2024-01-15'
    },
    {
      id: '2',
      type: 'budget',
      title: 'Food Budget Warning',
      description: 'Alert when food budget reaches 80%',
      threshold: 80,
      frequency: 'weekly',
      isActive: true
    },
    {
      id: '3',
      type: 'goal',
      title: 'Savings Goal Milestone',
      description: 'Celebrate when reaching savings milestones',
      threshold: 25,
      frequency: 'monthly',
      isActive: true
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Budget Threshold Exceeded',
      message: 'Your daily spending has exceeded ₹1,000. Current spending: ₹1,250',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      category: 'Budget'
    },
    {
      id: '2',
      type: 'info',
      title: 'Bill Reminder',
      message: 'Electricity bill of ₹2,500 is due in 3 days',
      timestamp: '2024-01-15T09:00:00Z',
      isRead: false,
      category: 'Bills'
    },
    {
      id: '3',
      type: 'success',
      title: 'Goal Achievement',
      message: 'Congratulations! You\'ve reached 50% of your Emergency Fund goal',
      timestamp: '2024-01-14T16:45:00Z',
      isRead: true,
      category: 'Goals'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Unusual Spending Pattern',
      message: 'Entertainment expenses are 40% higher than usual this month',
      timestamp: '2024-01-14T14:20:00Z',
      isRead: false,
      category: 'Analysis'
    }
  ]);

  const [newRule, setNewRule] = useState({
    type: 'budget' as 'budget' | 'goal' | 'bill' | 'savings',
    title: '',
    description: '',
    threshold: '',
    frequency: 'daily' as 'daily' | 'weekly' | 'monthly'
  });

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('alertRules');
    if (saved) {
      setAlertRules(JSON.parse(saved));
    }
    
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('alertRules', JSON.stringify(alertRules));
  }, [alertRules]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addAlertRule = () => {
    if (!newRule.title || !newRule.threshold) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const rule: AlertRule = {
      id: Date.now().toString(),
      type: newRule.type,
      title: newRule.title,
      description: newRule.description,
      threshold: parseFloat(newRule.threshold),
      frequency: newRule.frequency,
      isActive: true
    };

    setAlertRules(prev => [rule, ...prev]);
    setNewRule({ type: 'budget', title: '', description: '', threshold: '', frequency: 'daily' });
    setShowAddForm(false);
    
    toast({
      title: "Alert Rule Added",
      description: `${rule.title} has been activated`,
    });
  };

  const toggleAlertRule = (id: string) => {
    setAlertRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getUnreadCount = () => notifications.filter(n => !n.isRead).length;
  const getActiveRulesCount = () => alertRules.filter(r => r.isActive).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'success': return <TrendingUp className="h-4 w-4 text-green-600" />;
      default: return <Bell className="h-4 w-4 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'error': return 'border-red-200 bg-red-50';
      case 'success': return 'border-green-200 bg-green-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
          <Badge variant="default" className="flex items-center gap-1">
            <Bell className="h-3 w-3" />
            {getUnreadCount()} unread
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <Button onClick={() => setShowAddForm(true)} className="gradient-primary">
            <Settings className="h-4 w-4 mr-2" />
            Add Alert Rule
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unread Alerts</p>
                <p className="text-2xl font-bold text-red-600">{getUnreadCount()}</p>
              </div>
              <Bell className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold text-blue-600">{getActiveRulesCount()}</p>
              </div>
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Budget Alerts</p>
                <p className="text-2xl font-bold text-orange-600">3</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Alert Rule */}
      {showAddForm && (
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Create New Alert Rule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label>Alert Type</Label>
                  <Select value={newRule.type} onValueChange={(value: 'budget' | 'goal' | 'bill' | 'savings') => setNewRule(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget Alert</SelectItem>
                      <SelectItem value="goal">Goal Milestone</SelectItem>
                      <SelectItem value="bill">Bill Reminder</SelectItem>
                      <SelectItem value="savings">Savings Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Alert Title</Label>
                  <Input
                    value={newRule.title}
                    onChange={(e) => setNewRule(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Monthly Budget Warning"
                    className="bg-white/80"
                  />
                </div>

                <div>
                  <Label>Threshold {newRule.type === 'budget' ? '(₹ or %)' : '(Amount/Percentage)'}</Label>
                  <Input
                    type="number"
                    value={newRule.threshold}
                    onChange={(e) => setNewRule(prev => ({ ...prev, threshold: e.target.value }))}
                    placeholder="1000"
                    className="bg-white/80"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Description</Label>
                  <Input
                    value={newRule.description}
                    onChange={(e) => setNewRule(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe when this alert should trigger"
                    className="bg-white/80"
                  />
                </div>

                <div>
                  <Label>Frequency</Label>
                  <Select value={newRule.frequency} onValueChange={(value: 'daily' | 'weekly' | 'monthly') => setNewRule(prev => ({ ...prev, frequency: value }))}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={addAlertRule} className="gradient-primary">
                Create Alert Rule
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notifications */}
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${getNotificationColor(notification.type)} ${
                    !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{notification.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {notification.category}
                          </Badge>
                          {!notification.isRead && (
                            <Badge variant="destructive" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {!notification.isRead && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs"
                        >
                          Mark Read
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-red-600"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alert Rules Management */}
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Alert Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {alertRules.map((rule) => (
                <div key={rule.id} className="p-4 bg-white/50 rounded-lg border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{rule.title}</h4>
                        <Badge variant={rule.type === 'budget' ? 'destructive' : rule.type === 'goal' ? 'default' : 'secondary'}>
                          {rule.type}
                        </Badge>
                        <Badge variant={rule.isActive ? 'default' : 'outline'}>
                          {rule.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Threshold: {rule.type === 'budget' && rule.threshold < 100 ? `${rule.threshold}%` : `₹${rule.threshold}`}</span>
                        <span>Frequency: {rule.frequency}</span>
                        {rule.lastTriggered && (
                          <span>Last: {new Date(rule.lastTriggered).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => toggleAlertRule(rule.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Threshold Alerts */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Budget Threshold Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Daily Budget:</strong> Exceeded by ₹250 (₹1,250/₹1,000)
              </AlertDescription>
            </Alert>
            
            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                <strong>Food Budget:</strong> 85% used (₹10,200/₹12,000)
              </AlertDescription>
            </Alert>
            
            <Alert>
              <DollarSign className="h-4 w-4" />
              <AlertDescription>
                <strong>Entertainment:</strong> 40% higher than usual this month
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;
