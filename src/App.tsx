import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/AuthContext";
import { LanguageProvider } from "@/components/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import StudentKit from "./pages/StudentKit";
import EducationLearning from "./pages/EducationLearning";
import EcommerceShopping from "./pages/EcommerceShopping";
import NotificationsReminders from "./pages/NotificationsReminders";
import FoodKitchen from "./pages/FoodKitchen";
import FashionClothing from "./pages/FashionClothing";
import MicroInvestment from "./pages/MicroInvestment";
import OTTPlatform from "./pages/OTTPlatform";
import FreeEvents from "./pages/FreeEvents";
import FestivalPlanner from "./pages/FestivalPlanner";
import GiftingAssistant from "./pages/GiftingAssistant";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import TravelBooking from "./pages/TravelBooking";
import FamilyBudget from "./pages/FamilyBudget";
import PrintableSummary from "./pages/PrintableSummary";
import UtilityBills from "./pages/UtilityBills";
import PasswordManager from "./pages/PasswordManager";
import Healthcare from "./pages/Healthcare";
import WasteManagement from "./pages/WasteManagement";
import TodoList from "./pages/TodoList";
import OnlineBanking from "./pages/OnlineBanking";
import GroceryPlanner from "./pages/GroceryPlanner";
import ExpenseTracker from "./pages/ExpenseTracker";
import BudgetPlanner from "./pages/BudgetPlanner";
import Analytics from "./pages/Analytics";
import GoalsTracker from "./pages/GoalsTracker";
import Alerts from "./pages/Alerts";
import SubsidySchemeChecker from "./pages/SubsidySchemeChecker";
import Telecom from "./pages/Telecom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes with Dashboard Layout */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="travel" element={<TravelBooking />} />
                <Route path="family-budget" element={<FamilyBudget />} />
                <Route path="printable-summary" element={<PrintableSummary />} />
                <Route path="utility-bills" element={<UtilityBills />} />
                <Route path="password-manager" element={<PasswordManager />} />
                <Route path="healthcare" element={<Healthcare />} />
                <Route path="waste-management" element={<WasteManagement />} />
                <Route path="todo-list" element={<TodoList />} />
                <Route path="banking" element={<OnlineBanking />} />
                <Route path="grocery" element={<GroceryPlanner />} />
                <Route path="student-kit" element={<StudentKit />} />
                <Route path="subsidy-schemes" element={<SubsidySchemeChecker />} />
                <Route path="telecom" element={<Telecom />} />
                <Route path="education" element={<EducationLearning />} />
                <Route path="ecommerce" element={<EcommerceShopping />} />
                <Route path="notifications" element={<NotificationsReminders />} />
                <Route path="food-kitchen" element={<FoodKitchen />} />
                <Route path="fashion-clothing" element={<FashionClothing />} />
                <Route path="micro-investment" element={<MicroInvestment />} />
                <Route path="ott-platform" element={<OTTPlatform />} />
                <Route path="free-events" element={<FreeEvents />} />
                <Route path="festival-planner" element={<FestivalPlanner />} />
                <Route path="gifting-assistant" element={<GiftingAssistant />} />
                
                {/* Financial Management Routes */}
                <Route path="expenses" element={<ExpenseTracker />} />
                <Route path="budget" element={<BudgetPlanner />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="goals" element={<GoalsTracker />} />
                <Route path="alerts" element={<Alerts />} />
              </Route>

              {/* Redirect old routes to dashboard routes */}
              <Route path="/profile" element={<Navigate to="/dashboard/profile" replace />} />
              <Route path="/expenses" element={<Navigate to="/dashboard/expenses" replace />} />
              <Route path="/budget" element={<Navigate to="/dashboard/budget" replace />} />
              <Route path="/analytics" element={<Navigate to="/dashboard/analytics" replace />} />
              <Route path="/goals" element={<Navigate to="/dashboard/goals" replace />} />
              <Route path="/alerts" element={<Navigate to="/dashboard/alerts" replace />} />
              <Route path="/family-budget" element={<Navigate to="/dashboard/family-budget" replace />} />
              <Route path="/student-kit" element={<Navigate to="/dashboard/student-kit" replace />} />
              <Route path="/grocery" element={<Navigate to="/dashboard/grocery" replace />} />
              <Route path="/travel" element={<Navigate to="/dashboard/travel" replace />} />
              <Route path="/healthcare" element={<Navigate to="/dashboard/healthcare" replace />} />
              <Route path="/banking" element={<Navigate to="/dashboard/banking" replace />} />
              <Route path="/utility-bills" element={<Navigate to="/dashboard/utility-bills" replace />} />
              <Route path="/password-manager" element={<Navigate to="/dashboard/password-manager" replace />} />
              <Route path="/waste-management" element={<Navigate to="/dashboard/waste-management" replace />} />
              <Route path="/todo-list" element={<Navigate to="/dashboard/todo-list" replace />} />
              <Route path="/printable-summary" element={<Navigate to="/dashboard/printable-summary" replace />} />
              <Route path="/subsidy-schemes" element={<Navigate to="/dashboard/subsidy-schemes" replace />} />
              <Route path="/telecom" element={<Navigate to="/dashboard/telecom" replace />} />
              <Route path="/education" element={<Navigate to="/dashboard/education" replace />} />
              <Route path="/ecommerce" element={<Navigate to="/dashboard/ecommerce" replace />} />
              <Route path="/notifications" element={<Navigate to="/dashboard/notifications" replace />} />
              <Route path="/food-kitchen" element={<Navigate to="/dashboard/food-kitchen" replace />} />
              <Route path="/fashion-clothing" element={<Navigate to="/dashboard/fashion-clothing" replace />} />
              <Route path="/micro-investment" element={<Navigate to="/dashboard/micro-investment" replace />} />
              <Route path="/ott-platform" element={<Navigate to="/dashboard/ott-platform" replace />} />
              <Route path="/free-events" element={<Navigate to="/dashboard/free-events" replace />} />
              <Route path="/festival-planner" element={<Navigate to="/dashboard/festival-planner" replace />} />
              <Route path="/gifting-assistant" element={<Navigate to="/dashboard/gifting-assistant" replace />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
