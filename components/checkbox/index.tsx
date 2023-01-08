import Head from 'next/head';
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';

type Ref = HTMLInputElement;

const CheckBox = forwardRef<Ref, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>((props, ref) => {
  return (
    <>
      <div className={styles.container} style={{ ...props.style }}>
        <input type="checkbox" ref={ref} id={props.id} {...props} />
        <label htmlFor={props.id} />
      </div>
    </>
  );
});

CheckBox.displayName = 'CheckBox';

export default CheckBox;
