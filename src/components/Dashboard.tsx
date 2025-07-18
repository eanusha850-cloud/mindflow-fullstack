import React from 'react';
import { TrendingUp, Calendar, Target, Zap, BookOpen, Smile } from 'lucide-react';
import Card from './ui/Card';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Tasks Completed', value: '24', change: '+12%', icon: Target, color: 'from-blue-500 to-blue-600' },
    { label: 'Wellness Score', value: '8.5', change: '+0.3', icon: Smile, color: 'from-green-500 to-green-600' },
    { label: 'Focus Hours', value: '6.2', change: '+1.1h', icon: Zap, color: 'from-purple-500 to-purple-600' },
    { label: 'Streak Days', value: '14', change: '+2', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
  ];

  const todayTasks = [
    { id: 1, title: 'Review quarterly goals', priority: 'high', completed: false },
    { id: 2, title: 'Team standup meeting', priority: 'medium', completed: true },
    { id: 3, title: 'Complete design mockups', priority: 'high', completed: false },
    { id: 4, title: 'Daily meditation', priority: 'low', completed: true },
  ];

  const aiInsights = [
    {
      title: 'Peak Productivity Hours',
      insight: 'Your focus peaks between 9-11 AM. Schedule important tasks during this window.',
      type: 'productivity'
    },
    {
      title: 'Wellness Recommendation',
      insight: 'Consider a 5-minute breathing exercise to boost your afternoon energy.',
      type: 'wellness'
    },
    {
      title: 'Task Optimization',
      insight: 'Breaking large tasks into smaller chunks could improve completion rates by 23%.',
      type: 'tasks'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good morning!👋</h1>
          <p className="text-gray-600 mt-2">Here's how your day is shaping up</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Tasks */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Today's Tasks</h2>
            <span className="text-sm text-gray-500">4 tasks</span>
          </div>
          <div className="space-y-4">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                }`}>
                  {task.completed && <div className="w-full h-full rounded-full bg-green-500"></div>}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {task.title}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
          </div>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100/50">
                <h3 className="font-medium text-gray-900 mb-2">{insight.title}</h3>
                <p className="text-sm text-gray-600">{insight.insight}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;