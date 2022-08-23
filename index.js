import React, {useRef, useEffect, useReducer} from 'react';
import {Tooltip} from '@enos/dpl';


const Index = ({children}: {children:JSX.Element}):JSX.Element => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const child = useRef(null);
  const newChild = React.cloneElement(React.Children.only(children), {
    ref: child
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      forceUpdate();
    });
    resizeObserver.observe(child.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <Tooltip title={child.current?.scrollWidth > child.current?.offsetWidth ? child.current.innerText : ''}>
      {newChild}
    </Tooltip>
  );
};

export default Index;
