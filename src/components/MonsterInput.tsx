import React, { FormEvent, useState, useEffect } from 'react';

interface MonsterInputProps {
  id: number;
  onRemove(id: number): void;
  onChange(id: number, newCount: number, newCR: string): void;
}

export default (props: MonsterInputProps) => {
  const { id, onRemove, onChange } = props;

  const [count, setCount] = useState<number>(0);
  const [CR, setCR] = useState<string>('0');

  const handleCountChange = (evt: FormEvent<HTMLInputElement>) =>
    setCount(parseInt(evt.currentTarget.value, 10));
  const handleCRChange = (evt: FormEvent<HTMLInputElement>) =>
    setCR(evt.currentTarget.value);
  const handleRemove = () => onRemove(id);

  useEffect(() => {
    onChange(id, count, CR);
  }, [count, CR]);
  return (
    <div>
      <input onChange={handleCountChange} type="text" value={count} />
      <label>
        monsters of CR
        <input onChange={handleCRChange} type="text" value={CR} />
      </label>
      <button onClick={handleRemove}>Remove row</button>
    </div>
  );
};
