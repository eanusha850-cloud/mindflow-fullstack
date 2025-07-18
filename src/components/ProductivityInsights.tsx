import React from 'react';
import { TrendingUp, Clock, Target, Calendar, BarChart3, Zap } from 'lucide-react';
import Card from './ui/Card';

const ProductivityInsights: React.FC = () => {
  const weeklyStats = [
    { day: 'Mon', tasks: 8, focus: 6.5, mood: 4 },
    { day: 'Tue', tasks: 12, focus: 7.2, mood: 3 },
    { day: 'Wed', tasks: 6, focus: 5.8, mood: 5 },
    { day: 'Thu', tasks: 15, focus: 8.1, mood: 4 },
    { day: 'Fri', tasks: 9, focus: 6.9, mood: 4 },
    { day: 'Sat', tasks: 4, focus: 4.2, mood: 5 },
    { day: 'Sun', tasks: 2, focus: 3.5, mood: 5 },
  ];

  const insights = [
    {
      title: 'Peak Performance Window',
      description: 'Your productivity peaks between 9-11 AM',
      value: '9-11 AM',
      icon: Clock,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Task Completion Rate',
      description: 'This week vs last week',
      value: '87%',
      change: '+12%',
      icon: Target,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Average Focus Duration',
      description: 'Continuous work sessions',
      value: '45 min',
      change: '+8 min',
      icon: Zap,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Most Productive Day',
      description: 'Based on completed tasks',
      value: 'Thursday',
      icon: Calendar,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const patterns = [
    {
      category: 'Morning Routine',
      insight: 'Starting your day with meditation increases focus by 23%',
      recommendation: 'Try extending your morning meditation to 10 minutes'
    },
    {
      category: 'Task Management',
      insight: 'You complete 34% more tasks when you break them into smaller chunks',
      recommendation: 'Break large tasks into 25-minute focused sessions'
    },
    {
      category: 'Energy Management',
      insight: 'Your energy dips significantly after 2 PM',
      recommendation: 'Schedule lighter tasks in the afternoon and take a 15-minute walk'
    },
    {
      category: 'Wellbeing Impact',
      insight: 'Higher mood scores correlate with 18% better task completion',
      recommendation: 'Prioritize activities that boost your mood before work sessions'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productivity Insights</h1>
          <p className="text-gray-600 mt-2">Understand your patterns and optimize your performance</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-800">Productivity Score: 8.4/10</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${insight.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {insight.change && (
                  <span className="text-sm text-green-600 font-medium">{insight.change}</span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{insight.value}</h3>
              <p className="text-sm text-gray-600">{insight.title}</p>
              <p className="text-xs text-gray-500 mt-1">{insight.description}</p>
            </Card>
          );
        })}
      </div>

      {/* Weekly Overview */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Weekly Overview</h2>
        </div>
        
        <div className="space-y-6">
          {/* Tasks Completed Chart */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Tasks Completed</h3>
            <div className="flex items-end gap-4 h-32">
              {weeklyStats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-gray-200 rounded-t-lg relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(stat.tasks / 15) * 100}%`, minHeight: '8px' }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{stat.day}</span>
                  <span className="text-xs font-medium text-gray-900">{stat.tasks}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Hours Chart */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Focus Hours</h3>
            <div className="flex items-end gap-4 h-32">
              {weeklyStats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-gray-200 rounded-t-lg relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(stat.focus / 8) * 100}%`, minHeight: '8px' }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{stat.day}</span>
                  <span className="text-xs font-medium text-gray-900">{stat.focus}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* AI-Powered Patterns */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">AI-Powered Patterns & Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {patterns.map((pattern, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <h3 className="font-semibold text-gray-900">{pattern.category}</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">{pattern.insight}</p>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-800">💡 Recommendation:</p>
                <p className="text-sm text-blue-700">{pattern.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProductivityInsights;