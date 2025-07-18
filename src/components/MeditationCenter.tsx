import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Brain, Wind, Timer } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

const MeditationCenter: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(300); // 5 minutes
  const [sessionType, setSessionType] = useState<'breathing' | 'meditation' | 'focus'>('breathing');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < selectedDuration) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    } else if (currentTime >= selectedDuration) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, selectedDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const sessions = [
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      description: 'Calm your mind with focused breathing',
      icon: Wind,
      duration: '5-20 min',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'meditation',
      title: 'Mindfulness Meditation',
      description: 'Develop awareness and presence',
      icon: Brain,
      duration: '10-30 min',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'focus',
      title: 'Focus Session',
      description: 'Enhance concentration and clarity',
      icon: Timer,
      duration: '15-45 min',
      color: 'from-green-500 to-green-600'
    }
  ];

  const durations = [
    { value: 300, label: '5 min' },
    { value: 600, label: '10 min' },
    { value: 900, label: '15 min' },
    { value: 1200, label: '20 min' },
    { value: 1800, label: '30 min' }
  ];

  const recentSessions = [
    { date: '2024-01-10', type: 'Breathing', duration: 300, completed: true },
    { date: '2024-01-09', type: 'Meditation', duration: 600, completed: true },
    { date: '2024-01-08', type: 'Focus', duration: 900, completed: false },
    { date: '2024-01-07', type: 'Breathing', duration: 300, completed: true },
  ];

  const progress = (currentTime / selectedDuration) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meditation Center</h1>
          <p className="text-gray-600 mt-2">Find your inner peace and boost your focus</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
          <Brain className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-800">14 Day Streak</span>
        </div>
      </div>

      {/* Session Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sessions.map((session) => {
          const Icon = session.icon;
          const isSelected = sessionType === session.id;
          return (
            <Card 
              key={session.id} 
              className={`p-6 cursor-pointer transition-all ${
                isSelected 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSessionType(session.id as any)}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${session.color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{session.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{session.description}</p>
              <span className="text-xs text-gray-500">{session.duration}</span>
            </Card>
          );
        })}
      </div>

      {/* Main Session Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-8 text-center">
            <div className="max-w-md mx-auto">
              {/* Timer Circle */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                    className="transition-all duration-300"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {formatTime(selectedDuration - currentTime)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatTime(currentTime)} / {formatTime(selectedDuration)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Duration Selection */}
              <div className="flex justify-center gap-2 mb-6">
                {durations.map((duration) => (
                  <Button
                    key={duration.value}
                    variant={selectedDuration === duration.value ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setSelectedDuration(duration.value)}
                    disabled={isPlaying}
                  >
                    {duration.label}
                  </Button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                <Button
                  onClick={togglePlayPause}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span className="ml-2">{isPlaying ? 'Pause' : 'Start'}</span>
                </Button>
                <Button
                  onClick={resetSession}
                  variant="secondary"
                  className="px-6 py-3"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>

              {/* Session Instructions */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <h3 className="font-medium text-gray-900 mb-2">
                  {sessionType === 'breathing' && 'Breathing Exercise'}
                  {sessionType === 'meditation' && 'Mindfulness Meditation'}
                  {sessionType === 'focus' && 'Focus Session'}
                </h3>
                <p className="text-sm text-gray-600">
                  {sessionType === 'breathing' && 'Breathe in for 4 counts, hold for 4, exhale for 6. Focus on your breath.'}
                  {sessionType === 'meditation' && 'Sit comfortably, close your eyes, and observe your thoughts without judgment.'}
                  {sessionType === 'focus' && 'Concentrate on a single point of focus. When your mind wanders, gently return.'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Sessions */}
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Sessions</h2>
            <div className="space-y-4">
              {recentSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{session.type}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(session.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700">{formatTime(session.duration)}</p>
                    <div className={`text-xs ${session.completed ? 'text-green-600' : 'text-gray-400'}`}>
                      {session.completed ? '✓ Completed' : '○ Incomplete'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">This Week</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Sessions</span>
                <span className="text-sm font-medium text-gray-900">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Time</span>
                <span className="text-sm font-medium text-gray-900">3h 45m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Streak</span>
                <span className="text-sm font-medium text-gray-900">14 days</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MeditationCenter;