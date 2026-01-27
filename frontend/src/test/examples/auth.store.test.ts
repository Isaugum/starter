import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '@store/auth.store';

describe('useAuthStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
    });
  });

  it('has correct initial state', () => {
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('logs in user correctly', () => {
    const testUser = { username: 'testuser', email: 'test@example.com' };

    useAuthStore.getState().login(testUser);
    const state = useAuthStore.getState();

    expect(state.user).toEqual(testUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('logs out user correctly', () => {
    // First login
    useAuthStore.getState().login({ username: 'testuser', email: 'test@example.com' });

    // Then logout
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('can update user after login', () => {
    useAuthStore.getState().login({ username: 'user1', email: 'user1@example.com' });
    useAuthStore.getState().login({ username: 'user2', email: 'user2@example.com' });

    const state = useAuthStore.getState();

    expect(state.user?.username).toBe('user2');
    expect(state.isAuthenticated).toBe(true);
  });
});
