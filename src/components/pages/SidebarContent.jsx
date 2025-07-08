import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button, Input } from "@/components/ui/base-elements";

import { 
  Home, 
  Send, 
  History, 
  HelpCircle as Help, 
  CreditCard, 
  Search, 
  LogOut 
} from 'lucide-react';

export default function SidebarContent() {
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Send, label: "Send Money", path: "/send-money" },
    { icon: History, label: "Transactions", path: "/transactions" },
    { icon: Help, label: "About", path: "/about" },
  ];

  return (
    <>
      <div className="p-6 bg-green-50 min-h-screen text-green-900">
        <div className="flex items-center mb-8">
          <CreditCard className="h-8 w-8 text-green-500" />
          <span className="ml-2 text-xl font-bold text-green-600">PaySafeAI</span>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-green-400" />
          <Input 
            type="text" 
            placeholder="Quick search..." 
            className="pl-9 w-full border border-green-200 bg-green-100 text-green-900 placeholder:text-green-500 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link to={item.path} key={item.label}>
<Button
  variant="ghost"
  className={cn(
    "w-full justify-start items-center flex gap-2 text-green-700 hover:text-green-900 hover:bg-green-100"
  )}
>
  <item.icon className="h-4 w-4" />
  {item.label}
</Button>

            </Link>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-green-200 bg-green-50">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  );
}
