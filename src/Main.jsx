import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DetailModal from './components/DetailModal';
import DataList from './components/DataList';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]); // 데이터 목록
  const [moreItems, setMoreItems] = useState(true); // 데이터 끝 확인
  const [loading, setLoading] = useState(false); // 로딩 스피너
  const [index, setIndex] = useState(null); // 선택 게시글
  const [isModal, setIsModal] = useState(false); //모달 관리

  const pageRef = useRef(1); // 현재 페이지 추적(리렌더링 방지)
  const loader = useRef(null); // 스크롤 로더 감지 참조

  const onClickModal = (index) => {
    setIndex(index);
    setIsModal(true);
  };

  const onClickCloseModal = () => setIsModal(false);

  const fetchData = async () => {
    setLoading(true) // 스피너
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageRef.current}`);
    const newData = await res.json();

    if (newData.length === 0) {
      setMoreItems(false);
    } // 데이터 다 보여줬으면 스피너 종료

    setItems((prev) => [...prev, ...newData]); // 기존 데이터에 추가
    pageRef.current += 1; // 페이지 증가
    setLoading(false);
  };

  // Intersection Observer 사용해 스크롤 감지, 특정요소가 뷰포트에 얼마나 보이는지를 감지함
  // 화면에 loader가 보이면 fetch data 실행해서 새로운 데이터 보여줌
  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => { // 감시중인 요소들의 배열
        if (entry.isIntersecting && !loading) {
          fetchData();
        } // 관찰 대상이 화면에 보이고 로딩상태가 아니라면 데이터 보여줌
      },
      { threshold: 1.0 } // 해당요소 100% 보여야 동작
    );

    observer.observe(loader.current);
    // useRef는 .current를 통해 접근해야 DOM 요소를 얻을 수 있음

    return () => {
      observer.disconnect();
    }; // 클린업 함수
  }, [loading]);


  return (

    <MainWrap>

      <h1>Infinite Scroll</h1>

      <DataList items={items} onClickModal={onClickModal} />

      {loading && moreItems &&(
        <LoadingSpinner>
          <div></div>
        </LoadingSpinner>
      )}

      {isModal && (
        <DetailModal
          data={items}
          index={index}
          isModal={isModal}
          onClickCloseModal={onClickCloseModal}
        />
      )}

      <div ref={loader} />

    </MainWrap>

  );
};

export default InfiniteScroll;

const MainWrap = styled.div`
  width: 1620px;
  margin: 0 auto;

  h1{
    margin: 130px 0;
    text-align: center;
  }
`;

const LoadingSpinner = styled.div`
  position: fixed;
  left: 50%;
  bottom: 30px;

  transform: translateX(-50%);

  div {
    margin: 0 auto;
    width: 100px;
    height: 100px;

    border: 15px solid rgba(163, 151, 198, 0.2);
    border-top: 15px solid rgba(163, 151, 198, 1);
    border-radius: 50%;

    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;