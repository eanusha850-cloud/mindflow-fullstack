import React, { useState } from 'react';
import { Plus, Filter, Search, Calendar, Clock, Flag } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  category: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Review quarterly goals',
      description: 'Analyze Q3 performance and set Q4 objectives',
      priority: 'high',
      dueDate: '2024-01-15',
      completed: false,
      category: 'Work'
    },
    {
      id: 2,
      title: 'Team standup meeting',
      description: 'Daily sync with the development team',
      priority: 'medium',
      dueDate: '2024-01-10',
      completed: true,
      category: 'Work'
    },
    {
      id: 3,
      title: 'Complete design mockups',
      description: 'Finalize UI designs for the new dashboard',
      priority: 'high',
      dueDate: '2024-01-12',
      completed: false,
      category: 'Design'
    },
    {
      id: 4,
      title: 'Daily meditation',
      description: '15 minutes of mindfulness practice',
      priority: 'low',
      dueDate: '2024-01-10',
      completed: true,
      category: 'Personal'
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
      (filter === 'pending' && !task.completed) || 
      (filter === 'completed' && task.completed);
    
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <p className="text-gray-600 mt-2">Organize and track your tasks efficiently</p>
        </div>
        <Button 
          onClick={() => setShowAddTask(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'pending', label: 'Pending' },
              { key: 'completed', label: 'Completed' }
            ].map((filterOption) => (
              <Button
                key={filterOption.key}
                variant={filter === filterOption.key ? 'primary' : 'secondary'}
                onClick={() => setFilter(filterOption.key as any)}
              >
                <Filter className="w-4 h-4 mr-2" />
                {filterOption.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <button
                onClick={() => toggleTask(task.id)}
                className={`mt-1 w-5 h-5 rounded-full border-2 transition-all ${
                  task.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300 hover:border-green-400'
                }`}
              >
                {task.completed && (
                  <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`text-lg font-semibold ${
                    task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}>
                    {task.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                
                <p className={`text-sm mb-3 ${
                  task.completed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flag className="w-4 h-4" />
                    <span>{task.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600">Try adjusting your filters or add a new task to get started.</p>
        </Card>
      )}
    </div>
  );
};

export default TaskManager;