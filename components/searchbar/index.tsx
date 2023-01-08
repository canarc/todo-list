import Head from 'next/head';
import { forwardRef, InputHTMLAttributes, ReactNode, DetailedHTMLProps } from 'react';
import styles from './styles.module.scss';
import { IoSearchOutline } from 'react-icons/io5';
interface Props {
  placeholder?: string;
}

type Ref = HTMLInputElement;

const SearchBar = forwardRef<Ref, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>((props, ref) => {
  const { placeholder } = props;
  return (
    <>
      <div className={styles.container}>
        <IoSearchOutline size={28} />
        <input type="search" ref={ref} placeholder={placeholder} className="MyClassName" {...props} />
      </div>
    </>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
