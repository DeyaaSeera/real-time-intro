import styles from "./header.module.css";
const Header = () => {
    return (
        <header className={styles.header}>
            <img src='./logo.png' alt='Euro 2024 '/>
            <h2>Euro 2024 Scoreboard</h2>
        </header>
    );
};

export default Header