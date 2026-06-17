import { useNavigate } from "react-router";
import { ArrowLeft, TrendingUp, Award, Leaf } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { BottomNav } from "./BottomNav";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const breedData = [
  { name: "Nelore", value: 158, color: "#2d5016" },
  { name: "Híbridos", value: 89, color: "#8b7355" },
];

const weightProgress = [
  { faixa: "0-100kg", qtd: 42 },
  { faixa: "101-200kg", qtd: 78 },
  { faixa: "201-300kg", qtd: 91 },
  { faixa: "301-400kg", qtd: 36 },
];

const welfareIndicators = [
  { label: "Vacinados", value: 247, total: 247, color: "bg-green-500" },
  { label: "Bem-Estar Certificado", value: 231, total: 247, color: "bg-primary" },
  { label: "Rastreados LeiGado", value: 247, total: 247, color: "bg-secondary" },
  { label: "Orgânicos", value: 89, total: 247, color: "bg-amber-500" },
];

export function Reports() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="bg-primary text-primary-foreground px-6 py-5 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg">Relatórios</h1>
            <p className="text-xs text-primary-foreground/80">Análise do Rebanho</p>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-5">
        {/* Summary badges */}
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5">
            <TrendingUp className="w-3 h-3 mr-1" /> +12% vs mês anterior
          </Badge>
          <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1.5">
            <Award className="w-3 h-3 mr-1" /> 100% Rastreado
          </Badge>
        </div>

        {/* Breed Pie */}
        <Card className="p-5 bg-card shadow-sm">
          <h3 className="text-foreground mb-4">Composição do Rebanho</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie
                  data={breedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {breedData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {breedData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <div>
                    <p className="text-sm text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.value} animais ({Math.round(item.value / 247 * 100)}%)</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Weight Distribution */}
        <Card className="p-5 bg-card shadow-sm">
          <h3 className="text-foreground mb-4">Distribuição por Peso</h3>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={weightProgress} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="faixa" tick={{ fontSize: 11, fill: "#717182" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#717182" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8 }}
                cursor={{ fill: "rgba(45,80,22,0.05)" }}
              />
              <Bar dataKey="qtd" name="Animais" fill="#8b7355" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Welfare Indicators */}
        <Card className="p-5 bg-card shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Indicadores de Bem-Estar</h3>
          </div>
          <div className="space-y-4">
            {welfareIndicators.map((ind) => {
              const pct = Math.round((ind.value / ind.total) * 100);
              return (
                <div key={ind.label}>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm text-foreground">{ind.label}</p>
                    <p className="text-sm text-muted-foreground">{ind.value}/{ind.total}</p>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${ind.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Origin card */}
        <Card className="p-5 bg-card shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Certificações Ativas</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Orgânico", "Bem-Estar Animal", "LeiGado Verified", "Rastreado IA", "Sustentável"].map((cert) => (
              <Badge key={cert} className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5">
                {cert}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
