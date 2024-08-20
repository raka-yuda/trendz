// src/__tests__/App.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store'; // adjust the path to your store
import App from '../App';
import { describe, it, expect, vi } from 'vitest';

// Mock the Redux hooks and Provider
vi.mock('react-redux', () => ({
  useSelector: () => ({
    user: { roles: ['ROLE_USER'] }, // Customize the mock return value based on your test case
  }),
  useDispatch: () => vi.fn(),
  Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock the EventBus module correctly
vi.mock('../common/EventBus', () => ({
  default: {
    on: vi.fn(),
    remove: vi.fn(),
    dispatch: vi.fn(),
  },
}));

// Mock the Loader component with default export
vi.mock('../common/Loader', () => ({
  default: () => <div>Loading...</div>,
}));

// Mock the components that are lazily loaded
vi.mock('../layout/DefaultLayout', () => ({
  default: () => <div>Default Layout</div>,
}));

vi.mock('../pages/Authentication/Login', () => ({
  default: () => <div>Login</div>,
}));

describe('App Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders Login component when /auth/login route is accessed', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/auth/login']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Explicitly wait for the same duration as set in your App component
    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});