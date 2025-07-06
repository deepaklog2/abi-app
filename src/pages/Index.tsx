
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart3,
  Bell,
  Calendar,
  Heart,
  Flag,
  Search,
  Plus,
  Clock,
  File
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "AI-powered insights into your spending patterns and financial habits"
    },
    {
      icon: Bell,
      title: "Budget Alerts",
      description: "Real-time notifications when you're approaching budget limits"
    },
    {
      icon: Calendar,
      title: "Expense Tracking",
      description: "Automatic categorization and tracking of all your expenses"
    },
    {
      icon: Heart,
      title: "Family Budgeting",
      description: "Collaborative budgeting tools for the whole family"
    },
    {
      icon: Flag,
      title: "Financial Goals",
      description: "Set and track progress towards your financial objectives"
    },
    {
      icon: Search,
      title: "Price Comparison",
      description: "Find the best deals across multiple platforms and stores"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 bg-white">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-black">
              Smart Budget Manager
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-black hover:text-black">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="gradient-primary text-white">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Take Control of Your
            <br />
            Financial Future
          </h1>
          <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
            Smart Budget Manager helps middle-class families and students manage finances 
            with AI-powered insights, collaborative budgeting, and intelligent spending recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="gradient-primary text-white text-lg px-8 py-3">
                Start Free Today
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-black border-black hover:bg-gray-100 text-lg px-8 py-3">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Everything You Need to Budget Smarter
          </h2>
          <p className="text-xl text-black max-w-2xl mx-auto">
            From expense tracking to family collaboration, we've got all the tools 
            to help you achieve your financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
                <p className="text-black">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20 bg-white">
        <Card className="bg-white border border-gray-200 shadow-2xl">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  50,000+
                </div>
                <p className="text-black">Families Helped</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  ₹10M+
                </div>
                <p className="text-black">Money Saved</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  95%
                </div>
                <p className="text-black">Satisfaction Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="text-xl text-black mb-8">
            Join thousands of families who are already building better financial habits 
            with Smart Budget Manager.
          </p>
          <Link to="/signup">
            <Button size="lg" className="gradient-primary text-white text-lg px-8 py-3">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-gray-200 bg-white">
        <div className="text-center text-black">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-black">Smart Budget Manager</span>
          </div>
          <p className="text-black">&copy; 2024 Smart Budget Manager. Empowering financial wellness for everyone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
