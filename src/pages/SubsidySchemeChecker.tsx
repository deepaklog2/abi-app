
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gift, 
  MapPin, 
  IndianRupee, 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Download,
  ExternalLink,
  Users,
  GraduationCap,
  Home,
  Zap
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SchemeData {
  id: string;
  name: string;
  category: 'welfare' | 'subsidy' | 'scholarship' | 'housing' | 'employment';
  description: string;
  eligibility: string[];
  benefits: string;
  income_limit: number;
  states: string[];
  documents_required: string[];
  application_process: string;
  status: 'active' | 'upcoming' | 'expired';
  last_date?: string;
  amount?: string;
}

const SubsidySchemeChecker = () => {
  const [userIncome, setUserIncome] = useState('');
  const [userState, setUserState] = useState('');
  const [userCategory, setUserCategory] = useState('General');
  const [eligibleSchemes, setEligibleSchemes] = useState<SchemeData[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const states = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha',
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  const categories = ['General', 'SC', 'ST', 'OBC', 'EWS', 'Minority'];

  const dummySchemes: SchemeData[] = [
    {
      id: '1',
      name: 'Pradhan Mantri Ujjwala Yojana',
      category: 'subsidy',
      description: 'Free LPG connection to women from BPL households',
      eligibility: ['BPL family', 'Female applicant', 'No existing LPG connection'],
      benefits: 'Free LPG connection + ₹1600 subsidy',
      income_limit: 240000,
      states: ['All States'],
      documents_required: ['Aadhaar Card', 'BPL Certificate', 'Bank Account Details'],
      application_process: 'Apply through nearest LPG distributor or online portal',
      status: 'active',
      amount: '₹1,600'
    },
    {
      id: '2',
      name: 'PM-KISAN Samman Nidhi',
      category: 'welfare',
      description: 'Income support to small and marginal farmers',
      eligibility: ['Small/Marginal farmer', 'Landholding up to 2 hectares'],
      benefits: '₹6000 per year in 3 installments',
      income_limit: 200000,
      states: ['All States'],
      documents_required: ['Aadhaar Card', 'Land Records', 'Bank Account'],
      application_process: 'Register on PM-KISAN portal or visit CSC',
      status: 'active',
      amount: '₹6,000/year'
    },
    {
      id: '3',
      name: 'National Scholarship Portal',
      category: 'scholarship',
      description: 'Merit-cum-means scholarship for students',
      eligibility: ['Student from SC/ST/OBC/Minority', 'Family income < ₹2.5 lakh'],
      benefits: 'Up to ₹12,000 per year for studies',
      income_limit: 250000,
      states: ['All States'],
      documents_required: ['Income Certificate', 'Caste Certificate', 'Mark Sheets'],
      application_process: 'Apply online on National Scholarship Portal',
      status: 'active',
      last_date: '2024-12-31',
      amount: 'Up to ₹12,000'
    },
    {
      id: '4',
      name: 'Pradhan Mantri Awas Yojana',
      category: 'housing',
      description: 'Housing for All - affordable housing scheme',
      eligibility: ['No pucca house', 'Family income < ₹18 lakh', 'First-time home buyer'],
      benefits: 'Subsidy up to ₹2.67 lakh for home loan',
      income_limit: 1800000,
      states: ['All States'],
      documents_required: ['Income Certificate', 'Property Documents', 'Aadhaar'],
      application_process: 'Apply through PMAY portal or approved banks',
      status: 'active',
      amount: 'Up to ₹2.67 lakh'
    },
    {
      id: '5',
      name: 'Atal Pension Yojana',
      category: 'welfare',
      description: 'Pension scheme for unorganized sector workers',
      eligibility: ['Age 18-40 years', 'Unorganized sector worker', 'Bank account holder'],
      benefits: 'Guaranteed pension ₹1000-5000 per month',
      income_limit: 500000,
      states: ['All States'],
      documents_required: ['Aadhaar Card', 'Bank Account', 'Mobile Number'],
      application_process: 'Open account with bank or post office',
      status: 'active',
      amount: '₹1000-5000/month'
    }
  ];

  useEffect(() => {
    const savedNotifications = localStorage.getItem('schemeNotifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }

    // Simulate new scheme notifications
    const newSchemes = [
      {
        id: 'new1',
        title: 'New Digital India Scholarship 2024',
        description: 'Merit scholarship for engineering students',
        date: '2024-01-15',
        category: 'scholarship'
      },
      {
        id: 'new2',
        title: 'Updated PM Mudra Yojana Benefits',
        description: 'Enhanced loan limits for small businesses',
        date: '2024-01-10',
        category: 'employment'
      }
    ];

    if (!savedNotifications) {
      setNotifications(newSchemes);
      localStorage.setItem('schemeNotifications', JSON.stringify(newSchemes));
    }
  }, []);

  const checkEligibility = () => {
    if (!userIncome || !userState) {
      toast({
        title: "Missing Information",
        description: "Please enter your income and select your state",
        variant: "destructive"
      });
      return;
    }

    setIsChecking(true);

    // Simulate API call delay
    setTimeout(() => {
      const income = parseFloat(userIncome);
      const eligible = dummySchemes.filter(scheme => {
        const matchesIncome = income <= scheme.income_limit;
        const matchesState = scheme.states.includes('All States') || scheme.states.includes(userState);
        return matchesIncome && matchesState;
      });

      setEligibleSchemes(eligible);
      setIsChecking(false);

      toast({
        title: "Eligibility Check Complete",
        description: `Found ${eligible.length} schemes you may be eligible for`,
      });
    }, 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'welfare': return <Users className="h-4 w-4" />;
      case 'subsidy': return <Gift className="h-4 w-4" />;
      case 'scholarship': return <GraduationCap className="h-4 w-4" />;
      case 'housing': return <Home className="h-4 w-4" />;
      case 'employment': return <Zap className="h-4 w-4" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'welfare': return 'bg-blue-100 text-blue-800';
      case 'subsidy': return 'bg-green-100 text-green-800';
      case 'scholarship': return 'bg-purple-100 text-purple-800';
      case 'housing': return 'bg-orange-100 text-orange-800';
      case 'employment': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Government Scheme Checker</h1>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Bell className="h-4 w-4 mr-2" />
          {notifications.length} New Updates
        </Badge>
      </div>

      <Tabs defaultValue="checker" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="checker">Eligibility Checker</TabsTrigger>
          <TabsTrigger value="schemes">Browse Schemes</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="checker" className="space-y-6">
          {/* Eligibility Form */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Check Your Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Annual Family Income (₹)</Label>
                  <Input
                    type="number"
                    value={userIncome}
                    onChange={(e) => setUserIncome(e.target.value)}
                    placeholder="e.g., 250000"
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <select
                    value={userState}
                    onChange={(e) => setUserState(e.target.value)}
                    className="w-full p-2 border rounded-md bg-white/80"
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Category</Label>
                  <select
                    value={userCategory}
                    onChange={(e) => setUserCategory(e.target.value)}
                    className="w-full p-2 border rounded-md bg-white/80"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button 
                onClick={checkEligibility} 
                disabled={isChecking}
                className="gradient-primary w-full"
              >
                {isChecking ? 'Checking Eligibility...' : 'Check Eligible Schemes'}
              </Button>
            </CardContent>
          </Card>

          {/* Eligible Schemes Results */}
          {eligibleSchemes.length > 0 && (
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Eligible Schemes ({eligibleSchemes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {eligibleSchemes.map((scheme) => (
                    <Card key={scheme.id} className="bg-white/80">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(scheme.category)}
                            <h3 className="font-bold text-lg">{scheme.name}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getCategoryColor(scheme.category)}>
                              {scheme.category}
                            </Badge>
                            {scheme.amount && (
                              <Badge variant="outline" className="text-green-600">
                                {scheme.amount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{scheme.description}</p>
                        
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Benefits: </span>
                            <span className="text-green-600">{scheme.benefits}</span>
                          </div>
                          <div>
                            <span className="font-medium">Eligibility: </span>
                            <span>{scheme.eligibility.join(', ')}</span>
                          </div>
                          {scheme.last_date && (
                            <div className="flex items-center gap-1 text-orange-600">
                              <Clock className="h-3 w-3" />
                              <span className="font-medium">Last Date: {scheme.last_date}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Documents
                          </Button>
                          <Button size="sm" className="gradient-primary">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Apply Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="schemes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dummySchemes.map((scheme) => (
              <Card key={scheme.id} className="bg-white/80">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(scheme.category)}
                      <h3 className="font-bold">{scheme.name}</h3>
                    </div>
                    <Badge className={getCategoryColor(scheme.category)}>
                      {scheme.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{scheme.description}</p>
                  
                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="font-medium">Income Limit: </span>
                      <span>₹{scheme.income_limit.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="font-medium">Benefits: </span>
                      <span className="text-green-600">{scheme.benefits}</span>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full mt-3">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Latest Scheme Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Alert key={notification.id} className="border-blue-200 bg-blue-50">
                    <Gift className="h-4 w-4 text-blue-600" />
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-blue-800">{notification.title}</p>
                          <p className="text-blue-600 text-sm">{notification.description}</p>
                          <p className="text-xs text-blue-500 mt-1">Published: {notification.date}</p>
                        </div>
                        <Badge variant="outline" className="text-blue-600">
                          {notification.category}
                        </Badge>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
                
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Tip:</strong> Enable notifications to get instant updates when new schemes 
                    matching your profile are launched by the government.
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

export default SubsidySchemeChecker;
