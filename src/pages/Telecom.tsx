
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Smartphone, 
  Wifi, 
  AlertTriangle, 
  Users, 
  TrendingDown, 
  Signal,
  Calendar,
  IndianRupee,
  Zap,
  Shield
} from 'lucide-react';

// Mock data for recharge plans
const rechargePlans = {
  jio: [
    { price: 149, validity: 24, data: '1GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'JioTV, JioCinema' },
    { price: 239, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'JioTV, JioCinema' },
    { price: 349, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'JioTV, JioCinema' },
    { price: 599, validity: 84, data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'JioTV, JioCinema' },
  ],
  airtel: [
    { price: 155, validity: 24, data: '1GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'Airtel Xstream' },
    { price: 265, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'Airtel Xstream' },
    { price: 359, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'Airtel Xstream' },
    { price: 719, validity: 84, data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'Airtel Xstream' },
  ],
  vi: [
    { price: 179, validity: 28, data: '1GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'Vi Movies & TV' },
    { price: 249, validity: 28, data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'Vi Movies & TV' },
    { price: 359, validity: 28, data: '2GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'Vi Movies & TV' },
    { price: 699, validity: 84, data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'Vi Movies & TV' },
  ],
  bsnl: [
    { price: 107, validity: 25, data: '1GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'BSNL Tunes' },
    { price: 187, validity: 28, data: '1GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'BSNL Tunes' },
    { price: 319, validity: 56, data: '1GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'BSNL Tunes' },
    { price: 797, validity: 180, data: '1GB/day', calls: 'Unlimited', sms: '100/day', benefits: 'BSNL Tunes' },
  ]
};

const Telecom = () => {
  const [budget, setBudget] = useState('');
  const [validity, setValidity] = useState('28');
  const [dataUsage, setDataUsage] = useState({ current: 0, limit: 1.5, alerts: true });
  const [familyMembers, setFamilyMembers] = useState([
    { name: 'You', usage: 1.2, limit: 2.0, bill: 299 },
    { name: 'Spouse', usage: 0.8, limit: 1.5, bill: 249 },
    { name: 'Child 1', usage: 0.5, limit: 1.0, bill: 199 },
  ]);
  const [newMember, setNewMember] = useState({ name: '', limit: '', bill: '' });

  // Simulate data usage update
  useEffect(() => {
    const interval = setInterval(() => {
      setDataUsage(prev => ({
        ...prev,
        current: Math.min(prev.current + Math.random() * 0.1, prev.limit * 1.2)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getRecommendedPlans = () => {
    const budgetNum = parseFloat(budget) || 1000;
    const validityNum = parseInt(validity);
    
    const allPlans = [];
    Object.entries(rechargePlans).forEach(([provider, plans]) => {
      plans.forEach(plan => {
        if (plan.price <= budgetNum && plan.validity >= validityNum - 7) {
          allPlans.push({ ...plan, provider });
        }
      });
    });
    
    return allPlans.sort((a, b) => a.price - b.price).slice(0, 6);
  };

  const getDataUsagePercentage = () => (dataUsage.current / dataUsage.limit) * 100;

  const addFamilyMember = () => {
    if (newMember.name && newMember.limit && newMember.bill) {
      setFamilyMembers([...familyMembers, {
        name: newMember.name,
        usage: 0,
        limit: parseFloat(newMember.limit),
        bill: parseFloat(newMember.bill)
      }]);
      setNewMember({ name: '', limit: '', bill: '' });
    }
  };

  const getTotalFamilyBill = () => familyMembers.reduce((sum, member) => sum + member.bill, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Telecom & Internet</h1>
        <p className="text-gray-600">Manage your mobile plans, data usage, and family telecom budget</p>
      </div>

      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="plans">Recharge Plans</TabsTrigger>
          <TabsTrigger value="usage">Data Monitor</TabsTrigger>
          <TabsTrigger value="family">Family Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Smartphone className="h-5 w-5" />
                Best Recharge Plan Finder
              </CardTitle>
              <CardDescription>Find the most cost-effective plans across all networks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-black mb-2 block">Budget (₹)</label>
                  <Input
                    type="number"
                    placeholder="Enter your budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-black mb-2 block">Minimum Validity (Days)</label>
                  <Select value={validity} onValueChange={setValidity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 Days</SelectItem>
                      <SelectItem value="28">28 Days</SelectItem>
                      <SelectItem value="56">56 Days</SelectItem>
                      <SelectItem value="84">84 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {getRecommendedPlans().map((plan, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-black capitalize">{plan.provider}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">₹{plan.price}</Badge>
                            <Badge variant="outline">{plan.validity} days</Badge>
                          </div>
                        </div>
                        <TrendingDown className="h-5 w-5 text-green-600" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium text-black">Data:</span> {plan.data}
                        </div>
                        <div>
                          <span className="font-medium text-black">Calls:</span> {plan.calls}
                        </div>
                        <div>
                          <span className="font-medium text-black">SMS:</span> {plan.sms}
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium text-black">Benefits:</span> {plan.benefits}
                        </div>
                      </div>
                      <Button className="w-full mt-3" size="sm">
                        Select Plan
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Signal className="h-5 w-5" />
                  Daily Data Usage
                </CardTitle>
                <CardDescription>Monitor your daily data consumption</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-black">Used: {dataUsage.current.toFixed(2)} GB</span>
                    <span className="text-black">Limit: {dataUsage.limit} GB</span>
                  </div>
                  <Progress value={getDataUsagePercentage()} className="h-3" />
                  <div className="text-center text-sm text-black">
                    {getDataUsagePercentage().toFixed(1)}% used
                  </div>
                </div>

                {getDataUsagePercentage() > 80 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      You're approaching your daily data limit! Consider upgrading your plan.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Wifi className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-sm font-medium text-black">Wi-Fi Usage</div>
                    <div className="text-lg font-bold text-blue-600">2.1 GB</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Smartphone className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="text-sm font-medium text-black">Mobile Data</div>
                    <div className="text-lg font-bold text-orange-600">{dataUsage.current.toFixed(1)} GB</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Shield className="h-5 w-5" />
                  Data Saving Tips
                </CardTitle>
                <CardDescription>Optimize your data consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <Zap className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-black">Use Wi-Fi when available</div>
                      <div className="text-sm text-gray-600">Connect to trusted Wi-Fi networks to save mobile data</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-black">Schedule downloads</div>
                      <div className="text-sm text-gray-600">Download large files during off-peak hours</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <Smartphone className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-black">Enable data saver mode</div>
                      <div className="text-sm text-gray-600">Reduce background app data usage</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="family" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Users className="h-5 w-5" />
                Family Plan Manager
              </CardTitle>
              <CardDescription>Track and split telecom expenses among family members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                  <IndianRupee className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-black">₹{getTotalFamilyBill()}</div>
                  <div className="text-sm text-gray-600">Total Monthly Bill</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-black">{familyMembers.length}</div>
                  <div className="text-sm text-gray-600">Family Members</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <Signal className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-black">₹{(getTotalFamilyBill() / familyMembers.length).toFixed(0)}</div>
                  <div className="text-sm text-gray-600">Average per Member</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black">Family Members</h3>
                {familyMembers.map((member, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-black">{member.name}</h4>
                          <div className="text-sm text-gray-600">Monthly Bill: ₹{member.bill}</div>
                        </div>
                        <Badge variant="secondary">₹{member.bill}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-black">Data Used: {member.usage.toFixed(1)} GB</span>
                          <span className="text-black">Limit: {member.limit} GB</span>
                        </div>
                        <Progress value={(member.usage / member.limit) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Add Family Member</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Member name"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    />
                    <Input
                      type="number"
                      placeholder="Data limit (GB)"
                      value={newMember.limit}
                      onChange={(e) => setNewMember({...newMember, limit: e.target.value})}
                    />
                    <Input
                      type="number"
                      placeholder="Monthly bill (₹)"
                      value={newMember.bill}
                      onChange={(e) => setNewMember({...newMember, bill: e.target.value})}
                    />
                  </div>
                  <Button onClick={addFamilyMember} className="w-full">
                    Add Member
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Telecom;
