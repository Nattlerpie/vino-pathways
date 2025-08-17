import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { AlertTriangle, TrendingUp, Users, MapPin, Plane, Train, Car, Ship, Utensils, TreePine, Activity, Calendar, Globe } from 'lucide-react';
import { useTranslation, Language } from '@/hooks/useTranslation';

const FranceConvergenceDashboard = () => {
  const { language, setLanguage, t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState('bordeaux');
  const [selectedView, setSelectedView] = useState('convergence');
  const [vulnerabilityType, setVulnerabilityType] = useState('composite');

  // Seasonal vulnerability data
  const seasonalityData = [
    { month: 'Jan', visitors: 25, wine_tourism: 15, cycling: 5, vulnerability: 0.8 },
    { month: 'Fév', visitors: 28, wine_tourism: 18, cycling: 8, vulnerability: 0.75 },
    { month: 'Mar', visitors: 45, wine_tourism: 35, cycling: 25, vulnerability: 0.6 },
    { month: 'Avr', visitors: 65, wine_tourism: 55, cycling: 45, vulnerability: 0.45 },
    { month: 'Mai', visitors: 85, wine_tourism: 80, cycling: 70, vulnerability: 0.25 },
    { month: 'Jun', visitors: 95, wine_tourism: 90, cycling: 85, vulnerability: 0.15 },
    { month: 'Jul', visitors: 100, wine_tourism: 100, cycling: 95, vulnerability: 0.1 },
    { month: 'Aoû', visitors: 98, wine_tourism: 95, cycling: 90, vulnerability: 0.12 },
    { month: 'Sep', visitors: 90, wine_tourism: 100, cycling: 80, vulnerability: 0.18 },
    { month: 'Oct', visitors: 75, wine_tourism: 85, cycling: 65, vulnerability: 0.35 },
    { month: 'Nov', visitors: 40, wine_tourism: 30, cycling: 20, vulnerability: 0.65 },
    { month: 'Déc', visitors: 35, wine_tourism: 25, cycling: 15, vulnerability: 0.7 }
  ];

  // French wine regions data (strategic focus on wine tourism convergence)
  const regions = {
    alsace: {
      name: "Alsace",
      description: t('regions.alsace'),
      vulnerability: { weak: 0.38, strong: 0.65, mixed: 0.48 }
    },
    bordeaux: {
      name: "Bordeaux",
      description: t('regions.bordeaux'),
      vulnerability: { weak: 0.32, strong: 0.71, mixed: 0.46 }
    },
    burgundy: {
      name: "Burgundy",
      description: t('regions.burgundy'),
      vulnerability: { weak: 0.29, strong: 0.68, mixed: 0.44 }
    },
    bugey: {
      name: "Bugey",
      description: t('regions.bugey'),
      vulnerability: { weak: 0.44, strong: 0.78, mixed: 0.55 }
    },
    champagne: {
      name: "Champagne",
      description: t('regions.champagne'),
      vulnerability: { weak: 0.25, strong: 0.62, mixed: 0.39 }
    },
    corsica: {
      name: "Corsica",
      description: t('regions.corsica'),
      vulnerability: { weak: 0.52, strong: 0.85, mixed: 0.62 }
    },
    jura: {
      name: "Jura",
      description: t('regions.jura'),
      vulnerability: { weak: 0.46, strong: 0.72, mixed: 0.54 }
    },
    languedoc: {
      name: "Languedoc Roussillon",
      description: t('regions.languedoc'),
      vulnerability: { weak: 0.41, strong: 0.73, mixed: 0.53 }
    },
    lorraine: {
      name: "Lorraine",
      description: t('regions.lorraine'),
      vulnerability: { weak: 0.48, strong: 0.74, mixed: 0.56 }
    },
    lyon: {
      name: "Lyon",
      description: t('regions.lyon'),
      vulnerability: { weak: 0.35, strong: 0.66, mixed: 0.45 }
    },
    provence: {
      name: "Provence",
      description: t('regions.provence'),
      vulnerability: { weak: 0.28, strong: 0.69, mixed: 0.44 }
    },
    savoy: {
      name: "Savoy",
      description: t('regions.savoy'),
      vulnerability: { weak: 0.43, strong: 0.71, mixed: 0.52 }
    },
    southwest: {
      name: "South-West",
      description: t('regions.southwest'),
      vulnerability: { weak: 0.39, strong: 0.67, mixed: 0.49 }
    },
    loire: {
      name: "Loire Valley",
      description: t('regions.loire'),
      vulnerability: { weak: 0.33, strong: 0.58, mixed: 0.42 }
    },
    rhone: {
      name: "Rhône Valley",
      description: t('regions.rhone'),
      vulnerability: { weak: 0.36, strong: 0.64, mixed: 0.47 }
    }
  };

  // Transport modes with vulnerability indicators (cycling replaces maritime)
  const transportModes = [
    { name: "Aviation", icon: "✈️", share: 40, vulnerability: 0.72, sustainability: 0.25, partnerships: 85 },
    { name: "Rail", icon: "🚂", share: 30, vulnerability: 0.31, sustainability: 0.85, partnerships: 75 },
    { name: "Automobile", icon: "🚗", share: 20, vulnerability: 0.45, sustainability: 0.40, partnerships: 60 },
    { name: "Cycling", icon: "🚴", share: 10, vulnerability: 0.22, sustainability: 0.95, partnerships: 88 }
  ];

  // Tourism types with market concentration data (added religion)
  const tourismTypes = [
    { name: t('wineToursim'), share: 24, concentration: 0.68, dependency: 0.45, growth: 8.5, partnerships: 95 },
    { name: t('gastronomy'), share: 18, concentration: 0.52, dependency: 0.38, growth: 6.2, partnerships: 80 },
    { name: t('cultural'), share: 22, concentration: 0.44, dependency: 0.42, growth: 4.1, partnerships: 70 },
    { name: t('adventureNature'), share: 14, concentration: 0.61, dependency: 0.51, growth: 12.3, partnerships: 85 },
    { name: t('business'), share: 11, concentration: 0.72, dependency: 0.68, growth: 3.8, partnerships: 65 },
    { name: t('healthWellness'), share: 6, concentration: 0.55, dependency: 0.35, growth: 15.1, partnerships: 82 },
    { name: t('religious'), share: 5, concentration: 0.78, dependency: 0.62, growth: 2.1, partnerships: 58 }
  ];

  // Vulnerability indicators data
  const vulnerabilityIndicators = [
    { indicator: "Market Concentration", value: 0.68, type: "concentration", risk: t('high') },
    { indicator: "Key Market Share", value: 0.45, type: "dependency", risk: t('medium') },
    { indicator: "Seasonal Concentration", value: 0.72, type: "concentration", risk: t('high') },
    { indicator: "Peak Season Dependency", value: 0.58, type: "dependency", risk: t('medium') },
    { indicator: "Transport Mode Concentration", value: 0.52, type: "concentration", risk: t('medium') },
    { indicator: "Primary Mode Dependency", value: 0.48, type: "dependency", risk: t('medium') }
  ];

  // Partnership opportunity matrix (updated with cycling and wine focus)
  const partnershipMatrix = [
    { sector1: t('wineToursim'), sector2: "Cycling", opportunity: 92, vulnerability_risk: 0.25, sustainability: 0.95 },
    { sector1: t('wineToursim'), sector2: "Rail", opportunity: 85, vulnerability_risk: 0.35, sustainability: 0.85 },
    { sector1: t('wineToursim'), sector2: "Aviation", opportunity: 78, vulnerability_risk: 0.65, sustainability: 0.45 },
    { sector1: t('gastronomy'), sector2: "Cycling", opportunity: 88, vulnerability_risk: 0.28, sustainability: 0.90 },
    { sector1: t('cultural'), sector2: "Rail", opportunity: 82, vulnerability_risk: 0.32, sustainability: 0.80 },
    { sector1: t('religious'), sector2: "Rail", opportunity: 65, vulnerability_risk: 0.45, sustainability: 0.75 }
  ];

  // Calculate composite vulnerability scores
  const calculateCompositeScores = (region) => {
    const indicators = vulnerabilityIndicators.map(v => v.value);
    const weak = indicators.reduce((a, b) => a + b) / indicators.length;
    const strong = Math.max(...indicators);
    const mixed = 0.7 * weak + 0.3 * strong; // Lambda = 0.7
    
    return { weak, strong, mixed };
  };

  const getVulnerabilityColor = (score) => {
    if (score < 0.35) return "#10b981"; // Green - Low risk
    if (score < 0.55) return "#f59e0b"; // Yellow - Medium risk
    return "#ef4444"; // Red - High risk
  };

  const getRiskLevel = (score) => {
    if (score < 0.35) return t('low');
    if (score < 0.55) return t('medium');
    return t('high');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <div className="bg-white rounded-lg shadow-md p-2 flex items-center gap-2">
            <Globe className="text-gray-500" size={16} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="border-none bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {t('subtitle')}
          </p>
          <div className="text-sm text-gray-500 bg-white/50 rounded-lg p-2 inline-block">
            {t('methodology')}
          </div>
        </div>

        {/* Strategic Framework - Moved to top for clarity */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white text-center mb-6">
          <h2 className="text-2xl font-bold mb-4">{t('strategicFramework')}</h2>
          <p className="text-lg mb-4">
            {t('frameworkDescription')}
          </p>
          <div className="bg-white/10 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">{t('dataIntegrationRequirements')}</h3>
            <div className="text-sm space-y-1">
              <p>• Tourism arrival statistics by origin country and season (INSEE, regional tourism boards)</p>
              <p>• Transport mode usage data by wine region (SNCF, airports, cycling infrastructure data)</p>
              <p>• Economic indicators: GDP contribution, employment by tourism type</p>
              <p>• Partnership case studies: existing collaborations and success metrics</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => window.open('mailto:your.email@domain.com?subject=Partnership Analysis Discussion')}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Request Full Data Integration Proposal
            </button>
            <button 
              onClick={() => window.open('mailto:your.email@domain.com?subject=Vulnerability Assessment Methodology')}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-400 transition-colors"
            >
              Vulnerability Assessment Methodology
            </button>
            <button 
              onClick={() => window.open('mailto:your.email@domain.com?subject=Regional Partnership Consulting')}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              Regional Partnership Consulting
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Region Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{t('region')}</h3>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Object.entries(regions).map(([key, region]) => (
                  <option key={key} value={key}>
                    {region.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {regions[selectedRegion].description}
              </p>
            </div>

            {/* View Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{t('analysisView')}</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedView('convergence')}
                  className={`p-2 rounded-md text-sm transition-colors ${
                    selectedView === 'convergence'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t('convergence')}
                </button>
                <button
                  onClick={() => setSelectedView('seasonality')}
                  className={`p-2 rounded-md text-sm transition-colors ${
                    selectedView === 'seasonality'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Saisonnalité
                </button>
                <button
                  onClick={() => setSelectedView('vulnerability')}
                  className={`p-2 rounded-md text-sm transition-colors ${
                    selectedView === 'vulnerability'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {t('vulnerability')}
                </button>
              </div>
            </div>

            {/* Vulnerability Type */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{t('vulnerabilityIndex')}</h3>
              <select
                value={vulnerabilityType}
                onChange={(e) => setVulnerabilityType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="weak">{t('weak')}</option>
                <option value="mixed">{t('mixed')}</option>
                <option value="strong">{t('strong')}</option>
                <option value="composite">{t('composite')}</option>
              </select>
            </div>
          </div>
        </div>

        {selectedView === 'convergence' ? (
          /* Convergence Analysis */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Transport-Tourism Matrix with Explanation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="text-blue-500" size={20} />
                {t('transportTourismConvergence')}
              </h3>
              
              {/* Explanation Box */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">{t('howToRead')}</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>{t('xAxis')}</strong></p>
                  <p><strong>{t('yAxis')}</strong></p>
                  <p><strong>{t('idealPosition')}</strong></p>
                  <p><strong>{t('dataStatus')}</strong></p>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="vulnerability" 
                      type="number" 
                      domain={[0, 1]} 
                      name="Vulnerability Risk"
                      label={{ value: 'Vulnerability Risk →', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      dataKey="partnerships" 
                      type="number" 
                      domain={[0, 100]} 
                      name="Partnership Potential"
                      label={{ value: 'Partnership Potential ↑', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'vulnerability' ? `Risk: ${(Number(value) * 100).toFixed(0)}%` : `Opportunity: ${value}%`,
                        name === 'vulnerability' ? 'Vulnerability' : 'Partnership Potential'
                      ]}
                      labelFormatter={(label) => `Transport Mode`}
                    />
                    <Scatter data={transportModes} fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {transportModes.map((mode, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span>{mode.icon}</span>
                    <span>{mode.name}</span>
                    <span className="text-xs text-gray-500">({mode.share}% - illustrative)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tourism Sector Analysis with Data Notes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="text-green-500" size={20} />
                {t('tourismSectorOpportunities')}
              </h3>
              
              {/* Data Status Notice */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-4">
                <p className="text-sm text-amber-700">
                  <strong>{t('dataStatusNotice')}</strong>
                </p>
              </div>

              <div className="space-y-3">
                {tourismTypes.map((sector, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">{sector.name}</h4>
                      <span className="text-sm font-semibold text-blue-600">{sector.share}%*</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">{t('concentration')}: </span>
                        <span className={`font-medium ${sector.concentration > 0.6 ? 'text-red-500' : sector.concentration > 0.4 ? 'text-yellow-500' : 'text-green-500'}`}>
                          {(sector.concentration * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">{t('growth')}: </span>
                        <span className="font-medium text-green-600">+{sector.growth}%*</span>
                      </div>
                      <div>
                        <span className="text-gray-500">{t('partnerships')}: </span>
                        <span className="font-medium text-blue-600">{sector.partnerships}%*</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">* Illustrative data for framework demonstration</p>
            </div>
          </div>
        ) : selectedView === 'seasonality' ? (
          /* Seasonality Analysis */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Seasonal Patterns */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="text-green-500" size={20} />
                Seasonal Vulnerability Patterns
              </h3>
              
              {/* Seasonality Explanation */}
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                <h4 className="font-semibold text-green-800 mb-2">Gallego & Font V4/V5 Indicators:</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <p><strong>V4 - Seasonal Concentration:</strong> Gini index of monthly distribution</p>
                  <p><strong>V5 - Peak Season Dependency:</strong> % arrivals in highest month</p>
                  <p><strong>Strategy:</strong> Target low-season months to reduce vulnerability</p>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={seasonalityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="wine_tourism" stroke="#dc2626" strokeWidth={3} name="Wine Tourism" />
                    <Line type="monotone" dataKey="cycling" stroke="#059669" strokeWidth={2} name="Cycling Tourism" />
                    <Line type="monotone" dataKey="visitors" stroke="#2563eb" strokeWidth={2} name="Total Visitors" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Seasonal Strategy */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Seasonal Opportunity Targeting</h3>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-red-50">
                  <h4 className="font-semibold text-red-800 mb-2">High Vulnerability Months</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Janvier - Février</span>
                      <span className="font-semibold text-red-600">Risque: 75-80%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Novembre - Décembre</span>
                      <span className="font-semibold text-red-600">Risque: 65-70%</span>
                    </div>
                    <p className="text-red-700 mt-2">
                      <strong>Strategy:</strong> Indoor experiences, winter festivals, wellness tourism
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-green-50">
                  <h4 className="font-semibold text-green-800 mb-2">Opportunity Periods</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Mars - Avril</span>
                      <span className="font-semibold text-green-600">Potentiel: +40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Octobre</span>
                      <span className="font-semibold text-green-600">Potentiel: +35%</span>
                    </div>
                    <p className="text-green-700 mt-2">
                      <strong>Strategy:</strong> Harvest experiences, spring cycling, shoulder season pricing
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50">
                  <h4 className="font-semibold text-blue-800 mb-2">Partnership Timing</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>Rail partnerships:</strong> Promote off-season packages</p>
                    <p><strong>Cycling infrastructure:</strong> Spring/fall route development</p>
                    <p><strong>Aviation:</strong> Seasonal capacity adjustments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Vulnerability Analysis */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Vulnerability Overview with Methodology Explanation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-red-500" size={20} />
                {t('vulnerabilityIndexGallego')}
              </h3>
              
              {/* Methodology Explanation */}
              <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">{t('vulnerabilityCalculation')}</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>{t('indicators')}</strong></p>
                  <p><strong>{t('weakIndex')}</strong></p>
                  <p><strong>{t('strongIndex')}</strong></p>
                  <p><strong>{t('mixedIndex')}</strong></p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(regions[selectedRegion].vulnerability).map(([type, score]) => (
                  <div key={type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{type} Index</span>
                      <span className={`font-medium`} style={{ color: getVulnerabilityColor(score) }}>
                        {(Number(score) * 100).toFixed(0)}% ({getRiskLevel(score)})
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Number(score) * 100}%`,
                          backgroundColor: getVulnerabilityColor(score)
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">{t('dataStatus')}</h4>
                <p className="text-xs text-red-700">
                  Current scores are illustrative. Real vulnerability assessment requires: airport data, 
                  tourism arrival statistics by origin/season, and transport mode usage data per wine region.
                </p>
              </div>
            </div>

            {/* Vulnerability Indicators */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('detailedIndicators')}</h3>
              <div className="space-y-3">
                {vulnerabilityIndicators.map((indicator, index) => (
                  <div key={index} className="border-l-4 pl-3" style={{ borderColor: getVulnerabilityColor(indicator.value) }}>
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium text-gray-800">{indicator.indicator}</h4>
                      <span className="text-xs px-2 py-1 rounded" style={{ 
                        backgroundColor: getVulnerabilityColor(indicator.value) + '20',
                        color: getVulnerabilityColor(indicator.value)
                      }}>
                        {indicator.risk}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span className="capitalize">{indicator.type}</span>
                      <span>{(indicator.value * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk-Adjusted Partnerships */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('riskAdjustedPartnerships')}</h3>
              <div className="space-y-3">
                {partnershipMatrix.slice(0, 5).map((partnership, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium text-gray-800">
                        {partnership.sector1} × {partnership.sector2}
                      </h4>
                      <span className="text-xs font-semibold text-blue-600">
                        {partnership.opportunity}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">{t('risk')}: </span>
                        <span className={`font-medium`} style={{ color: getVulnerabilityColor(partnership.vulnerability_risk) }}>
                          {(partnership.vulnerability_risk * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">{t('sustainability')}: </span>
                        <span className="font-medium text-green-600">
                          {(partnership.sustainability * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Strategic analysis by [Your Name] - Bridging academic research with business strategy</p>
          <p className="mt-2">{t('footerMethodology')}</p>
        </div>
      </div>
    </div>
  );
};

export default FranceConvergenceDashboard;
