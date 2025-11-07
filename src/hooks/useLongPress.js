import { useCallback, useRef, useState } from 'react';

export default function useLongPress(callback = () => {}, ms = 500) {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef();
  const target = useRef();

  const start = useCallback(
    (event) => {
      // Prevent default to stop iOS from showing context menu or text selection
      if (event.target) {
        event.target.style.webkitUserSelect = 'none';
        target.current = event.target;
      }
      
      timeout.current = setTimeout(() => {
        callback();
        setLongPressTriggered(true);
      }, ms);
    },
    [callback, ms]
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      
      if (target.current) {
        target.current.style.webkitUserSelect = '';
      }

      // Reset the flag after a short delay to allow onClick to check it
      if (longPressTriggered) {
        if (shouldTriggerClick) {
          event.preventDefault();
          event.stopPropagation();
        }
        setTimeout(() => setLongPressTriggered(false), 100);
      }
    },
    [longPressTriggered]
  );

  return {
    onMouseDown: (e) => start(e),
    onMouseUp: (e) => clear(e),
    onMouseLeave: (e) => clear(e, false),
    onTouchStart: (e) => start(e),
    onTouchEnd: (e) => clear(e),
    onTouchMove: (e) => {
      // Cancel long press if finger moves (scrolling)
      if (timeout.current) {
        clearTimeout(timeout.current);
        if (target.current) {
          target.current.style.webkitUserSelect = '';
        }
      }
    },
    onTouchCancel: (e) => clear(e, false),
    onClick: (e) => {
      // Prevent onClick from firing if long press was triggered
      if (longPressTriggered) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
  };
}
