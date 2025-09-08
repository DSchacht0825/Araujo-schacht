import React, { useState, useEffect } from 'react';
import useSupabaseStore from '../store/supabaseStore';
import { YearReview as YearReviewType } from '../types';

const YearReview: React.FC = () => {
  const yearReview = useSupabaseStore((state) => state.yearReview);
  const setYearReview = useSupabaseStore((state) => state.setYearReview);
  const goals = useSupabaseStore((state) => state.goals);
  const tasks = useSupabaseStore((state) => state.tasks);

  const currentYear = new Date().getFullYear();
  
  const [accomplishments, setAccomplishments] = useState<string[]>(['']);
  const [lessonsLearned, setLessonsLearned] = useState<string[]>(['']);
  const [areasOfGrowth, setAreasOfGrowth] = useState<string[]>(['']);
  const [gratefulFor, setGratefulFor] = useState<string[]>(['']);

  useEffect(() => {
    if (yearReview) {
      setAccomplishments(yearReview.accomplishments.length ? yearReview.accomplishments : ['']);
      setLessonsLearned(yearReview.lessonsLearned.length ? yearReview.lessonsLearned : ['']);
      setAreasOfGrowth(yearReview.areasOfGrowth.length ? yearReview.areasOfGrowth : ['']);
      setGratefulFor(yearReview.gratefulFor.length ? yearReview.gratefulFor : ['']);
    }
  }, [yearReview]);

  const handleSave = () => {
    const review: YearReviewType = {
      year: currentYear,
      accomplishments: accomplishments.filter(a => a.trim()),
      lessonsLearned: lessonsLearned.filter(l => l.trim()),
      areasOfGrowth: areasOfGrowth.filter(a => a.trim()),
      gratefulFor: gratefulFor.filter(g => g.trim()),
    };
    setYearReview(review);
  };

  const addField = (field: string) => {
    switch(field) {
      case 'accomplishments':
        setAccomplishments([...accomplishments, '']);
        break;
      case 'lessons':
        setLessonsLearned([...lessonsLearned, '']);
        break;
      case 'growth':
        setAreasOfGrowth([...areasOfGrowth, '']);
        break;
      case 'grateful':
        setGratefulFor([...gratefulFor, '']);
        break;
    }
  };

  const updateField = (field: string, index: number, value: string) => {
    switch(field) {
      case 'accomplishments':
        const newAcc = [...accomplishments];
        newAcc[index] = value;
        setAccomplishments(newAcc);
        break;
      case 'lessons':
        const newLessons = [...lessonsLearned];
        newLessons[index] = value;
        setLessonsLearned(newLessons);
        break;
      case 'growth':
        const newGrowth = [...areasOfGrowth];
        newGrowth[index] = value;
        setAreasOfGrowth(newGrowth);
        break;
      case 'grateful':
        const newGrateful = [...gratefulFor];
        newGrateful[index] = value;
        setGratefulFor(newGrateful);
        break;
    }
  };

  // Calculate statistics
  const completedGoals = goals.filter(g => g.completed).length;
  const totalGoals = goals.length;
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-primary-100 to-secondary-100">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            {currentYear} Year Review
          </h2>
          <p className="text-gray-700 mt-2">Complete the Past • Design Your Future</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">{completedGoals}</div>
          <div className="text-sm text-gray-600">Goals Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-secondary-600">{totalGoals}</div>
          <div className="text-sm text-gray-600">Total Goals</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">{completedTasks}</div>
          <div className="text-sm text-gray-600">Tasks Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-600">
            {totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0}%
          </div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Accomplishments */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">🏆 Major Accomplishments</h3>
          <div className="space-y-2">
            {accomplishments.map((item, index) => (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => updateField('accomplishments', index, e.target.value)}
                placeholder="What did you achieve?"
                className="input"
              />
            ))}
          </div>
          <button
            onClick={() => addField('accomplishments')}
            className="mt-3 text-sm text-primary-600 hover:text-primary-700"
          >
            + Add Another
          </button>
        </div>

        {/* Lessons Learned */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">📚 Lessons Learned</h3>
          <div className="space-y-2">
            {lessonsLearned.map((item, index) => (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => updateField('lessons', index, e.target.value)}
                placeholder="What did you learn?"
                className="input"
              />
            ))}
          </div>
          <button
            onClick={() => addField('lessons')}
            className="mt-3 text-sm text-primary-600 hover:text-primary-700"
          >
            + Add Another
          </button>
        </div>

        {/* Areas of Growth */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">🌱 Areas of Growth</h3>
          <div className="space-y-2">
            {areasOfGrowth.map((item, index) => (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => updateField('growth', index, e.target.value)}
                placeholder="How did you grow?"
                className="input"
              />
            ))}
          </div>
          <button
            onClick={() => addField('growth')}
            className="mt-3 text-sm text-primary-600 hover:text-primary-700"
          >
            + Add Another
          </button>
        </div>

        {/* Grateful For */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">🙏 Grateful For</h3>
          <div className="space-y-2">
            {gratefulFor.map((item, index) => (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => updateField('grateful', index, e.target.value)}
                placeholder="What are you grateful for?"
                className="input"
              />
            ))}
          </div>
          <button
            onClick={() => addField('grateful')}
            className="mt-3 text-sm text-primary-600 hover:text-primary-700"
          >
            + Add Another
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="btn-primary flex items-center px-8 py-3 text-lg"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
          </svg>
          Save Year Review
        </button>
      </div>

      {/* Inspirational Quote */}
      <div className="card bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="text-center">
          <p className="text-lg italic text-gray-700">
            "The best way to predict your future is to create it."
          </p>
          <p className="text-sm text-gray-600 mt-2">- Peter Drucker</p>
        </div>
      </div>
    </div>
  );
};

export default YearReview;