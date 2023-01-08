import Head from 'next/head';
import { forwardRef, ReactNode } from 'react';
import styles from './styles.module.scss';
import { IoSearchOutline } from 'react-icons/io5';
interface Props {
  placeholder?: string;
}

type Ref = HTMLInputElement;

const SearchBar = forwardRef<Ref, Props>((props, ref) => {
  const { placeholder } = props;
  return (
    <>
      <div className={styles.container}>
        <IoSearchOutline size={28} />
        <input type="search" ref={ref} placeholder={placeholder} className="MyClassName" />
      </div>
    </>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
