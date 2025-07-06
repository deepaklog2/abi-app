
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Brain, 
  Video, 
  Smile, 
  Activity, 
  Apple, 
  DollarSign, 
  AlertTriangle,
  Upload,
  Phone,
  Calendar
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MoodEntry {
  date: string;
  mood: number;
  notes: string;
}

const Healthcare = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [brainScanResult, setBrainScanResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentMood, setCurrentMood] = useState(5);
  const [moodNotes, setMoodNotes] = useState('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [medicineSearch, setMedicineSearch] = useState('');
  const [consultationBooked, setConsultationBooked] = useState(false);

  const moodLabels = ['😢', '😟', '😐', '🙂', '😊'];
  
  const affordableMedicines = [
    { name: 'Paracetamol', generic: 'Acetaminophen', janAushadhi: '₹2', market: '₹15', savings: '87%' },
    { name: 'Amoxicillin', generic: 'Amoxicillin', janAushadhi: '₹12', market: '₹45', savings: '73%' },
    { name: 'Metformin', generic: 'Metformin HCl', janAushadhi: '₹8', market: '₹35', savings: '77%' },
    { name: 'Atorvastatin', generic: 'Atorvastatin', janAushadhi: '₹18', market: '₹120', savings: '85%' }
  ];

  const healthTips = [
    "Drink clean boiled water to prevent waterborne diseases",
    "Include seasonal fruits and vegetables in your diet - they're cheaper and more nutritious",
    "Practice basic hygiene: wash hands regularly with soap",
    "Get adequate sleep (7-8 hours) - it's free and boosts immunity",
    "Exercise daily - even walking for 30 minutes helps significantly",
    "Use tulsi and ginger for common cold instead of expensive medicines",
    "Regular health checkups at government hospitals are often free or low-cost"
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeBrainScan = () => {
    if (!selectedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload a brain scan image first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const results = [
        "No abnormal masses detected - Normal scan",
        "Scan shows normal brain tissue - No tumor indicators",
        "Minor age-related changes observed - Consultation recommended",
        "Unclear results - Please consult neurologist for detailed analysis"
      ];
      
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setBrainScanResult(randomResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Brain scan analysis results are ready",
      });
    }, 3000);
  };

  const saveMoodEntry = () => {
    const entry: MoodEntry = {
      date: new Date().toLocaleDateString(),
      mood: currentMood,
      notes: moodNotes
    };
    
    setMoodHistory(prev => [entry, ...prev.slice(0, 6)]);
    setMoodNotes('');
    
    toast({
      title: "Mood Logged",
      description: `Your mood (${currentMood}/5) has been recorded`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Healthcare Assistant</h1>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Heart className="h-4 w-4 mr-2" />
          Your Health Partner
        </Badge>
      </div>

      <Tabs defaultValue="brain-scan" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="brain-scan">Brain Scan</TabsTrigger>
          <TabsTrigger value="telemedicine">Telemedicine</TabsTrigger>
          <TabsTrigger value="mood-fitness">Mood & Fitness</TabsTrigger>
          <TabsTrigger value="health-tips">Health Tips</TabsTrigger>
          <TabsTrigger value="medicines">Medicines</TabsTrigger>
        </TabsList>

        <TabsContent value="brain-scan" className="space-y-6">
          {/* Brain Tumor Detection */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Brain Tumor Detection (Prototype)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  This is a prototype UI for demonstration. Always consult qualified medical professionals for actual diagnosis.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div>
                  <Label>Upload Brain Scan (MRI/CT)</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="brain-scan-upload"
                    />
                    <label htmlFor="brain-scan-upload">
                      <Button variant="outline" className="cursor-pointer" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Image
                        </span>
                      </Button>
                    </label>
                    {selectedImage && (
                      <Badge variant="outline" className="text-green-600">Image Selected</Badge>
                    )}
                  </div>
                </div>

                {selectedImage && (
                  <div className="border rounded-lg p-4 bg-white/50">
                    <img 
                      src={selectedImage} 
                      alt="Brain Scan" 
                      className="max-w-full h-48 object-contain mx-auto rounded"
                    />
                  </div>
                )}

                <Button 
                  onClick={analyzeBrainScan} 
                  disabled={isAnalyzing || !selectedImage}
                  className="gradient-primary w-full"
                >
                  {isAnalyzing ? 'Analyzing Brain Scan...' : 'Analyze for Tumor Detection'}
                </Button>

                {brainScanResult && (
                  <Alert className={brainScanResult.includes('Normal') ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
                    <Brain className="h-4 w-4" />
                    <AlertDescription className="font-medium">
                      <strong>AI Analysis Result:</strong> {brainScanResult}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="telemedicine" className="space-y-6">
          {/* Telemedicine Consultation */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Telemedicine Video Consultation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Available Doctors</h3>
                  {[
                    { name: 'Dr. Priya Sharma', specialty: 'General Medicine', fee: '₹200', rating: 4.8, nextSlot: '2:30 PM Today' },
                    { name: 'Dr. Rajesh Kumar', specialty: 'Pediatrics', fee: '₹150', rating: 4.9, nextSlot: '4:00 PM Today' },
                    { name: 'Dr. Sunita Verma', specialty: 'Gynecology', fee: '₹250', rating: 4.7, nextSlot: '6:30 PM Today' }
                  ].map((doctor, index) => (
                    <Card key={index} className="bg-white/80">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{doctor.name}</h4>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">★ {doctor.rating}</Badge>
                              <span className="text-sm text-green-600">{doctor.fee}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Next Available</p>
                            <p className="text-sm font-medium">{doctor.nextSlot}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">Video consultation interface will appear here</p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Audio Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Video Call
                      </Button>
                    </div>
                  </div>
                  
                  {!consultationBooked ? (
                    <Button 
                      onClick={() => {
                        setConsultationBooked(true);
                        toast({
                          title: "Consultation Booked",
                          description: "Dr. Priya Sharma will call you at 2:30 PM today",
                        });
                      }}
                      className="gradient-primary w-full"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Consultation
                    </Button>
                  ) : (
                    <Alert className="border-green-200 bg-green-50">
                      <Calendar className="h-4 w-4" />
                      <AlertDescription className="text-green-800">
                        Consultation booked with Dr. Priya Sharma at 2:30 PM today. You'll receive a call shortly.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mood-fitness" className="space-y-6">
          {/* Mood Tracker & Fitness */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smile className="h-5 w-5" />
                  Mood Tracker
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>How are you feeling today? (1-5)</Label>
                  <div className="flex items-center gap-2 mt-2">
                    {moodLabels.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMood(index + 1)}
                        className={`text-2xl p-2 rounded-full transition-all ${
                          currentMood === index + 1 ? 'bg-blue-100 scale-125' : 'hover:bg-gray-100'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-center mt-2">Current: {moodLabels[currentMood - 1]} ({currentMood}/5)</p>
                </div>

                <div>
                  <Label>Notes (Optional)</Label>
                  <Input
                    value={moodNotes}
                    onChange={(e) => setMoodNotes(e.target.value)}
                    placeholder="How was your day?"
                    className="bg-white/80"
                  />
                </div>

                <Button onClick={saveMoodEntry} className="gradient-primary w-full">
                  Save Mood Entry
                </Button>

                {moodHistory.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Recent Mood History</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {moodHistory.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between text-sm bg-white/50 p-2 rounded">
                          <span>{entry.date}</span>
                          <span>{moodLabels[entry.mood - 1]} {entry.mood}/5</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Fitness & Nutrition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <Activity className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="text-sm font-medium">Steps Today</p>
                    <p className="text-xl font-bold">7,234</p>
                    <Progress value={72} className="h-2 mt-2" />
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-lg">
                    <Apple className="h-6 w-6 mx-auto mb-2 text-red-600" />
                    <p className="text-sm font-medium">Calories</p>
                    <p className="text-xl font-bold">1,456</p>
                    <Progress value={58} className="h-2 mt-2" />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Quick Fitness Tips</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 30 min walking daily</li>
                    <li>• Drink 8 glasses of water</li>
                    <li>• Include protein in meals</li>
                    <li>• Get 7-8 hours sleep</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Free Nutrition Plan</h4>
                  <div className="text-xs space-y-1">
                    <p><strong>Breakfast:</strong> Oats + Banana</p>
                    <p><strong>Lunch:</strong> Dal + Rice + Vegetables</p>
                    <p><strong>Dinner:</strong> Roti + Sabzi + Curd</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health-tips" className="space-y-6">
          {/* Health Tips for Poor Families */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Health Tips for Families on Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {healthTips.map((tip, index) => (
                  <Card key={index} className="bg-white/80">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-green-600">{index + 1}</span>
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

        <TabsContent value="medicines" className="space-y-6">
          {/* Medicine Affordability Checker */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Medicine Affordability Checker (Jan Aushadhi)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Search Medicine</Label>
                  <Input
                    value={medicineSearch}
                    onChange={(e) => setMedicineSearch(e.target.value)}
                    placeholder="Enter medicine name"
                    className="bg-white/80"
                  />
                </div>
                <div className="flex items-end">
                  <Button variant="outline">Search</Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Popular Affordable Medicines</h4>
                <div className="space-y-3">
                  {affordableMedicines.map((medicine, index) => (
                    <Card key={index} className="bg-white/80">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">{medicine.name}</h5>
                            <p className="text-sm text-muted-foreground">{medicine.generic}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-4">
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Jan Aushadhi</p>
                                <p className="text-sm font-bold text-green-600">{medicine.janAushadhi}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">Market Price</p>
                                <p className="text-sm line-through text-red-600">{medicine.market}</p>
                              </div>
                              <Badge className="bg-green-600">
                                {medicine.savings} OFF
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <DollarSign className="h-4 w-4" />
                <AlertDescription className="text-blue-800">
                  <strong>Jan Aushadhi Centers:</strong> Government stores providing quality generic medicines at affordable prices. 
                  Find your nearest center at janaushadhi.gov.in
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Healthcare;
