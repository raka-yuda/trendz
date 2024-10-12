import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import App from '../../App';
import { describe, it, expect, vi } from 'vitest';

// Mock the Redux hooks and Provider
vi.mock('react-redux', () => ({
  useSelector: () => ({
    user: { roles: ['ROLE_USER'] },
  }),
  useDispatch: () => () => Promise.resolve([
    { type: 'count_success_topic_scrape', count: '100' },
    { type: 'count_sentiment_scrape', count: '50' },
  ]),
  Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Mock the EventBus module
vi.mock('../common/EventBus', () => ({
  default: {
    on: vi.fn(),
    remove: vi.fn(),
    dispatch: vi.fn(),
  },
}));

// Mock the Loader component
vi.mock('../common/Loader', () => ({
  default: () => 'Loading...',
}));

// Mock the fetchTweetsChartDashboardData action
vi.mock('../actions/tweets', () => ({
  fetchTweetsChartDashboardData: () => Promise.resolve([
    { type: 'count_success_topic_scrape', count: '100' },
    { type: 'count_sentiment_scrape', count: '50' },
  ]),
  fetchTweetsChartSentiment: () => Promise.resolve([
    { type: 'count_success_topic_scrape', count: '100' },
    { type: 'count_sentiment_scrape', count: '50' },
  ]),
  fetchTweetsChartScrapeSentiment: () => Promise.resolve([
    { type: 'count_success_topic_scrape', count: '100' },
    { type: 'count_sentiment_scrape', count: '50' },
  ]),
}));

describe('App Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders Login component when /auth/login route is accessed', async () => {
    render(
      <MemoryRouter initialEntries={['/auth/login']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/login/i, { selector: 'h3' })).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('renders Tweets page when / route is accessed', async () => {
    render(
      <MemoryRouter initialEntries={['/tweets']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("pagename")).toHaveTextContent('Tweets');
    }, { timeout: 2000 });
  });
});