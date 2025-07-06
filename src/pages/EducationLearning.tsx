
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  GraduationCap, 
  BookOpen, 
  AlertTriangle, 
  DollarSign, 
  Calendar,
  Gift,
  Youtube,
  FileText,
  Smartphone,
  School,
  Award,
  IndianRupee,
  Bell
} from 'lucide-react';

// Chennai-based scholarships with focus on Pani Malar College
const scholarships = [
  {
    name: 'Pani Malar College Merit Scholarship',
    eligibility: 'Engineering students with >75% marks at Pani Malar College',
    amount: '₹25,000',
    deadline: '2025-08-15',
    type: 'Institution-based'
  },
  {
    name: 'Tamil Nadu State Merit Scholarship',
    eligibility: 'Tamil Nadu residents with >80% marks in HSC',
    amount: '₹30,000',
    deadline: '2025-07-30',
    type: 'State-sponsored'
  },
  {
    name: 'Chennai Corporation Education Fund',
    eligibility: 'Chennai residents, family income <₹2 lakh',
    amount: '₹20,000',
    deadline: '2025-09-01',
    type: 'Municipal Corporation'
  },
  {
    name: 'Anna University Research Scholarship',
    eligibility: 'Engineering students affiliated to Anna University',
    amount: '₹18,000',
    deadline: '2025-08-20',
    type: 'University-based'
  },
  {
    name: 'Dr. APJ Abdul Kalam Scholarship',
    eligibility: 'Science & Engineering students in Tamil Nadu',
    amount: '₹35,000',
    deadline: '2025-08-10',
    type: 'State Government'
  },
  {
    name: 'Chennai IT Corridor Education Grant',
    eligibility: 'IT/Computer Science students in Chennai colleges',
    amount: '₹22,000',
    deadline: '2025-09-15',
    type: 'Industry-sponsored'
  }
];

// Chennai-based learning resources
const learningResources = {
  engineering: [
    { name: 'Anna University Previous Papers', type: 'PDF', link: '#', rating: 4.9 },
    { name: 'Chennai Engineering Hub', type: 'YouTube', link: '#', rating: 4.8 },
    { name: 'Tamil Nadu Engineering Notes', type: 'PDF', link: '#', rating: 4.7 },
    { name: 'Pani Malar Study Materials', type: 'PDF', link: '#', rating: 4.8 }
  ],
  medical: [
    { name: 'Chennai Medical College Notes', type: 'PDF', link: '#', rating: 4.8 },
    { name: 'Tamil Medical Education', type: 'YouTube', link: '#', rating: 4.7 },
    { name: 'AIIMS Chennai Resources', type: 'PDF', link: '#', rating: 4.9 },
    { name: 'Medical Tamil App', type: 'App', link: '#', rating: 4.5 }
  ],
  commerce: [
    { name: 'Chennai Commerce Academy', type: 'YouTube', link: '#', rating: 4.6 },
    { name: 'Tamil Nadu Commerce Notes', type: 'PDF', link: '#', rating: 4.7 },
    { name: 'Madras Business Studies', type: 'PDF', link: '#', rating: 4.5 },
    { name: 'Chennai CA Study App', type: 'App', link: '#', rating: 4.4 }
  ],
  arts: [
    { name: 'Tamil Literature Resources', type: 'PDF', link: '#', rating: 4.8 },
    { name: 'Chennai Arts College Hub', type: 'YouTube', link: '#', rating: 4.9 },
    { name: 'Dravidian Studies Materials', type: 'PDF', link: '#', rating: 4.6 },
    { name: 'Tamil Learning App', type: 'App', link: '#', rating: 4.7 }
  ]
};

// Chennai market-based budget kits
const budgetKits = {
  500: [
    { item: 'Basic Notebook Set (Saraswathi Brand - 5 books)', price: 120, essential: true },
    { item: 'Reynolds Pen & Pencil Set', price: 60, essential: true },
    { item: 'Camlin Geometry Box', price: 80, essential: true },
    { item: 'Drawing Book (Chennai Local)', price: 40, essential: false },
    { item: 'Faber-Castell Highlighters (4 colors)', price: 70, essential: false },
    { item: 'Graph Sheets Bundle', price: 30, essential: false },
    { item: 'Index Cards Set', price: 25, essential: false },
    { item: 'Correction Pen', price: 35, essential: false },
    { item: 'Scale & Ruler Set', price: 40, essential: false }
  ],
  1000: [
    { item: 'Premium Notebook Set (Classmate - 10 books)', price: 250, essential: true },
    { item: 'Complete Stationery Kit (Faber-Castell)', price: 180, essential: true },
    { item: 'Casio Scientific Calculator', price: 200, essential: true },
    { item: 'Art Supplies Bundle (Camel Brand)', price: 120, essential: false },
    { item: 'File Organizers (10 pieces)', price: 80, essential: false },
    { item: 'Quality Compass Set', price: 60, essential: false },
    { item: 'Sticky Notes Pack', price: 45, essential: false },
    { item: 'Technical Drawing Kit', price: 65, essential: false }
  ]
};

