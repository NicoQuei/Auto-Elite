import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '../utils/helpers';

export const AdminLogin = ({ onLogin, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      setError('Credenciais inválidas. Tente admin / admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-scale-up">
        <div className="text-center mb-8">
          <div className="bg-blue-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Área Restrita</h2>
          <p className="text-gray-500 text-sm">Acesso exclusivo para gestores</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Utilizador</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
              placeholder="••••••"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}

          <div className="flex gap-3 mt-6">
            <Button variant="ghost" onClick={onCancel} className="flex-1">Voltar</Button>
            <Button type="submit" className="flex-1">Entrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

