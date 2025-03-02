import { FormEvent } from 'react';

interface SearchFormProps {
  isLoading: boolean;
  usernameError?: string;
  onSubmit: (formData: FormData) => void;
}

export const SearchUserForm = ({
  isLoading,
  usernameError,
  onSubmit,
}: SearchFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <input
          className={`w-full px-4 py-2 border ${
            usernameError ? 'border-red-500' : 'border-gray-300'
          } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:opacity-75 disabled:cursor-not-allowed`}
          type="text"
          name="userName"
          placeholder="Enter username"
          required
          disabled={isLoading}
          aria-describedby={usernameError ? 'username-error' : undefined}
        />

        {usernameError && (
          <p id="username-error" className="text-red-500 text-sm">
            {usernameError}
          </p>
        )}
      </div>

      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors mt-4 disabled:opacity-60 disabled:bg-blue-400 disabled:cursor-not-allowed"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};
