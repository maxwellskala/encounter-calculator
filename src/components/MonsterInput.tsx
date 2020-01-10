import React, { FormEvent, useState, useEffect } from 'react';
import styled from 'styled-components';

import { calculateMonsterXP, CR_LIST } from '../util/calculateMonsterXP';
import InlineInput from './styled/InlineInput';

interface HideableTextProps {
  isVisible: boolean;
}

const HideableText = styled.p`
  opacity: ${(props: HideableTextProps): string =>
    props.isVisible ? '1' : '0'};
  width: 150px;
`;

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

interface MonsterInputXPValueProps {
  count: string;
  CR: string;
  isCountValid: boolean;
  isCRValid: boolean;
  isInputHovered: boolean;
}

const MonsterInputXPValue = (
  props: MonsterInputXPValueProps,
): JSX.Element | null => {
  const { count, CR, isCountValid, isCRValid, isInputHovered } = props;

  let xpNote: string;
  if (!isCountValid || !isCRValid) {
    xpNote = 'Cannot calculate XP';
  } else {
    const parsedCount = parseInt(count, 10);
    const xpValue = calculateMonsterXP(parsedCount, CR);
    xpNote = `Base XP value: ${xpValue}`;
  }

  return <HideableText isVisible={isInputHovered}>{xpNote}</HideableText>;
};

const MonsterInput = (props: MonsterInputProps): JSX.Element => {
  const { id, onRemove, onChange } = props;

  const [count, setCount] = useState<string>('0');
  const [isCountValid, setIsCountValid] = useState<boolean>(true);
  const handleCountChange = (evt: FormEvent<HTMLInputElement>): void => {
    const count: string = evt.currentTarget.value;
    if (isNaN(parseInt(count, 10))) {
      setIsCountValid(false);
    } else {
      setIsCountValid(true);
    }
    setCount(count);
  };

  const [CR, setCR] = useState<string>('0');
  const [isCRValid, setIsCRValid] = useState<boolean>(true);
  const handleCRChange = (evt: FormEvent<HTMLInputElement>): void => {
    const newCR = evt.currentTarget.value;
    if (validateCR(newCR)) {
      setIsCRValid(true);
    } else {
      setIsCRValid(false);
    }
    setCR(newCR);
  };

  const handleRemove = (): void => onRemove(id);

  useEffect(() => {
    if (isCountValid && isCRValid) {
      const parsedCount = parseInt(count, 10);
      onChange(id, parsedCount, CR);
    }
  }, [count, CR, isCountValid, isCRValid]);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };
  return (
    <tr onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <td>
        <ValidatedInput
          isValid={isCountValid}
          onChange={handleCountChange}
          type="text"
          value={count}
        />
      </td>
      <td>
        <ValidatedInput
          isValid={isCRValid}
          onChange={handleCRChange}
          type="text"
          value={CR}
        />
      </td>
      <td>
        <button onClick={handleRemove}>X</button>
      </td>
      <td>
        <MonsterInputXPValue
          count={count}
          CR={CR}
          isCountValid={isCountValid}
          isCRValid={isCRValid}
          isInputHovered={isHovered}
        />
      </td>
    </tr>
  );
};

export default MonsterInput;
