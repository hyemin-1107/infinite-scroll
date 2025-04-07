import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Main from './Main';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// IntersectionObserver mock으로 대체
beforeAll(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any;
});

// mock reducer 함수
const mockReducer = combineReducers({
  items: () => [
    { id: 1, title: 'Test Post 1' },
    { id: 2, title: 'Test Post 2' },
  ],
  isLoading: () => false,
  isMoreItems: () => true,
});

// Redux store 구성
const mockStore = configureStore({
  reducer: mockReducer,
});

test('포스트와 타이틀 렌더링', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    // 컴포넌트가 렌더링된 후 요소가 존재하는지
    expect(screen.getByText('Infinite Scroll')).toBeInTheDocument();
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();

});