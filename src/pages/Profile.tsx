
import React, { useState } from 'react';
import { useAuth } from '@/components/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    familyMembers: user?.familyDetails?.members || 1,
    monthlyIncome: user?.familyDetails?.monthlyIncome || 0,
    preferences: user?.familyDetails?.preferences || [],
  });

  const budgetPreferences = [
    '50-30-20 Rule',
    'Zero-Based Budgeting',
    'Envelope Method',
    'Pay Debt First',
    'Emergency Fund Priority',
    'Investment Focused',
  ];

  const handlePreferenceChange = (preference: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: checked 
        ? [...prev.preferences, preference]
        : prev.preferences.filter(p => p !== preference)
    }));
  };

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      familyDetails: {
        members: formData.familyMembers,
        monthlyIncome: formData.monthlyIncome,
        preferences: formData.preferences,
      }
    });
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
    
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Personal Information */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                className="bg-white/80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Family Details */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Family Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="familyMembers">Number of Family Members</Label>
              <Select
                value={formData.familyMembers.toString()}
                onValueChange={(value) => setFormData(prev => ({ ...prev, familyMembers: parseInt(value) }))}
                disabled={!isEditing}
              >
                <SelectTrigger className="bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monthly Family Income (₹)</Label>
              <Input
                id="monthlyIncome"
                type="number"
                value={formData.monthlyIncome}
                onChange={(e) => setFormData(prev => ({ ...prev, monthlyIncome: parseInt(e.target.value) || 0 }))}
                disabled={!isEditing}
                className="bg-white/80"
                placeholder="45000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Preferences */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Budget Planning Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgetPreferences.map((preference) => (
              <div key={preference} className="flex items-center space-x-2">
                <Checkbox
                  id={preference}
                  checked={formData.preferences.includes(preference)}
                  onCheckedChange={(checked) => handlePreferenceChange(preference, checked as boolean)}
                  disabled={!isEditing}
                />
                <Label htmlFor={preference} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {preference}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Overview */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">₹{formData.monthlyIncome.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Monthly Income</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{formData.familyMembers}</p>
              <p className="text-sm text-muted-foreground">Family Members</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">₹{Math.round(formData.monthlyIncome / formData.familyMembers).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Per Person Income</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Budget Breakdown */}
      {formData.monthlyIncome > 0 && (
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recommended Budget Breakdown (50-30-20 Rule)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-xl font-bold text-orange-600">₹{Math.round(formData.monthlyIncome * 0.5).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Needs (50%)</p>
                <p className="text-xs text-gray-500">Rent, Food, Utilities</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-xl font-bold text-yellow-600">₹{Math.round(formData.monthlyIncome * 0.3).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Wants (30%)</p>
                <p className="text-xs text-gray-500">Entertainment, Dining</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-xl font-bold text-green-600">₹{Math.round(formData.monthlyIncome * 0.2).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Savings (20%)</p>
                <p className="text-xs text-gray-500">Emergency, Investments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end">
          <Button onClick={handleSave} className="gradient-primary">
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
