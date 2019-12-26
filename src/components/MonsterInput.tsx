import React, { FormEvent, useState, useEffect } from 'react';
import styled from 'styled-components';

import { CR_LIST } from '../util/calculateMonsterXP';
import InlineInput from './styled/InlineInput';

interface ValidatedInputProps {
  isValid: boolean;
}

const ValidatedInput = styled(InlineInput)`
  border-color: ${(props: ValidatedInputProps): string =>
    props.isValid ? 'initial' : 'red'};
`;

interface MonsterInputProps {
  id: number;
  onRemove(id: number): void;
  onChange(id: number, newCount: number, newCR: string): void;
}

const validateCR = (CR: string): boolean => {
  return CR_LIST.includes(CR);
};

const MonsterInput = (props: MonsterInputProps): JSX.Element => {
  const { id, onRemove, onChange } = props;

  const [count, setCount] = useState<number>(0);
  const [CR, setCR] = useState<string>('0');
  const [isCRValid, setIsCRValid] = useState<boolean>(true);

  const handleCountChange = (evt: FormEvent<HTMLInputElement>): void =>
    setCount(parseInt(evt.currentTarget.value, 10));
  const handleCRChange = (evt: FormEvent<HTMLInputElement>): void => {
    setCR(evt.currentTarget.value);
  };
  const handleRemove = (): void => onRemove(id);

  useEffect(() => {
    if (validateCR(CR)) {
      onChange(id, count, CR);
      setIsCRValid(true);
    } else {
      setIsCRValid(false);
    }
  }, [count, CR]);
  return (
    <tr>
      <td>
        <InlineInput onChange={handleCountChange} type="text" value={count} />
      </td>
      <td>
        <ValidatedInput
          isValid={isCRValid}
          onChange={handleCRChange}
          value={CR}
        />
      </td>
      <td>
        <button onClick={handleRemove}>X</button>
      </td>
    </tr>
  );
};

export default MonsterInput;
