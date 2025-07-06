
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckSquare, 
  Plus, 
  Calendar, 
  DollarSign, 
  Zap,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
  dueDate?: string;
  createdAt: string;
  isGenerated?: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTask, setNewTask] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [selectedCategory, setSelectedCategory] = useState('Personal');

  const categories = ['Budget Tasks', 'Financial Goals', 'Bills & Payments', 'Savings', 'Personal', 'Work', 'Health'];
  
  const autoBudgetTasks = [
    { task: 'Review monthly expenses and categorize spending', category: 'Budget Tasks', priority: 'high' as const },
    { task: 'Update emergency fund savings goal', category: 'Financial Goals', priority: 'high' as const },
    { task: 'Pay electricity bill (due in 3 days)', category: 'Bills & Payments', priority: 'high' as const },
    { task: 'Set up automatic savings transfer', category: 'Savings', priority: 'medium' as const },
    { task: 'Research better investment options', category: 'Financial Goals', priority: 'medium' as const },
    { task: 'Compare insurance premium rates', category: 'Budget Tasks', priority: 'medium' as const },
    { task: 'Track daily expenses for this week', category: 'Budget Tasks', priority: 'medium' as const },
    { task: 'Cancel unused subscriptions', category: 'Budget Tasks', priority: 'low' as const },
    { task: 'Plan next month\'s budget allocation', category: 'Budget Tasks', priority: 'low' as const },
    { task: 'Research tax-saving investment options', category: 'Financial Goals', priority: 'low' as const }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('todoList');
    if (saved) {
      setTodos(JSON.parse(saved));
    } else {
      // Auto-generate initial budget tasks
      generateBudgetTasks();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todos));
  }, [todos]);

  const generateBudgetTasks = () => {
    const generatedTasks = autoBudgetTasks.map((task, index) => ({
      id: `generated-${Date.now()}-${index}`,
      task: task.task,
      completed: false,
      priority: task.priority,
      category: task.category,
      createdAt: new Date().toISOString(),
      isGenerated: true
    }));

    setTodos(generatedTasks);
    toast({
      title: "Auto-Generated Tasks",
      description: `${generatedTasks.length} budget-related tasks have been created for you`,
    });
  };

  const addTodo = () => {
    if (!newTask.trim()) {
      toast({
        title: "Task Required",
        description: "Please enter a task description",
        variant: "destructive"
      });
      return;
    }

    const todo: TodoItem = {
      id: Date.now().toString(),
      task: newTask,
      completed: false,
      priority: selectedPriority,
      category: selectedCategory,
      createdAt: new Date().toISOString()
    };

    setTodos(prev => [todo, ...prev]);
    setNewTask('');
    
    toast({
      title: "Task Added",
      description: `"${todo.task}" added to your list`,
    });
  };

  const toggleComplete = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    toast({
      title: "Task Deleted",
      description: "Task removed from your list",
    });
  };

  const getCompletionRate = () => {
    if (todos.length === 0) return 0;
    return (todos.filter(todo => todo.completed).length / todos.length) * 100;
  };

  const getTasksByCategory = () => {
    return categories.map(category => ({
      category,
      total: todos.filter(todo => todo.category === category).length,
      completed: todos.filter(todo => todo.category === category && todo.completed).length
    })).filter(item => item.total > 0);
  };

  const getPriorityTasks = () => {
    return {
      high: todos.filter(todo => todo.priority === 'high' && !todo.completed).length,
      medium: todos.filter(todo => todo.priority === 'medium' && !todo.completed).length,
      low: todos.filter(todo => todo.priority === 'low' && !todo.completed).length
    };
  };

  const completionRate = getCompletionRate();
  const tasksByCategory = getTasksByCategory();
  const priorityTasks = getPriorityTasks();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Smart Todo List</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <CheckSquare className="h-4 w-4 mr-2" />
            {completionRate.toFixed(0)}% Complete
          </Badge>
          <Button 
            onClick={generateBudgetTasks}
            variant="outline" 
            size="sm"
          >
            <Zap className="h-4 w-4 mr-2" />
            Generate Budget Tasks
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold text-blue-600">{todos.length}</p>
                  </div>
                  <CheckSquare className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-green-600">
                      {todos.filter(t => t.completed).length}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                    <p className="text-2xl font-bold text-red-600">{priorityTasks.high}</p>
                  </div>
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Budget Tasks</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {todos.filter(t => t.category === 'Budget Tasks').length}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add New Task */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Add New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter your task..."
                    className="bg-white/80"
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  />
                </div>
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-md bg-white/80"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value as 'high' | 'medium' | 'low')}
                    className="flex-1 p-2 border rounded-md bg-white/80"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <Button onClick={addTodo} className="gradient-primary">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task List */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Your Tasks ({todos.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {todos.map((todo) => (
                  <div key={todo.id} className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                    todo.completed ? 'bg-green-50 border border-green-200' : 'bg-white/50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleComplete(todo.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          todo.completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {todo.completed && <CheckSquare className="h-3 w-3" />}
                      </button>
                      <div>
                        <p className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                          {todo.task}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {todo.category}
                          </Badge>
                          <Badge 
                            variant={
                              todo.priority === 'high' ? 'destructive' :
                              todo.priority === 'medium' ? 'secondary' : 'outline'
                            }
                            className="text-xs"
                          >
                            {todo.priority}
                          </Badge>
                          {todo.isGenerated && (
                            <Badge variant="outline" className="text-xs text-blue-600">
                              <Zap className="h-3 w-3 mr-1" />
                              Auto
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
                {todos.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No tasks yet. Add your first task above or generate budget tasks.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Completion Progress */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Completion Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Overall Progress</span>
                  <span>{completionRate.toFixed(1)}%</span>
                </div>
                <Progress value={completionRate} className="h-3" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{priorityTasks.high}</p>
                  <p className="text-sm text-red-600">High Priority</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{priorityTasks.medium}</p>
                  <p className="text-sm text-yellow-600">Medium Priority</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{priorityTasks.low}</p>
                  <p className="text-sm text-green-600">Low Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Productivity */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Productivity Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Today's Focus</h4>
                  <p className="text-sm text-blue-700">
                    You have {priorityTasks.high} high-priority tasks pending. 
                    Complete them first for maximum productivity!
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Achievement</h4>
                  <p className="text-sm text-green-700">
                    Great job! You've completed {todos.filter(t => t.completed).length} tasks so far. 
                    Keep up the momentum!
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Budget Task Progress</h4>
                  <p className="text-sm text-purple-700">
                    {todos.filter(t => t.category === 'Budget Tasks' && t.completed).length} out of{' '}
                    {todos.filter(t => t.category === 'Budget Tasks').length} budget tasks completed.
                    Financial planning is on track!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {/* Tasks by Category */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Tasks by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasksByCategory.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.completed}/{item.total} completed
                      </span>
                    </div>
                    <Progress 
                      value={item.total > 0 ? (item.completed / item.total) * 100 : 0} 
                      className="h-2" 
                    />
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

export default TodoList;
