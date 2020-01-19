import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import calculatePartyXPThresholds, {
  xpThreshold,
} from '../util/calculatePartyXPThresholds';
import InlineInput from './styled/InlineInput';
import EncounterMonsterPanel from './EncounterMonsterPanel';

const EncounterWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 100%;
`;

const EncounterColumn = styled.div`
  margin: 0 3% 0 3%;
  min-width: 250px;
`;

interface EncounterProps {
  onCharacterXPChange(newThreshold: xpThreshold): void;
  onMonsterXPChange(newXPTotal: number): void;
}

const Encounter = (props: EncounterProps): JSX.Element => {
  const { onCharacterXPChange, onMonsterXPChange } = props;

  const [charCount, setCharCount] = useState<string>('1');
  const [charLevel, setCharLevel] = useState<string>('1');

  const handleCharCountChange = useCallback(
    (evt: FormEvent<HTMLInputElement>) => setCharCount(evt.currentTarget.value),
    [setCharCount],
  );
  const handleCharLevelChange = useCallback(
    (evt: FormEvent<HTMLInputElement>) => setCharLevel(evt.currentTarget.value),
    [setCharLevel],
  );

  useEffect(() => {
    const parsedCount = parseInt(charCount, 10);
    const parsedLevel = parseInt(charLevel, 10);
    if (!isNaN(parsedCount) && !isNaN(parsedLevel)) {
      onCharacterXPChange(calculatePartyXPThresholds(parsedCount, parsedLevel));
    }
  }, [charCount, charLevel]);
  return (
    <EncounterWrapper>
      <EncounterColumn>
        <h2>Party</h2>
        <table>
          <thead>
            <tr>
              <th>Character count</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <InlineInput
                  name="charCount"
                  onChange={handleCharCountChange}
                  type="text"
                  value={charCount}
                />
              </td>
              <td>
                <InlineInput
                  name="charLevel"
                  onChange={handleCharLevelChange}
                  type="text"
                  value={charLevel}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </EncounterColumn>
      <EncounterColumn>
        <h2>Monsters</h2>
        <EncounterMonsterPanel onMonsterXPChange={onMonsterXPChange} />
      </EncounterColumn>
    </EncounterWrapper>
  );
};

export default Encounter;
