import Image from 'next/image';
import styles from './styles.module.scss';

function Header() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Image src="logo.svg" alt="Picture of the author" width={36} height={36} />
        <h1>Vodafone Task Center</h1>
      </div>
    </nav>
  );
}
export default Header;
