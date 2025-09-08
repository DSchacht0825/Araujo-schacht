import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, addWeeks, subWeeks } from 'date-fns';
import useStore from '../store/useStore';
import { Task, WeeklyPlan } from '../types';

const WeeklyView: React.FC = () => {
  const currentUser = useStore((state) => state.currentUser);
  const tasks = useStore((state) => state.tasks);
  const weeklyPlans = useStore((state) => state.weeklyPlans);
  const addTask = useStore((state) => state.addTask);
  const toggleTask = useStore((state) => state.toggleTask);
  const deleteTask = useStore((state) => state.deleteTask);
  const addWeeklyPlan = useStore((state) => state.addWeeklyPlan);
  const updateWeeklyPlan = useStore((state) => state.updateWeeklyPlan);

  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [weekFocus, setWeekFocus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [taskOwner, setTaskOwner] = useState<'Yvonne' | 'Daniel' | 'both'>('both');

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = addDays(weekStart, 6);
  const weekNumber = Math.ceil((currentWeek.getDate() - currentWeek.getDay() + 1) / 7);

  // Get current week's plan
  const currentWeekPlan = weeklyPlans.find(
    (plan) => plan.weekNumber === weekNumber && 
    format(new Date(plan.startDate), 'yyyy-MM-dd') === format(weekStart, 'yyyy-MM-dd')
  );

  // Filter tasks for current week
  const weekTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    return taskDate >= weekStart && taskDate <= weekEnd &&
      (task.owner === currentUser || task.owner === 'both');
  });

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      owner: taskOwner,
      dueDate: format(currentWeek, 'yyyy-MM-dd'),
      priority: selectedPriority,
    };

    addTask(newTask);
    setNewTaskTitle('');
  };

  const handleWeekNavigation = (direction: 'prev' | 'next') => {
    setCurrentWeek(direction === 'next' ? addWeeks(currentWeek, 1) : subWeeks(currentWeek, 1));
  };

  const handleSaveFocus = () => {
    if (!currentWeekPlan) {
      const newPlan: WeeklyPlan = {
        id: Date.now().toString(),
        weekNumber,
        startDate: format(weekStart, 'yyyy-MM-dd'),
        endDate: format(weekEnd, 'yyyy-MM-dd'),
        focus: weekFocus,
        wins: [],
        lessons: [],
        tasks: [],
        owner: currentUser || 'both',
      };
      addWeeklyPlan(newPlan);
    } else {
      updateWeeklyPlan(currentWeekPlan.id, { focus: weekFocus });
    }
  };

  useEffect(() => {
    if (currentWeekPlan) {
      setWeekFocus(currentWeekPlan.focus);
    }
  }, [currentWeekPlan]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Week Navigation */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => handleWeekNavigation('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Week {weekNumber}
            </h2>
            <p className="text-gray-600">
              {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
            </p>
          </div>

          <button
            onClick={() => handleWeekNavigation('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Week Focus */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weekly Focus (Achievement Management System™)
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={weekFocus}
              onChange={(e) => setWeekFocus(e.target.value)}
              placeholder="What's your main focus this week?"
              className="input flex-1"
            />
            <button
              onClick={handleSaveFocus}
              className="btn-primary"
            >
              Save Focus
            </button>
          </div>
        </div>
      </div>

      {/* Add Task */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Add Task</h3>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="What needs to be done?"
              className="input flex-1"
            />
            <select
              value={taskOwner}
              onChange={(e) => setTaskOwner(e.target.value as any)}
              className="input w-32"
            >
              <option value="Yvonne">Yvonne</option>
              <option value="Daniel">Daniel</option>
              <option value="both">Both</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as any)}
              className="input w-32"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button
              onClick={handleAddTask}
              className="btn-primary"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Your Tasks */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">
            {currentUser}'s Tasks
          </h3>
          <div className="space-y-2">
            {weekTasks
              .filter(task => task.owner === currentUser)
              .map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>
                      {task.title}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Shared Tasks */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">
            Family Tasks
          </h3>
          <div className="space-y-2">
            {weekTasks
              .filter(task => task.owner === 'both')
              .map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>
                      {task.title}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Tasks Completed</span>
              <span>{weekTasks.filter(t => t.completed).length} / {weekTasks.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${weekTasks.length > 0 ? (weekTasks.filter(t => t.completed).length / weekTasks.length) * 100 : 0}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyView;