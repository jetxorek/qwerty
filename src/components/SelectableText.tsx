import { useRef, useCallback, type ReactNode, type TouchEvent, type MouseEvent } from 'react';

interface SelectableTextProps {
  children: ReactNode;
  onSelection?: (text: string) => void;
  onAdvance?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const MIN_SELECTION_LENGTH = 10;
const SWIPE_THRESHOLD = 50;

export function SelectableText({
  children,
  onSelection,
  onAdvance,
  className,
  style,
}: SelectableTextProps) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const hasMovedRef = useRef(false);

  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    const text = selection.toString().trim();
    if (text.length >= MIN_SELECTION_LENGTH && onSelection) {
      onSelection(text);
    }
  }, [onSelection]);

  const handleMouseUp = useCallback(
    (_e: MouseEvent<HTMLDivElement>) => {
      // Даём браузеру мгновение обновить selection
      requestAnimationFrame(() => {
        handleSelection();
      });
    },
    [handleSelection]
  );

  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      hasMovedRef.current = false;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    if (!touch) return;
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
    // Если движение преимущественно горизонтальное — это выделение
    if (deltaX > deltaY) {
      hasMovedRef.current = true;
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      if (!touch) {
        touchStartRef.current = null;
        return;
      }

      const deltaY = touchStartRef.current.y - touch.clientY;
      const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);

      // Если было горизонтальное движение — это выделение, не свайп
      if (!hasMovedRef.current && deltaY > SWIPE_THRESHOLD && onAdvance) {
        onAdvance();
      } else {
        // Проверяем выделение
        requestAnimationFrame(() => {
          handleSelection();
        });
      }

      touchStartRef.current = null;
      hasMovedRef.current = false;
    },
    [onAdvance, handleSelection]
  );

  return (
    <div
      className={className}
      style={{
        userSelect: 'text',
        WebkitUserSelect: 'text',
        touchAction: 'pan-y',
        ...style,
      }}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
}
