import React, { useCallback, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { DIFFICULTY_TO_COLOR } from '../lib/constants';
import {
  DEFAULT_THRESHOLD,
  Difficulty,
  xpThreshold,
} from '../util/calculatePartyXPThresholds';
import DifficultyBar from './DifficultyBar';
import DifficultyReadout from './DifficultyReadout';
import Encounter from './Encounter';

const CSSReset = createGlobalStyle`
  body {
    background-color: #f2e0ab;
    margin: 0;
    padding: 8px;
  }
`;

const AppWrapper = styled.div`
  height: 100%;
`;

interface DifficultyLabelProps {
  difficulty: Difficulty;
}

const DifficultyLabel = styled.p`
  color: ${(props: DifficultyLabelProps): string =>
    DIFFICULTY_TO_COLOR[props.difficulty]};
  display: inline-block;
  margin: 5px 0 5px 0;
`;

const App = (): JSX.Element => {
  const [monsterXPBudget, setMonsterXPBudget] = useState<number>(0);
  const [characterXPThresholds, setCharacterXPThresholds] = useState<
    xpThreshold
  >(DEFAULT_THRESHOLD);
  const handleMonsterXPChange = useCallback(
    (newXPValue: number) => setMonsterXPBudget(newXPValue),
    [setMonsterXPBudget],
  );
  const handleCharacterXPChange = useCallback(
    (newThresholds: xpThreshold) => setCharacterXPThresholds(newThresholds),
    [setCharacterXPThresholds],
  );
  return (
    <>
      <CSSReset />
      <AppWrapper>
        <h1>Enter encounter details</h1>
        <Encounter
          onCharacterXPChange={handleCharacterXPChange}
          onMonsterXPChange={handleMonsterXPChange}
        />
        <h4>Encounter difficulty targets:</h4>
        <div>
          {characterXPThresholds &&
            Object.keys(characterXPThresholds).map(
              (difficulty: Difficulty): JSX.Element => (
                <div key={difficulty}>
                  <DifficultyLabel difficulty={difficulty}>
                    {difficulty}
                  </DifficultyLabel>
                  : {characterXPThresholds[difficulty]}
                </div>
              ),
            )}
        </div>
        <h4>Current XP budget: {monsterXPBudget}</h4>
        <DifficultyBar
          monsterXP={monsterXPBudget}
          partyXPThresholds={characterXPThresholds}
        />
        <DifficultyReadout
          monsterXP={monsterXPBudget}
          partyXPThresholds={characterXPThresholds}
        />
      </AppWrapper>
    </>
  );
};

export default App;
