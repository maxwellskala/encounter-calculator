import React from 'react';
import styled from 'styled-components';

import { DIFFICULTY_TO_COLOR } from '../lib/constants';
import { Difficulty, xpThreshold } from '../util/calculatePartyXPThresholds';

interface DifficultyReadoutWrapperProps {
  difficulty: Difficulty;
}

const DifficultyReadoutWrapper = styled.div`
  color: ${(props: DifficultyReadoutWrapperProps): string =>
    DIFFICULTY_TO_COLOR[props.difficulty]};
  display: flex;
  justify-content: center;
`;

interface DifficultyReadoutProps {
  monsterXP: number;
  partyXPThresholds: xpThreshold;
}

const DifficultyReadout = (props: DifficultyReadoutProps): JSX.Element => {
  const { monsterXP, partyXPThresholds } = props;
  let difficulty: Difficulty = 'easy';
  Object.keys(partyXPThresholds).forEach(
    (key: Difficulty): void => {
      const minimumThreshold = partyXPThresholds[key];
      if (monsterXP >= minimumThreshold) {
        difficulty = key;
      }
    },
  );
  return (
    <DifficultyReadoutWrapper difficulty={difficulty}>
      <h1>{difficulty}</h1>
    </DifficultyReadoutWrapper>
  );
};

export default DifficultyReadout;
