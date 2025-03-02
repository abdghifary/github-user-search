import { useCallback, useEffect, useId, useState } from 'react';
import { UserSearchResponse } from '../../services/git-api-service';

import { UserAccordionRepoContent } from './UserAccordionRepoContent';

import chevronIcon from '../../assets/icons/chevron.svg';
import { LoadingState } from '../loading-state/LoadingState';
import { ErrorState } from '../error-state/ErrorState';
import { useUserRepositories } from '../../hooks/user-repositories.hook';

interface UserAccordionProps {
  userData: UserSearchResponse['items'][number];
}

export const UserAccordion = ({ userData }: UserAccordionProps) => {
  const uniqueId = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const { repositories, isLoading, error, fetchRepositories } =
    useUserRepositories(userData.login);

  useEffect(() => {
    setHasFetched(false);
  }, [userData.login]);

  const handleToggle = useCallback(
    async (e: React.ToggleEvent<HTMLDetailsElement>) => {
      const isNowOpen = e.currentTarget.open;

      setIsOpen(isNowOpen);

      if (isNowOpen && !hasFetched) {
        await fetchRepositories();

        setHasFetched(true);
      }
    },
    [hasFetched, fetchRepositories],
  );

  return (
    <div className="border border-gray-200 rounded">
      <details onToggle={handleToggle} className="w-full">
        <summary
          className="flex items-center justify-between px-4 py-3 cursor-pointer focus:outline-none"
          aria-controls={`repo-content-${uniqueId}`}
        >
          <span className="font-medium">{userData.login}</span>
          <img
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            src={chevronIcon}
            alt="Toggle"
            aria-hidden="true"
          />
        </summary>

        <div
          id={`repo-content-${uniqueId}`}
          className="px-4 py-3 border-t border-gray-200"
        >
          {isLoading ? (
            <LoadingState message="Loading repositories..." />
          ) : error ? (
            <ErrorState
              title="Error loading repositories"
              error={error}
              onRetry={fetchRepositories}
            />
          ) : repositories.length === 0 ? (
            <p className="py-2 text-gray-500">
              {userData.login} does not have any repositories
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-2">
                Showing {repositories.length} repositories. Click to view on
                GitHub.
              </p>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {repositories.map((repo) => (
                  <UserAccordionRepoContent key={repo.id} repoData={repo} />
                ))}
              </div>
            </>
          )}
        </div>
      </details>
    </div>
  );
};
