import MatchTeamInfo from "../MatchTeamInfo/MatchTeamInfo";
import styles from "./ScoreBoard.module.css";

const matchesData = [
    {
        gameId: 1,
        isGameStarted: false,
        time: '',
        firstTeam: {
            name: 'England',
            countryCode: 'En',
            score: 0,
            flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
        },
        secondTeam: {
            name: 'Spain',
            countryCode: 'ar',
            score: 0,
            flag: '🇪🇸',
        }
    },
    {
        gameId: 2,
        isGameStarted: false,
        time: '',
        firstTeam: {
            name: 'France',
            countryCode: 'Fr',
            score: 0,
            flag: '🇫🇷'
        },
        secondTeam: {
            name: 'Spain',
            countryCode: 'ar',
            score: 0,
            flag: '🇪🇸',
        }
    },
    {
        gameId: 3,
        isGameStarted: false,
        time: '',
        firstTeam: {
            name: 'England',
            countryCode: 'En',
            score: 1,
            flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
        },
        secondTeam: {
            name: 'Netherlands',
            countryCode: 'NL',
            score: 0,
            flag: '🇳🇱',
        }
    }
]
const ScoreBoard = () => {
    return (
        <section className={styles.scoreBoard}>
            {matchesData?.map(match => (
                <div key={match.gameId} className={styles.gameSection}>
                    <MatchTeamInfo 
                        score={match.firstTeam.score} 
                        flag={match.firstTeam.flag} 
                        name={match.firstTeam.name}
                    />
                    <div className={styles.seperator}>✗</div>
                    <MatchTeamInfo 
                        score={match.secondTeam.score} 
                        flag={match.secondTeam.flag} 
                        name={match.secondTeam.name}
                    />
                </div>
            ))}
        </section>
    );
};

export default ScoreBoard;