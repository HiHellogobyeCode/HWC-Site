
import React from 'react';
import { Rectangle, RectangleProps } from 'recharts';

// Define the props type for the Cell component
interface CellProps extends Omit<RectangleProps, 'fill'> {
  fill?: string;
}

// Create the Cell component
const Cell: React.FC<CellProps> = (props) => {
  return <Rectangle {...props} />;
};

export default Cell;
