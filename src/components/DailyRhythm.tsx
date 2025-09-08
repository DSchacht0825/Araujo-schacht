import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import useStore from '../store/useStore';
import { DailyRhythm as DailyRhythmType, Habit } from '../types';

const DailyRhythm: React.FC = () => {
  const currentUser = useStore((state) => state.currentUser);
  const dailyRhythms = useStore((state) => state.dailyRhythms);
  const addDailyRhythm = useStore((state) => state.addDailyRhythm);
  const updateDailyRhythm = useStore((state) => state.updateDailyRhythm);

  const today = format(new Date(), 'yyyy-MM-dd');
  
  const defaultHabits: Habit[] = [
    { id: '1', title: 'Morning Meditation', completed: false, streak: 0 },
    { id: '2', title: 'Exercise', completed: false, streak: 0 },
    { id: '3', title: 'Read 30 minutes', completed: false, streak: 0 },
    { id: '4', title: 'Gratitude Journal', completed: false, streak: 0 },
    { id: '5', title: 'Plan Tomorrow', completed: false, streak: 0 },
    { id: '6', title: 'Family Time', completed: false, streak: 0 },
  ];

  const [gratitude, setGratitude] = useState<string[]>(['', '', '']);
  const [priorities, setPriorities] = useState<string[]>(['', '', '']);
  const [notes, setNotes] = useState('');
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);

  // Find today's rhythm
  const todayRhythm = dailyRhythms.find(
    r => r.date === today && r.owner === currentUser
  );

  useEffect(() => {
    if (todayRhythm) {
      setGratitude(todayRhythm.gratitude.length ? todayRhythm.gratitude : ['', '', '']);
      setPriorities(todayRhythm.topPriorities.length ? todayRhythm.topPriorities : ['', '', '']);
      setNotes(todayRhythm.notes);
      setHabits(todayRhythm.habits);
    }
  }, [todayRhythm]);

  const handleSave = () => {
    const rhythmData: DailyRhythmType = {
      id: todayRhythm?.id || Date.now().toString(),
      date: today,
      owner: currentUser!,
      habits,
      gratitude: gratitude.filter(g => g.trim()),
      topPriorities: priorities.filter(p => p.trim()),
      notes,
    };

    if (todayRhythm) {
      updateDailyRhythm(todayRhythm.id, rhythmData);
    } else {
      addDailyRhythm(rhythmData);
    }
  };

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(h => {
      if (h.id === habitId) {
        const completed = !h.completed;
        return {
          ...h,
          completed,
          streak: completed ? h.streak + 1 : Math.max(0, h.streak - 1)
        };
      }
      return h;
    }));
  };

  const completedHabits = habits.filter(h => h.completed).length;
  const habitCompletionRate = (completedHabits / habits.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900">Daily Rhythm Register</h2>
            <p className="text-gray-600 mt-1">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary-600">{completedHabits}/{habits.length}</div>
            <div className="text-sm text-gray-600">Habits Complete</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Daily Habits */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Daily Habits (Compound Effect)</h3>
          <div className="space-y-3">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  habit.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => toggleHabit(habit.id)}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className={habit.completed ? 'line-through text-gray-500' : ''}>
                    {habit.title}
                  </span>
                </div>
                {habit.streak > 0 && (
                  <span className="text-sm font-medium text-orange-600">
                    🔥 {habit.streak}
                  </span>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Daily Progress</span>
              <span>{Math.round(habitCompletionRate)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${habitCompletionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Gratitude */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Gratitude Practice</h3>
          <p className="text-sm text-gray-600 mb-3">What are you grateful for today?</p>
          <div className="space-y-3">
            {gratitude.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-gray-400">{index + 1}.</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newGratitude = [...gratitude];
                    newGratitude[index] = e.target.value;
                    setGratitude(newGratitude);
                  }}
                  placeholder="I'm grateful for..."
                  className="input flex-1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Priorities */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Top 3 Priorities</h3>
          <p className="text-sm text-gray-600 mb-3">What must get done today?</p>
          <div className="space-y-3">
            {priorities.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className={`
                  px-2 py-1 rounded text-xs font-medium
                  ${index === 0 ? 'bg-red-100 text-red-700' : 
                    index === 1 ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-blue-100 text-blue-700'}
                `}>
                  P{index + 1}
                </span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newPriorities = [...priorities];
                    newPriorities[index] = e.target.value;
                    setPriorities(newPriorities);
                  }}
                  placeholder={`Priority ${index + 1}`}
                  className="input flex-1"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Daily Notes */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Daily Reflection</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Thoughts, ideas, lessons learned..."
            className="input w-full"
            rows={7}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="btn-primary flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
          </svg>
          Save Daily Rhythm
        </button>
      </div>

      {/* Quote */}
      <div className="card bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="text-center">
          <p className="text-lg italic text-gray-700">
            "Success is the sum of small efforts repeated day in and day out."
          </p>
          <p className="text-sm text-gray-600 mt-2">- Robert Collier</p>
        </div>
      </div>
    </div>
  );
};

export default DailyRhythm;