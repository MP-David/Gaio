import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Plus, Beef, Sprout, LogOut, BarChart3, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { BottomNav } from "./BottomNav";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockAnimals = [
  { id: "BR-001", breed: "Nelore", date: "05/06/2026", isHybrid: false },
  { id: "BR-002", breed: "Angus x Nelore", date: "04/06/2026", isHybrid: true },
  { id: "BR-003", breed: "Brahman", date: "03/06/2026", isHybrid: false },
  { id: "BR-004", breed: "Senepol x Nelore", date: "02/06/2026", isHybrid: true },
  { id: "BR-005", breed: "Nelore", date: "01/06/2026", isHybrid: false },
  { id: "BR-006", breed: "Angus", date: "30/05/2026", isHybrid: false },
  { id: "BR-007", breed: "Brahman x Nelore", date: "29/05/2026", isHybrid: true },
];

const monthlyData = [
  { mes: "Jan", registros: 28 },
  { mes: "Fev", registros: 35 },
  { mes: "Mar", registros: 42 },
  { mes: "Abr", registros: 38 },
  { mes: "Mai", registros: 55 },
  { mes: "Jun", registros: 49 },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "animals">("overview");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/animal/${searchQuery}`);
    }
  };

  const filtered = mockAnimals.filter(
    (a) =>
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-5 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg">Gaio</h1>
              <p className="text-xs text-primary-foreground/80">Produtor Rural</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/60" />
            <Input
              type="text"
              placeholder="Buscar por Brinco ou Raça"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
            />
          </div>
        </form>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-border bg-card">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "overview"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground"
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveTab("animals")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === "animals"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground"
          }`}
        >
          Animais
        </button>
      </div>

      <div className="px-6 py-6 space-y-4">
        {activeTab === "overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-5 bg-card shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Beef className="w-5 h-5 text-primary" />
                </div>
                <p className="text-3xl text-foreground mb-1">247</p>
                <p className="text-sm text-muted-foreground">Total de Animais</p>
              </Card>

              <Card className="p-5 bg-card shadow-sm">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                  <Sprout className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-3xl text-foreground mb-1">89</p>
                <p className="text-sm text-muted-foreground">Híbridos</p>
              </Card>

              <Card className="p-5 bg-card shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="w-5 h-5 text-green-700" />
                </div>
                <p className="text-3xl text-foreground mb-1">49</p>
                <p className="text-sm text-muted-foreground">Registros Mês</p>
              </Card>

              <Card className="p-5 bg-card shadow-sm">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                  <Beef className="w-5 h-5 text-amber-700" />
                </div>
                <p className="text-3xl text-foreground mb-1">158</p>
                <p className="text-sm text-muted-foreground">Puros Nelore</p>
              </Card>
            </div>

            {/* Monthly Chart */}
            <Card className="p-5 bg-card shadow-sm">
              <h3 className="text-foreground mb-4">Registros por Mês</h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#717182" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#717182" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8 }}
                    cursor={{ fill: "rgba(45,80,22,0.05)" }}
                  />
                  <Bar dataKey="registros" fill="#2d5016" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Recent */}
            <div>
              <h3 className="text-foreground mb-3">Registros Recentes</h3>
              <div className="space-y-3">
                {mockAnimals.slice(0, 3).map((animal) => (
                  <Card
                    key={animal.id}
                    className="p-4 bg-card shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/animal/${animal.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-foreground">Brinco: {animal.id}</p>
                          {animal.isHybrid && (
                            <Badge className="bg-secondary/10 text-secondary text-xs px-2">Híbrido</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{animal.breed}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{animal.date}</p>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "animals" && (
          <div className="space-y-3">
            {(searchQuery ? filtered : mockAnimals).map((animal) => (
              <Card
                key={animal.id}
                className="p-4 bg-card shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/animal/${animal.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-foreground">Brinco: {animal.id}</p>
                      {animal.isHybrid && (
                        <Badge className="bg-secondary/10 text-secondary text-xs px-2">Híbrido</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{animal.breed}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">{animal.date}</p>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            ))}
            {searchQuery && filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Nenhum animal encontrado.</p>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
