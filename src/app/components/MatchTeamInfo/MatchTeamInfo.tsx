import styles from "./MatchTeamInfo.module.css";

type MatchTeamInfoProps = {
    score: number;
    flag: string;
    name: string;
}
const MatchTeamInfo = ({ score, flag, name }: MatchTeamInfoProps) => {
    return (
        <div className={styles.teamInfo}>
            <div className={styles.flag}>{flag}</div>
            <div className={styles.teamName}>{name}</div>
            <div className={styles.score}>{score}</div>
        </div>
    );
};

export default MatchTeamInfo;