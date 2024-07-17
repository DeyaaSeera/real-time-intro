"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import MatchTeamInfo from "../MatchTeamInfo/MatchTeamInfo";
import styles from "./MatchList.module.css";
import { getMatches } from "@/app/services/matches";
import { MatcheResponse, Match } from "@/app/types/matches";
import FlagStatus from "../FlagStatus/FlagStatus";

const MatchList = () => {
  const [data, setData] = useState<MatcheResponse>([]);
  useEffect(() => {
    getMatches().then((data) => {
      setData(data);
    });

    const eventSource = new EventSource(`/api/match/sse`);

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      if (eventData.type === "match_update") {
        setData((prevMatches) => {
          const matchIndex = prevMatches.findIndex(
            (match) => match.id === eventData.data.id
          );
          if (matchIndex !== -1) {
            const updatedMatches = [...prevMatches];
            updatedMatches[matchIndex] = eventData.data;
            return updatedMatches;
          } else {
            return [...prevMatches, eventData.data];
          }
        });
      } else if (eventData.type === "match_delete") {
        setData((prevMatches) =>
          prevMatches.filter((match) => match.id !== eventData.id)
        );
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <section className={styles.scoreBoard}>
      {data &&
        data.map((match: Match) => (
          <div key={match.id} className={styles.gameSection}>
            <MatchTeamInfo
              score={match.matchData.result[match.matchData.teams[0].name]}
              flag={match?.matchData?.teams[0].flag}
              name={match?.matchData?.teams[0].name}
            />
            <div className={styles.matchInfo}>
              <div>✗</div>
              {match.isStarted && !match.isEnd ? (
                <FlagStatus title="playing ..." color="#07ac07" />
              ) : (
                <FlagStatus title="Game End" color="red" />
              )}
            </div>
            <MatchTeamInfo
              score={match.matchData.result[match.matchData.teams[1].name]}
              flag={match?.matchData?.teams[1].flag}
              name={match?.matchData?.teams[1].name}
            />
          </div>
        ))}
    </section>
  );
};

export default MatchList;
