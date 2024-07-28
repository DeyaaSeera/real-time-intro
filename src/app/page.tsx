import Header from "./components/Header/Header";
import LongPollingComponent from "./components/LongPollingComponent/LongPollingComponent";
import MatchList from "./components/MatchList/MatchList";
import ShortPollingComponent from "./components/ShortPollingComponent/ShortPollingComponent";

export default function Home() {
  return (
    <>
      <Header />
      <MatchList />
      {/* <ShortPollingComponent /> */}
      {/* <LongPollingComponent /> */}
    </>
  );
}
