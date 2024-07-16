"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import MatchTeamInfo from "../MatchTeamInfo/MatchTeamInfo";
import styles from "./MatchList.module.css";
import { getMatches } from "@/app/services/matches";
import { MatcheResponse, Match } from "@/app/types/matches";
import FlagStatus from "../FlagStatus/FlagStatus";

const MatchList = () => {
    const [data, setData] = useState<MatcheResponse>([])
    useEffect(() => {
        getMatches().then((data) => {
            setData(data);
        });
    }, [])
    return (
        <section className={styles.scoreBoard}>
            {data && data.map((match: Match) => (
                <div key={match.id} className={styles.gameSection}>
                    <MatchTeamInfo
                        score={0}
                        flag={match?.matchData?.teams[0].flag}
                        name={match?.matchData?.teams[0].name}
                    />
                    <div className={styles.matchInfo}>
                        <div>✗</div>
                        {match.isStarted && !match.isEnd ? <FlagStatus title="playing ..." color="#07ac07" /> : <FlagStatus title="Game End" color="red" />}
                    </div>
                    <MatchTeamInfo
                        score={0}
                        flag={match?.matchData?.teams[1].flag}
                        name={match?.matchData?.teams[1].name}
                    />
                </div>
            ))}
        </section>
    );
};

export default MatchList;