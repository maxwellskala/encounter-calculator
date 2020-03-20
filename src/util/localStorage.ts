export const persistCharLevel = (level: string): void => {
  const storage = window.localStorage;
  storage.setItem('characterLevel', level);
};

export const getPersistedCharLevel = (): string => {
  const storage = window.localStorage;
  const level = storage.getItem('characterLevel');
  if (level) {
    return level;
  }
  return '1';
};

export const persistCharCount = (count: string): void => {
  const storage = window.localStorage;
  storage.setItem('characterCount', count);
};

export const getPersistedCharCount = (): string => {
  const storage = window.localStorage;
  const count = storage.getItem('characterCount');
  if (count) {
    return count;
  }
  return '1';
};
