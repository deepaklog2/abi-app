
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Play, Star, Clock, Search, Heart, HelpCircle, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const OTTPlatform = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  
  // Audio refs for sound effects
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const favoriteSoundRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements
  React.useEffect(() => {
    // Using free online sound effects
    hoverSoundRef.current = new Audio('https://www.soundjay.com/misc/sounds/beep-07a.wav');
    clickSoundRef.current = new Audio('https://www.soundjay.com/misc/sounds/click-04.wav');
    favoriteSoundRef.current = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav');
    
    // Set low volume
    if (hoverSoundRef.current) hoverSoundRef.current.volume = 0.3;
    if (clickSoundRef.current) clickSoundRef.current.volume = 0.4;
    if (favoriteSoundRef.current) favoriteSoundRef.current.volume = 0.5;
  }, []);

  const playSound = (soundRef: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (soundEnabled && soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(() => {
        // Ignore errors if sound can't play
      });
    }
  };

  const tamilMovies = [
    { id: 1, title: 'Vikram', genre: 'Action', year: 2022, rating: 8.4, duration: '174 min', poster: '/lovable-uploads/72ab96bc-e3a5-41b8-8901-75254ddbeee7.png' },
    { id: 2, title: 'Master', genre: 'Action', year: 2021, rating: 7.3, duration: '179 min', poster: '/lovable-uploads/b4b690f9-26d5-41f0-bc52-6c53377b420e.png' },
    { id: 3, title: 'Soorarai Pottru', genre: 'Drama', year: 2020, rating: 8.7, duration: '153 min', poster: '/lovable-uploads/80112cc9-c1ed-4108-a19e-6561477855d6.png' },
    { id: 4, title: 'Karnan', genre: 'Drama', year: 2021, rating: 8.1, duration: '158 min', poster: '/lovable-uploads/16f95cd9-0478-42c2-9032-8537ccdcad3b.png' },
    { id: 5, title: 'Asuran', genre: 'Drama', year: 2019, rating: 8.4, duration: '141 min', poster: '/lovable-uploads/3e2d3cea-9735-426e-ae0a-1accadfdf221.png' },
    { id: 6, title: 'Super Deluxe', genre: 'Drama', year: 2019, rating: 8.3, duration: '176 min', poster: '/lovable-uploads/150f71ab-6cf7-4f31-b300-5f02cb459357.png' }
  ];

  const malayalamMovies = [
    { id: 7, title: 'Minnal Murali', genre: 'Superhero', year: 2021, rating: 7.8, duration: '158 min', poster: '/lovable-uploads/53906cf9-65ac-4b7b-b008-6412c771aa37.png' },
    { id: 8, title: 'The Great Indian Kitchen', genre: 'Drama', year: 2021, rating: 8.3, duration: '104 min', poster: '/lovable-uploads/c3c7c9a6-9ebc-4c22-aaae-0d11b2f21ae2.png' },
    { id: 9, title: 'Drishyam', genre: 'Thriller', year: 2013, rating: 8.6, duration: '160 min', poster: '/lovable-uploads/532eb8fe-3aec-427d-b84b-e13ef2b389fd.png' },
    { id: 10, title: 'Kumbakonam Gopals', genre: 'Comedy', year: 1998, rating: 8.7, duration: '135 min', poster: '/lovable-uploads/1b175d01-273f-44de-9de5-3d077688f582.png' },
    { id: 11, title: 'Bangalore Days', genre: 'Drama', year: 2014, rating: 8.3, duration: '172 min', poster: '/lovable-uploads/45658280-e63e-444a-96b5-a85e40b06987.png' },
    { id: 12, title: 'Premam', genre: 'Romance', year: 2015, rating: 8.3, duration: '156 min', poster: '/lovable-uploads/b74b1e38-d6fd-4c25-a0a8-830714791388.png' }
  ];

  const allMovies = [...tamilMovies, ...malayalamMovies];
  const filteredMovies = allMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (movieId: string) => {
    playSound(favoriteSoundRef);
    setFavorites(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const handleWatchNow = () => {
    playSound(clickSoundRef);
  };

  const MovieCard = ({ movie }: { movie: any }) => (
    <Card className="group relative overflow-hidden hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl bg-white border border-gray-200 animate-fade-in hover:animate-pulse">
      <div className="relative">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:brightness-75 transition-all duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=400&fit=crop';
          }}
          onMouseEnter={() => playSound(hoverSoundRef)}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
          <Button 
            size="sm" 
            className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100 bg-primary hover:bg-primary/90 animate-bounce"
            onClick={handleWatchNow}
          >
            <Play className="h-4 w-4 mr-2" />
            Watch Now
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 text-white hover:bg-white/20 bg-black/30 transition-all duration-300 hover:scale-110"
          onClick={() => toggleFavorite(movie.id.toString())}
        >
          <Heart className={`h-4 w-4 transition-all duration-300 ${favorites.includes(movie.id.toString()) ? 'fill-red-500 text-red-500 animate-pulse' : 'hover:text-red-300'}`} />
        </Button>
      </div>
      <CardContent className="p-4 bg-white">
        <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors duration-300">{movie.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300">{movie.genre}</Badge>
          <span className="text-sm text-gray-600">{movie.year}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
            <span>{movie.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{movie.duration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const GuideDialog = () => (
    <Dialog open={showGuide} onOpenChange={setShowGuide}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="animate-bounce">
          <HelpCircle className="h-4 w-4 mr-2" />
          How to Use
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
            How to Use Regional Cinema Hub
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-black">
          <div className="animate-fade-in">
            <h3 className="text-lg font-semibold mb-2 text-primary">🎬 Getting Started</h3>
            <ul className="space-y-2 text-sm">
              <li>• Browse through our collection of Tamil and Malayalam movies</li>
              <li>• Use the search bar to find specific movies or genres</li>
              <li>• Click on different tabs to filter by language or view favorites</li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h3 className="text-lg font-semibold mb-2 text-primary">🔍 Search & Filter</h3>
            <ul className="space-y-2 text-sm">
              <li>• Search by movie title or genre in the search box</li>
              <li>• Use "All Movies" tab to see everything</li>
              <li>• Filter by "Tamil" or "Malayalam" for specific languages</li>
              <li>• Check "My Favorites" to see your saved movies</li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <h3 className="text-lg font-semibold mb-2 text-primary">❤️ Managing Favorites</h3>
            <ul className="space-y-2 text-sm">
              <li>• Click the heart icon on any movie poster to add to favorites</li>
              <li>• Red heart means it's in your favorites</li>
              <li>• Click again to remove from favorites</li>
              <li>• View all favorites in the "My Favorites" tab</li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
            <h3 className="text-lg font-semibold mb-2 text-primary">▶️ Watching Movies</h3>
            <ul className="space-y-2 text-sm">
              <li>• Hover over movie posters to see the "Watch Now" button</li>
              <li>• Movie ratings are shown with star icons</li>
              <li>• Duration and release year are displayed for each movie</li>
              <li>• Genre badges help you identify movie types</li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{animationDelay: '0.8s'}}>
            <h3 className="text-lg font-semibold mb-2 text-primary">🔊 Sound Effects</h3>
            <ul className="space-y-2 text-sm">
              <li>• Hover sounds when you move over movie cards</li>
              <li>• Click sounds when you press buttons</li>
              <li>• Special sound when adding to favorites</li>
              <li>• Toggle sound on/off using the sound button</li>
            </ul>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg animate-fade-in" style={{animationDelay: '1s'}}>
            <p className="text-sm text-primary font-medium">
              💡 <strong>Pro Tip:</strong> The platform is fully responsive and works great on mobile devices too!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 to-blue-50/50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-primary/90 to-primary/70 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent animate-pulse"></div>
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4 text-white animate-fade-in">Regional Cinema Hub</h1>
          <p className="text-xl mb-6 text-white/90 animate-fade-in" style={{animationDelay: '0.3s'}}>Experience the best of Tamil and Malayalam cinema</p>
          <div className="flex gap-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 transition-all duration-300 hover:scale-105" onClick={handleWatchNow}>
              <Play className="h-5 w-5 mr-2" />
              Start Watching
            </Button>
            <GuideDialog />
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-primary transition-all duration-300"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? <Volume2 className="h-5 w-5 mr-2" /> : <VolumeX className="h-5 w-5 mr-2" />}
              {soundEnabled ? 'Sound On' : 'Sound Off'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search Bar */}
        <Card className="mb-8 shadow-sm animate-fade-in hover:shadow-md transition-shadow duration-300">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search movies, genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-primary transition-all duration-300"
                onFocus={() => playSound(hoverSoundRef)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Movie Categories */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-white border border-gray-200 shadow-sm animate-fade-in">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
              onClick={() => playSound(clickSoundRef)}
            >
              All Movies
            </TabsTrigger>
            <TabsTrigger 
              value="tamil" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
              onClick={() => playSound(clickSoundRef)}
            >
              Tamil
            </TabsTrigger>
            <TabsTrigger 
              value="malayalam" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
              onClick={() => playSound(clickSoundRef)}
            >
              Malayalam
            </TabsTrigger>
            <TabsTrigger 
              value="favorites" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
              onClick={() => playSound(clickSoundRef)}
            >
              My Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.map((movie, index) => (
                <div key={movie.id} style={{animationDelay: `${index * 0.1}s`}}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tamil" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tamilMovies.filter(movie => 
                movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((movie, index) => (
                <div key={movie.id} style={{animationDelay: `${index * 0.1}s`}}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="malayalam" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {malayalamMovies.filter(movie => 
                movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((movie, index) => (
                <div key={movie.id} style={{animationDelay: `${index * 0.1}s`}}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allMovies.filter(movie => favorites.includes(movie.id.toString())).map((movie, index) => (
                <div key={movie.id} style={{animationDelay: `${index * 0.1}s`}}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
            {favorites.length === 0 && (
              <Card className="text-center py-12 animate-fade-in">
                <CardContent>
                  <Heart className="h-16 w-16 mx-auto mb-4 text-gray-400 animate-pulse" />
                  <p className="text-gray-600">No favorites yet. Add some movies to your favorites!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OTTPlatform;
