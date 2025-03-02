import ErrorIcon from '../../assets/icons/error.svg';

interface ErrorStateProps {
  error: string;
  title?: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorState = ({
  error,
  title = 'Error',
  onRetry,
  retryText = 'Try Again',
}: ErrorStateProps) => (
  <div className="py-4 text-center">
    <div className="text-red-500 mb-2">
      <img className="w-6 h-6 mx-auto" src={ErrorIcon} />
      <p className="mt-1 text-sm">{title}</p>
    </div>

    <p className="text-sm text-gray-600 mb-3">{error}</p>

    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
      >
        {retryText}
      </button>
    )}
  </div>
);
