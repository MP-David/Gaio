import { useParams, useNavigate } from "react-router";
import { CheckCircle2, MapPin, Award, Leaf, ArrowLeft, Syringe, Weight, Calendar } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function ConsumerView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const productData = {
    earTag: id || "BR-001",
    farm: "Fazenda Esperança Verde",
    location: "Goiás, Brasil",
    breed: "Angus x Nelore Premium",
    birthDate: "15/01/2026",
    certifications: ["Orgânico", "Bem-Estar Animal", "Rastreado LeiGado"],
    welfareStatus: "Certificado",
    sustainabilityScore: 94,
    vaccinationCount: 3,
    weight: "298 kg",
  };

  const scoreColor =
    productData.sustainabilityScore >= 90
      ? "text-green-600"
      : productData.sustainabilityScore >= 70
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary-foreground/80 mb-6 hover:text-primary-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Voltar</span>
        </button>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Leaf className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-2xl mb-2">Gaio Rastreabilidade</h1>
          <p className="text-sm text-primary-foreground/80">Conheça a origem do seu alimento</p>
        </div>
      </header>

      <div className="px-6 py-8 space-y-5">
        {/* Verification */}
        <Card className="p-6 bg-card shadow-md border-primary/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h2 className="text-foreground">Produto Verificado</h2>
              <p className="text-sm text-muted-foreground">ID: {productData.earTag}</p>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <p className="text-sm text-green-800">
              Este produto possui rastreabilidade completa e certificada pelo sistema nacional LeiGado.
            </p>
          </div>
        </Card>

        {/* Sustainability Score */}
        <Card className="p-5 bg-card shadow-sm">
          <h3 className="text-foreground mb-3">Score de Sustentabilidade</h3>
          <div className="flex items-center gap-4">
            <div className={`text-5xl font-bold ${scoreColor}`}>
              {productData.sustainabilityScore}
            </div>
            <div className="flex-1">
              <div className="h-3 bg-muted rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${productData.sustainabilityScore}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">Excelente — top 10% do Brasil</p>
            </div>
          </div>
        </Card>

        {/* Origin */}
        <div>
          <h3 className="text-foreground mb-3">Informações de Origem</h3>

          <div className="space-y-3">
            <Card className="p-4 bg-card shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Fazenda</p>
                  <p className="text-foreground">{productData.farm}</p>
                  <p className="text-sm text-muted-foreground">{productData.location}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card shadow-sm">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Raça</p>
                  <p className="text-foreground">{productData.breed}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card shadow-sm">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Data de Nascimento</p>
                  <p className="text-foreground">{productData.birthDate}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card shadow-sm">
              <div className="flex items-start gap-3">
                <Syringe className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Vacinações</p>
                  <p className="text-foreground">{productData.vaccinationCount} vacinas aplicadas</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card shadow-sm">
              <div className="flex items-start gap-3">
                <Weight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Status de Bem-Estar Animal</p>
                  <p className="text-green-700 font-medium">{productData.welfareStatus}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-foreground mb-3">Certificações</h3>
          <div className="flex flex-wrap gap-2">
            {productData.certifications.map((cert) => (
              <Badge key={cert} className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        {/* Sustainability message */}
        <Card className="p-6 bg-accent/30 border-accent">
          <div className="flex gap-4">
            <Leaf className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h4 className="text-foreground mb-2">Compromisso Sustentável</h4>
              <p className="text-sm text-foreground/80">
                Este produto vem de uma fazenda comprometida com práticas sustentáveis, bem-estar animal e
                rastreabilidade total. Ao escolher este produto, você apoia o agronegócio responsável.
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">Powered by Gaio Rastreabilidade</p>
          <p className="text-xs text-muted-foreground mt-1">Sistema integrado ao LeiGado Nacional</p>
        </div>
      </div>
    </div>
  );
}
