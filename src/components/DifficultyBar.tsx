import React, { Fragment } from 'react';
import styled from 'styled-components';

import { DIFFICULTY_TO_COLOR } from '../lib/constants';
import { Difficulty, xpThreshold } from '../util/calculatePartyXPThresholds';

const DifficultyBarWrapper = styled.div`
  height: 50px;
  position: relative;
`;

interface DifficultyBarSectionProps {
  difficulty: Difficulty;
  left: number;
  width: number;
}

const DifficultyBarSection = styled.div`
  background-color: ${(props: DifficultyBarSectionProps): string =>
    DIFFICULTY_TO_COLOR[props.difficulty]};
  height: 100%;
  left: ${(props: DifficultyBarSectionProps): number => props.left}%;
  position: absolute;
  width: ${(props: DifficultyBarSectionProps): number => props.width}%;
`;

interface DifficultyBarLabelProps {
  left: number;
}

const DifficultyBarLabel = styled.p`
  bottom: 0;
  left: ${(props: DifficultyBarLabelProps): number => props.left}%;
  position: absolute;
`;

interface DifficultyBarIndicatorProps {
  left: number;
}

const DifficultyBarIndicator = styled.div`
  background-color: #000;
  bottom: 0;
  height: 100%;
  left: ${(props: DifficultyBarLabelProps): number => props.left}%;
  position: absolute;
  width: 1px;
`;

type MinMax = {
  min: number;
  max: number;
};

type DifficultyMinMax = {
  [key: string]: MinMax;
};

const calculateDifficultyMinMaxes = (
  xpThreshold: xpThreshold,
  monsterXP: number,
): DifficultyMinMax => {
  const difficulties = Object.keys(xpThreshold);
  return difficulties.reduce((acc: DifficultyMinMax, key, index) => {
    const min = xpThreshold[key];
    const nextDifficulty = difficulties[index + 1];
    let max;
    if (nextDifficulty) {
      max = xpThreshold[nextDifficulty] - 1;
    } else {
      // at 'deadly'
      const naiveDeadlyMax = min * 1.25;
      max = naiveDeadlyMax > monsterXP ? naiveDeadlyMax : monsterXP;
    }
    acc[key] = {
      min,
      max,
    };
    return acc;
  }, {});
};

interface DifficultyBarProps {
  monsterXP: number;
  partyXPThresholds: xpThreshold;
}

const DifficultyBar = (props: DifficultyBarProps): JSX.Element => {
  const { monsterXP, partyXPThresholds } = props;
  if (!partyXPThresholds) {
    return null;
  }

  const thresholdMinMaxes = calculateDifficultyMinMaxes(
    partyXPThresholds,
    monsterXP,
  );
  const totalWidth =
    thresholdMinMaxes['deadly']['max'] - thresholdMinMaxes['easy']['min'];
  let percentWidthTaken = 0;
  const xpBudgetPercent =
    ((monsterXP - thresholdMinMaxes['easy']['min']) / totalWidth) * 100;

  return (
    <DifficultyBarWrapper>
      {Object.keys(thresholdMinMaxes).map((difficulty: Difficulty) => {
        const { min, max } = thresholdMinMaxes[difficulty];
        // eliminate gap between thresholds: a difficulty has a max XP
        // of X and the next difficulty up has a max of X + 1, so there
        // is a gap of 1 unit of XP in the visual (per threshold step)
        // without this correction
        const finalMax = difficulty !== 'deadly' ? max + 1 : max;
        const width = ((finalMax - min) / totalWidth) * 100;
        const left = percentWidthTaken;
        percentWidthTaken += width;
        return (
          <Fragment key={`section=${difficulty}`}>
            <DifficultyBarSection
              difficulty={difficulty}
              left={left}
              width={width}
            />
            <DifficultyBarLabel left={left}>{min}</DifficultyBarLabel>
          </Fragment>
        );
      })}
      <DifficultyBarIndicator left={xpBudgetPercent} />
    </DifficultyBarWrapper>
  );
};

export default DifficultyBar;
