
import { useState } from 'react';

export type Language = 'en' | 'fr' | 'es';

const translations = {
  en: {
    // Header
    title: "France Wine Regions: Tourism-Transport Convergence",
    subtitle: "Strategic Partnership Opportunities + Vulnerability Assessment Across Wine Tourism Ecosystem",
    methodology: "Methodology: Gallego & Font (2019) + Cross-Sector Convergence Analysis",
    
    // Controls
    region: "Region",
    analysisView: "Analysis View",
    convergence: "Convergence",
    vulnerability: "Vulnerability",
    vulnerabilityIndex: "Vulnerability Index",
    weak: "Weak (Optimistic)",
    mixed: "Mixed (Realistic)",
    strong: "Strong (Pessimistic)",
    composite: "Composite View",
    
    // Region descriptions
    regions: {
      alsace: "Premium white wines & cycling routes",
      bordeaux: "International wine prestige & aviation access",
      burgundy: "Terroir excellence & rail connectivity",
      champagne: "Luxury tourism & proximity to Paris",
      languedoc: "Value wines & Mediterranean access",
      loire: "Châteaux tourism & cycling infrastructure",
      provence: "Rosé wines & luxury tourism",
      rhone: "Diverse terroirs & transport corridors"
    },
    
    // Charts and analysis
    transportTourismConvergence: "Transport-Tourism Convergence Analysis",
    howToRead: "How to Read This Analysis:",
    xAxis: "X-Axis (Vulnerability): Risk of disruption - lower is better",
    yAxis: "Y-Axis (Partnership Potential): Strategic collaboration opportunity",
    idealPosition: "Ideal Position: Bottom-right (low vulnerability + high partnerships)",
    dataStatus: "Data Status: Illustrative framework pending real data integration",
    
    tourismSectorOpportunities: "Tourism Sector Opportunities",
    dataStatusNotice: "Data Status: Framework demonstration with illustrative percentages. Requires integration with official French tourism statistics (UNWTO, INSEE).",
    
    // Tourism types
    wineToursim: "Wine Tourism",
    gastronomy: "Gastronomy",
    cultural: "Cultural",
    adventureNature: "Adventure/Nature",
    business: "Business",
    healthWellness: "Health/Wellness",
    religious: "Religious",
    
    // Vulnerability analysis
    vulnerabilityIndexGallego: "Vulnerability Index (Gallego & Font Method)",
    vulnerabilityCalculation: "Vulnerability Calculation Method:",
    indicators: "Indicators: Market concentration + Seasonal dependency + Transport mode concentration",
    weakIndex: "Weak Index: Average of indicators (assumes full compensation between strengths/weaknesses)",
    strongIndex: "Strong Index: Maximum indicator value (no compensation - worst case scenario)",
    mixedIndex: "Mixed Index: 70% Weak + 30% Strong (realistic balanced assessment)",
    
    detailedIndicators: "Detailed Indicators",
    riskAdjustedPartnerships: "Risk-Adjusted Partnerships",
    
    // Risk levels
    low: "Low",
    medium: "Medium",
    high: "High",
    
    // Stats labels
    concentration: "Concentration",
    growth: "Growth",
    partnerships: "Partnerships",
    risk: "Risk",
    sustainability: "Sustainability",
    
    // Strategic recommendations
    strategicFramework: "Strategic Framework for Wine Tourism-Transport Convergence",
    frameworkDescription: "This dashboard demonstrates the integration of academic vulnerability assessment (Gallego & Font 2019) with cross-sector partnership analysis for French wine regions.",
    dataIntegrationRequirements: "Data Integration Requirements:",
    
    // Footer
    footerText: "Advanced tourism-transport convergence analysis combining business strategy with academic rigor",
    footerMethodology: "Methodology: Gallego & Font (2019) vulnerability framework + cross-sector partnership mapping"
  },
  
  fr: {
    // Header
    title: "Régions Viticoles de France : Convergence Tourisme-Transport",
    subtitle: "Opportunités de Partenariats Stratégiques + Évaluation de Vulnérabilité à travers l'Écosystème du Tourisme Viticole",
    methodology: "Méthodologie : Gallego & Font (2019) + Analyse de Convergence Inter-Sectorielle",
    
    // Controls
    region: "Région",
    analysisView: "Vue d'Analyse",
    convergence: "Convergence",
    vulnerability: "Vulnérabilité",
    vulnerabilityIndex: "Indice de Vulnérabilité",
    weak: "Faible (Optimiste)",
    mixed: "Mixte (Réaliste)",
    strong: "Fort (Pessimiste)",
    composite: "Vue Composite",
    
    // Region descriptions
    regions: {
      alsace: "Vins blancs premium & circuits cyclables",
      bordeaux: "Prestige viticole international & accès aérien",
      burgundy: "Excellence du terroir & connectivité ferroviaire",
      champagne: "Tourisme de luxe & proximité de Paris",
      languedoc: "Vins de valeur & accès méditerranéen",
      loire: "Tourisme châteaux & infrastructure cyclable",
      provence: "Vins rosés & tourisme de luxe",
      rhone: "Terroirs diversifiés & corridors de transport"
    },
    
    // Charts and analysis
    transportTourismConvergence: "Analyse de Convergence Transport-Tourisme",
    howToRead: "Comment Lire Cette Analyse :",
    xAxis: "Axe X (Vulnérabilité) : Risque de perturbation - plus bas est mieux",
    yAxis: "Axe Y (Potentiel de Partenariat) : Opportunité de collaboration stratégique",
    idealPosition: "Position Idéale : En bas à droite (faible vulnérabilité + partenariats élevés)",
    dataStatus: "Statut des Données : Cadre illustratif en attente d'intégration de données réelles",
    
    tourismSectorOpportunities: "Opportunités du Secteur Touristique",
    dataStatusNotice: "Statut des Données : Démonstration du cadre avec pourcentages illustratifs. Nécessite l'intégration des statistiques officielles du tourisme français (OMT, INSEE).",
    
    // Tourism types
    wineToursim: "Œnotourisme",
    gastronomy: "Gastronomie",
    cultural: "Culturel",
    adventureNature: "Aventure/Nature",
    business: "Affaires",
    healthWellness: "Santé/Bien-être",
    religious: "Religieux",
    
    // Vulnerability analysis
    vulnerabilityIndexGallego: "Indice de Vulnérabilité (Méthode Gallego & Font)",
    vulnerabilityCalculation: "Méthode de Calcul de Vulnérabilité :",
    indicators: "Indicateurs : Concentration du marché + Dépendance saisonnière + Concentration des modes de transport",
    weakIndex: "Indice Faible : Moyenne des indicateurs (suppose une compensation complète entre forces/faiblesses)",
    strongIndex: "Indice Fort : Valeur maximale des indicateurs (aucune compensation - scénario du pire cas)",
    mixedIndex: "Indice Mixte : 70% Faible + 30% Fort (évaluation équilibrée réaliste)",
    
    detailedIndicators: "Indicateurs Détaillés",
    riskAdjustedPartnerships: "Partenariats Ajustés au Risque",
    
    // Risk levels
    low: "Faible",
    medium: "Moyen",
    high: "Élevé",
    
    // Stats labels
    concentration: "Concentration",
    growth: "Croissance",
    partnerships: "Partenariats",
    risk: "Risque",
    sustainability: "Durabilité",
    
    // Strategic recommendations
    strategicFramework: "Cadre Stratégique pour la Convergence Œnotourisme-Transport",
    frameworkDescription: "Ce tableau de bord démontre l'intégration de l'évaluation académique de vulnérabilité (Gallego & Font 2019) avec l'analyse de partenariat inter-sectoriel pour les régions viticoles françaises.",
    dataIntegrationRequirements: "Exigences d'Intégration des Données :",
    
    // Footer
    footerText: "Analyse avancée de convergence tourisme-transport combinant stratégie d'entreprise et rigueur académique",
    footerMethodology: "Méthodologie : Cadre de vulnérabilité Gallego & Font (2019) + cartographie de partenariat inter-sectoriel"
  },
  
  es: {
    // Header
    title: "Regiones Vitivinícolas de Francia: Convergencia Turismo-Transporte",
    subtitle: "Oportunidades de Asociaciones Estratégicas + Evaluación de Vulnerabilidad en el Ecosistema del Turismo Vinícola",
    methodology: "Metodología: Gallego & Font (2019) + Análisis de Convergencia Inter-Sectorial",
    
    // Controls
    region: "Región",
    analysisView: "Vista de Análisis",
    convergence: "Convergencia",
    vulnerability: "Vulnerabilidad",
    vulnerabilityIndex: "Índice de Vulnerabilidad",
    weak: "Débil (Optimista)",
    mixed: "Mixto (Realista)",
    strong: "Fuerte (Pesimista)",
    composite: "Vista Compuesta",
    
    // Region descriptions
    regions: {
      alsace: "Vinos blancos premium & rutas ciclistas",
      bordeaux: "Prestigio vinícola internacional & acceso aéreo",
      burgundy: "Excelencia del terroir & conectividad ferroviaria",
      champagne: "Turismo de lujo & proximidad a París",
      languedoc: "Vinos de valor & acceso mediterráneo",
      loire: "Turismo de castillos & infraestructura ciclista",
      provence: "Vinos rosados & turismo de lujo",
      rhone: "Terroirs diversificados & corredores de transporte"
    },
    
    // Charts and analysis
    transportTourismConvergence: "Análisis de Convergencia Transporte-Turismo",
    howToRead: "Cómo Leer Este Análisis:",
    xAxis: "Eje X (Vulnerabilidad): Riesgo de interrupción - menor es mejor",
    yAxis: "Eje Y (Potencial de Asociación): Oportunidad de colaboración estratégica",
    idealPosition: "Posición Ideal: Abajo a la derecha (baja vulnerabilidad + altas asociaciones)",
    dataStatus: "Estado de Datos: Marco ilustrativo pendiente de integración de datos reales",
    
    tourismSectorOpportunities: "Oportunidades del Sector Turístico",
    dataStatusNotice: "Estado de Datos: Demostración del marco con porcentajes ilustrativos. Requiere integración con estadísticas oficiales del turismo francés (OMT, INSEE).",
    
    // Tourism types
    wineToursim: "Enoturismo",
    gastronomy: "Gastronomía",
    cultural: "Cultural",
    adventureNature: "Aventura/Naturaleza",
    business: "Negocios",
    healthWellness: "Salud/Bienestar",
    religious: "Religioso",
    
    // Vulnerability analysis
    vulnerabilityIndexGallego: "Índice de Vulnerabilidad (Método Gallego & Font)",
    vulnerabilityCalculation: "Método de Cálculo de Vulnerabilidad:",
    indicators: "Indicadores: Concentración del mercado + Dependencia estacional + Concentración de modos de transporte",
    weakIndex: "Índice Débil: Promedio de indicadores (asume compensación completa entre fortalezas/debilidades)",
    strongIndex: "Índice Fuerte: Valor máximo de indicadores (sin compensación - escenario del peor caso)",
    mixedIndex: "Índice Mixto: 70% Débil + 30% Fuerte (evaluación equilibrada realista)",
    
    detailedIndicators: "Indicadores Detallados",
    riskAdjustedPartnerships: "Asociaciones Ajustadas al Riesgo",
    
    // Risk levels
    low: "Bajo",
    medium: "Medio",
    high: "Alto",
    
    // Stats labels
    concentration: "Concentración",
    growth: "Crecimiento",
    partnerships: "Asociaciones",
    risk: "Riesgo",
    sustainability: "Sostenibilidad",
    
    // Strategic recommendations
    strategicFramework: "Marco Estratégico para la Convergencia Enoturismo-Transporte",
    frameworkDescription: "Este tablero demuestra la integración de la evaluación académica de vulnerabilidad (Gallego & Font 2019) con el análisis de asociación inter-sectorial para las regiones vitivinícolas francesas.",
    dataIntegrationRequirements: "Requisitos de Integración de Datos:",
    
    // Footer
    footerText: "Análisis avanzado de convergencia turismo-transporte combinando estrategia empresarial con rigor académico",
    footerMethodology: "Metodología: Marco de vulnerabilidad Gallego & Font (2019) + mapeo de asociaciones inter-sectoriales"
  }
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  return { language, setLanguage, t };
};
