
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  PiggyBank, 
  TrendingUp, 
  Calendar,
  IndianRupee,
  Target,
  Award,
  Plus,
  Minus
} from 'lucide-react';

const MicroInvestment = () => {
  // Chit Fund State
  const [chitFunds, setChitFunds] = useState([
    {
      id: 1,
      name: "Friends Circle Chit",
      totalMembers: 10,
      monthlyAmount: 5000,
      duration: 10,
      currentMonth: 3,
      myTurn: 7,
      status: "active"
    },
    {
      id: 2,
      name: "Office Colleagues",
      totalMembers: 20,
      monthlyAmount: 2000,
      duration: 20,
      currentMonth: 8,
      myTurn: 15,
      status: "active"
    }
  ]);

  // Daily Savings State
  const [dailySavings, setDailySavings] = useState({
    currentStreak: 45,
    totalSaved: 450,
    monthlyTarget: 300,
    todaySaved: false
  });

  // Investment State
  const [investments, setInvestments] = useState([
    {
      id: 1,
      type: "Gold",
      platform: "Paytm Gold",
      monthlyAmount: 500,
      totalInvested: 2500,
      currentValue: 2650,
      returns: 150
    },
    {
      id: 2,
      type: "SIP",
      platform: "Groww MF",
      monthlyAmount: 1000,
      totalInvested: 6000,
      currentValue: 6420,
      returns: 420
    }
  ]);

  const [newChitFund, setNewChitFund] = useState({
    name: '',
    totalMembers: '',
    monthlyAmount: '',
    duration: ''
  });

  const [newInvestment, setNewInvestment] = useState({
    type: 'Gold',
    platform: '',
    monthlyAmount: ''
  });

  const addChitFund = () => {
    if (newChitFund.name && newChitFund.totalMembers && newChitFund.monthlyAmount) {
      setChitFunds([...chitFunds, {
        id: Date.now(),
        name: newChitFund.name,
        totalMembers: parseInt(newChitFund.totalMembers),
        monthlyAmount: parseInt(newChitFund.monthlyAmount),
        duration: parseInt(newChitFund.duration) || parseInt(newChitFund.totalMembers),
        currentMonth: 1,
        myTurn: Math.ceil(Math.random() * parseInt(newChitFund.totalMembers)),
        status: "active"
      }]);
      setNewChitFund({ name: '', totalMembers: '', monthlyAmount: '', duration: '' });
    }
  };

  const addInvestment = () => {
    if (newInvestment.platform && newInvestment.monthlyAmount) {
      setInvestments([...investments, {
        id: Date.now(),
        type: newInvestment.type,
        platform: newInvestment.platform,
        monthlyAmount: parseInt(newInvestment.monthlyAmount),
        totalInvested: parseInt(newInvestment.monthlyAmount),
        currentValue: parseInt(newInvestment.monthlyAmount),
        returns: 0
      }]);
      setNewInvestment({ type: 'Gold', platform: '', monthlyAmount: '' });
    }
  };

  const markTodaysSaving = () => {
    if (!dailySavings.todaySaved) {
      setDailySavings(prev => ({
        ...prev,
        currentStreak: prev.currentStreak + 1,
        totalSaved: prev.totalSaved + 10,
        todaySaved: true
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Micro-Investment Services</h1>
          <p className="text-muted-foreground">
            Track your small investments and build wealth gradually
          </p>
        </div>
      </div>

      <Tabs defaultValue="chit-funds" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chit-funds" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Chit Funds
          </TabsTrigger>
          <TabsTrigger value="daily-savings" className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            Daily ₹10 Savings
          </TabsTrigger>
          <TabsTrigger value="investments" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Micro Investments
          </TabsTrigger>
        </TabsList>

        {/* Chit Fund Budgeting */}
        <TabsContent value="chit-funds" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {chitFunds.map((fund) => (
              <Card key={fund.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{fund.name}</CardTitle>
                      <CardDescription>
                        {fund.totalMembers} members • ₹{fund.monthlyAmount}/month
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      {fund.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Current Month</p>
                      <p className="font-semibold">{fund.currentMonth}/{fund.duration}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">My Turn</p>
                      <p className="font-semibold">Month {fund.myTurn}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round((fund.currentMonth / fund.duration) * 100)}%</span>
                    </div>
                    <Progress value={(fund.currentMonth / fund.duration) * 100} />
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Contribution</span>
                      <span className="font-semibold">₹{fund.currentMonth * fund.monthlyAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Expected Amount</span>
                      <span className="font-semibold text-green-600">₹{fund.totalMembers * fund.monthlyAmount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Chit Fund */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Chit Fund
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fund-name">Fund Name</Label>
                  <Input
                    id="fund-name"
                    value={newChitFund.name}
                    onChange={(e) => setNewChitFund({...newChitFund, name: e.target.value})}
                    placeholder="e.g., Office Group"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total-members">Total Members</Label>
                  <Input
                    id="total-members"
                    type="number"
                    value={newChitFund.totalMembers}
                    onChange={(e) => setNewChitFund({...newChitFund, totalMembers: e.target.value})}
                    placeholder="10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly-amount">Monthly Amount (₹)</Label>
                  <Input
                    id="monthly-amount"
                    type="number"
                    value={newChitFund.monthlyAmount}
                    onChange={(e) => setNewChitFund({...newChitFund, monthlyAmount: e.target.value})}
                    placeholder="5000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (months)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newChitFund.duration}
                    onChange={(e) => setNewChitFund({...newChitFund, duration: e.target.value})}
                    placeholder="Auto (same as members)"
                  />
                </div>
              </div>
              <Button onClick={addChitFund} className="w-full">
                Add Chit Fund
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Daily ₹10 Savings */}
        <TabsContent value="daily-savings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-green-600">
                    {dailySavings.currentStreak}
                  </div>
                  <p className="text-muted-foreground">Days in a row!</p>
                  <Button 
                    onClick={markTodaysSaving} 
                    disabled={dailySavings.todaySaved}
                    className="w-full"
                  >
                    {dailySavings.todaySaved ? "Today's ₹10 Saved!" : "Save ₹10 Today"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Monthly Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Saved this month</span>
                  <span className="font-semibold">₹{dailySavings.totalSaved}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly target</span>
                  <span className="font-semibold">₹{dailySavings.monthlyTarget}</span>
                </div>
                <Progress value={(dailySavings.totalSaved / dailySavings.monthlyTarget) * 100} />
                <p className="text-sm text-muted-foreground">
                  {Math.round((dailySavings.totalSaved / dailySavings.monthlyTarget) * 100)}% completed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Savings Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Savings Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹3,650</div>
                  <p className="text-sm text-muted-foreground">Yearly Potential</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">₹450</div>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">45</div>
                  <p className="text-sm text-muted-foreground">Best Streak</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">6.8%</div>
                  <p className="text-sm text-muted-foreground">Est. Returns</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Micro Investments */}
        <TabsContent value="investments" className="space-y-6">
          <div className="grid gap-6">
            {investments.map((investment) => (
              <Card key={investment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {investment.type === 'Gold' ? '🥇' : '📈'}
                        {investment.type} Investment
                      </CardTitle>
                      <CardDescription>{investment.platform}</CardDescription>
                    </div>
                    <Badge variant={investment.returns >= 0 ? "default" : "destructive"}>
                      {investment.returns >= 0 ? '+' : ''}₹{investment.returns}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Monthly SIP</p>
                      <p className="font-semibold">₹{investment.monthlyAmount}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Invested</p>
                      <p className="font-semibold">₹{investment.totalInvested}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Current Value</p>
                      <p className="font-semibold">₹{investment.currentValue}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Returns</p>
                      <p className={`font-semibold ${investment.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {investment.returns >= 0 ? '+' : ''}₹{investment.returns} 
                        ({((investment.returns / investment.totalInvested) * 100).toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Investment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Investment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="investment-type">Investment Type</Label>
                  <select
                    id="investment-type"
                    className="w-full p-2 border rounded-md"
                    value={newInvestment.type}
                    onChange={(e) => setNewInvestment({...newInvestment, type: e.target.value})}
                  >
                    <option value="Gold">Digital Gold</option>
                    <option value="SIP">Mutual Fund SIP</option>
                    <option value="ETF">ETF</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Input
                    id="platform"
                    value={newInvestment.platform}
                    onChange={(e) => setNewInvestment({...newInvestment, platform: e.target.value})}
                    placeholder="e.g., Paytm Gold, Groww"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investment-amount">Monthly Amount (₹)</Label>
                  <Input
                    id="investment-amount"
                    type="number"
                    value={newInvestment.monthlyAmount}
                    onChange={(e) => setNewInvestment({...newInvestment, monthlyAmount: e.target.value})}
                    placeholder="500"
                  />
                </div>
              </div>
              <Button onClick={addInvestment} className="w-full">
                Add Investment
              </Button>
            </CardContent>
          </Card>

          {/* Investment Tips */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Micro-Investment Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm"><strong>Start Small:</strong> Even ₹100/month can grow to ₹15,000+ in 10 years with good returns.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm"><strong>Digital Gold:</strong> Great hedge against inflation. Start with ₹500/month.</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm"><strong>SIP Advantage:</strong> Rupee cost averaging reduces risk over time.</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm"><strong>Diversify:</strong> Mix gold, equity SIPs, and debt funds for balanced growth.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MicroInvestment;
