import { render, screen, fireEvent } from '@testing-library/react';
import { SearchUserForm } from './SearchUserForm';

describe('SearchUserForm', () => {
  it('renders the search form correctly', () => {
    render(
      <SearchUserForm
        isLoading={false}
        usernameError={undefined}
        onSubmit={() => {}}
      />,
    );

    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('shows error message when usernameError is provided', () => {
    const errorMessage = 'Username is required';

    render(
      <SearchUserForm
        isLoading={false}
        usernameError={errorMessage}
        onSubmit={() => {}}
      />,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('disables input and button when isLoading is true', () => {
    render(
      <SearchUserForm
        isLoading={true}
        usernameError={undefined}
        onSubmit={() => {}}
      />,
    );

    expect(screen.getByPlaceholderText(/enter username/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /searching/i })).toBeDisabled();
  });

  it('calls onSubmit with form data when form is submitted', () => {
    const handleSubmit = vi.fn();

    render(
      <SearchUserForm
        isLoading={false}
        usernameError={undefined}
        onSubmit={handleSubmit}
      />,
    );

    const input = screen.getByPlaceholderText(/enter username/i);
    fireEvent.change(input, { target: { value: 'testuser' } });

    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
