import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { setPost } from "../redux/modules/actions";
import { RootState } from "../redux/config/store";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) => state.data.post);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const selectData = await res.json();
      dispatch(setPost(selectData));
    };

    fetchPost();
  }, [dispatch, id]);

  return (
    <Detail>
      {post && (
        <>
          <h1>{post.id}. {post.title}</h1>
          <p>{post.body}</p>
        </>
      )}
    </Detail>
  );
};

export default DetailPage;

const Detail = styled.article`
  margin: 150px 50px;

  font-size: 30px;
  text-align: center;
`;
