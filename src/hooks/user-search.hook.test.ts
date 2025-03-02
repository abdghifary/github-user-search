import { renderHook, act } from '@testing-library/react';
import { vi, expect, describe, it, beforeEach } from 'vitest'; // Import from vitest
import { useUserSearch } from './user-search.hook';
import { useGitApiService } from '../services/git-api-service';

vi.mock('../services/git-api-service', () => ({
  useGitApiService: vi.fn(() => ({
    searchUser: vi.fn(),
    searchUserRepositories: vi.fn(),
  })),
}));

describe('useUserSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useUserSearch());

    expect(result.current.state).toEqual({
      isLoading: false,
      users: [],
      userName: '',
      errors: undefined,
    });
  });

  it('should set loading state when searching users', async () => {
    const mockSearchUser = vi.fn().mockResolvedValue({
      items: [],
      total_count: 0,
    });

    (useGitApiService as ReturnType<typeof vi.fn>).mockReturnValue({
      searchUser: mockSearchUser,
      searchUserRepositories: vi.fn(),
    });

    const { result } = renderHook(() => useUserSearch());

    const formData = new FormData();
    formData.append('userName', 'testuser');

    await act(async () => {
      await result.current.searchUsers(formData);
    });

    expect(mockSearchUser).toHaveBeenCalledWith({
      q: 'testuser',
      per_page: 5,
    });
  });
});
