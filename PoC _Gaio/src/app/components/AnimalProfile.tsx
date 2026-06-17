import { useNavigate, useParams } from "react-router";
import { ArrowLeft, QrCode, Calendar, MapPin, Award, Share2, Syringe, Weight, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const mockData: Record<string, {
  earTag: string;
  breed: string;
  birthDate: string;
  farm: string;
  location: string;
  isHybrid: boolean;
  weight: string;
  timeline: { date: string; event: string; description: string; icon: React.ElementType }[];
}> = {
  "BR-001": {
    earTag: "BR-001",
    breed: "Nelore",
    birthDate: "10/01/2026",
    farm: "Fazenda Esperança Verde",
    location: "Goiás, Brasil",
    isHybrid: false,
    weight: "312 kg",
    timeline: [
      { date: "10/01/2026", event: "Nascimento", description: "Animal nasceu na Fazenda Esperança Verde", icon: Calendar },
      { date: "15/01/2026", event: "1ª Vacinação", description: "Febre Aftosa + Brucelose", icon: Syringe },
      { date: "10/03/2026", event: "Desmame", description: "Desmamado com 59 dias, 87 kg", icon: Weight },
      { date: "05/06/2026", event: "Registro LeiGado", description: "Sincronizado com base nacional", icon: Award },
    ],
  },
  "BR-002": {
    earTag: "BR-002",
    breed: "Angus x Nelore",
    birthDate: "15/01/2026",
    farm: "Fazenda Esperança Verde",
    location: "Goiás, Brasil",
    isHybrid: true,
    weight: "298 kg",
    timeline: [
      { date: "15/01/2026", event: "Nascimento", description: "Animal nasceu na Fazenda Esperança Verde", icon: Calendar },
      { date: "20/01/2026", event: "1ª Vacinação", description: "Febre Aftosa + Raiva", icon: Syringe },
      { date: "15/03/2026", event: "Desmame", description: "Desmamado com 59 dias, 91 kg", icon: Weight },
      { date: "04/06/2026", event: "Registro LeiGado", description: "Sincronizado com base nacional", icon: Award },
    ],
  },
  "BR-003": {
    earTag: "BR-003",
    breed: "Brahman",
    birthDate: "20/01/2026",
    farm: "Fazenda Esperança Verde",
    location: "Goiás, Brasil",
    isHybrid: false,
    weight: "325 kg",
    timeline: [
      { date: "20/01/2026", event: "Nascimento", description: "Animal nasceu na Fazenda Esperança Verde", icon: Calendar },
      { date: "25/01/2026", event: "1ª Vacinação", description: "Febre Aftosa + Clostridiose", icon: Syringe },
      { date: "20/03/2026", event: "Desmame", description: "Desmamado com 59 dias, 95 kg", icon: Weight },
      { date: "03/06/2026", event: "Registro LeiGado", description: "Sincronizado com base nacional", icon: Award },
    ],
  },
};

function MockQRCode({ id }: { id: string }) {
  const seed = id.charCodeAt(0) + id.charCodeAt(id.length - 1);
  const cells = Array.from({ length: 7 }, (_, row) =>
    Array.from({ length: 7 }, (_, col) => {
      if ((row < 3 && col < 3) || (row < 3 && col >= 4) || (row >= 4 && col < 3)) return true;
      return ((seed * (row + 1) * (col + 1)) % 3) !== 0;
    })
  );

  return (
    <div className="inline-grid gap-0.5" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
      {cells.flatMap((row, r) =>
        row.map((filled, c) => (
          <div
            key={`${r}-${c}`}
            className={`w-5 h-5 rounded-sm ${filled ? "bg-primary" : "bg-white"}`}
          />
        ))
      )}
    </div>
  );
}

export function AnimalProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const animal = mockData[id as string] ?? {
    earTag: id ?? "BR-001",
    breed: "Nelore",
    birthDate: "01/06/2026",
    farm: "Fazenda Esperança Verde",
    location: "Goiás, Brasil",
    isHybrid: false,
    weight: "280 kg",
    timeline: [
      { date: "01/06/2026", event: "Nascimento", description: "Animal nasceu na Fazenda Esperança Verde", icon: Calendar },
      { date: "05/06/2026", event: "Registro LeiGado", description: "Sincronizado com base nacional", icon: Award },
    ],
  };

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
            <h1 className="text-lg">Perfil do Animal</h1>
            <p className="text-xs text-primary-foreground/80">Brinco: {animal.earTag}</p>
          </div>
        </div>
      </header>

      <div className="px-6 py-6 space-y-4">
        {/* Info Card */}
        <Card className="p-6 bg-card shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-foreground mb-1">{animal.earTag}</h2>
              <p className="text-muted-foreground">{animal.breed}</p>
            </div>
            {animal.isHybrid && (
              <Badge className="bg-secondary text-secondary-foreground">Híbrido</Badge>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                <p className="text-foreground">{animal.birthDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Weight className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Peso Estimado</p>
                <p className="text-foreground">{animal.weight}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Origem</p>
                <p className="text-foreground">{animal.farm}</p>
                <p className="text-sm text-muted-foreground">{animal.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Status LeiGado</p>
                <p className="text-green-700 font-medium">Verificado e Sincronizado</p>
              </div>
            </div>
          </div>
        </Card>

        {/* QR Code */}
        <Card className="p-6 bg-card shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground">Selo de Rastreabilidade</h3>
            <QrCode className="w-6 h-6 text-primary" />
          </div>

          <div className="bg-muted/30 rounded-lg p-8 flex flex-col items-center justify-center gap-3">
            <div className="bg-white p-4 rounded-lg border border-primary/20 shadow-sm">
              <MockQRCode id={animal.earTag} />
            </div>
            <p className="text-xs text-muted-foreground">gaio.agro/{animal.earTag}</p>
          </div>

          <Button
            onClick={() => navigate(`/consumer/${animal.earTag}`)}
            className="w-full h-12 mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Visualizar como Consumidor
          </Button>
        </Card>

        {/* Timeline */}
        <div>
          <h3 className="text-foreground mb-4">Histórico de Rastreabilidade</h3>
          <div className="space-y-0">
            {animal.timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    {index < animal.timeline.length - 1 && (
                      <div className="w-0.5 flex-grow bg-border my-1 min-h-[24px]" />
                    )}
                  </div>
                  <Card className="flex-1 p-4 bg-card shadow-sm mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-foreground">{item.event}</h4>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
