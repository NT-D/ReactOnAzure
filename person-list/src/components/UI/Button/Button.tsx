// eslint-disable-next-line no-unused-vars
import React, { ReactNode } from 'react';
import classes from './Button.module.css';

interface Props {
  disabled?: boolean;
  clicked: () => void;
  children: ReactNode;
}

const button = (props: Props) => (
  <button className={classes.Button} onClick={props.clicked} disabled={props.disabled}>
    {props.children}
  </button>
);
export default button;
