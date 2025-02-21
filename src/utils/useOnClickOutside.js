import { useEffect } from "react";

export const useOnClickOutside = (ref, close) => {
  useEffect(() => {
    const outSideClick = (e) => {
      // 모달 내부 클릭 무시
      if (ref.current.contains(e.target)) return;
      // 외부 클릭 감지
      close();
    };
    // 마우스 클릭 이벤트
    document.addEventListener("mousedown", outSideClick);

    return () => {
      document.removeEventListener("mousedown", outSideClick);
    }
  }, [ref, close]);
};