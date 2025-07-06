
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import VoiceAssistant from './VoiceAssistant';
import { useAuth } from './AuthContext';
import { Button } from '@/components/ui/button';

const DashboardLayout = () => {
  const { logout, user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-green-50/50 to-blue-50/50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-6 bg-white/80 backdrop-blur-lg border-b shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Smart Budget Manager</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={logout}
                className="hover:bg-destructive hover:text-destructive-foreground"
              >
                Logout
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>

        {/* Voice Assistant */}
        <VoiceAssistant />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
