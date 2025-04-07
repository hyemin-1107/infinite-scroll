import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import DetailPage from './DetailPage';
import { configureStore } from '@reduxjs/toolkit';
import postReducer, { Post } from '../redux/reducers/postReducer';

test('DetailPage 렌더링 및 데이터 표시', async () => {
  //mock 데이터
  const mockPost: Post = { id: 1, title: '테스트 제목', body: '테스트 내용' };

  // 전역 fetch 모킹
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(mockPost) })
  ) as jest.Mock;

  const store = configureStore({
    reducer: {
      post: postReducer,
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/posts/1']}>
        <DetailPage />
      </MemoryRouter>
    </Provider>
  );

  // 렌더된 화면에서 특정 텍스트 요소 찾기
  await waitFor(() => {
    expect(screen.getByText(/테스트 제목/)).toBeInTheDocument();
    expect(screen.getByText(/테스트 내용/)).toBeInTheDocument();
  });
});
