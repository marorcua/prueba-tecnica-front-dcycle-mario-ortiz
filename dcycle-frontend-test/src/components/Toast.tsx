import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  onReload?: () => void;
  duration?: number;
}

export const Toast = ({
  message,
  onReload = () => window.location.reload(),
  duration = 5000,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);
  useEffect(() => {
    setIsVisible(true);
  }, [message]);

  if (!isVisible) return null;

  return (
    <div
      data-testid="toast"
      className="fixed right-4 bottom-4 flex items-center justify-between space-x-4 rounded-lg bg-red-500 p-4 text-white shadow-lg"
    >
      <span>{message}</span>
      <button
        onClick={onReload}
        className="ctransition-colors rounded bg-white px-3 py-1 text-red-500 hover:bg-gray-100"
      >
        Reload
      </button>
    </div>
  );
};
