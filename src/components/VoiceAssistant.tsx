
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [response, setResponse] = useState('');
  const { currentLanguage, languages, setLanguage } = useLanguage();

  const sampleCommands = {
    en: [
      'Add ₹200 for vegetables',
      'Check my balance',
      'Pay electricity bill',
      'Show monthly expenses',
      'Set budget alert for ₹5000'
    ],
    hi: [
      'सब्जी के लिए ₹200 जोड़ें',
      'मेरा बैलेंस चेक करें',
      'बिजली का बिल जमा करें',
      'महीने का खर्च दिखाएं',
      '₹5000 का बजट अलर्ट सेट करें'
    ],
    ta: [
      'காய்கறிக்காக ₹200 சேர்க்கவும்',
      'என் பாலன்ஸ் பார்க்கவும்',
      'மின்சாரக் கட்டணம் செலுத்தவும்',
      'மாத செலவுகளைக் காட்டவும்',
      '₹5000 பட்ஜெட் அலர்ட் அமைக்கவும்'
    ],
    te: [
      'కూరగాయలకు ₹200 జోడించండి',
      'నా బ్యాలెన్స్ చెక్ చేయండి',
      'విద్యుత్ బిల్లు చెల్లించండి',
      'నెలవారీ ఖర్చులు చూపించండి',
      '₹5000 బడ్జెట్ అలర్ట్ సెట్ చేయండి'
    ],
    bn: [
      'সবজির জন্য ₹২০০ যোগ করুন',
      'আমার ব্যালেন্স চেক করুন',
      'বিদ্যুৎ বিল পরিশোধ করুন',
      'মাসিক খরচ দেখান',
      '₹৫০০০ বাজেট অ্যালার্ট সেট করুন'
    ],
    mr: [
      'भाज्यांसाठी ₹२०० जोडा',
      'माझे बॅलन्स तपासा',
      'वीज बिल भरा',
      'मासिक खर्च दाखवा',
      '₹५००० बजेट अलर्ट सेट करा'
    ]
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        const commands = sampleCommands[currentLanguage] || sampleCommands['en'];
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        setLastCommand(randomCommand);
        
        // Simulate response based on language
        let simulatedResponse = '';
        if (randomCommand.includes('200') || randomCommand.includes('₹200') || randomCommand.includes('₹२००')) {
          const responses = {
            en: 'Added ₹200 expense for vegetables to your budget.',
            hi: 'आपके बजट में सब्जी के लिए ₹200 का खर्च जोड़ दिया गया।',
            ta: 'உங்கள் பட்ஜெட்டில் காய்கறிகளுக்கு ₹200 செலவு சேர்க்கப்பட்டது.',
            te: 'మీ బడ్జెట్‌లో కూరగాయలకు ₹200 ఖర్చు జోడించబడింది.',
            bn: 'আপনার বাজেটে সবজির জন্য ₹২০০ খরচ যোগ করা হয়েছে।',
            mr: 'तुमच्या बजेटमध्ये भाज्यांसाठी ₹२०० खर्च जोडला आहे।'
          };
          simulatedResponse = responses[currentLanguage] || responses['en'];
        } else if (randomCommand.toLowerCase().includes('balance') || randomCommand.includes('बैलेंस') || randomCommand.includes('பாலன்ஸ்')) {
          const responses = {
            en: 'Your current balance is ₹1,25,000.',
            hi: 'आपका वर्तमान बैलेंस ₹1,25,000 है।',
            ta: 'உங்கள் தற்போதைய இருப்பு ₹1,25,000.',
            te: 'మీ ప్రస్తుత బ్యాలెన్స్ ₹1,25,000.',
            bn: 'আপনার বর্তমান ব্যালেন্স ₹১,২৫,০০০।',
            mr: 'तुमचे सध्याचे बॅलन्स ₹१,२५,००० आहे।'
          };
          simulatedResponse = responses[currentLanguage] || responses['en'];
        } else {
          const responses = {
            en: 'Command executed successfully!',
            hi: 'कमांड सफलतापूर्वक निष्पादित!',
            ta: 'கட்டளை வெற்றிகரமாக செயல்படுத்தப்பட்டது!',
            te: 'కమాండ్ విజయవంతంగా అమలైంది!',
            bn: 'কমান্ড সফলভাবে সম্পাদিত!',
            mr: 'कमांड यशस्वीरित्या अंमलात आणला!'
          };
          simulatedResponse = responses[currentLanguage] || responses['en'];
        }
        
        setResponse(simulatedResponse);
        setIsListening(false);
      }, 2000);
    }
  };

  const currentLangData = languages.find(l => l.code === currentLanguage);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Voice Button */}
      <div className="relative">
        <Button
          onClick={toggleListening}
          className={`w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'gradient-primary hover:scale-110'
          }`}
        >
          {isListening ? (
            <MicOff className="h-8 w-8 text-white" />
          ) : (
            <Mic className="h-8 w-8 text-white" />
          )}
        </Button>
        
        {isListening && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
        )}
      </div>

      {/* Voice Assistant Panel */}
      {(isListening || lastCommand || response) && (
        <Card className="absolute bottom-20 right-0 w-80 shadow-2xl animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-black flex items-center gap-2 text-lg">
              <Volume2 className="h-5 w-5" />
              Voice Assistant
              <Badge variant="outline" className="ml-auto text-black">
                {currentLangData?.nativeName}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Language Selector */}
            <div>
              <label className="text-sm font-medium text-black mb-2 block">
                Language
              </label>
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 border rounded-md text-black text-sm"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            {isListening && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-black font-medium">🎤 Listening...</p>
                <p className="text-xs text-black mt-1">
                  Speak your command in {currentLangData?.name}
                </p>
              </div>
            )}

            {/* Last Command */}
            {lastCommand && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-black font-medium mb-1">You said:</p>
                <p className="text-sm text-black">"{lastCommand}"</p>
              </div>
            )}

            {/* Response */}
            {response && (
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-black font-medium mb-1">Assistant:</p>
                <p className="text-sm text-black">{response}</p>
              </div>
            )}

            {/* Sample Commands */}
            <div>
              <p className="text-xs font-medium text-black mb-2">Try saying:</p>
              <div className="space-y-1">
                {(sampleCommands[currentLanguage] || sampleCommands['en']).slice(0, 3).map((command, index) => (
                  <p key={index} className="text-xs text-black bg-white p-2 rounded border">
                    "{command}"
                  </p>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={toggleListening}
                className="flex-1 text-black"
              >
                {isListening ? 'Stop' : 'Try Again'}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  setLastCommand('');
                  setResponse('');
                }}
                className="flex-1 text-black"
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VoiceAssistant;
