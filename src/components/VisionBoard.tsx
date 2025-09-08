import React, { useState } from 'react';
import useSupabaseStore from '../store/supabaseStore';
import { VisionBoard as VisionBoardType } from '../types';

const VisionBoard: React.FC = () => {
  const currentUser = useSupabaseStore((state) => state.currentUser);
  const visionBoards = useSupabaseStore((state) => state.visionBoards);
  const addVisionBoard = useSupabaseStore((state) => state.addVisionBoard);
  const updateVisionBoard = useSupabaseStore((state) => state.updateVisionBoard);

  const [newImage, setNewImage] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [boardTitle, setBoardTitle] = useState('');
  const [showAddBoard, setShowAddBoard] = useState(false);

  const userBoards = visionBoards.filter(
    b => b.owner === currentUser || b.owner === 'both'
  );

  const handleCreateBoard = () => {
    if (!boardTitle) return;

    const newBoard: VisionBoardType = {
      id: Date.now().toString(),
      owner: currentUser || 'both',
      title: boardTitle,
      images: [],
      quotes: [],
      createdAt: new Date().toISOString(),
    };

    addVisionBoard(newBoard);
    setBoardTitle('');
    setShowAddBoard(false);
  };

  const handleAddImage = (boardId: string) => {
    if (!newImage) return;
    const board = visionBoards.find(b => b.id === boardId);
    if (board) {
      updateVisionBoard(boardId, {
        images: [...board.images, newImage]
      });
      setNewImage('');
    }
  };

  const handleAddQuote = (boardId: string) => {
    if (!newQuote) return;
    const board = visionBoards.find(b => b.id === boardId);
    if (board) {
      updateVisionBoard(boardId, {
        quotes: [...board.quotes, newQuote]
      });
      setNewQuote('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900">Vision Board</h2>
          <p className="text-gray-600 mt-1">Visualize your dreams and aspirations</p>
        </div>
        <button
          onClick={() => setShowAddBoard(true)}
          className="btn-primary flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Board
        </button>
      </div>

      {/* Add Board Modal */}
      {showAddBoard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Create Vision Board</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Board Title
                </label>
                <input
                  type="text"
                  value={boardTitle}
                  onChange={(e) => setBoardTitle(e.target.value)}
                  className="input"
                  placeholder="My 2024 Vision"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddBoard(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBoard}
                className="btn-primary"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vision Boards */}
      {userBoards.length === 0 ? (
        <div className="card text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Vision Boards Yet</h3>
          <p className="text-gray-600">Create your first vision board to visualize your goals!</p>
        </div>
      ) : (
        userBoards.map((board) => (
          <div key={board.id} className="card">
            <h3 className="text-xl font-semibold mb-4">{board.title}</h3>
            
            {/* Quotes Section */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Inspirational Quotes</h4>
              <div className="space-y-2 mb-3">
                {board.quotes.map((quote, index) => (
                  <div key={index} className="bg-gradient-to-r from-primary-50 to-secondary-50 p-3 rounded-lg">
                    <p className="italic text-gray-700">"{quote}"</p>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newQuote}
                  onChange={(e) => setNewQuote(e.target.value)}
                  placeholder="Add an inspiring quote..."
                  className="input flex-1"
                />
                <button
                  onClick={() => handleAddQuote(board.id)}
                  className="btn-secondary"
                >
                  Add Quote
                </button>
              </div>
            </div>

            {/* Images Section */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Vision Images</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                {board.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Vision ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/200?text=Vision+${index + 1}`;
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Add image URL..."
                  className="input flex-1"
                />
                <button
                  onClick={() => handleAddImage(board.id)}
                  className="btn-secondary"
                >
                  Add Image
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Motivation Section */}
      <div className="card bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-3">Visualization Tips</h3>
          <ul className="text-left max-w-2xl mx-auto space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">✨</span>
              <span>Look at your vision board daily, especially in the morning</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🎯</span>
              <span>Choose images that evoke strong positive emotions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">💭</span>
              <span>Visualize yourself already achieving these goals</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">📝</span>
              <span>Update your board as your vision evolves</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VisionBoard;