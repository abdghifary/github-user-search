import loadingIcon from '../../assets/icons/loading.svg';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => (
  <div className="py-4 text-center text-gray-500">
    <img
      className="w-6 h-6 mx-auto animate-spin"
      src={loadingIcon}
      alt="Loading"
    />
    <span className="mt-2 block">{message}</span>
  </div>
);
