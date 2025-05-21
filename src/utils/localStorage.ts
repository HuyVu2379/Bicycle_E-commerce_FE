export const setValueInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("tokenChanged")); 
};
export const removeValueInLocalStorage = (key: string) => {
  localStorage.removeItem(key);
  window.dispatchEvent(new Event("tokenChanged")); 
};
export const getValueFromLocalStorage = (key: string) => {
  const value: string | null = localStorage.getItem(key);
  return value !== null ? value : '""';
};

