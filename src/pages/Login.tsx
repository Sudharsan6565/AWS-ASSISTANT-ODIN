import { useNavigate } from 'react-router-dom';
import { useDashboardStore } from '../zustandStore';
import awsLogo from '../icons/aws.ico';

const LoginPage = () => {
  const login = useDashboardStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();              // ✅ Set auth state
    navigate('/');        // ✅ Redirect to dashboard
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <img src={awsLogo} alt="AWS Logo" className="w-20 mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 dark:text-gray-100">
        Welcome to ODIN AWS Assistant
      </h2>
      <button
        onClick={handleLogin}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
      >
        Enter Dashboard
      </button>
    </div>
  );
};

export default LoginPage;

