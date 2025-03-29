import { useDashboardStore } from './zustandStore';

const DevicePanel = () => {
  const devices = useDashboardStore((state) => state.data?.devices || []);

  if (devices.length === 0) {
    return <p className="text-sm text-gray-500">No registered devices found.</p>;
  }

  return (
    <ul className="space-y-2 text-sm">
      {devices.map((device, index) => (
        <li key={index}>
          📱 <strong>{device.deviceId}</strong>
          <br />
          <span className="text-xs text-gray-500">Token: {device.fcmToken.slice(0, 12)}...</span>
          <br />
          <span className="text-xs text-gray-400">Registered: {new Date(device.createdAt).toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
};

export default DevicePanel;

