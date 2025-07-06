
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
  CreditCard,
  Banknote,
  TrendingUp,
  Calendar,
  Users,
  FileText,
  Calculator,
  Shield,
  Plus,
  ArrowUpDown,
  Clock
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  balance: number;
  category: string;
}

interface Beneficiary {
  id: string;
  name: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
}

interface ScheduledTransaction {
  id: string;
  type: 'transfer' | 'bill';
  amount: number;
  description: string;
  scheduledDate: string;
  frequency: 'once' | 'monthly' | 'weekly';
  status: 'pending' | 'completed';
}

const OnlineBanking = () => {
  const [balance, setBalance] = useState(125000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [scheduledTransactions, setScheduledTransactions] = useState<ScheduledTransaction[]>([]);
  
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferDescription, setTransferDescription] = useState('');
  
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: '',
    accountNumber: '',
    ifsc: '',
    bankName: ''
  });

  const [loanAmount, setLoanAmount] = useState(500000);
  const [loanTenure, setLoanTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  useEffect(() => {
    // Load initial data
    const savedTransactions = localStorage.getItem('bankTransactions');
    const savedBeneficiaries = localStorage.getItem('beneficiaries');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Initial dummy transactions
      const initialTransactions = [
        { id: '1', type: 'credit' as const, amount: 45000, description: 'Salary Credit', date: new Date().toISOString(), balance: 125000, category: 'Income' },
        { id: '2', type: 'debit' as const, amount: 1500, description: 'ATM Withdrawal', date: new Date(Date.now() - 86400000).toISOString(), balance: 80000, category: 'Cash' },
        { id: '3', type: 'debit' as const, amount: 2300, description: 'Online Shopping', date: new Date(Date.now() - 172800000).toISOString(), balance: 81500, category: 'Shopping' }
      ];
      setTransactions(initialTransactions);
    }

    if (savedBeneficiaries) {
      setBeneficiaries(JSON.parse(savedBeneficiaries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bankTransactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('beneficiaries', JSON.stringify(beneficiaries));
  }, [beneficiaries]);

  const addMoney = () => {
    const amount = parseFloat(transferAmount);
    if (!amount || amount <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'credit',
      amount: amount,
      description: transferDescription || 'Money Added',
      date: new Date().toISOString(),
      balance: balance + amount,
      category: 'Deposit'
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev + amount);
    setTransferAmount('');
    setTransferDescription('');
    
    toast({ title: "Money Added", description: `₹${amount} added to your account` });
  };

  const withdrawMoney = () => {
    const amount = parseFloat(transferAmount);
    if (!amount || amount <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid amount", variant: "destructive" });
      return;
    }

    if (amount > balance) {
      toast({ title: "Insufficient Balance", description: "Not enough balance for this withdrawal", variant: "destructive" });
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'debit',
      amount: amount,
      description: transferDescription || 'Money Withdrawn',
      date: new Date().toISOString(),
      balance: balance - amount,
      category: 'Withdrawal'
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev - amount);
    setTransferAmount('');
    setTransferDescription('');
    
    toast({ title: "Money Withdrawn", description: `₹${amount} withdrawn from your account` });
  };

  const transferFunds = () => {
    const amount = parseFloat(transferAmount);
    if (!amount || amount <= 0 || !transferTo) {
      toast({ title: "Invalid Transfer", description: "Please enter amount and recipient", variant: "destructive" });
      return;
    }

    if (amount > balance) {
      toast({ title: "Insufficient Balance", description: "Not enough balance for this transfer", variant: "destructive" });
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'debit',
      amount: amount,
      description: `Transfer to ${transferTo}`,
      date: new Date().toISOString(),
      balance: balance - amount,
      category: 'Transfer'
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev - amount);
    setTransferAmount('');
    setTransferTo('');
    setTransferDescription('');
    
    toast({ title: "Transfer Successful", description: `₹${amount} transferred to ${transferTo}` });
  };

  const addBeneficiary = () => {
    if (!newBeneficiary.name || !newBeneficiary.accountNumber || !newBeneficiary.ifsc) {
      toast({ title: "Missing Information", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const beneficiary: Beneficiary = {
      id: Date.now().toString(),
      ...newBeneficiary
    };

    setBeneficiaries(prev => [...prev, beneficiary]);
    setNewBeneficiary({ name: '', accountNumber: '', ifsc: '', bankName: '' });
    
    toast({ title: "Beneficiary Added", description: `${beneficiary.name} added successfully` });
  };

  const calculateEMI = () => {
    const P = loanAmount;
    const r = (interestRate / 100) / 12;
    const n = loanTenure * 12;
    
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalPayment = emi * loanTenure * 12;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Online Banking Simulation</h1>
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Shield className="h-4 w-4 mr-2" />
          Secure Banking
        </Badge>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
          <TabsTrigger value="beneficiaries">Beneficiaries</TabsTrigger>
          <TabsTrigger value="loans">Loans & EMI</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Account Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Account Balance</p>
                    <p className="text-2xl font-bold text-green-600">₹{balance.toLocaleString()}</p>
                  </div>
                  <Banknote className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{transactions.filter(t => 
                        new Date(t.date).getMonth() === new Date().getMonth() && t.type === 'debit'
                      ).reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Beneficiaries</p>
                    <p className="text-2xl font-bold text-purple-600">{beneficiaries.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                    <p className="text-2xl font-bold text-orange-600">{transactions.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Amount (₹)</Label>
                  <Input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="10000"
                    className="bg-white/80"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={transferDescription}
                    onChange={(e) => setTransferDescription(e.target.value)}
                    placeholder="Purpose"
                    className="bg-white/80"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Actions</Label>
                  <div className="flex gap-2">
                    <Button onClick={addMoney} className="gradient-primary flex-1" size="sm">
                      Add Money
                    </Button>
                    <Button onClick={withdrawMoney} variant="outline" className="flex-1" size="sm">
                      Withdraw
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Transfer To</Label>
                  <div className="space-y-2">
                    <Input
                      value={transferTo}
                      onChange={(e) => setTransferTo(e.target.value)}
                      placeholder="Account or UPI ID"
                      className="bg-white/80"
                    />
                    <Button onClick={transferFunds} variant="outline" className="w-full" size="sm">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Transfer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {transactions.slice(0, 8).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        transaction.type === 'credit' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Bal: ₹{transaction.balance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transfer" className="space-y-6">
          {/* Fund Transfer */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Fund Transfer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Transfer Amount (₹)</Label>
                    <Input
                      type="number"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="bg-white/80"
                    />
                  </div>
                  <div>
                    <Label>Recipient</Label>
                    <select
                      value={transferTo}
                      onChange={(e) => setTransferTo(e.target.value)}
                      className="w-full p-2 border rounded-md bg-white/80"
                    >
                      <option value="">Select Beneficiary</option>
                      {beneficiaries.map(ben => (
                        <option key={ben.id} value={ben.name}>
                          {ben.name} - {ben.accountNumber.slice(-4)}
                        </option>
                      ))}
                      <option value="new">Enter New Recipient</option>
                    </select>
                  </div>
                  {transferTo === 'new' && (
                    <div>
                      <Label>Account Number / UPI ID</Label>
                      <Input
                        onChange={(e) => setTransferTo(e.target.value)}
                        placeholder="Enter account number or UPI ID"
                        className="bg-white/80"
                      />
                    </div>
                  )}
                  <div>
                    <Label>Purpose</Label>
                    <Input
                      value={transferDescription}
                      onChange={(e) => setTransferDescription(e.target.value)}
                      placeholder="Transfer purpose"
                      className="bg-white/80"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Transfer Summary</strong><br />
                      Amount: ₹{transferAmount || '0'}<br />
                      Available Balance: ₹{balance.toLocaleString()}<br />
                      Recipient: {transferTo || 'Not selected'}
                    </AlertDescription>
                  </Alert>
                  <Button onClick={transferFunds} className="gradient-primary w-full">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Transfer Funds
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Transfer */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Schedule Future Transfer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Amount (₹)</Label>
                  <Input placeholder="5000" className="bg-white/80" />
                </div>
                <div>
                  <Label>Recipient</Label>
                  <select className="w-full p-2 border rounded-md bg-white/80">
                    <option>Select Beneficiary</option>
                    {beneficiaries.map(ben => (
                      <option key={ben.id}>{ben.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Schedule Date</Label>
                  <Input type="date" className="bg-white/80" />
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full">
                    Schedule Transfer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statements" className="space-y-6">
          {/* Statement Filters */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Account Statements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <Label>Statement Type</Label>
                  <select className="w-full p-2 border rounded-md bg-white/80">
                    <option>Mini Statement (10 transactions)</option>
                    <option>Monthly Statement</option>
                    <option>Custom Date Range</option>
                  </select>
                </div>
                <div>
                  <Label>From Date</Label>
                  <Input type="date" className="bg-white/80" />
                </div>
                <div>
                  <Label>To Date</Label>
                  <Input type="date" className="bg-white/80" />
                </div>
                <div className="flex items-end">
                  <Button className="gradient-primary w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Statement
                  </Button>
                </div>
              </div>

              {/* Detailed Transaction List */}
              <div className="space-y-3">
                <h4 className="font-medium">Transaction History</h4>
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-white/80 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[60px]">
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs">
                          {new Date(transaction.date).toLocaleTimeString()}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Balance: ₹{transaction.balance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="beneficiaries" className="space-y-6">
          {/* Add Beneficiary */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Add New Beneficiary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={newBeneficiary.name}
                    onChange={(e) => setNewBeneficiary(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>Account Number</Label>
                  <Input
                    value={newBeneficiary.accountNumber}
                    onChange={(e) => setNewBeneficiary(prev => ({ ...prev, accountNumber: e.target.value }))}
                    placeholder="1234567890"
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>IFSC Code</Label>
                  <Input
                    value={newBeneficiary.ifsc}
                    onChange={(e) => setNewBeneficiary(prev => ({ ...prev, ifsc: e.target.value }))}
                    placeholder="SBIN0001234"
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>Bank Name</Label>
                  <Input
                    value={newBeneficiary.bankName}
                    onChange={(e) => setNewBeneficiary(prev => ({ ...prev, bankName: e.target.value }))}
                    placeholder="State Bank of India"
                    className="bg-white/80"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addBeneficiary} className="gradient-primary w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Beneficiary List */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Saved Beneficiaries ({beneficiaries.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {beneficiaries.map((beneficiary) => (
                  <Card key={beneficiary.id} className="bg-white/80">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">{beneficiary.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Account: {beneficiary.accountNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          IFSC: {beneficiary.ifsc}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Bank: {beneficiary.bankName}
                        </p>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Transfer
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {beneficiaries.length === 0 && (
                  <div className="col-span-2 text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No beneficiaries added yet. Add your first beneficiary above.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="space-y-6">
          {/* EMI Calculator */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Loan EMI Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Loan Amount (₹)</Label>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                      className="bg-white/80"
                    />
                  </div>
                  <div>
                    <Label>Interest Rate (% per annum)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                      className="bg-white/80"
                    />
                  </div>
                  <div>
                    <Label>Loan Tenure (Years)</Label>
                    <Input
                      type="number"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(parseFloat(e.target.value) || 0)}
                      className="bg-white/80"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-3">Loan Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monthly EMI:</span>
                        <span className="font-bold text-blue-600">₹{emi.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Payment:</span>
                        <span>₹{totalPayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Interest:</span>
                        <span>₹{totalInterest.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="gradient-primary w-full">
                    Apply for Loan
                  </Button>
                  
                  <Alert>
                    <Calculator className="h-4 w-4" />
                    <AlertDescription>
                      Based on your profile, you're eligible for loans up to ₹15,00,000 
                      at competitive interest rates.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Products */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Available Loan Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Personal Loan', rate: '10.5%', amount: '₹5L', tenure: '5 years' },
                  { name: 'Home Loan', rate: '8.5%', amount: '₹50L', tenure: '30 years' },
                  { name: 'Car Loan', rate: '9.0%', amount: '₹10L', tenure: '7 years' }
                ].map((loan, index) => (
                  <Card key={index} className="bg-white/80">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{loan.name}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Rate: {loan.rate} onwards</p>
                        <p>Max Amount: {loan.amount}</p>
                        <p>Max Tenure: {loan.tenure}</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          {/* Banking Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Fixed Deposits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Deposit Amount (₹)</Label>
                  <Input placeholder="50000" className="bg-white/80" />
                </div>
                <div>
                  <Label>Tenure</Label>
                  <select className="w-full p-2 border rounded-md bg-white/80">
                    <option>1 Year (6.5%)</option>
                    <option>2 Years (6.8%)</option>
                    <option>3 Years (7.0%)</option>
                    <option>5 Years (7.5%)</option>
                  </select>
                </div>
                <Button className="gradient-primary w-full">
                  Create Fixed Deposit
                </Button>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Bill Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Service Provider</Label>
                  <select className="w-full p-2 border rounded-md bg-white/80">
                    <option>Electricity Board</option>
                    <option>Water Department</option>
                    <option>Gas Company</option>
                    <option>Internet Provider</option>
                    <option>Mobile Recharge</option>
                  </select>
                </div>
                <div>
                  <Label>Consumer Number</Label>
                  <Input placeholder="Enter consumer number" className="bg-white/80" />
                </div>
                <div>
                  <Label>Amount (₹)</Label>
                  <Input placeholder="1500" className="bg-white/80" />
                </div>
                <Button variant="outline" className="w-full">
                  Pay Bill
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Card Services */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Card Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-16 flex flex-col">
                  <CreditCard className="h-5 w-5 mb-1" />
                  Request Debit Card
                </Button>
                <Button variant="outline" className="h-16 flex flex-col">
                  <FileText className="h-5 w-5 mb-1" />
                  Request Checkbook
                </Button>
                <Button variant="outline" className="h-16 flex flex-col">
                  <Shield className="h-5 w-5 mb-1" />
                  Block/Unblock Card
                </Button>
                <Button variant="outline" className="h-16 flex flex-col">
                  <Calendar className="h-5 w-5 mb-1" />
                  Set PIN
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnlineBanking;
