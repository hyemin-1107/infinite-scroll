import React, { useRef } from "react";
import styled from "styled-components"
import { useOnClickOutside } from "../hooks/useOnClickOutside";

const DetailModal = (props) => {

    const { selectedPost, data, isModal, onClickCloseModal } = props;

    const modalRef = useRef();
    useOnClickOutside(modalRef, onClickCloseModal);

    return (

        <ModalWrap $isModal={isModal}>

            <ModalContainer key={data} ref={modalRef} $isModal={isModal}>

                <article>
                    <h1>{data[selectedPost].title}</h1>
                    <p>{data[selectedPost].body}</p>
                </article>

                <CloseButton>
                    <button onClick={onClickCloseModal}>close</button>
                </CloseButton>

            </ModalContainer>

        </ModalWrap>

    )
};

export default DetailModal;

const ModalWrap = styled.div`
    display: ${(props) => (props.$isModal ? "block" : "none")};
    position: fixed;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(0,0,0,0.1);
`;

const ModalContainer = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);

    display: ${(props) => (props.$isModal ? "block" : "none")};

    width: 880px;
    height: 590px;

    font-size: 20px;
    overflow: hidden;

    background: #fff;
    border-radius: 3px;

    animation: modal 0.3s ease;

    @keyframes modal {
        from {
          transform: translate(-50%, -60%);
        }
        to {
          transform: translate(-50%, -50%);
        }
    }

    article{
        h1{
            margin: 110px 50px;
        }
        p{
            text-align: center;
            font-size: 32px;
            word-break: keep-all;
            margin: 0 50px;
        }
    }
`;

const CloseButton = styled.div`
    position: absolute;
    left: 50%;
    bottom: 8%;
    transform: translateX(-50%);

    display: flex;
    align-items: center;
    justify-content: center;

    button{
        width: 220px;
        padding: 10px;
        font-size: 22px;
        font-weight: bold;

        color: #fff;
        background: rgba(163, 151, 198, 1);

        border: none;
        border-radius: 3px;

        cursor: pointer;
    }
`;