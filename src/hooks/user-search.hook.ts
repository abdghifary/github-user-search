import { useCallback, useState } from 'react';
import {
  useGitApiService,
  UserSearchResponse,
} from '../services/git-api-service';

export interface UserSearchState {
  users: UserSearchResponse['items'];
  userName: string;
  isLoading: boolean;
  errors?: {
    userName?: string;
    fetch?: string;
  };
}

const INITIAL_STATE: UserSearchState = {
  users: [],
  userName: '',
  isLoading: false,
};

export function useUserSearch() {
  const [state, setState] = useState<UserSearchState>(INITIAL_STATE);
  const { searchUser } = useGitApiService();

  const searchUsers = useCallback(
    async (formData: FormData) => {
      const userName = formData.get('userName') as string;

      if (!userName || !userName.trim()) {
        setState((prev) => ({
          ...prev,
          errors: { userName: 'Username cannot be empty' },
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        isLoading: true,
        errors: undefined,
      }));

      try {
        const response = await searchUser({ q: userName, per_page: 5 });

        setState({
          users: response.items,
          userName,
          isLoading: false,
          errors: undefined,
        });
      } catch (error) {
        console.error('Error searching users:', error);

        setState({
          users: [],
          userName,
          isLoading: false,
          errors: {
            fetch:
              error instanceof Error
                ? error.message
                : 'An error occurred while searching for users',
          },
        });
      }
    },
    [searchUser],
  );

  const retry = useCallback(() => {
    if (!state.userName) return;

    const formData = new FormData();

    formData.append('userName', state.userName);

    searchUsers(formData);
  }, [state.userName, searchUsers]);

  return {
    state,
    searchUsers,
    retry,
  };
}
