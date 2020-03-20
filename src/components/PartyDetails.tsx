import React, { FormEvent } from 'react';

import InlineInput from './styled/InlineInput';

interface PartyDetailsProps {
  charCount: string;
  charLevel: string;
  onCharCountChange(evt: FormEvent<HTMLInputElement>): void;
  onCharLevelChange(evt: FormEvent<HTMLInputElement>): void;
}

const PartyDetails = (props: PartyDetailsProps): JSX.Element => {
  const { charCount, charLevel, onCharCountChange, onCharLevelChange } = props;

  return (
    <React.Fragment>
      <h2>Enter party details</h2>
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
                onChange={onCharCountChange}
                type="text"
                value={charCount}
              />
            </td>
            <td>
              <InlineInput
                name="charLevel"
                onChange={onCharLevelChange}
                type="text"
                value={charLevel}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default PartyDetails;
