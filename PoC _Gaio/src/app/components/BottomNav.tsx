import { useNavigate, useLocation } from "react-router";
import { LayoutDashboard, BarChart3, PlusCircle } from "lucide-react";

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const items = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Registrar", icon: PlusCircle, path: "/register" },
    { label: "Relatórios", icon: BarChart3, path: "/reports" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex z-50 shadow-lg">
      {items.map((item) => {
        const active = pathname === item.path;
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
              active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