const EducationLearning = () => {
  const [feeReminders, setFeeReminders] = useState([
    { institution: 'Pani Malar College of Engineering & Technology', amount: 45000, dueDate: '2025-08-15', type: 'Semester Fee' },
    { institution: 'Anna University (Exam Fee)', amount: 2500, dueDate: '2025-07-30', type: 'University Exam Fee' },
    { institution: 'Pani Malar College (Lab Fee)', amount: 8000, dueDate: '2025-09-01', type: 'Laboratory Fee' },
    { institution: 'SRM Institute Chennai', amount: 55000, dueDate: '2025-08-20', type: 'Tuition Fee' },
    { institution: 'Loyola College Chennai', amount: 25000, dueDate: '2025-08-25', type: 'Annual Fee' }
  ]);

  const [scholarshipForm, setScholarshipForm] = useState({
    name: '',
    stream: '',
    marks: '',
    familyIncome: '',
    category: '',
    college: ''
  });

  const [selectedBudget, setSelectedBudget] = useState('500');
  const [selectedStream, setSelectedStream] = useState('engineering');
  const [newReminder, setNewReminder] = useState({
    institution: '',
    amount: '',
    dueDate: '',
    type: ''
  });

  // Check for upcoming fee deadlines
  const getUpcomingFees = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return feeReminders.filter(fee => {
      const dueDate = new Date(fee.dueDate);
      return dueDate <= nextWeek && dueDate >= today;
    });
  };

  const getEligibleScholarships = () => {
    if (!scholarshipForm.stream || !scholarshipForm.marks || !scholarshipForm.familyIncome) {
      return scholarships;
    }
    
    const marks = parseFloat(scholarshipForm.marks);
    const income = parseFloat(scholarshipForm.familyIncome);
    
    return scholarships.filter(scholarship => {
      if (scholarship.name.includes('Merit') && marks < 75) return false;
      if (scholarship.eligibility.includes('<₹2 lakh') && income > 200000) return false;
      if (scholarship.eligibility.includes('>70%') && marks < 70) return false;
      if (scholarship.eligibility.includes('>80%') && marks < 80) return false;
      if (scholarship.name.includes('Pani Malar') && scholarshipForm.college !== 'pani-malar') return false;
      return true;
    });
  };

  const addFeeReminder = () => {
    if (newReminder.institution && newReminder.amount && newReminder.dueDate && newReminder.type) {
      setFeeReminders([...feeReminders, {
        ...newReminder,
        amount: parseFloat(newReminder.amount)
      }]);
      setNewReminder({ institution: '', amount: '', dueDate: '', type: '' });
    }
  };

  const getBudgetKitTotal = () => {
    const kit = budgetKits[selectedBudget];
    return kit.reduce((sum, item) => sum + item.price, 0);
  };

  const upcomingFees = getUpcomingFees();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Education & Learning - Chennai</h1>
        <p className="text-gray-600">Manage educational expenses for Chennai colleges, find scholarships, and discover Tamil Nadu learning resources</p>
      </div>

      {upcomingFees.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have {upcomingFees.length} fee(s) due within the next week for Chennai institutions!
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="fees" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fees">Fee Reminders</TabsTrigger>
          <TabsTrigger value="supplies">Study Supplies</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          <TabsTrigger value="resources">Learning Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="fees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Calendar className="h-5 w-5" />
                Chennai College Fee Payment Reminders
              </CardTitle>
              <CardDescription>Track and manage upcoming educational fee deadlines for Chennai institutions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {feeReminders.map((fee, index) => {
                  const isUpcoming = upcomingFees.some(upcoming => upcoming.institution === fee.institution);
                  const isPaniMalar = fee.institution.includes('Pani Malar');
                  return (
                    <Card key={index} className={`border-l-4 ${isUpcoming ? 'border-l-red-500 bg-red-50' : isPaniMalar ? 'border-l-green-500 bg-green-50' : 'border-l-blue-500'}`}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg text-black">{fee.institution}</CardTitle>
                            <Badge variant={isUpcoming ? "destructive" : isPaniMalar ? "default" : "secondary"}>
                              {fee.type}
                            </Badge>
                            {isPaniMalar && <Badge variant="outline" className="ml-2 text-xs">Your College</Badge>}
                          </div>
                          {isUpcoming && <Bell className="h-5 w-5 text-red-600" />}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-black">Amount:</span>
                          <span className="font-bold text-green-600">₹{fee.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-black">Due Date:</span>
                          <span className={isUpcoming ? "text-red-600 font-medium" : "text-black"}>
                            {new Date(fee.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <Button className="w-full mt-3" size="sm">
                          Set Mobile Reminder
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Add New Chennai College Fee Reminder</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select value={newReminder.institution} onValueChange={(value) => setNewReminder({...newReminder, institution: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Chennai institution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pani Malar College of Engineering & Technology">Pani Malar College of Engineering & Technology</SelectItem>
                        <SelectItem value="Anna University Chennai">Anna University Chennai</SelectItem>
                        <SelectItem value="SRM Institute Chennai">SRM Institute Chennai</SelectItem>
                        <SelectItem value="Loyola College Chennai">Loyola College Chennai</SelectItem>
                        <SelectItem value="Stella Maris College Chennai">Stella Maris College Chennai</SelectItem>
                        <SelectItem value="Madras Christian College">Madras Christian College</SelectItem>
                        <SelectItem value="VIT Chennai">VIT Chennai</SelectItem>
                        <SelectItem value="Other Chennai Institution">Other Chennai Institution</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Amount (₹)"
                      value={newReminder.amount}
                      onChange={(e) => setNewReminder({...newReminder, amount: e.target.value})}
                    />
                    <Input
                      type="date"
                      value={newReminder.dueDate}
                      onChange={(e) => setNewReminder({...newReminder, dueDate: e.target.value})}
                    />
                    <Select value={newReminder.type} onValueChange={(value) => setNewReminder({...newReminder, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Fee type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Semester Fee">Semester Fee</SelectItem>
                        <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                        <SelectItem value="University Exam Fee">University Exam Fee</SelectItem>
                        <SelectItem value="Laboratory Fee">Laboratory Fee</SelectItem>
                        <SelectItem value="Library Fee">Library Fee</SelectItem>
                        <SelectItem value="Hostel Fee">Hostel Fee</SelectItem>
                        <SelectItem value="Transport Fee">Transport Fee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={addFeeReminder} className="w-full">
                    Add Fee Reminder
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <BookOpen className="h-5 w-5" />
                Chennai Book & Stationery Budget Helper
              </CardTitle>
              <CardDescription>Get budget-friendly supply kits based on Chennai market prices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Button
                  variant={selectedBudget === '500' ? 'default' : 'outline'}
                  onClick={() => setSelectedBudget('500')}
                >
                  ₹500 Budget Kit
                </Button>
                <Button
                  variant={selectedBudget === '1000' ? 'default' : 'outline'}
                  onClick={() => setSelectedBudget('1000')}
                >
                  ₹1000 Budget Kit
                </Button>
              </div>

              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-black">₹{selectedBudget} Chennai Market Budget Kit</CardTitle>
                  <CardDescription>
                    Total: ₹{getBudgetKitTotal()} • Available at Chennai stationery shops
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {budgetKits[selectedBudget].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <div className="flex items-center gap-3">
                          <School className="h-4 w-4 text-blue-600" />
                          <div>
                            <div className="font-medium text-black">{item.item}</div>
                            <Badge variant={item.essential ? "default" : "secondary"} className="text-xs">
                              {item.essential ? "Essential" : "Optional"}
                            </Badge>
                          </div>
                        </div>
                        <div className="font-bold text-green-600">₹{item.price}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Chennai Shopping Tips:</strong> Visit T. Nagar or Pondy Bazaar for best stationery deals. 
                      Many shops offer student discounts near colleges.
                    </p>
                  </div>
                  <Button className="w-full mt-4">
                    Generate Chennai Shopping List
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scholarships" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Award className="h-5 w-5" />
                Chennai & Tamil Nadu Scholarship Finder
              </CardTitle>
              <CardDescription>Find scholarships available for Chennai students and Tamil Nadu residents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                  placeholder="Student name"
                  value={scholarshipForm.name}
                  onChange={(e) => setScholarshipForm({...scholarshipForm, name: e.target.value})}
                />
                <Select value={scholarshipForm.college} onValueChange={(value) => setScholarshipForm({...scholarshipForm, college: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your college" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pani-malar">Pani Malar College of Engineering & Technology</SelectItem>
                    <SelectItem value="anna-university">Anna University Chennai</SelectItem>
                    <SelectItem value="srm-chennai">SRM Institute Chennai</SelectItem>
                    <SelectItem value="loyola-chennai">Loyola College Chennai</SelectItem>
                    <SelectItem value="other-chennai">Other Chennai College</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={scholarshipForm.stream} onValueChange={(value) => setScholarshipForm({...scholarshipForm, stream: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Academic stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="arts">Arts & Humanities</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="HSC/12th Marks %"
                  value={scholarshipForm.marks}
                  onChange={(e) => setScholarshipForm({...scholarshipForm, marks: e.target.value})}
                />
                <Input
                  type="number"
                  placeholder="Family income (₹/year)"
                  value={scholarshipForm.familyIncome}
                  onChange={(e) => setScholarshipForm({...scholarshipForm, familyIncome: e.target.value})}
                />
                <Select value={scholarshipForm.category} onValueChange={(value) => setScholarshipForm({...scholarshipForm, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="obc">OBC</SelectItem>
                    <SelectItem value="sc">SC</SelectItem>
                    <SelectItem value="st">ST</SelectItem>
                    <SelectItem value="minority">Minority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {getEligibleScholarships().map((scholarship, index) => (
                  <Card key={index} className="border-l-4 border-l-yellow-500">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-black">{scholarship.name}</CardTitle>
                          <Badge variant="secondary">{scholarship.type}</Badge>
                          {scholarship.name.includes('Pani Malar') && (
                            <Badge variant="default" className="ml-2 text-xs">Your College</Badge>
                          )}
                        </div>
                        <Gift className="h-5 w-5 text-yellow-600" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="font-medium text-black">Award:</span>
                        <span className="ml-2 font-bold text-green-600">{scholarship.amount}</span>
                      </div>
                      <div>
                        <span className="font-medium text-black">Eligibility:</span>
                        <p className="text-sm text-gray-600 mt-1">{scholarship.eligibility}</p>
                      </div>
                      <div>
                        <span className="font-medium text-black">Deadline:</span>
                        <span className="ml-2 text-red-600">{new Date(scholarship.deadline).toLocaleDateString()}</span>
                      </div>
                      <Button className="w-full mt-3" size="sm">
                        Apply Online
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Youtube className="h-5 w-5" />
                Chennai & Tamil Nadu Learning Resources
              </CardTitle>
              <CardDescription>Discover quality educational content tailored for Tamil Nadu curriculum</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Select value={selectedStream} onValueChange={setSelectedStream}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Select your stream" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                  <SelectItem value="arts">Arts & Humanities</SelectItem>
                </SelectContent>
              </Select>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {learningResources[selectedStream].map((resource, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {resource.type === 'YouTube' && <Youtube className="h-5 w-5 text-red-600" />}
                          {resource.type === 'Video' && <Smartphone className="h-5 w-5 text-blue-600" />}
                          {resource.type === 'PDF' && <FileText className="h-5 w-5 text-green-600" />}
                          {resource.type === 'App' && <Smartphone className="h-5 w-5 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-black">{resource.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-yellow-600">★</span>
                              <span className="text-sm text-gray-600">{resource.rating}</span>
                            </div>
                          </div>
                          <Button size="sm" className="mt-2 w-full">
                            Access Resource
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardHeader>
                  <CardTitle className="text-black">Chennai Student Success Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-100 rounded-full">
                        <BookOpen className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-black">Anna University Exam Prep</h4>
                        <p className="text-sm text-gray-600">Focus on previous year question papers and regulation-specific syllabus</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        <Award className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-black">Tamil & English Balance</h4>
                        <p className="text-sm text-gray-600">Master both Tamil and English for better opportunities in Chennai job market</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <School className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-black">Local Industry Connect</h4>
                        <p className="text-sm text-gray-600">Leverage Chennai's IT corridor and automotive industry for internships</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-black">Government Exam Prep</h4>
                        <p className="text-sm text-gray-600">Prepare for TNPSC and central government exams alongside your degree</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationLearning;
