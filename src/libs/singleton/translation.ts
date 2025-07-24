let _translator: ((key: string, params?: any) => string) | null = null;

export const setTranslator = (translator: (key: string, params?: any) => string) => {
  _translator = translator;
};

export const getTranslator = () => {
  return _translator;
};

export const tProvider = (key: string, params?: any): string => {
  if (!_translator) {
    console.warn('Translator not initialized, returning key:', key);
    return key;
  }
  return _translator(key, params);
};
