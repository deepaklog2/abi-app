
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Home, 
  Car, 
  Wallet, 
  Bell, 
  Award, 
  BookOpen, 
  DollarSign,
  Calendar,
  AlertCircle,
  TrendingUp,
  Gift
} from 'lucide-react';

interface BudgetItem {
  id: string;
  category: 'hostel' | 'tuition' | 'travel' | 'income';
  description: string;
  amount: number;
  date: string;
  type: 'expense' | 'income';
}

interface Reminder {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  category: 'exam' | 'loan' | 'books' | 'other';
  priority: 'high' | 'medium' | 'low';
}

const StudentKit = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newItem, setNewItem] = useState({
    category: 'hostel' as const,
    description: '',
    amount: '',
    type: 'expense' as const
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBudget = localStorage.getItem('studentBudget');
    const savedReminders = localStorage.getItem('studentReminders');
    
    if (savedBudget) {
      setBudgetItems(JSON.parse(savedBudget));
    } else {
      // Initialize with dummy data
      const dummyBudget: BudgetItem[] = [
        { id: '1', category: 'hostel', description: 'Monthly hostel fee', amount: -8000, date: '2024-01-01', type: 'expense' },
        { id: '2', category: 'tuition', description: 'Semester fee', amount: -25000, date: '2024-01-15', type: 'expense' },
        { id: '3', category: 'travel', description: 'Bus pass', amount: -500, date: '2024-01-03', type: 'expense' },
        { id: '4', category: 'income', description: 'Part-time tutoring', amount: 5000, date: '2024-01-20', type: 'income' },
        { id: '5', category: 'income', description: 'Freelance work', amount: 3000, date: '2024-01-25', type: 'income' }
      ];
      setBudgetItems(dummyBudget);
      localStorage.setItem('studentBudget', JSON.stringify(dummyBudget));
    }

    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    } else {
      // Initialize with dummy reminders
      const dummyReminders: Reminder[] = [
        { id: '1', title: 'Mid-term exam fee', amount: 500, dueDate: '2024-02-15', category: 'exam', priority: 'high' },
        { id: '2', title: 'Library book renewal', amount: 50, dueDate: '2024-02-05', category: 'books', priority: 'medium' },
        { id: '3', title: 'Student loan EMI', amount: 3000, dueDate: '2024-02-10', category: 'loan', priority: 'high' },
        { id: '4', title: 'Lab manual purchase', amount: 800, dueDate: '2024-02-20', category: 'books', priority: 'medium' }
      ];
      setReminders(dummyReminders);
      localStorage.setItem('studentReminders', JSON.stringify(dummyReminders));
    }
  }, []);

  const addBudgetItem = () => {
    if (!newItem.description || !newItem.amount) return;

    const item: BudgetItem = {
      id: Date.now().toString(),
      category: newItem.category,
      description: newItem.description,
      amount: newItem.type === 'expense' ? -Math.abs(Number(newItem.amount)) : Math.abs(Number(newItem.amount)),
      date: new Date().toISOString().split('T')[0],
      type: newItem.type
    };

    const updatedItems = [...budgetItems, item];
    setBudgetItems(updatedItems);
    localStorage.setItem('studentBudget', JSON.stringify(updatedItems));
    
    setNewItem({ category: 'hostel', description: '', amount: '', type: 'expense' });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hostel': return <Home className="h-4 w-4" />;
      case 'tuition': return <GraduationCap className="h-4 w-4" />;
      case 'travel': return <Car className="h-4 w-4" />;
      case 'income': return <DollarSign className="h-4 w-4" />;
      default: return <Wallet className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const totalByCategory = {
    hostel: budgetItems.filter(item => item.category === 'hostel').reduce((sum, item) => sum + item.amount, 0),
    tuition: budgetItems.filter(item => item.category === 'tuition').reduce((sum, item) => sum + item.amount, 0),
    travel: budgetItems.filter(item => item.category === 'travel').reduce((sum, item) => sum + item.amount, 0),
    income: budgetItems.filter(item => item.category === 'income').reduce((sum, item) => sum + item.amount, 0)
  };

  const netBalance = Object.values(totalByCategory).reduce((sum, amount) => sum + amount, 0);

  const scholarships = [
    { name: 'Merit Scholarship', amount: '₹50,000', eligibility: '85%+ marks', deadline: 'March 15' },
    { name: 'Need-based Aid', amount: '₹25,000', eligibility: 'Family income < ₹3L', deadline: 'April 30' },
    { name: 'Sports Scholarship', amount: '₹30,000', eligibility: 'State level player', deadline: 'February 28' },
    { name: 'Research Grant', amount: '₹40,000', eligibility: 'Published paper', deadline: 'May 15' }
  ];

  const certifications = [
    { name: 'Google Digital Marketing', provider: 'Google', duration: '6 months', cost: 'Free' },
    { name: 'AWS Cloud Practitioner', provider: 'Amazon', duration: '3 months', cost: 'Free' },
    { name: 'Microsoft Excel', provider: 'Microsoft', duration: '2 months', cost: 'Free' },
    { name: 'Python Programming', provider: 'Coursera', duration: '4 months', cost: 'Free' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Student Budget Kit</h1>
          <p className="text-muted-foreground">Manage your student finances effectively</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Net Balance</p>
          <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{netBalance.toLocaleString()}
          </p>
        </div>
      </div>

      <Tabs defaultValue="budget" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="budget">Budget Tracker</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          <TabsTrigger value="certifications">Free Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="budget" className="space-y-6">
          {/* Budget Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hostel Expenses</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">₹{Math.abs(totalByCategory.hostel).toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tuition Fees</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">₹{Math.abs(totalByCategory.tuition).toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Travel Costs</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">₹{Math.abs(totalByCategory.travel).toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Part-time Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹{totalByCategory.income.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>

          {/* Add New Item */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value as any})}
                  >
                    <option value="hostel">Hostel</option>
                    <option value="tuition">Tuition</option>
                    <option value="travel">Travel</option>
                    <option value="income">Part-time Income</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newItem.type}
                    onChange={(e) => setNewItem({...newItem, type: e.target.value as any})}
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={newItem.amount}
                    onChange={(e) => setNewItem({...newItem, amount: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={addBudgetItem} className="w-full md:w-auto">
                Add Entry
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {budgetItems.slice(-10).reverse().map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(item.category)}
                      <div>
                        <p className="font-medium text-black">{item.description}</p>
                        <p className="text-sm text-muted-foreground capitalize">{item.category} • {item.date}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${item.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.amount >= 0 ? '+' : ''}₹{Math.abs(item.amount).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Upcoming Reminders</span>
              </CardTitle>
              <CardDescription>Keep track of important payments and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className={`h-5 w-5 ${
                        reminder.priority === 'high' ? 'text-red-500' : 
                        reminder.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                      <div>
                        <p className="font-medium text-black">{reminder.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(reminder.dueDate).toLocaleDateString()} • {reminder.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={getPriorityColor(reminder.priority) as any}>
                        {reminder.priority}
                      </Badge>
                      <p className="font-semibold text-red-600">₹{reminder.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scholarships" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Available Scholarships</span>
              </CardTitle>
              <CardDescription>Financial aid opportunities for students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scholarships.map((scholarship, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <h3 className="font-semibold text-black">{scholarship.name}</h3>
                    <p className="text-2xl font-bold text-green-600">{scholarship.amount}</p>
                    <p className="text-sm text-muted-foreground">Eligibility: {scholarship.eligibility}</p>
                    <p className="text-sm text-red-600">Deadline: {scholarship.deadline}</p>
                    <Button size="sm" className="w-full mt-2">Apply Now</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5" />
                <span>Free Certifications</span>
              </CardTitle>
              <CardDescription>Enhance your skills with free online certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <h3 className="font-semibold text-black">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">Provider: {cert.provider}</p>
                    <p className="text-sm text-muted-foreground">Duration: {cert.duration}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{cert.cost}</Badge>
                      <Button size="sm">Start Course</Button>
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

export default StudentKit;
