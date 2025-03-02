import { Octokit } from 'octokit';
import { Endpoints, RequestParameters } from '@octokit/types';

type SearchUserRequestParameters = {
  q: string;
  sort?: 'followers' | 'repositories' | 'joined';
  order?: 'desc' | 'asc';
  per_page?: number;
  page?: number;
} & RequestParameters;

export type UserSearchResponse =
  Endpoints['GET /search/users']['response']['data'];
export type UserRepository =
  Endpoints['GET /users/{username}/repos']['response']['data'][0];
export type Repositories = UserRepository[];

export const useGitApiService = () => {
  const octokit = new Octokit({
    auth: import.meta.env.PUBLIC_GIT_TOKEN || process.env.PUBLIC_GIT_TOKEN,
  });

  const searchUser = async (
    data: SearchUserRequestParameters,
  ): Promise<UserSearchResponse> => {
    try {
      const response = await octokit.request('GET /search/users', {
        q: data.q,
        sort: data.sort,
        order: data.order,
        per_page: data.per_page,
        page: data.page,
      });

      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  };

  const searchUserRepositories = async (
    username: string,
  ): Promise<Repositories> => {
    try {
      const response = await octokit.request('GET /users/{username}/repos', {
        username,
      });

      return response.data;
    } catch (error) {
      console.error('Error searching user repositories:', error);
      throw error;
    }
  };

  return {
    searchUser,
    searchUserRepositories,
  };
};
