import styled from "styled-components";
import bgImage from "../images/bg_img.avif"

interface Item {
  id: number;
  title: string;
}

interface DataListProps {
  items: Item[];
  onClickPost: (id: number) => void;
}

const DataList = ({ items, onClickPost }: DataListProps) => {

  return (

    <GridList>
      {items.map((item) => (
        <ListItem key={item.id} onClick={() => onClickPost(item.id)}>
          <img src={bgImage}  alt="상품 이미지" />
          <div>
            {item.title}
          </div>
        </ListItem>
      ))}
    </GridList>

  );
};

export default DataList;

const GridList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  padding: 0;
  gap: 50px;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 30px auto;

  width: 450px;
  height: 490px;

  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  background-color: rgba(0,0,0,0.3);

  &:hover {
    background-color: rgba(0,0,0,0);
    div{
      color: #333;
    }
  }

  img {
    width: 100%;
    height: 270px;
    object-fit: cover;
    filter: brightness(80%);
  }

  &:hover img {
    filter: brightness(100%);
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;

    text-align: center;
    color: #fff;
    width: 100%;
    height: 100%;
    padding: 20px;

    background-color: rgba(163, 151, 198, 0.3);
    font-size: 20px;
    font-weight: bold;
  }
`;
