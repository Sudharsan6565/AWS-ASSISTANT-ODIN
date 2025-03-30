import { useEffect, useRef } from 'react';

import { useDashboardStore } from './zustandStore';

const NotificationsPanel = () => {
  const notifications = useDashboardStore((state) => state.systemNotifications);

  const previousLength = useRef<number>(notifications.length);

  useEffect(() => {
    if (notifications.length > previousLength.current) {
      const latest = notifications[0];
      const toast = document.createElement('div');
      toast.textContent = `🔔 ${latest.message}`;
      toast.className =
        'fixed bottom-4 right-4 z-50 bg-black text-white text-sm px-4 py-2 rounded shadow-lg animate-slideIn';
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
      }, 3000);

      previousLength.current = notifications.length;
    }
  }, [notifications]);

  const capped = notifications.slice(0, 3); // 👈 cap to 3 latest

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        System Notifications
      </h2>

      {capped.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          ⚠️ No system notifications yet.
        </p>
      ) : (
        <div className="max-h-64 overflow-y-auto space-y-2">
          {capped.map((note, index) => (
            <div
              key={index}
              className={`border-l-4 p-3 rounded-md ${
                note.type === 'success'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : note.type === 'error'
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
              }`}
            >
              <div className="text-sm text-gray-700 dark:text-gray-100">
                {note.message}
              </div>
              <div className="text-xs text-gray-400 mt-1">{note.timestamp}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;

