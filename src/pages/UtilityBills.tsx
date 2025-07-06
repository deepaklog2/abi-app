
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
  Zap, 
  Droplets, 
  Flame, 
  Bell, 
  TrendingDown, 
  Calendar,
  Lightbulb,
  Plus,
  AlertTriangle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BillPrediction {
  type: 'electricity' | 'water' | 'gas';
  currentUsage: number;
  predictedAmount: number;
  dueDate: string;
  lastMonthAmount: number;
  savingTips: string[];
}

interface BillEntry {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  paid: boolean;
  month: string;
}

const UtilityBills = () => {
  const [bills, setBills] = useState<BillEntry[]>([]);
  const [predictions, setPredictions] = useState<BillPrediction[]>([
    {
      type: 'electricity',
      currentUsage: 245,
      predictedAmount: 1850,
      dueDate: '2024-01-15',
      lastMonthAmount: 1720,
      savingTips: [
        'Use LED bulbs - save up to ₹200/month',
        'Unplug devices when not in use',
        'Use fan instead of AC when possible',
        'Set AC temperature to 24°C or higher'
      ]
    },
    {
      type: 'water',
      currentUsage: 18500,
      predictedAmount: 420,
      dueDate: '2024-01-20',
      lastMonthAmount: 380,
      savingTips: [
        'Fix leaky taps immediately',
        'Take shorter showers (save ₹50/month)',
        'Reuse RO waste water for plants',
        'Install water-efficient fixtures'
      ]
    },
    {
      type: 'gas',
      currentUsage: 85,
      predictedAmount: 680,
      dueDate: '2024-01-25',
      lastMonthAmount: 720,
      savingTips: [
        'Use pressure cooker for faster cooking',
        'Cover pots while cooking to retain heat',
        'Use medium flame for better efficiency',
        'Service your gas stove regularly'
      ]
    }
  ]);
  
  const [newBill, setNewBill] = useState({
    type: 'electricity',
    amount: '',
    dueDate: '',
    month: new Date().toISOString().slice(0, 7)
  });

  const billTypes = [
    { value: 'electricity', label: '⚡ Electricity', icon: Zap, color: 'text-yellow-600' },
    { value: 'water', label: '💧 Water', icon: Droplets, color: 'text-blue-600' },
    { value: 'gas', label: '🔥 Gas', icon: Flame, color: 'text-orange-600' },
    { value: 'internet', label: '📶 Internet', icon: Calendar, color: 'text-purple-600' },
    { value: 'mobile', label: '📱 Mobile', icon: Calendar, color: 'text-green-600' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('utilityBills');
    if (saved) {
      setBills(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('utilityBills', JSON.stringify(bills));
  }, [bills]);

  const addBill = () => {
    if (!newBill.amount || !newBill.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please enter amount and due date",
        variant: "destructive"
      });
      return;
    }

    const bill: BillEntry = {
      id: Date.now().toString(),
      type: newBill.type,
      amount: parseFloat(newBill.amount),
      dueDate: newBill.dueDate,
      paid: false,
      month: newBill.month
    };

    setBills(prev => [bill, ...prev]);
    setNewBill({ type: 'electricity', amount: '', dueDate: '', month: new Date().toISOString().slice(0, 7) });
    
    toast({
      title: "Bill Added",
      description: `${bill.type} bill of ₹${bill.amount} added`,
    });
  };

  const markAsPaid = (id: string) => {
    setBills(prev => 
      prev.map(bill => 
        bill.id === id ? { ...bill, paid: true } : bill
      )
    );
    toast({
      title: "Bill Paid",
      description: "Bill marked as paid successfully",
    });
  };

  const getTotalPending = () => bills.filter(bill => !bill.paid).reduce((sum, bill) => sum + bill.amount, 0);
  const getUpcomingBills = () => {
    const today = new Date();
    const next7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return bills.filter(bill => !bill.paid && new Date(bill.dueDate) <= next7Days);
  };

  const getBillIcon = (type: string) => {
    const billType = billTypes.find(bt => bt.value === type);
    return billType ? billType.icon : Calendar;
  };

  const upcomingBills = getUpcomingBills();
  const totalPending = getTotalPending();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Utility Bills Manager</h1>
        <div className="flex items-center gap-2">
          <Badge variant={upcomingBills.length > 0 ? "destructive" : "outline"} className="text-lg px-4 py-2">
            <Bell className="h-4 w-4 mr-2" />
            {upcomingBills.length} Due Soon
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="bills">My Bills</TabsTrigger>
          <TabsTrigger value="savings">Cost Saving Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          {/* AI Bill Predictions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {predictions.map((prediction) => {
              const Icon = billTypes.find(bt => bt.value === prediction.type)?.icon || Zap;
              const isIncreased = prediction.predictedAmount > prediction.lastMonthAmount;
              
              return (
                <Card key={prediction.type} className="gradient-card border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 capitalize">
                      <Icon className="h-5 w-5" />
                      {prediction.type} Bill
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600">₹{prediction.predictedAmount}</p>
                      <p className="text-sm text-muted-foreground">Predicted Amount</p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        {isIncreased ? (
                          <Badge variant="destructive" className="text-xs">
                            ↑ ₹{prediction.predictedAmount - prediction.lastMonthAmount} more
                          </Badge>
                        ) : (
                          <Badge variant="default" className="text-xs">
                            ↓ ₹{prediction.lastMonthAmount - prediction.predictedAmount} less
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Usage</span>
                        <span>{prediction.currentUsage} {prediction.type === 'electricity' ? 'kWh' : prediction.type === 'water' ? 'L' : 'kg'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Due Date</span>
                        <span>{new Date(prediction.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Alert className={isIncreased ? 'border-orange-200 bg-orange-50' : 'border-green-200 bg-green-50'}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        {isIncreased 
                          ? `Bill increased by ₹${prediction.predictedAmount - prediction.lastMonthAmount} compared to last month`
                          : `You're saving ₹${prediction.lastMonthAmount - prediction.predictedAmount} this month!`
                        }
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Usage Trends */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Monthly Predictions Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">₹{predictions.reduce((sum, p) => sum + p.predictedAmount, 0)}</p>
                  <p className="text-sm text-blue-600">Total Predicted</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">₹{predictions.reduce((sum, p) => sum + p.lastMonthAmount, 0)}</p>
                  <p className="text-sm text-green-600">Last Month</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">
                    {predictions.reduce((sum, p) => sum + p.predictedAmount, 0) > predictions.reduce((sum, p) => sum + p.lastMonthAmount, 0) ? '↑' : '↓'}
                    ₹{Math.abs(predictions.reduce((sum, p) => sum + p.predictedAmount, 0) - predictions.reduce((sum, p) => sum + p.lastMonthAmount, 0))}
                  </p>
                  <p className="text-sm text-orange-600">Difference</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{upcomingBills.length}</p>
                  <p className="text-sm text-purple-600">Due This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bills" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Bills</p>
                    <p className="text-2xl font-bold text-red-600">₹{totalPending}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Due This Week</p>
                    <p className="text-2xl font-bold text-orange-600">{upcomingBills.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Paid This Month</p>
                    <p className="text-2xl font-bold text-green-600">
                      {bills.filter(bill => bill.paid && bill.month === new Date().toISOString().slice(0, 7)).length}
                    </p>
                  </div>
                  <Bell className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add New Bill */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Add New Bill</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label>Bill Type</Label>
                  <select
                    value={newBill.type}
                    onChange={(e) => setNewBill(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full p-2 border rounded-md bg-white/80"
                  >
                    {billTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Amount (₹)</Label>
                  <Input
                    type="number"
                    value={newBill.amount}
                    onChange={(e) => setNewBill(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="1500"
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={newBill.dueDate}
                    onChange={(e) => setNewBill(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>Month</Label>
                  <Input
                    type="month"
                    value={newBill.month}
                    onChange={(e) => setNewBill(prev => ({ ...prev, month: e.target.value }))}
                    className="bg-white/80"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addBill} className="gradient-primary w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Bill
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bills List */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Your Bills ({bills.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {bills.map((bill) => {
                  const Icon = getBillIcon(bill.type);
                  const billType = billTypes.find(bt => bt.value === bill.type);
                  const daysUntilDue = Math.ceil((new Date(bill.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={bill.id} className={`flex items-center justify-between p-3 rounded-lg ${
                      bill.paid ? 'bg-green-50 border border-green-200' : 'bg-white/50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <Icon className={`h-6 w-6 ${billType?.color || 'text-gray-600'}`} />
                        <div>
                          <p className="font-medium capitalize">{bill.type} Bill</p>
                          <p className="text-sm text-muted-foreground">
                            ₹{bill.amount} • Due: {new Date(bill.dueDate).toLocaleDateString()}
                            {!bill.paid && daysUntilDue <= 7 && (
                              <span className="text-red-600 ml-2">({daysUntilDue} days left)</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={bill.paid ? "default" : daysUntilDue <= 3 ? "destructive" : "secondary"}>
                          {bill.paid ? 'Paid' : daysUntilDue <= 0 ? 'Overdue' : 'Pending'}
                        </Badge>
                        {!bill.paid && (
                          <Button
                            variant="outline" 
                            size="sm"
                            onClick={() => markAsPaid(bill.id)}
                          >
                            Mark Paid
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {bills.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No bills added yet. Add your first bill above.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-6">
          {/* Cost Saving Tips by Bill Type */}
          {predictions.map((prediction) => {
            const Icon = billTypes.find(bt => bt.value === prediction.type)?.icon || Lightbulb;
            
            return (
              <Card key={prediction.type} className="gradient-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 capitalize">
                    <Icon className="h-5 w-5" />
                    {prediction.type} Cost-Saving Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prediction.savingTips.map((tip, index) => (
                      <Card key={index} className="bg-white/80">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <Lightbulb className="h-3 w-3 text-green-600" />
                            </div>
                            <p className="text-sm">{tip}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* General Money-Saving Tips */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                General Money-Saving Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Set up automatic bill payments to avoid late fees',
                  'Compare different service providers annually',
                  'Use energy-efficient appliances with 5-star rating',
                  'Monitor your usage regularly through mobile apps',
                  'Install solar panels for long-term electricity savings',
                  'Use timer switches for water heaters and geysers',
                  'Insulate your home to reduce heating/cooling costs',
                  'Group similar errands to save on transportation costs'
                ].map((tip, index) => (
                  <Card key={index} className="bg-white/80">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <p className="text-sm">{tip}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UtilityBills;
