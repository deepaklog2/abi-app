
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Key, 
  Eye, 
  EyeOff, 
  Copy, 
  RefreshCw, 
  Plus, 
  AlertTriangle,
  CheckCircle,
  Lock
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PasswordEntry {
  id: string;
  website: string;
  username: string;
  password: string;
  category: string;
  lastUpdated: string;
  strength: 'weak' | 'medium' | 'strong';
}

const PasswordManager = () => {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    website: '',
    username: '',
    password: '',
    category: 'Social Media'
  });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const [masterPassword, setMasterPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const categories = ['Social Media', 'Banking', 'Email', 'Shopping', 'Work', 'Entertainment', 'Other'];

  useEffect(() => {
    if (isUnlocked) {
      const saved = localStorage.getItem('passwords');
      if (saved) {
        setPasswords(JSON.parse(saved));
      }
    }
  }, [isUnlocked]);

  useEffect(() => {
    if (isUnlocked) {
      localStorage.setItem('passwords', JSON.stringify(passwords));
    }
  }, [passwords, isUnlocked]);

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = lowercase;
    if (includeUppercase) charset += uppercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setGeneratedPassword(password);
    toast({
      title: "Password Generated",
      description: `Strong password with ${passwordLength} characters created`,
    });
  };

  const checkPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score >= 4) return 'strong';
    if (score >= 2) return 'medium';
    return 'weak';
  };

  const addPassword = () => {
    if (!newEntry.website || !newEntry.username || !newEntry.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const entry: PasswordEntry = {
      id: Date.now().toString(),
      website: newEntry.website,
      username: newEntry.username,
      password: newEntry.password,
      category: newEntry.category,
      lastUpdated: new Date().toLocaleDateString(),
      strength: checkPasswordStrength(newEntry.password)
    };

    setPasswords(prev => [...prev, entry]);
    setNewEntry({ website: '', username: '', password: '', category: 'Social Media' });
    
    toast({
      title: "Password Saved",
      description: `Credentials for ${entry.website} have been securely stored`,
    });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const unlockVault = () => {
    // Simple demo password check
    if (masterPassword === 'demo123' || masterPassword.length >= 6) {
      setIsUnlocked(true);
      toast({
        title: "Vault Unlocked",
        description: "Welcome to your secure password manager",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Please enter correct master password",
        variant: "destructive"
      });
    }
  };

  if (!isUnlocked) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md gradient-card border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Secure Password Vault</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Master Password</Label>
                <Input
                  type="password"
                  value={masterPassword}
                  onChange={(e) => setMasterPassword(e.target.value)}
                  placeholder="Enter your master password"
                  className="bg-white/80"
                  onKeyPress={(e) => e.key === 'Enter' && unlockVault()}
                />
              </div>
              <Button onClick={unlockVault} className="gradient-primary w-full">
                <Shield className="h-4 w-4 mr-2" />
                Unlock Vault
              </Button>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Demo: Use "demo123" or any password with 6+ characters
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Password Manager</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600">
            <Shield className="h-4 w-4 mr-1" />
            Secured
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsUnlocked(false)}
          >
            Lock Vault
          </Button>
        </div>
      </div>

      <Tabs defaultValue="passwords" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="passwords">My Passwords</TabsTrigger>
          <TabsTrigger value="generator">Password Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          {/* Password Generator */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Strong Password Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Password Length: {passwordLength}</Label>
                    <input
                      type="range"
                      min="8"
                      max="32"
                      value={passwordLength}
                      onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeUppercase}
                        onChange={(e) => setIncludeUppercase(e.target.checked)}
                      />
                      <span>Include Uppercase (A-Z)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                      />
                      <span>Include Numbers (0-9)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                      />
                      <span>Include Symbols (!@#$)</span>
                    </label>
                  </div>

                  <Button onClick={generatePassword} className="gradient-primary w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generate Password
                  </Button>
                </div>

                <div className="space-y-4">
                  {generatedPassword && (
                    <div>
                      <Label>Generated Password</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          value={generatedPassword}
                          readOnly
                          className="bg-white/80 font-mono"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(generatedPassword, 'Password')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2">
                        <Badge
                          variant={
                            checkPasswordStrength(generatedPassword) === 'strong' ? 'default' :
                            checkPasswordStrength(generatedPassword) === 'medium' ? 'secondary' : 'destructive'
                          }
                        >
                          {checkPasswordStrength(generatedPassword).toUpperCase()} PASSWORD
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Password Tips:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Use at least 12 characters</li>
                      <li>• Mix letters, numbers & symbols</li>
                      <li>• Avoid personal information</li>
                      <li>• Use unique password for each site</li>
                      <li>• Update passwords regularly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="passwords" className="space-y-6">
          {/* Add New Password */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Add New Password</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label>Website/App</Label>
                  <Input
                    value={newEntry.website}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="facebook.com"
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>Username/Email</Label>
                  <Input
                    value={newEntry.username}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="user@email.com"
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value={newEntry.password}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="••••••••"
                      className="bg-white/80"
                    />
                    {generatedPassword && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setNewEntry(prev => ({ ...prev, password: generatedPassword }))}
                      >
                        Use Generated
                      </Button>
                    )}
                  </div>
                </div>
                <div>
                  <Label>Category</Label>
                  <select
                    value={newEntry.category}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2 border rounded-md bg-white/80"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button onClick={addPassword} className="gradient-primary w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Password List */}
          <Card className="gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Saved Passwords ({passwords.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {passwords.map((entry) => (
                  <Card key={entry.id} className="bg-white/80">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium">{entry.website}</h4>
                            <Badge variant="outline">{entry.category}</Badge>
                            <Badge
                              variant={
                                entry.strength === 'strong' ? 'default' :
                                entry.strength === 'medium' ? 'secondary' : 'destructive'
                              }
                            >
                              {entry.strength}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs">Username</Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  value={entry.username}
                                  readOnly
                                  className="bg-gray-50 text-sm"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(entry.username, 'Username')}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs">Password</Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  type={showPasswords[entry.id] ? 'text' : 'password'}
                                  value={entry.password}
                                  readOnly
                                  className="bg-gray-50 text-sm font-mono"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => togglePasswordVisibility(entry.id)}
                                >
                                  {showPasswords[entry.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(entry.password, 'Password')}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Last updated: {entry.lastUpdated}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {passwords.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No passwords saved yet. Add your first password above.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PasswordManager;
