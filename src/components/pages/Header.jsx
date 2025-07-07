import { Search, Bell, CreditCard, Menu } from "lucide-react";
import { Button, Input } from "@/components/ui/base-elements";
import { Avatar } from "@/components/ui/avatar";
import { Sheet } from "@/components/ui/overlay-elements";
import SidebarContent from "./SidebarContent";

const Header = ({ user, onSignIn }) => {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-xl bg-green-100 border-b border-green-300">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          {/* Mobile sidebar toggle */}
          <Sheet>
            <Sheet.Trigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2 text-green-800">
                <Menu className="h-5 w-5" />
              </Button>
            </Sheet.Trigger>
            <Sheet.Content
              side="left"
              className="w-72 p-0 bg-green-50 border-r border-green-200"
            >
              <SidebarContent />
            </Sheet.Content>
          </Sheet>

          {/* Logo (mobile only) */}
          <div className="flex items-center md:hidden">
            <CreditCard className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-green-700">SafePayAI</span>
          </div>
        </div>

        {/* Right side: Search + Avatar */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-green-400" />
            <Input
              type="text"
              placeholder="Quick search..."
              className="pl-9 w-64 bg-green-50 border-green-300 text-green-800 placeholder:text-green-400 focus:bg-green-100"
            />
          </div>

          <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-800">
            <Bell className="h-5 w-5" />
          </Button>

          <Avatar
            src={user?.photoURL}
            fallback={user?.displayName?.charAt(0) || "?"}
            className="h-8 w-8 ring-2 ring-green-500"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
