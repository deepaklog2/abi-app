import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';
import LanguageSelector from './LanguageSelector';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  Calendar, 
  BarChart3, 
  Bell, 
  Heart, 
  Flag, 
  Search,
  Plus,
  Clock,
  File,
  Folder,
  Plane,
  Shield,
  Activity,
  Trash2,
  CheckSquare,
  Building2,
  FileText,
  Zap,
  Gift,
  Smartphone,
  GraduationCap,
  Utensils,
  ShirtIcon,
  TrendingUp,
  Play,
  PartyPopper,
  MapPin
} from 'lucide-react';

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useLanguage();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const mainFeatures = [
    { title: t('dashboard'), url: '/dashboard', icon: BarChart3 },
    { title: t('expense_tracker'), url: '/dashboard/expenses', icon: Plus },
    { title: t('budget_planner'), url: '/dashboard/budget', icon: Calendar },
    { title: t('analytics'), url: '/dashboard/analytics', icon: BarChart3 },
    { title: t('goals_tracker'), url: '/dashboard/goals', icon: Flag },
    { title: t('alerts'), url: '/dashboard/alerts', icon: Bell },
    { title: t('notifications_reminders'), url: '/dashboard/notifications', icon: Bell },
  ];

  const familyFeatures = [
    { title: t('family_budget'), url: '/dashboard/family-budget', icon: Heart },
    { title: t('student_kit'), url: '/dashboard/student-kit', icon: Folder },
    { title: t('education_learning'), url: '/dashboard/education', icon: GraduationCap },
    { title: t('grocery_planner'), url: '/dashboard/grocery', icon: Search },
    { title: t('food_kitchen'), url: '/dashboard/food-kitchen', icon: Utensils },
    { title: t('fashion_clothing'), url: '/dashboard/fashion-clothing', icon: ShirtIcon },
    { title: t('travel_assistant'), url: '/dashboard/travel', icon: Plane },
    { title: t('ecommerce_shopping'), url: '/dashboard/ecommerce', icon: Gift },
  ];

  const entertainmentFeatures = [
    { title: 'OTT Platform', url: '/dashboard/ott-platform', icon: Play },
    { title: 'Free Events', url: '/dashboard/free-events', icon: MapPin },
    { title: 'Festival Planner', url: '/dashboard/festival-planner', icon: PartyPopper },
    { title: 'Gifting Assistant', url: '/dashboard/gifting-assistant', icon: Gift },
  ];

  const utilityFeatures = [
    { title: t('healthcare'), url: '/dashboard/healthcare', icon: Activity },
    { title: t('banking'), url: '/dashboard/banking', icon: Building2 },
    { title: t('utility_bills'), url: '/dashboard/utility-bills', icon: Zap },
    { title: t('telecom_internet'), url: '/dashboard/telecom', icon: Smartphone },
    { title: t('password_manager'), url: '/dashboard/password-manager', icon: Shield },
    { title: t('waste_management'), url: '/dashboard/waste-management', icon: Trash2 },
    { title: t('todo_list'), url: '/dashboard/todo-list', icon: CheckSquare },
    { title: t('subsidy_schemes'), url: '/dashboard/subsidy-schemes', icon: Gift },
    { title: t('micro_investment'), url: '/dashboard/micro-investment', icon: TrendingUp },
    { title: t('printable_summary'), url: '/dashboard/printable-summary', icon: FileText },
    { title: t('profile'), url: '/dashboard/profile', icon: File },
  ];

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-primary/10 text-primary font-medium border-r-2 border-primary' : 'hover:bg-muted/50';

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex-1">
              <h2 className="text-lg font-bold gradient-primary bg-clip-text text-transparent">
                Smart Budget
              </h2>
              <p className="text-xs text-black">
                {t('welcome')}, {user?.name || 'User'}
              </p>
            </div>
          )}
          <div className={collapsed ? 'mx-auto' : 'ml-2'}>
            <LanguageSelector />
          </div>
        </div>
      </div>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-black">Main Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainFeatures.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="text-black">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-black">Family & Student</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {familyFeatures.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="text-black">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-black">Entertainment & Events</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {entertainmentFeatures.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="text-black">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-black">Utilities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityFeatures.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="text-black">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
