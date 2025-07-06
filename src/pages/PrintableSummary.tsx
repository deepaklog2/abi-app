
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Printer, Globe } from 'lucide-react';

const PrintableSummary = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const languages = [
    { code: 'english', name: 'English', native: 'English' },
    { code: 'hindi', name: 'Hindi', native: 'हिंदी' },
    { code: 'tamil', name: 'Tamil', native: 'தமிழ்' },
    { code: 'telugu', name: 'Telugu', native: 'తెలుగు' },
    { code: 'bengali', name: 'Bengali', native: 'বাংলা' },
    { code: 'marathi', name: 'Marathi', native: 'मराठी' },
    { code: 'gujarati', name: 'Gujarati', native: 'ગુજરાતી' }
  ];

  const summaryData = {
    income: 85000,
    expenses: 62000,
    savings: 23000,
    categories: [
      { name: 'Rent', amount: 25000, percentage: 40 },
      { name: 'Groceries', amount: 12000, percentage: 19 },
      { name: 'Transportation', amount: 8000, percentage: 13 },
      { name: 'Utilities', amount: 5000, percentage: 8 },
      { name: 'Education', amount: 7000, percentage: 11 },
      { name: 'Entertainment', amount: 3000, percentage: 5 },
      { name: 'Healthcare', amount: 2000, percentage: 3 }
    ]
  };

  const generatePDF = () => {
    // Simulate PDF generation
    alert(`Generating ${selectedPeriod} budget summary in ${languages.find(l => l.code === selectedLanguage)?.name}...`);
  };

  const printSummary = () => {
    window.print();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-black mb-6">Printable Budget Summary</h1>
      
      {/* Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-black flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Summary Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-black mb-2 block">Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-black mb-2 block">Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {lang.name} ({lang.native})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button onClick={generatePDF} className="gradient-primary text-white">
                <Download className="h-4 w-4 mr-2" />
                Generate PDF
              </Button>
              <Button onClick={printSummary} variant="outline" className="text-black">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="print:shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-black text-2xl">
            {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Budget Summary
          </CardTitle>
          <p className="text-black">Period: January 2024</p>
          <Badge variant="outline" className="w-fit mx-auto text-black">
            Language: {languages.find(l => l.code === selectedLanguage)?.native}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-black">Total Income</h3>
              <p className="text-2xl font-bold text-green-600">₹{summaryData.income.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h3 className="text-lg font-semibold text-black">Total Expenses</h3>
              <p className="text-2xl font-bold text-red-600">₹{summaryData.expenses.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-black">Net Savings</h3>
              <p className="text-2xl font-bold text-blue-600">₹{summaryData.savings.toLocaleString()}</p>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-4">Expense Breakdown</h3>
            <div className="space-y-3">
              {summaryData.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-black">{category.name}</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${category.percentage}%`}}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-black">₹{category.amount.toLocaleString()}</p>
                    <p className="text-sm text-black">{category.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Notes */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-black mb-3">Key Insights</h3>
            <div className="space-y-2 text-black">
              <p>• You saved 27% of your total income this month</p>
              <p>• Rent accounts for 40% of your total expenses</p>
              <p>• You spent ₹1,000 less on entertainment compared to last month</p>
              <p>• Your emergency fund now has ₹67,000 (3.2 months of expenses)</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center border-t pt-4 text-sm text-black">
            <p>Generated by Smart Budget Manager</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrintableSummary;
