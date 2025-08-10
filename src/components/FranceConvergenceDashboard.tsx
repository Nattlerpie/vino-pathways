import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { AlertTriangle, TrendingUp, Users, MapPin, Plane, Train, Car, Ship, Utensils, TreePine, Activity, Calendar } from 'lucide-react';

const FranceConvergenceDashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState('bordeaux');
  const [selectedView, setSelectedView] = useState('convergence');
  const [vulnerabilityType, setVulnerabilityType] = useState('composite');

  // French wine regions data (strategic focus on wine tourism convergence)
  const regions = {
    alsace: {
      name: "Alsace",
      description: "Premium white wines & cycling routes",
      vulnerability: { weak: 0.38, strong: 0.65, mixed: 0.48 }
    },
    bordeaux: {
      name: "Bordeaux",
      description: "International wine prestige & aviation access",
      vulnerability: { weak: 0.32, strong: 0.71, mixed: 0.46 }
    },
    burgundy: {
      name: "Burgundy",
      description: "Terroir excellence & rail connectivity",
      vulnerability: { weak: 0.29, strong: 0.68, mixed: 0.44 }
    },
    champagne: {
      name: "Champagne",
      description: "Luxury tourism & proximity to Paris",
      vulnerability: { weak: 0.25, strong: 0.62, mixed: 0.39 }
    },
    languedoc: {
      name: "Languedoc-Roussillon",
      description: "Value wines & Mediterranean access",
      vulnerability: { weak: 0.41, strong: 0.73, mixed: 0.53 }
    },
    loire: {
      name: "Loire Valley",
      description: "Châteaux tourism & cycling infrastructure",
      vulnerability: { weak: 0.33, strong: 0.58, mixed: 0.42 }
    },
    provence: {
      name: "Provence",
      description: "Rosé wines & luxury tourism",
      vulnerability: { weak: 0.28, strong: 0.69, mixed: 0.44 }
    },
    rhone: {
      name: "Rhône Valley",
      description: "Diverse terroirs & transport corridors",
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
    { name: "Wine Tourism", share: 24, concentration: 0.68, dependency: 0.45, growth: 8.5, partnerships: 95 },
    { name: "Gastronomy", share: 18, concentration: 0.52, dependency: 0.38, growth: 6.2, partnerships: 80 },
    { name: "Cultural", share: 22, concentration: 0.44, dependency: 0.42, growth: 4.1, partnerships: 70 },
    { name: "Adventure/Nature", share: 14, concentration: 0.61, dependency: 0.51, growth: 12.3, partnerships: 85 },
    { name: "Business", share: 11, concentration: 0.72, dependency: 0.68, growth: 3.8, partnerships: 65 },
    { name: "Health/Wellness", share: 6, concentration: 0.55, dependency: 0.35, growth: 15.1, partnerships: 82 },
    { name: "Religious", share: 5, concentration: 0.78, dependency: 0.62, growth: 2.1, partnerships: 58 }
  ];

  // Vulnerability indicators data
  const vulnerabilityIndicators = [
    { indicator: "Market Concentration", value: 0.68, type: "concentration", risk: "High" },
    { indicator: "Key Market Share", value: 0.45, type: "dependency", risk: "Medium" },
    { indicator: "Seasonal Concentration", value: 0.72, type: "concentration", risk: "High" },
    { indicator: "Peak Season Dependency", value: 0.58, type: "dependency", risk: "Medium" },
    { indicator: "Transport Mode Concentration", value: 0.52, type: "concentration", risk: "Medium" },
    { indicator: "Primary Mode Dependency", value: 0.48, type: "dependency", risk: "Medium" }
  ];

  // Partnership opportunity matrix (updated with cycling and wine focus)
  const partnershipMatrix = [
    { sector1: "Wine Tourism", sector2: "Cycling", opportunity: 92, vulnerability_risk: 0.25, sustainability: 0.95 },
    { sector1: "Wine Tourism", sector2: "Rail", opportunity: 85, vulnerability_risk: 0.35, sustainability: 0.85 },
    { sector1: "Wine Tourism", sector2: "Aviation", opportunity: 78, vulnerability_risk: 0.65, sustainability: 0.45 },
    { sector1: "Gastronomy", sector2: "Cycling", opportunity: 88, vulnerability_risk: 0.28, sustainability: 0.90 },
    { sector1: "Cultural", sector2: "Rail", opportunity: 82, vulnerability_risk: 0.32, sustainability: 0.80 },
    { sector1: "Religious", sector2: "Rail", opportunity: 65, vulnerability_risk: 0.45, sustainability: 0.75 }
  ];

  // Calculate composite vulnerability scores
  const calculateCompositeScores = (region: any) => {
    const indicators = vulnerabilityIndicators.map(v => v.value);
    const weak = indicators.reduce((a, b) => a + b) / indicators.length;
    const strong = Math.max(...indicators);
    const mixed = 0.7 * weak + 0.3 * strong; // Lambda = 0.7
    
    return { weak, strong, mixed };
  };

  const getVulnerabilityColor = (score: number) => {
    if (score < 0.35) return "#10b981"; // Green - Low risk
    if (score < 0.55) return "#f59e0b"; // Yellow - Medium risk
    return "#ef4444"; // Red - High risk
  };

  const getRiskLevel = (score: number) => {
    if (score < 0.35) return "Faible";
    if (score < 0.55) return "Moyen";
    return "Élevé";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            France Wine Regions: Tourism-Transport Convergence
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Strategic Partnership Opportunities + Vulnerability Assessment Across Wine Tourism Ecosystem
          </p>
          <div className="text-sm text-gray-500 bg-white/50 rounded-lg p-2 inline-block">
            Methodology: Gallego & Font (2019) + Cross-Sector Convergence Analysis
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Region Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Region</h3>
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
                {regions[selectedRegion as keyof typeof regions].description}
              </p>
            </div>

            {/* View Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Analysis View</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedView('convergence')}
                  className={`p-2 rounded-md text-sm transition-colors ${
                    selectedView === 'convergence'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Convergence
                </button>
                <button
                  onClick={() => setSelectedView('vulnerability')}
                  className={`p-2 rounded-md text-sm transition-colors ${
                    selectedView === 'vulnerability'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Vulnérabilité
                </button>
              </div>
            </div>

            {/* Vulnerability Type */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Vulnerability Index</h3>
              <select
                value={vulnerabilityType}
                onChange={(e) => setVulnerabilityType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="weak">Weak (Optimiste)</option>
                <option value="mixed">Mixed (Réaliste)</option>
                <option value="strong">Strong (Pessimiste)</option>
                <option value="composite">Composite View</option>
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
                Transport-Tourism Convergence Analysis
              </h3>
              
              {/* Explanation Box */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">How to Read This Analysis:</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>X-Axis (Vulnerability):</strong> Risk of disruption - lower is better</p>
                  <p><strong>Y-Axis (Partnership Potential):</strong> Strategic collaboration opportunity</p>
                  <p><strong>Ideal Position:</strong> Bottom-right (low vulnerability + high partnerships)</p>
                  <p><strong>Data Status:</strong> Illustrative framework pending real data integration</p>
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
                        name === 'vulnerability' ? `Risk: ${(value as number * 100).toFixed(0)}%` : `Opportunity: ${value}%`,
                        name === 'vulnerability' ? 'Vulnerability' : 'Partnership Potential'
                      ]}
                      labelFormatter={() => `Transport Mode`}
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
                Tourism Sector Opportunities
              </h3>
              
              {/* Data Status Notice */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-4">
                <p className="text-sm text-amber-700">
                  <strong>Data Status:</strong> Framework demonstration with illustrative percentages. 
                  Requires integration with official French tourism statistics (UNWTO, INSEE).
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
                        <span className="text-gray-500">Concentration: </span>
                        <span className={`font-medium ${sector.concentration > 0.6 ? 'text-red-500' : sector.concentration > 0.4 ? 'text-yellow-500' : 'text-green-500'}`}>
                          {(sector.concentration * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Croissance: </span>
                        <span className="font-medium text-green-600">+{sector.growth}%*</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Partenariats: </span>
                        <span className="font-medium text-blue-600">{sector.partnerships}%*</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">* Illustrative data for framework demonstration</p>
            </div>
          </div>
        ) : (
          /* Vulnerability Analysis */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Vulnerability Overview with Methodology Explanation */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-red-500" size={20} />
                Vulnerability Index (Gallego & Font Method)
              </h3>
              
              {/* Methodology Explanation */}
              <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Vulnerability Calculation Method:</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Indicators:</strong> Market concentration + Seasonal dependency + Transport mode concentration</p>
                  <p><strong>Weak Index:</strong> Average of indicators (assumes full compensation between strengths/weaknesses)</p>
                  <p><strong>Strong Index:</strong> Maximum indicator value (no compensation - worst case scenario)</p>
                  <p><strong>Mixed Index:</strong> 70% Weak + 30% Strong (realistic balanced assessment)</p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(regions[selectedRegion as keyof typeof regions].vulnerability).map(([type, score]) => (
                  <div key={type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{type} Index</span>
                      <span className={`font-medium`} style={{ color: getVulnerabilityColor(score) }}>
                        {(score * 100).toFixed(0)}% ({getRiskLevel(score)})
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${score * 100}%`,
                          backgroundColor: getVulnerabilityColor(score)
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Data Status</h4>
                <p className="text-xs text-red-700">
                  Current scores are illustrative. Real vulnerability assessment requires: airport data, 
                  tourism arrival statistics by origin/season, and transport mode usage data per wine region.
                </p>
              </div>
            </div>

            {/* Vulnerability Indicators */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Indicateurs Détaillés</h3>
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
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Partenariats Ajustés au Risque</h3>
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
                        <span className="text-gray-500">Risque: </span>
                        <span className={`font-medium`} style={{ color: getVulnerabilityColor(partnership.vulnerability_risk) }}>
                          {(partnership.vulnerability_risk * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Durabilité: </span>
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

        {/* Strategic Recommendations with Data Transparency */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Strategic Framework for Wine Tourism-Transport Convergence</h2>
          <p className="text-lg mb-4">
            This dashboard demonstrates the integration of academic vulnerability assessment (Gallego & Font 2019) 
            with cross-sector partnership analysis for French wine regions.
          </p>
          <div className="bg-white/10 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Data Integration Requirements:</h3>
            <div className="text-sm space-y-1">
              <p>• Tourism arrival statistics by origin country and season (INSEE, regional tourism boards)</p>
              <p>• Transport mode usage data by wine region (SNCF, airports, cycling infrastructure data)</p>
              <p>• Economic indicators: GDP contribution, employment by tourism type</p>
              <p>• Partnership case studies: existing collaborations and success metrics</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Request Full Data Integration Proposal
            </button>
            <button className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-400 transition-colors">
              Vulnerability Assessment Methodology
            </button>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors">
              Regional Partnership Consulting
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Advanced tourism-transport convergence analysis combining business strategy with academic rigor</p>
          <p className="mt-2">Methodology: Gallego & Font (2019) vulnerability framework + cross-sector partnership mapping</p>
        </div>
      </div>
    </div>
  );
};

export default FranceConvergenceDashboard;