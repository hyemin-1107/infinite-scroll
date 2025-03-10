import { useEffect, useRef } from 'react';
import styled from 'styled-components';
// import DetailModal from './components/DetailModal';
import DataList from './components/DataList';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setIsMoreItems, setItems } from './redux/modules/actions';
import { RootState } from './redux/config/store';


const InfiniteScroll = () => {
  // const [items, setItems] = useState([]); // 데이터 목록
  // const [isMoreItems, setIsMoreItems] = useState(true); // 데이터 끝 확인
  // const [isLoading, setIsLoading] = useState(false); // 로딩 스피너
  // const [isModal, setIsModal] = useState(false); //모달 관리
  // const [selectedPost, setSelectedPost] = useState(null); // 선택 게시글

  const pageRef = useRef<number>(1); // 현재 페이지 추적(리렌더링 방지)
  const loaderRef = useRef(null); // 스크롤 로더 감지 참조

  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.data.items);
  const isMoreItems = useSelector((state: RootState) => state.data.isMoreItems);
  const isLoading = useSelector((state: RootState) => state.data.isLoading);

  // const onClickModal = (selectedPost) => {
  //   setSelectedPost(selectedPost);
  //   setIsModal(true);
  // };
  // const onClickCloseModal = () => setIsModal(false);

  const navigate = useNavigate();
  const onClickPost = (id: number) => {
    navigate(`/posts/${id}`);
  };

  const fetchData = async () => {
    // 더 이상 데이터가 없다면 데이터를 더 이상 로드하지 않도록 설정
    if (!isMoreItems || isLoading) return;
  
    dispatch(setIsLoading(true));
  
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageRef.current}`);
    const newData = await res.json();
  
    if (newData.length === 0) {
      dispatch(setIsMoreItems(false)); 
    }
  
    dispatch(setItems(newData));
    pageRef.current += 1; // 페이지 증가
    dispatch(setIsLoading(false));
  };
  
  // Intersection Observer 사용해 스크롤 감지, 특정요소가 뷰포트에 얼마나 보이는지를 감지함
  // 화면에 loader가 보이면 fetch data 실행해서 새로운 데이터 보여줌
  useEffect(() => {
    if (isLoading) return;  // 로딩 중이면 observer를 설정하지 않음

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && isMoreItems) {
          fetchData();  // 새로운 데이터를 로드
        }
      },
      { threshold: 1.0 }
    );
    if(loaderRef.current){
      observer.observe(loaderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoading, isMoreItems]);

  return (

    <MainWrap>

      <h1>Infinite Scroll</h1>

      <DataList items={items} onClickPost={onClickPost} />

      {isLoading && isMoreItems &&(
        <LoadingSpinner>
          <div></div>
        </LoadingSpinner>
      )}

      {/* {isModal && (
        <DetailModal
          data={items}
          selectedPost={selectedPost}
          isModal={isModal}
          onClickCloseModal={onClickCloseModal}
        />
      )} */}

      <div ref={loaderRef} />

    </MainWrap>

  );
};

export default InfiniteScroll;

const MainWrap = styled.div`
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