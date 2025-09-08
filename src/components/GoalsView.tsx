import React, { useState } from 'react';
import useStore from '../store/useStore';
import { Goal, Milestone } from '../types';
import { format } from 'date-fns';

const GoalsView: React.FC = () => {
  const currentUser = useStore((state) => state.currentUser);
  const goals = useStore((state) => state.goals);
  const addGoal = useStore((state) => state.addGoal);
  const updateGoal = useStore((state) => state.updateGoal);
  const deleteGoal = useStore((state) => state.deleteGoal);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'personal' as Goal['category'],
    targetDate: '',
    owner: currentUser || 'both' as Goal['owner'],
  });

  const categories = [
    { value: 'personal', label: 'Personal', color: 'bg-purple-100 text-purple-800' },
    { value: 'family', label: 'Family', color: 'bg-blue-100 text-blue-800' },
    { value: 'career', label: 'Career', color: 'bg-green-100 text-green-800' },
    { value: 'health', label: 'Health', color: 'bg-red-100 text-red-800' },
    { value: 'financial', label: 'Financial', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'spiritual', label: 'Spiritual', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'relationship', label: 'Relationship', color: 'bg-pink-100 text-pink-800' },
  ];

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetDate) return;

    const goal: Goal = {
      id: Date.now().toString(),
      ...newGoal,
      completed: false,
      progress: 0,
      milestones: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addGoal(goal);
    setNewGoal({
      title: '',
      description: '',
      category: 'personal',
      targetDate: '',
      owner: currentUser || 'both',
    });
    setShowAddGoal(false);
  };

  const getCategoryStyle = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : 'bg-gray-100 text-gray-800';
  };

  const userGoals = goals.filter(g => g.owner === currentUser || g.owner === 'both');
  const personalGoals = userGoals.filter(g => g.owner === currentUser);
  const familyGoals = userGoals.filter(g => g.owner === 'both');

  return (
    <div className="space-y-6">
      {/* Header with Add Goal Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Goals Dashboard</h2>
          <p className="text-gray-600 mt-1">Design your future with the 5-Step Achievement System</p>
        </div>
        <button
          onClick={() => setShowAddGoal(true)}
          className="btn-primary flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Goal
        </button>
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Create New Goal</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="input"
                  placeholder="What do you want to achieve?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="input"
                  rows={3}
                  placeholder="Why is this important? How will you achieve it?"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as Goal['category'] })}
                    className="input"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner
                  </label>
                  <select
                    value={newGoal.owner}
                    onChange={(e) => setNewGoal({ ...newGoal, owner: e.target.value as Goal['owner'] })}
                    className="input"
                  >
                    <option value="Yvonne">Yvonne</option>
                    <option value="Daniel">Daniel</option>
                    <option value="both">Family Goal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                  className="input"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddGoal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                className="btn-primary"
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goals Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Goals */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{currentUser}'s Personal Goals</h3>
          <div className="space-y-4">
            {personalGoals.length === 0 ? (
              <div className="card text-center py-8 text-gray-500">
                No personal goals yet. Create your first goal!
              </div>
            ) : (
              personalGoals.map((goal) => (
                <div key={goal.id} className="card hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-lg">{goal.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryStyle(goal.category)}`}>
                      {goal.category}
                    </span>
                  </div>
                  
                  {goal.description && (
                    <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Target: {format(new Date(goal.targetDate), 'MMM d, yyyy')}</span>
                      {goal.completed && (
                        <span className="text-green-600 font-medium">✓ Completed</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end mt-4 space-x-2">
                    <button
                      onClick={() => {
                        const newProgress = Math.min(100, goal.progress + 10);
                        updateGoal(goal.id, { 
                          progress: newProgress,
                          completed: newProgress === 100 
                        });
                      }}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      +10%
                    </button>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Family Goals */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Family Goals</h3>
          <div className="space-y-4">
            {familyGoals.length === 0 ? (
              <div className="card text-center py-8 text-gray-500">
                No family goals yet. Create goals together!
              </div>
            ) : (
              familyGoals.map((goal) => (
                <div key={goal.id} className="card hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-lg">{goal.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryStyle(goal.category)}`}>
                      {goal.category}
                    </span>
                  </div>
                  
                  {goal.description && (
                    <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-secondary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Target: {format(new Date(goal.targetDate), 'MMM d, yyyy')}</span>
                      {goal.completed && (
                        <span className="text-green-600 font-medium">✓ Completed</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end mt-4 space-x-2">
                    <button
                      onClick={() => {
                        const newProgress = Math.min(100, goal.progress + 10);
                        updateGoal(goal.id, { 
                          progress: newProgress,
                          completed: newProgress === 100 
                        });
                      }}
                      className="text-sm text-secondary-600 hover:text-secondary-700"
                    >
                      +10%
                    </button>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Goal Statistics */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Goal Statistics</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600">{userGoals.length}</div>
            <div className="text-sm text-gray-600">Total Goals</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">
              {userGoals.filter(g => g.completed).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-600">
              {userGoals.filter(g => !g.completed).length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsView;