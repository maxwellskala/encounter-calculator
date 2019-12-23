import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import calculatePartyXPThresholds, {
  xpThreshold,
} from '../util/calculatePartyXPThresholds';
import EncounterMonsterPanel from './EncounterMonsterPanel';

const EncounterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const EncounterColumn = styled.div`
  border: 1px solid red;
  margin: 0 3% 0 5%;
`;

interface EncounterProps {
  onCharacterXPChange(newThreshold: xpThreshold): void;
  onMonsterXPChange(newXPTotal: number): void;
}

export default (props: EncounterProps) => {
  const { onCharacterXPChange, onMonsterXPChange } = props;

  const [charCount, setCharCount] = useState<number>(1);
  const [charLevel, setCharLevel] = useState<number>(1);

  const handleCharCountChange = useCallback(
    (evt: FormEvent<HTMLInputElement>) =>
      setCharCount(parseInt(evt.currentTarget.value, 10)),
    [setCharCount],
  );
  const handleCharLevelChange = useCallback(
    (evt: FormEvent<HTMLInputElement>) =>
      setCharLevel(parseInt(evt.currentTarget.value)),
    [setCharLevel],
  );

  useEffect(() => {
    onCharacterXPChange(calculatePartyXPThresholds(charCount, charLevel));
  }, [charCount, charLevel]);
  return (
    <EncounterWrapper>
      <EncounterColumn>
        <h2>Party</h2>
        <form>
          <label>
            <input
              name="charCount"
              onChange={handleCharCountChange}
              type="text"
              value={charCount}
            />
            characters
          </label>
          of
          <label>
            level
            <input
              name="charLevel"
              onChange={handleCharLevelChange}
              type="text"
              value={charLevel}
            />
          </label>
        </form>
      </EncounterColumn>
      <EncounterColumn>
        <h2>Monsters</h2>
        <EncounterMonsterPanel onMonsterXPChange={onMonsterXPChange} />
      </EncounterColumn>
    </EncounterWrapper>
  );
};
