import styles from "./FlagStatus.module.css";

type FlagStatusProps = {
    title: string;
    color: string;
}
const FlagStatus = ({title, color}: FlagStatusProps) => {
    return (
        <div className={styles.flagStatus} style={{ backgroundColor: color}}>
            {title}
        </div>
    );
};

export default FlagStatus