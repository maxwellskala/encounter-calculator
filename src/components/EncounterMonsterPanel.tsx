import React, { useCallback, useEffect, useState } from 'react';

import {
  calculateMonsterXP,
  getMonsterMultiplier,
  dataByInput,
} from '../util/calculateMonsterXP';
import MonsterInput from './MonsterInput';

const getBaseXP = (dataByInput: dataByInput) =>
  Object.keys(dataByInput).reduce((acc: number, key: string) => {
    const { count, CR } = dataByInput[key];
    return acc + calculateMonsterXP(count, CR);
  }, 0);

const getTotalXP = (dataByInput: dataByInput) => {
  const baseXP = getBaseXP(dataByInput);
  const multiplier = getMonsterMultiplier(dataByInput);
  return baseXP * multiplier;
};

interface EncounterMonsterPanelProps {
  onMonsterXPChange(newXPTotal: number): void;
}

export default (props: EncounterMonsterPanelProps) => {
  const { onMonsterXPChange } = props;

  const [currentInputId, setCurrentInputId] = useState<number>(1);
  const [dataByInput, setDataByInput] = useState<dataByInput>({
    [currentInputId]: { count: 0, CR: '0' },
  });

  const handleInputChange = (
    inputId: number,
    newCount: number,
    newCR: string,
  ) => {
    dataByInput[inputId] = { count: newCount, CR: newCR };
    setDataByInput(dataByInput);

    onMonsterXPChange(getTotalXP(dataByInput));
  };

  const handleAddInput = () => {
    const newId = currentInputId + 1;
    dataByInput[newId] = { count: 0, CR: '0' };
    setDataByInput(dataByInput);
    setCurrentInputId(newId);
  };
  const handleRemoveInput = (id: number) => {
    delete dataByInput[id];
    setDataByInput(dataByInput);

    onMonsterXPChange(getTotalXP(dataByInput));
  };
  return (
    <div>
      {Object.keys(dataByInput).map(inputId => (
        <MonsterInput
          key={inputId}
          id={parseInt(inputId, 10)}
          onRemove={handleRemoveInput}
          onChange={handleInputChange}
        />
      ))}
      <button onClick={handleAddInput}>Add row</button>
    </div>
  );
};
