import { useEffect, useState } from "react";
import Description from "./components/Description/Description";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification/Notification";

function App() {
  const [votingData, setVotingData] = useState(
    () =>
      JSON.parse(window.localStorage.getItem("saveVoiting")) ?? {
        good: 0,
        neutral: 0,
        bad: 0,
      }
  );

  const updateFeedback = (feedbackType) =>
    setVotingData((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));

  const totalFeedback = votingData.good + votingData.neutral + votingData.bad;

  const positiveFeedback = Math.round((votingData.good / totalFeedback) * 100);

  const handleReset = () => setVotingData({ good: 0, neutral: 0, bad: 0 });

  useEffect(() => {
    window.localStorage.setItem("saveVoiting", JSON.stringify(votingData));
  }, [votingData]);

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        handleReset={handleReset}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={votingData.good}
          neutral={votingData.neutral}
          bad={votingData.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;
