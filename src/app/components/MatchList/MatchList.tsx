"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import MatchTeamInfo from "../MatchTeamInfo/MatchTeamInfo";
import styles from "./MatchList.module.css";
import { getMatches } from "@/app/services/matches";
import { MatcheResponse, Match } from "@/app/types/matches";
import FlagStatus from "../FlagStatus/FlagStatus";
import io, { Socket } from "socket.io-client";

const MatchList = () => {
  let socket: Socket;
  const [data, setData] = useState<MatcheResponse>([]);
  useEffect(() => {
    getMatches().then((data) => {
      setData(data);
    });

    // Initialize Socket.IO client
    socket = io("http://localhost:3000", {
      path: "/api/socketio",
    });

    // Handle match updates
    socket.on("match-updated", (data) => {
      setData((prevMatches) => {
        const matchIndex = prevMatches.findIndex(
          (match) => match.id === data.id
        );
        if (matchIndex !== -1) {
          const updatedMatches = [...prevMatches];
          updatedMatches[matchIndex] = data;
          return updatedMatches;
        } else {
          return [...prevMatches, data];
        }
      });
    });

    // Handle match deletions
    socket.on("match-deleted", (data) => {
      setData((prevMatches) =>
        prevMatches.filter((match) => match.id !== data.id)
      );
    });

    return () => {
      socket.disconnect();
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
