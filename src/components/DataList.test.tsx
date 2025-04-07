import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import DataList from './DataList';

const mockItems = [
  { id: 1, title: 'Item 1' },
  { id: 2, title: 'Item 2' },
  { id: 3, title: 'Item 3' },
  { id: 4, title: 'Item 4' },
  { id: 5, title: 'Item 5' },
];

test('주어진 아이템들을 렌더링', () => {
  render(<DataList items={mockItems} onClickPost={() => {}} />);
  // 각 아이템의 title이 화면에 존재하는지 확인 DOM에 있는지 체크
  mockItems.forEach(item => {
    expect(screen.getByText(item.title)).toBeInTheDocument();
  });
});

test('아이템 클릭 시 onClickPost 핸들러 호출', () => {
  const handleClick = jest.fn();
  // onClickPost로 mock 함수(jest.fn())를 전달
  render(<DataList items={mockItems} onClickPost={handleClick} />);
  
  const itemElement = screen.getByText('Item 1');
  // 유저가 클릭한 것처럼 시뮬레이션
  fireEvent.click(itemElement);
  
  expect(handleClick).toHaveBeenCalledWith(1); // id 1번을 전달받았는지 확인
});
