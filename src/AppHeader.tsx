
import awsLogo from './icons/aws.ico';
import ThemeToggleButton from './ThemeToggleButton';

const AppHeader = () => {
  return (
    <header className="w-full bg-white dark:bg-gray-900 px-5 py-0 shadow-md rounded-b-lg flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
      {/* Left: AWS Icon */}
      <img
        src={awsLogo}
        alt="AWS Logo"
        className="w-10 h-10 object-contain rounded-full border border-gray-300 dark:border-gray-700"
      />

      {/* Center: ODIN Header */}
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-yellow-500 tracking-wider">ODIN</h1>
        <p className="text-xs sm:text-sm font-medium tracking-wide text-gray-600 dark:text-gray-300">
          OBSERVE • DECIDE • IMPROVE • NAVIGATE
        </p>
      </div>

      {/* Right: Theme Toggle */}
      <ThemeToggleButton />
    </header>
  );
};

export default AppHeader;
