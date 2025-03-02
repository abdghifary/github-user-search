import { useCallback, useEffect, useRef, useState } from 'react';
import { Repositories, useGitApiService } from '../services/git-api-service';

interface UserRepositoriesState {
  repositories: Repositories;
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: UserRepositoriesState = {
  repositories: [],
  isLoading: false,
  error: null,
};

export function useUserRepositories(username: string) {
  const [state, setState] = useState<UserRepositoriesState>(INITIAL_STATE);

  const { searchUserRepositories } = useGitApiService();

  const isMounted = useRef(true);

  const reset = useCallback(() => {
    setState({
      repositories: [],
      isLoading: false,
      error: null,
    });
  }, []);

  const fetchRepositories = useCallback(async () => {
    if (state.isLoading) return;

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const repositories = await searchUserRepositories(username);

      if (isMounted.current) {
        setState({
          repositories,
          isLoading: false,
          error: null,
        });
      }
    } catch (err) {
      console.error(`Error fetching repositories for ${username}:`, err);

      if (isMounted.current) {
        setState({
          repositories: [],
          isLoading: false,
          error:
            err instanceof Error
              ? err.message
              : 'Failed to load repositories. Please try again.',
        });
      }
    }
  }, [username, searchUserRepositories, state.isLoading]);

  useEffect(() => {
    reset();

    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, [username, reset]);

  return {
    ...state,
    fetchRepositories,
  };
}
