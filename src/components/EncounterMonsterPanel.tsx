import React, { useCallback, useEffect, useState } from 'react';

import MonsterInput from './MonsterInput';

const getTotalXP = (xpByInput: xpByInput) =>
  Object.keys(xpByInput).reduce((acc: number, key: string) => {
    return acc + xpByInput[key];
  }, 0);

interface EncounterMonsterPanelProps {
  onMonsterXPChange(newXPTotal: number): void;
}

interface xpByInput {
  [inputId: string]: number;
}

export default (props: EncounterMonsterPanelProps) => {
  const { onMonsterXPChange } = props;

  const [currentInputId, setCurrentInputId] = useState<number>(1);
  const [xpByInput, setXPByIput] = useState<xpByInput>({ [currentInputId]: 0 });

  const handleInputXPChange = (inputId: number, newTotal: number) => {
    xpByInput[inputId] = newTotal;
    setXPByIput(xpByInput);

    onMonsterXPChange(getTotalXP(xpByInput));
  };

  const handleAddInput = () => {
    const newId = currentInputId + 1;
    xpByInput[newId] = 0;
    setXPByIput(xpByInput);
    setCurrentInputId(newId);
  };
  const handleRemoveInput = (id: number) => {
    delete xpByInput[id];
    setXPByIput(xpByInput);

    onMonsterXPChange(getTotalXP(xpByInput));
  };
  return (
    <div>
      {Object.keys(xpByInput).map(inputId => (
        <MonsterInput
          key={inputId}
          id={parseInt(inputId, 10)}
          onRemove={handleRemoveInput}
          onXPChange={handleInputXPChange}
        />
      ))}
      <button onClick={handleAddInput}>Add row</button>
    </div>
  );
};
