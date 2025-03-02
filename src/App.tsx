import './App.css';

import { ErrorState } from './components/error-state/ErrorState';
import { LoadingState } from './components/loading-state/LoadingState';
import { SearchUserForm } from './components/search-user-form/SearchUserForm';
import { UserAccordion } from './components/user-accordion/UserAccordion';
import { useUserSearch } from './hooks/user-search.hook';

const App = () => {
  const { state, searchUsers } = useUserSearch();
  const { users, userName, isLoading, errors } = state;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <SearchUserForm
        isLoading={isLoading}
        usernameError={errors?.userName}
        onSubmit={searchUsers}
      />

      <div className="mt-6">
        {isLoading && <LoadingState message="Searching for users..." />}

        {!isLoading && userName && (
          <>
            {errors?.fetch ? (
              <ErrorState title="Search Error" error={errors.fetch} />
            ) : (
              <>
                <div className="mb-4 text-gray-600">
                  Showing users for {userName}
                </div>

                <div className="space-y-2">
                  {users.length === 0 ? (
                    <p className="text-gray-500">
                      No users found for {userName}
                    </p>
                  ) : (
                    users.map((user) => (
                      <UserAccordion key={user.id} userData={user} />
                    ))
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
