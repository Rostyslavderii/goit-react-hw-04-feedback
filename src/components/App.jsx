import { useState } from 'react';
// import styles from './Feedback.module.scss';
// import cn from 'classnames';
import { Statistics } from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions ';
import { Section } from './Section/Section';
import { Notification } from './Notification ';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  // const [total, setTotal] = useState(0);
  // const [feedback, setFeedback] = useState(0); // а далі прив'язуєшь this.setState(і погнал)

  const totalFeedback = good + neutral + bad;

  const onLeaveFeedback = type => {
    // const key = e.target.name;
    switch (type) {
      case 'good':
        setGood(prevGod => prevGod + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        return;
    }
  };

  const stateValue = {
    good,
    neutral,
    bad,
    totalFeedback,
  };

  const message = 'There is no feedback';
  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions onLeaveFeedback={onLeaveFeedback} />
        {good === 0 && neutral === 0 && bad === 0 ? (
          <Notification message={message} /> //true?
        ) : (
          <Statistics value={stateValue} /> //false?
        )}
      </Section>
    </>
  );
};
