import awsLogo from './icons/aws.ico';
import ThemeToggleButton from './ThemeToggleButton';

const AppHeader = () => {
  return (
    <header className="w-full px-6 py-0 flex items-center justify-between bg-white dark:bg-gray-900 border-b">
      {/* AWS Icon (Left) */}
      <img src={awsLogo} alt="AWS Logo" className="w-8 h-8" />

      {/* Center Title */}
      <div className="text-center">
        <h1 className="text-yellow-500 font-bold text-2xl tracking-wide">ODIN</h1>
        <p className="text-xs text-black dark:text-white tracking-widest">
          OBSERVE·DECIDE·IMPROVE·NAVIGATE
        </p>
      </div>

      {/* Theme Toggle (Right) */}
      <ThemeToggleButton />
    </header>
  );
};

export default AppHeader;

