
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Calculator, 
  Heart, 
  Search, 
  TrendingDown, 
  MapPin,
  Truck,
  Star,
  Bell,
  IndianRupee
} from 'lucide-react';
import { toast } from 'sonner';

const EcommerceShopping = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [budget, setBudget] = useState('');
  const [emiAmount, setEmiAmount] = useState('');
  const [emiTenure, setEmiTenure] = useState('12');
  const [interestRate, setInterestRate] = useState('12');
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Samsung Galaxy M34',
      currentPrice: 16999,
      targetPrice: 15000,
      platform: 'Amazon',
      image: '/placeholder.svg',
      category: 'Mobile'
    },
    {
      id: 2,
      name: 'Boat Airdopes 141',
      currentPrice: 1499,
      targetPrice: 1200,
      platform: 'Flipkart',
      image: '/placeholder.svg',
      category: 'Electronics'
    }
  ]);

  // Chennai-based product suggestions
  const productSuggestions = [
    {
      name: 'Samsung Galaxy A54',
      price: 32999,
      originalPrice: 37999,
      platform: 'Flipkart',
      rating: 4.3,
      delivery: 'Chennai delivery in 1-2 days',
      offers: ['₹2000 off on exchange', 'No Cost EMI'],
      localStore: 'Available at Express Avenue Mall'
    },
    {
      name: 'iPhone 13',
      price: 52900,
      originalPrice: 59900,
      platform: 'Amazon',
      rating: 4.5,
      delivery: 'Chennai delivery same day',
      offers: ['₹7000 instant discount', '12 months warranty'],
      localStore: 'Available at Phoenix MarketCity'
    },
    {
      name: 'OnePlus Nord CE 3',
      price: 24999,
      originalPrice: 28999,
      platform: 'JioMart',
      rating: 4.2,
      delivery: 'Chennai delivery in 3-4 hours',
      offers: ['₹4000 cashback', 'Free JioFiber for 3 months'],
      localStore: 'Available at Forum Vijaya Mall'
    }
  ];

  const calculateEMI = () => {
    const principal = parseFloat(emiAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const tenure = parseFloat(emiTenure);
    
    if (principal && rate && tenure) {
      const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
      return emi.toFixed(2);
    }
    return '0';
  };

  const handleSearch = () => {
    if (!searchQuery || !budget) {
      toast.error('Please enter both product name and budget');
      return;
    }
    toast.success(`Searching for "${searchQuery}" under ₹${budget} in Chennai...`);
  };

  const addToWishlist = (product) => {
    const newItem = {
      id: Date.now(),
      name: product.name,
      currentPrice: product.price,
      targetPrice: product.price * 0.9, // 10% lower as target
      platform: product.platform,
      image: '/placeholder.svg',
      category: 'Electronics'
    };
    setWishlistItems([...wishlistItems, newItem]);
    toast.success(`${product.name} added to wishlist!`);
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    toast.success('Item removed from wishlist');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">E-Commerce & Shopping</h1>
        <Badge variant="secondary" className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          Chennai
        </Badge>
      </div>

      {/* Smart Purchase Advisor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Smart Purchase Advisor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="search">What do you want to buy?</Label>
              <Input
                id="search"
                placeholder="e.g., Smartphone, Laptop, Headphones"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="budget">Your Budget (₹)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="e.g., 25000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>
          
          <Button onClick={handleSearch} className="w-full md:w-auto">
            <Search className="h-4 w-4 mr-2" />
            Find Best Deals in Chennai
          </Button>

          {/* Product Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {productSuggestions.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline">{product.platform}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-1">
                        <Truck className="h-3 w-3" />
                        {product.delivery}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {product.localStore}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      {product.offers.map((offer, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {offer}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        View Deal
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => addToWishlist(product)}
                      >
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* EMI Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            EMI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="emi-amount">Product Price (₹)</Label>
              <Input
                id="emi-amount"
                type="number"
                placeholder="e.g., 50000"
                value={emiAmount}
                onChange={(e) => setEmiAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="emi-tenure">Tenure (Months)</Label>
              <Input
                id="emi-tenure"
                type="number"
                placeholder="e.g., 12"
                value={emiTenure}
                onChange={(e) => setEmiTenure(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="interest-rate">Interest Rate (%)</Label>
              <Input
                id="interest-rate"
                type="number"
                placeholder="e.g., 12"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
          </div>
          
          {emiAmount && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee className="h-5 w-5 text-green-600" />
                <span className="font-semibold">EMI Calculation</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monthly EMI:</span>
                  <span className="font-bold text-green-600">₹{calculateEMI()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span>₹{(parseFloat(calculateEMI()) * parseFloat(emiTenure)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest:</span>
                  <span>₹{((parseFloat(calculateEMI()) * parseFloat(emiTenure)) - parseFloat(emiAmount || '0')).toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                *Interest rates may vary by bank and credit score. Popular banks in Chennai: ICICI, HDFC, SBI, Indian Bank
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Budget-Based Wishlist Manager */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Budget-Based Wishlist Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{item.platform}</Badge>
                      <span>{item.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Current:</span>
                    <span className="font-semibold">₹{item.currentPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Target:</span>
                    <span className="font-semibold text-green-600">₹{item.targetPrice.toLocaleString()}</span>
                  </div>
                  {item.currentPrice <= item.targetPrice && (
                    <Badge variant="default" className="flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" />
                      Price Alert!
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Bell className="h-3 w-3 mr-1" />
                    Alert
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            
            {wishlistItems.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your wishlist is empty</p>
                <p className="text-sm">Add items from the Smart Purchase Advisor above</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Chennai Shopping Tips</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Check local stores in Express Avenue, Phoenix MarketCity for immediate pickup</li>
              <li>• Compare prices during Chennai Shopping Festival (usually in December)</li>
              <li>• Use Chennai Metro for eco-friendly shopping trips to malls</li>
              <li>• Check for Tamil Nadu-specific cashback offers on regional payment apps</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EcommerceShopping;
