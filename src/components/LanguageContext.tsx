
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
];

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  const t = (key: string) => {
    return translations[currentLanguage]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translation dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    'dashboard': 'Dashboard',
    'expense_tracker': 'Expense Tracker',
    'budget_planner': 'Budget Planner',
    'analytics': 'Analytics',
    'goals_tracker': 'Goals Tracker',
    'alerts': 'Alerts',
    'notifications_reminders': 'Notifications & Reminders',
    'family_budget': 'Family Budget',
    'student_kit': 'Student Kit',
    'education_learning': 'Education & Learning',
    'grocery_planner': 'Grocery Planner',
    'food_kitchen': 'Food & Kitchen',
    'fashion_clothing': 'Fashion & Clothing',
    'travel_assistant': 'Travel Assistant',
    'ecommerce_shopping': 'E-Commerce & Shopping',
    'healthcare': 'Healthcare',
    'banking': 'Banking',
    'utility_bills': 'Utility Bills',
    'telecom_internet': 'Telecom & Internet',
    'password_manager': 'Password Manager',
    'waste_management': 'Waste Management',
    'todo_list': 'Todo List',
    'subsidy_schemes': 'Subsidy Schemes',
    'micro_investment': 'Micro Investment',
    'printable_summary': 'Printable Summary',
    'profile': 'Profile',
    // Common
    'welcome': 'Welcome',
    'language': 'Language',
    'save': 'Save',
    'cancel': 'Cancel',
    'add': 'Add',
    'edit': 'Edit',
    'delete': 'Delete',
    'search': 'Search',
    'filter': 'Filter',
    'amount': 'Amount',
    'date': 'Date',
    'category': 'Category',
    'description': 'Description',
    'total': 'Total',
    'budget': 'Budget',
    'expense': 'Expense',
    'income': 'Income',
    'balance': 'Balance'
  },
  hi: {
    // Navigation
    'dashboard': 'डैशबोर्ड',
    'expense_tracker': 'खर्च ट्रैकर',
    'budget_planner': 'बजट प्लानर',
    'analytics': 'विश्लेषण',
    'goals_tracker': 'लक्ष्य ट्रैकर',
    'alerts': 'अलर्ट',
    'notifications_reminders': 'सूचना और रिमाइंडर',
    'family_budget': 'पारिवारिक बजट',
    'student_kit': 'छात्र किट',
    'education_learning': 'शिक्षा और अध्ययन',
    'grocery_planner': 'किराना प्लानर',
    'food_kitchen': 'भोजन और रसोई',
    'fashion_clothing': 'फैशन और कपड़े',
    'travel_assistant': 'यात्रा सहायक',
    'ecommerce_shopping': 'ई-कॉमर्स और शॉपिंग',
    'healthcare': 'स्वास्थ्य सेवा',
    'banking': 'बैंकिंग',
    'utility_bills': 'उपयोगिता बिल',
    'telecom_internet': 'टेलीकॉम और इंटरनेट',
    'password_manager': 'पासवर्ड मैनेजर',
    'waste_management': 'कचरा प्रबंधन',
    'todo_list': 'कार्य सूची',
    'subsidy_schemes': 'सब्सिडी योजनाएं',
    'micro_investment': 'माइक्रो निवेश',
    'printable_summary': 'प्रिंट करने योग्य सारांश',
    'profile': 'प्रोफाइल',
    // Common
    'welcome': 'स्वागत है',
    'language': 'भाषा',
    'save': 'सेव करें',
    'cancel': 'रद्द करें',
    'add': 'जोड़ें',
    'edit': 'संपादित करें',
    'delete': 'मिटाएं',
    'search': 'खोजें',
    'filter': 'फिल्टर',
    'amount': 'राशि',
    'date': 'तारीख',
    'category': 'श्रेणी',
    'description': 'विवरण',
    'total': 'कुल',
    'budget': 'बजट',
    'expense': 'खर्च',
    'income': 'आय',
    'balance': 'बैलेंस'
  },
  ta: {
    // Navigation
    'dashboard': 'டாஷ்போர்டு',
    'expense_tracker': 'செலவு டிராக்கர்',
    'budget_planner': 'பட்ஜெட் பிளானர்',
    'analytics': 'பகுப்பாய்வு',
    'goals_tracker': 'இலக்கு டிராக்கர்',
    'alerts': 'அலர்ட்கள்',
    'notifications_reminders': 'அறிவிப்புகள் & நினைவூட்டல்கள்',
    'family_budget': 'குடும்ப பட்ஜெட்',
    'student_kit': 'மாணவர் கிட்',
    'education_learning': 'கல்வி & கற்றல்',
    'grocery_planner': 'மளிகை பிளானர்',
    'food_kitchen': 'உணவு & சமையலூறை',
    'fashion_clothing': 'ஃபேஷன் & ஆடை',
    'travel_assistant': 'பயண உதவியாளர்',
    'ecommerce_shopping': 'ஈ-காமர்ஸ் & ஷாப்பிங்',
    'healthcare': 'சுகாதாரம்',
    'banking': 'வங்கி',
    'utility_bills': 'பயன்பாட்டு பில்கள்',
    'telecom_internet': 'டெலிகாம் & இண்டர்நெட்',
    'password_manager': 'கடவுச்சொல் மேலாளர்',
    'waste_management': 'கழிவு மேலாண்மை',
    'todo_list': 'செய்ய வேண்டிய பட்டியல்',
    'subsidy_schemes': 'மானியத் திட்டங்கள்',
    'micro_investment': 'நுண் முதலீடு',
    'printable_summary': 'அச்சிடக்கூடிய சுருக்கம்',
    'profile': 'சுயவிவரம்',
    // Common
    'welcome': 'வரவேற்கிறோம்',
    'language': 'மொழி',
    'save': 'சேமிக்கவும்',
    'cancel': 'ரத்து செய்யவும்',
    'add': 'சேர்க்கவும்',
    'edit': 'திருத்தவும்',
    'delete': 'நீக்கவும்',
    'search': 'தேடவும்',
    'filter': 'வடிகட்டவும்',
    'amount': 'தொகை',
    'date': 'தேதி',
    'category': 'வகை',
    'description': 'விவரம்',
    'total': 'மொத்தம்',
    'budget': 'பட்ஜெட்',
    'expense': 'செலவு',
    'income': 'வருமானம்',
    'balance': 'இருப்பு'
  },
  te: {
    // Navigation
    'dashboard': 'డాష్‌బోర్డ్',
    'expense_tracker': 'ఖర్చు ట్రాకర్',
    'budget_planner': 'బడ్జెట్ ప్లానర్',
    'analytics': 'విశ్లేషణలు',
    'goals_tracker': 'లక్ష్యాల ట్రాకర్',
    'alerts': 'అలర్ట్‌లు',
    'notifications_reminders': 'నోటిఫికేషన్లు & రిమైండర్లు',
    'family_budget': 'కుటుంబ బడ్జెట్',
    'student_kit': 'విద్యార్థి కిట్',
    'education_learning': 'విద్య & అభ్యాసం',
    'grocery_planner': 'కిరాణా ప్లానర్',
    'food_kitchen': 'ఆహారం & వంటగది',
    'fashion_clothing': 'ఫ్యాషన్ & దుస్తులు',
    'travel_assistant': 'ప్రయాణ సహాయకుడు',
    'ecommerce_shopping': 'ఈ-కామర్స్ & షాపింగ్',
    'healthcare': 'ఆరోగ్య సంరక్షణ',
    'banking': 'బ్యాంకింగ్',
    'utility_bills': 'యుటిలిటీ బిల్లులు',
    'telecom_internet': 'టెలికాం & ఇంటర్నెట్',
    'password_manager': 'పాస్‌వర్డ్ మేనేజర్',
    'waste_management': 'వ్యర్థ పదార్థాల నిర్వహణ',
    'todo_list': 'చేయవలసిన జాబితా',
    'subsidy_schemes': 'సబ్సిడీ పథకాలు',
    'micro_investment': 'మైక్రో ఇన్వెస్ట్‌మెంట్',
    'printable_summary': 'ప్రింట్ చేయగల సారాంశం',
    'profile': 'ప్రొఫైల్',
    // Common
    'welcome': 'స్వాగతం',
    'language': 'భాష',
    'save': 'సేవ్ చేయండి',
    'cancel': 'రద్దు చేయండి',
    'add': 'జోడించండి',
    'edit': 'సవరించండి',
    'delete': 'తొలగించండి',
    'search': 'వెతకండి',
    'filter': 'ఫిల్టర్ చేయండి',
    'amount': 'మొత్తం',
    'date': 'తేదీ',
    'category': 'వర్గం',
    'description': 'వివరణ',
    'total': 'మొత్తం',
    'budget': 'బడ్జెట్',
    'expense': 'ఖర్చు',
    'income': 'ఆదాయం',
    'balance': 'బ్యాలెన్స్'
  },
  bn: {
    // Navigation
    'dashboard': 'ড্যাশবোর্ড',
    'expense_tracker': 'খরচ ট্র্যাকার',
    'budget_planner': 'বাজেট প্ল্যানার',
    'analytics': 'বিশ্লেষণ',
    'goals_tracker': 'লক্ষ্য ট্র্যাকার',
    'alerts': 'সতর্কতা',
    'notifications_reminders': 'বিজ্ঞপ্তি ও স্মারক',
    'family_budget': 'পারিবারিক বাজেট',
    'student_kit': 'ছাত্র কিট',
    'education_learning': 'শিক্ষা ও শেখা',
    'grocery_planner': 'মুদি পরিকল্পনাকারী',
    'food_kitchen': 'খাদ্য ও রান্নাঘর',
    'fashion_clothing': 'ফ্যাশন ও পোশাক',
    'travel_assistant': 'ভ্রমণ সহায়ক',
    'ecommerce_shopping': 'ই-কমার্স ও কেনাকাটা',
    'healthcare': 'স্বাস্থ্যসেবা',
    'banking': 'ব্যাংকিং',
    'utility_bills': 'ইউটিলিটি বিল',
    'telecom_internet': 'টেলিকম ও ইন্টারনেট',
    'password_manager': 'পাসওয়ার্ড ম্যানেজার',
    'waste_management': 'বর্জ্য ব্যবস্থাপনা',
    'todo_list': 'করণীয় তালিকা',
    'subsidy_schemes': 'ভর্তুকি পরিকল্পনা',
    'micro_investment': 'মাইক্রো বিনিয়োগ',
    'printable_summary': 'মুদ্রণযোগ্য সারসংক্ষেপ',
    'profile': 'প্রোফাইল',
    // Common
    'welcome': 'স্বাগতম',
    'language': 'ভাষা',
    'save': 'সংরক্ষণ করুন',
    'cancel': 'বাতিল করুন',
    'add': 'যোগ করুন',
    'edit': 'সম্পাদনা করুন',
    'delete': 'মুছে ফেলুন',
    'search': 'অনুসন্ধান করুন',
    'filter': 'ফিল্টার করুন',
    'amount': 'পরিমাণ',
    'date': 'তারিখ',
    'category': 'বিভাগ',
    'description': 'বিবরণ',
    'total': 'মোট',
    'budget': 'বাজেট',
    'expense': 'খরচ',
    'income': 'আয়',
    'balance': 'ব্যালেন্স'
  },
  mr: {
    // Navigation
    'dashboard': 'डॅशबोर्ड',
    'expense_tracker': 'खर्च ट्रॅकर',
    'budget_planner': 'बजेट प्लॅनर',
    'analytics': 'विश्लेषण',
    'goals_tracker': 'ध्येय ट्रॅकर',
    'alerts': 'अलर्ट',
    'notifications_reminders': 'सूचना आणि स्मरणपत्र',
    'family_budget': 'कौटुंबिक बजेट',
    'student_kit': 'विद्यार्थी किट',
    'education_learning': 'शिक्षण आणि अध्ययन',
    'grocery_planner': 'किराणा प्लॅनर',
    'food_kitchen': 'अन्न आणि स्वयंपाक',
    'fashion_clothing': 'फॅशन आणि कपडे',
    'travel_assistant': 'प्रवास सहाय्यक',
    'ecommerce_shopping': 'ई-कॉमर्स आणि शॉपिंग',
    'healthcare': 'आरोग्यसेवा',
    'banking': 'बँकिंग',
    'utility_bills': 'उपयोगिता बिले',
    'telecom_internet': 'दूरसंचार आणि इंटरनेट',
    'password_manager': 'पासवर्ड व्यवस्थापक',
    'waste_management': 'कचरा व्यवस्थापन',
    'todo_list': 'करण्याची यादी',
    'subsidy_schemes': 'अनुदान योजना',
    'micro_investment': 'मायक्रो गुंतवणूक',
    'printable_summary': 'मुद्रणयोग्य सारांश',
    'profile': 'प्रोफाइल',
    // Common
    'welcome': 'स्वागत आहे',
    'language': 'भाषा',
    'save': 'जतन करा',
    'cancel': 'रद्द करा',
    'add': 'जोडा',
    'edit': 'संपादित करा',
    'delete': 'हटवा',
    'search': 'शोधा',
    'filter': 'फिल्टर करा',
    'amount': 'रक्कम',
    'date': 'तारीख',
    'category': 'श्रेणी',
    'description': 'वर्णन',
    'total': 'एकूण',
    'budget': 'बजेट',
    'expense': 'खर्च',
    'income': 'उत्पन्न',
    'balance': 'शिल्लक'
  }
};
