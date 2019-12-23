import React, { useCallback, useState } from 'react';

import { xpThreshold } from '../util/calculatePartyXPThresholds';
import DifficultyBar from './DifficultyBar';
import Encounter from './Encounter';

export default () => {
  const [monsterXPBudget, setMonsterXPBudget] = useState<number>(0);
  const [
    characterXPThresholds,
    setCharacterXPThresholds,
  ] = useState<xpThreshold | null>(null);
  const handleMonsterXPChange = useCallback(
    (newXPValue: number) => setMonsterXPBudget(newXPValue),
    [setMonsterXPBudget],
  );
  const handleCharacterXPChange = useCallback(
    (newThresholds: xpThreshold) => setCharacterXPThresholds(newThresholds),
    [setCharacterXPThresholds],
  );
  return (
    <div>
      <h1>Enter encounter details</h1>
      <h4>Encounter difficulty targets:</h4>
      <div>
        {characterXPThresholds &&
          Object.keys(characterXPThresholds).map(difficulty => (
            <div key={difficulty}>
              {difficulty}: {characterXPThresholds[difficulty]}
            </div>
          ))}
      </div>
      <Encounter
        onCharacterXPChange={handleCharacterXPChange}
        onMonsterXPChange={handleMonsterXPChange}
      />
      <h4>Current XP budget: {monsterXPBudget}</h4>
      <DifficultyBar
        monsterXP={monsterXPBudget}
        partyXPThresholds={characterXPThresholds}
      />
    </div>
  );
};
