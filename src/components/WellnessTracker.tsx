import React, { useState } from 'react';
import { Heart, Smile, Zap, Moon, Droplet, Activity } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

const WellnessTracker: React.FC = () => {
  const [mood, setMood] = useState<number>(4);
  const [energy, setEnergy] = useState<number>(3);
  const [stress, setStress] = useState<number>(2);
  const [sleep, setSleep] = useState<number>(4);

  const moodEmojis = ['😢', '😕', '😐', '😊', '😄'];
  const energyLevels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
  const stressLevels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
  const sleepQuality = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  const wellnessMetrics = [
    { 
      label: 'Mood Score', 
      value: '8.2', 
      change: '+0.3', 
      icon: Smile, 
      color: 'from-yellow-400 to-orange-500',
      trend: 'up'
    },
    { 
      label: 'Energy Level', 
      value: '7.5', 
      change: '+0.8', 
      icon: Zap, 
      color: 'from-blue-400 to-blue-600',
      trend: 'up'
    },
    { 
      label: 'Stress Level', 
      value: '3.2', 
      change: '-0.5', 
      icon: Activity, 
      color: 'from-red-400 to-red-600',
      trend: 'down'
    },
    { 
      label: 'Sleep Quality', 
      value: '8.9', 
      change: '+0.2', 
      icon: Moon, 
      color: 'from-purple-400 to-purple-600',
      trend: 'up'
    }
  ];

  const recentEntries = [
    { date: '2024-01-10', mood: 4, energy: 3, stress: 2, sleep: 4 },
    { date: '2024-01-09', mood: 3, energy: 4, stress: 3, sleep: 3 },
    { date: '2024-01-08', mood: 5, energy: 4, stress: 1, sleep: 5 },
    { date: '2024-01-07', mood: 3, energy: 2, stress: 4, sleep: 3 },
  ];

  const handleSubmit = () => {
    // Here you would typically save the data
    console.log('Wellness data:', { mood, energy, stress, sleep });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wellness Tracker</h1>
          <p className="text-gray-600 mt-2">Monitor your wellbeing and mental health</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200/50">
          <Heart className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-800">Wellness Score: 8.2/10</span>
        </div>
      </div>

      {/* Wellness Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wellnessMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Daily Check-in */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Daily Check-in</h2>
            
            <div className="space-y-8">
              {/* Mood */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How's your mood today?
                </label>
                <div className="flex items-center gap-4">
                  {moodEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => setMood(index)}
                      className={`w-12 h-12 rounded-full text-2xl transition-all ${
                        mood === index 
                          ? 'bg-yellow-100 ring-2 ring-yellow-400 scale-110' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Current: {moodEmojis[mood]} ({mood + 1}/5)
                </p>
              </div>

              {/* Energy */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Energy Level
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={energy}
                    onChange={(e) => setEnergy(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700 w-20">
                    {energyLevels[energy]}
                  </span>
                </div>
              </div>

              {/* Stress */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Stress Level
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={stress}
                    onChange={(e) => setStress(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700 w-20">
                    {stressLevels[stress]}
                  </span>
                </div>
              </div>

              {/* Sleep */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sleep Quality
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={sleep}
                    onChange={(e) => setSleep(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700 w-20">
                    {sleepQuality[sleep]}
                  </span>
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              >
                Save Check-in
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Entries */}
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Entries</h2>
            <div className="space-y-4">
              {recentEntries.map((entry, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="text-2xl">{moodEmojis[entry.mood]}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <Zap className="w-3 h-3 mx-auto mb-1 text-blue-500" />
                      <span className="text-gray-600">{entry.energy + 1}/5</span>
                    </div>
                    <div className="text-center">
                      <Activity className="w-3 h-3 mx-auto mb-1 text-red-500" />
                      <span className="text-gray-600">{entry.stress + 1}/5</span>
                    </div>
                    <div className="text-center">
                      <Moon className="w-3 h-3 mx-auto mb-1 text-purple-500" />
                      <span className="text-gray-600">{entry.sleep + 1}/5</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WellnessTracker;