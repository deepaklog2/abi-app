import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Heart, Users, Target, Trophy, Star, Plus, Gift } from 'lucide-react';

const FamilyBudget = () => {
  const [familyMembers] = useState([
    { name: 'Dad', role: 'Admin', avatar: 'D', contribution: 50000 },
    { name: 'Mom', role: 'Admin', avatar: 'M', contribution: 35000 },
    { name: 'Ravi', role: 'Child', avatar: 'R', points: 450 },
    { name: 'Priya', role: 'Child', avatar: 'P', points: 320 }
  ]);

  const [sharedGoals] = useState([
    { name: 'School Uniform', target: 5000, current: 3200, category: 'Education' },
    { name: 'Family Vacation', target: 50000, current: 28000, category: 'Travel' },
    { name: 'Emergency Fund', target: 100000, current: 67000, category: 'Savings' }
  ]);

  const [childTasks] = useState([
    { child: 'Ravi', task: 'Track pocket money for a week', points: 50, completed: true },
    { child: 'Priya', task: 'Help with grocery budeting', points: 30, completed: false },
    { child: 'Ravi', task: 'Save 20% of pocket money', points: 100, completed: true }
  ]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-black mb-6">Family Shared Budgeting System</h1>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="text-black">Overview</TabsTrigger>
          <TabsTrigger value="goals" className="text-black">Shared Goals</TabsTrigger>
          <TabsTrigger value="kids" className="text-black">Kids Zone</TabsTrigger>
          <TabsTrigger value="collaboration" className="text-black">Collaboration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Family Members */}
          <Card>
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Users className="h-5 w-5" />
                Family Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {familyMembers.map((member, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarFallback className="text-xl font-bold">{member.avatar}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-black">{member.name}</h3>
                    <Badge variant="outline" className="mb-2 text-black">{member.role}</Badge>
                    {member.contribution && (
                      <p className="text-sm text-black">₹{member.contribution.toLocaleString()}/month</p>
                    )}
                    {member.points && (
                      <p className="text-sm text-black flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {member.points} points
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Family Wallet */}
          <Card>
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Family Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-black">₹85,000</h3>
                  <p className="text-black">Total Monthly Income</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-black">₹62,000</h3>
                  <p className="text-black">Monthly Expenses</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-600">₹23,000</h3>
                  <p className="text-black">Available for Goals</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Target className="h-5 w-5" />
                Shared Family Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sharedGoals.map((goal, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-black">{goal.name}</h3>
                        <Badge variant="outline" className="text-black">{goal.category}</Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-black">₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}</p>
                        <p className="text-xs text-black">{Math.round((goal.current / goal.target) * 100)}% Complete</p>
                      </div>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="mb-3" />
                    <div className="flex gap-2">
                      <Button size="sm" className="gradient-primary text-white">
                        <Plus className="h-4 w-4 mr-1" />
                        Contribute
                      </Button>
                      <Button size="sm" variant="outline" className="text-black">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kids" className="space-y-6">
          {/* Gamification for Kids */}
          <Card>
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Kids Budget Game
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
                  <h3 className="font-semibold text-black mb-3">Ravi's Dashboard</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-black">
                      <span>Total Points:</span>
                      <span className="font-bold">450 ⭐</span>
                    </div>
                    <div className="flex justify-between text-black">
                      <span>Level:</span>
                      <span className="font-bold">Budget Hero</span>
                    </div>
                    <div className="flex justify-between text-black">
                      <span>This Week:</span>
                      <span className="font-bold">+50 points</span>
                    </div>
                    <Button size="sm" className="w-full gradient-primary text-white">
                      <Gift className="h-4 w-4 mr-1" />
                      Redeem Rewards
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg">
                  <h3 className="font-semibold text-black mb-3">Priya's Dashboard</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-black">
                      <span>Total Points:</span>
                      <span className="font-bold">320 ⭐</span>
                    </div>
                    <div className="flex justify-between text-black">
                      <span>Level:</span>
                      <span className="font-bold">Smart Saver</span>
                    </div>
                    <div className="flex justify-between text-black">
                      <span>This Week:</span>
                      <span className="font-bold">+30 points</span>
                    </div>
                    <Button size="sm" className="w-full gradient-primary text-white">
                      <Gift className="h-4 w-4 mr-1" />
                      Redeem Rewards
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks for Kids */}
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Budget Learning Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {childTasks.map((task, index) => (
                  <div key={index} className={`p-3 border rounded-lg ${task.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-black">{task.task}</p>
                        <p className="text-sm text-black">Assigned to: {task.child}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={task.completed ? "default" : "outline"} className="text-black">
                          {task.points} points
                        </Badge>
                        {task.completed && <p className="text-xs text-green-600 mt-1">Completed ✓</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Family Budget Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-black mb-2">Recent Activities</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-black">• Dad added ₹2,000 to School Uniform fund</p>
                    <p className="text-sm text-black">• Mom updated grocery budget for next month</p>
                    <p className="text-sm text-black">• Ravi completed savings challenge (+50 points)</p>
                    <p className="text-sm text-black">• Priya suggested reducing eating out expenses</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="gradient-primary text-white">
                    Start Family Budget Meeting
                  </Button>
                  <Button variant="outline" className="text-black">
                    Send Budget Update to All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FamilyBudget;
