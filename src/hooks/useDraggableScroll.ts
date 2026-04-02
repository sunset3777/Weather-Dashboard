import { useRef, useState, MouseEvent } from 'react';

/**
 * 自定義 Hook：實作滑鼠拖曳捲動功能
 * @param speed 拖曳速度係數，預設為 2
 */
export const useDraggableScroll = (speed: number = 20) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: MouseEvent) => {
    if (!ref.current) return;
    setIsDragging(true);
    // 記錄初始位置
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    // 計算滑動距離
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * speed;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  // 回傳需要綁定到 DOM 的屬性
  return {
    ref,
    isDragging,
    events: {
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
    },
  };
};
