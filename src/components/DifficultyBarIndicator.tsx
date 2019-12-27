import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Tether from 'Tether';

interface DifficultyBarIndicatorWrapperProps {
  left: number;
}

const DifficultyBarIndicatorWrapper = styled.div`
  background-color: #000;
  bottom: 0;
  height: 100%;
  left: ${(props: DifficultyBarIndicatorWrapperProps): number => props.left}%;
  position: absolute;
  width: 1px;
`;

interface DifficultyBarIndicatorProps {
  monsterXP: number;
  xpBudgetPercent: number;
}

type MaybeTether = Tether | undefined;

const DifficultyBarIndicator = (
  props: DifficultyBarIndicatorProps,
): JSX.Element => {
  const { monsterXP, xpBudgetPercent } = props;
  const indicator = useRef<HTMLDivElement>(null);
  const tooltip = useRef<HTMLDivElement>(null);
  let tether: MaybeTether;

  useEffect(() => {
    const indicatorEl = indicator.current;
    const tooltipEl = tooltip.current;
    if (tether) {
      tether.destroy();
    }
    tether = new Tether({
      attachment: 'bottom center',
      element: tooltipEl,
      target: indicatorEl,
      targetAttachment: 'top center',
    });
  }, [monsterXP, xpBudgetPercent]);
  return (
    <>
      <DifficultyBarIndicatorWrapper left={xpBudgetPercent} ref={indicator} />
      <div ref={tooltip}>{monsterXP}</div>
    </>
  );
};

export default DifficultyBarIndicator;
