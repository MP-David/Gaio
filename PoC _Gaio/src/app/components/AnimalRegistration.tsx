import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Save, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Card } from "./ui/card";

export function AnimalRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    earTag: "",
    breed: "",
    birthDate: "",
    isHybrid: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save - navigate to animal profile
    navigate(`/animal/${formData.earTag || "BR-NEW"}`);
  };

  const handleSync = () => {
    // Mock API sync
    alert("Sincronizando com LeiGado API...");
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-5 shadow-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg">Novo Registro</h1>
            <p className="text-xs text-primary-foreground/80">
              Cadastro de Animal
            </p>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="px-6 py-6">
        <Card className="p-6 bg-card shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ear Tag ID */}
            <div className="space-y-2">
              <Label htmlFor="earTag" className="text-foreground">
                Número do Brinco (ID)
              </Label>
              <Input
                id="earTag"
                type="text"
                placeholder="Ex: BR-001"
                value={formData.earTag}
                onChange={(e) =>
                  setFormData({ ...formData, earTag: e.target.value })
                }
                className="h-14 bg-input-background border-border"
                required
              />
            </div>

            {/* Breed */}
            <div className="space-y-2">
              <Label htmlFor="breed" className="text-foreground">
                Raça
              </Label>
              <Input
                id="breed"
                type="text"
                placeholder="Ex: Nelore, Angus, Brahman"
                value={formData.breed}
                onChange={(e) =>
                  setFormData({ ...formData, breed: e.target.value })
                }
                className="h-14 bg-input-background border-border"
                required
              />
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-foreground">
                Data de Nascimento
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                className="h-14 bg-input-background border-border"
                required
              />
            </div>

            {/* Hybrid Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <Label htmlFor="isHybrid" className="text-foreground">
                  Híbrido para Corte
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Animal é híbrido destinado à produção de carne
                </p>
              </div>
              <Switch
                id="isHybrid"
                checked={formData.isHybrid}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isHybrid: checked })
                }
              />
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                type="submit"
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Save className="w-5 h-5 mr-2" />
                Salvar Registro
              </Button>

              <Button
                type="button"
                onClick={handleSync}
                variant="outline"
                className="w-full h-14 border-secondary text-secondary hover:bg-secondary/10"
              >
                <Zap className="w-5 h-5 mr-2" />
                Sincronizar com LeiGado API
              </Button>
            </div>
          </form>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 p-5 bg-accent/30 border-accent">
          <p className="text-sm text-foreground">
            <strong>Dica:</strong> Os dados serão sincronizados automaticamente
            com a base nacional LeiGado para garantir rastreabilidade completa.
          </p>
        </Card>
      </div>
    </div>
  );
}
