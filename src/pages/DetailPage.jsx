import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const DetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const data = await res.json();
      setPost(data);
    };

    fetchPost();
  }, [id]);


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
