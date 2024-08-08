import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({ orientation = 'horizontal', color = '#000', thickness = 1 }) => {
  const style = {
    backgroundColor: color,
    ...(orientation === 'horizontal'
      ? { width: '100%', height: `${thickness}px` }
      : { width: `${thickness}px`, height: '100%' }),
  };

  return <div style={style} role="separator" aria-orientation={orientation} />;
};

Divider.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  color: PropTypes.string,
  thickness: PropTypes.number,
};

export default Divider;
