import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import DataList from './components/DataList';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/config/store';
import { setIsLoading } from './redux/reducers/isLoadingReducer';
import { setIsMoreItems } from './redux/reducers/isMoreItemsReducer';
import { setItems } from './redux/reducers/itemsReducer';

const Main = () => {

  const pageRef = useRef<number>(1);
  const loaderRef = useRef(null);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items);
  const isMoreItems = useSelector((state: RootState) => state.isMoreItems);
  const isLoading = useSelector((state: RootState) => state.isLoading);

  const navigate = useNavigate();
  const onClickPost = (id: number) => {
    navigate(`/posts/${id}`);
  };

  const fetchData = async () => {
    if (!isMoreItems || isLoading) return;
  
    dispatch(setIsLoading(true));
  
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageRef.current}`);
    const newData = await res.json();
  
    if (newData.length === 0) {
      dispatch(setIsMoreItems(false)); 
    }
  
    dispatch(setItems(newData));
    pageRef.current += 1; 
    dispatch(setIsLoading(false));
  };
  
  useEffect(() => {
    if (isLoading) return;  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && isMoreItems) {
          fetchData();  
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

      <div ref={loaderRef} />

    </MainWrap>

  );
};

export default Main;

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