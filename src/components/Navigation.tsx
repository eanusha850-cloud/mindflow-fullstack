import React from "react";
import { ViewType } from "../App";
import { Home, List, HeartPulse, BrainCircuit, Flower, LogOut } from "lucide-react";

interface NavigationProps {
  currentView: ViewType;
  onViewChange: React.Dispatch<React.SetStateAction<ViewType>>;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
  isLoggedIn,
  onLogout,
}) => {
  const navItems = [
    { label: "Dashboard", view: "dashboard", icon: Home },
    { label: "Tasks", view: "tasks", icon: List },
    { label: "Wellness", view: "wellness", icon: HeartPulse },
    { label: "Insights", view: "insights", icon: BrainCircuit },
    { label: "Meditation", view: "meditation", icon: Flower },
  ];

  if (!isLoggedIn) return null;

  return (
    <nav className="fixed top-0 left-0 h-full w-16 lg:w-64 bg-gradient-to-b from-purple-700 to-purple-900 text-white flex flex-col items-center py-4 space-y-8">
      <div className="text-xl font-bold mb-8">Mindflow</div>
      <ul className="flex flex-col space-y-4 w-full">
        {navItems.map((item) => (
          <li
            key={item.view}
            className={`flex items-center px-4 py-2 cursor-pointer ${
              currentView === item.view ? "bg-purple-800" : "hover:bg-purple-700"
            }`}
            onClick={() => onViewChange(item.view as ViewType)}
          >
            <item.icon className="w-5 h-5 mr-2" />
            <span className="hidden lg:inline">{item.label}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onLogout}
        className="mt-auto flex items-center px-4 py-2 bg-red-600 rounded hover:bg-red-700"
      >
        <LogOut className="w-5 h-5 mr-2" />
        <span className="hidden lg:inline">Logout</span>
      </button>
    </nav>
  );
};

export default Navigation;
