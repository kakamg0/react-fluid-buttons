import React, { Children, useState, useRef } from 'react';
import './style.css';

export function ButtonGroup ({ className, transition, trasitionDuration, children }) {
  const [ selected, setSelected ] = useState(null);
  const me = useRef(null);
  const bound = selected ? selected.getBoundingClientRect() : {};
  const boundMe = me.current ? me.current.getBoundingClientRect() : {};
  const childs = Children.map(children, c => c.type === Button && <c.type {...c.props} onMouseOver={el => setSelected(el)} />);

  return (
    <div ref={el=>this.me=el} {...this.props} className={`fluid-button-container ${className || ''}`} onMouseLeave={() => setSelected(null)}>
      {selected && me && (
        <span className="fluid-button-highglight" style={{
          left: bound.left - boundMe.left,
          top: bound.top - boundMe.top,
          width: bound.width,
          height: bound.height,
          transition: transition ? transition :  "all 0.35s",
          transitionDuration: trasitionDuration ? trasitionDuration : "0.35s",
        }}
        />
      )}
      {childs}
    </div>
  );
};

export function Button ({ style, onMouseOver, onClick, children }) {
  const selectedRef = useRef(null);
  const handleMouseOver = () => onMouseOver(selectedRef.current);
  return (
    <div onClick={onClick} style={style} className="fluid-button" onMouseOver={handleMouseOver} ref={selectedRef}>
      {children}
    </div>
  );
}
