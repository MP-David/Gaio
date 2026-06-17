# Gaio — Rastreabilidade Bovina

**PoC** de uma plataforma mobile-first para rastreabilidade de gado bovino no agronegócio brasileiro. O sistema conecta produtores rurais, o registro nacional **LeiGado** e consumidores finais em uma cadeia de transparência completa — do nascimento do animal à prateleira.

---

## O Problema

O consumidor brasileiro tem cada vez mais interesse em saber a origem do que consome, mas a rastreabilidade bovina ainda é fragmentada, burocrática e inacessível para pequenos e médios produtores. O Gaio propõe uma solução simples, visual e integrada.

## Funcionalidades

| Tela | Descrição |
|------|-----------|
| **Login** | Autenticação do produtor rural |
| **Dashboard** | Visão geral do rebanho com busca, listagem de animais e gráfico de registros mensais |
| **Cadastro de Animal** | Registro de novos bovinos com dados de raça, origem e identificação |
| **Perfil do Animal** | Timeline completa do animal (nascimento → vacinações → desmame → registro LeiGado) |
| **Visão do Consumidor** | Página pública acessível via QR Code com origem, certificações e score de sustentabilidade |
| **Relatórios** | Indicadores do rebanho: distribuição por raça, faixas de peso e indicadores de bem-estar animal |

## Stack Técnica

- **React 18** + **TypeScript**
- **Vite 6** — bundler e dev server
- **Tailwind CSS v4** — estilização utilitária
- **shadcn/ui** (Radix UI) — componentes acessíveis
- **React Router v7** — navegação client-side
- **Recharts** — gráficos e visualizações
- **Motion** (Framer Motion) — animações
- **MUI Icons** — ícones complementares

## Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build de produção
npm run build
```

O projeto sobe por padrão em `http://localhost:5173`.

## Estrutura de Rotas

```
/              → Login
/dashboard     → Dashboard do produtor
/register      → Cadastro de animal
/animal/:id    → Perfil do animal
/consumer/:id  → Visão pública para consumidores
/reports       → Relatórios do rebanho
```

## Status

Esta é uma **PoC de design e validação de fluxo** — os dados são mockados. O objetivo é validar a experiência do usuário e a proposta de valor antes do desenvolvimento do backend e integrações com a base nacional LeiGado.
