import moment from "moment";
import { useState } from "react";

export function FormatDate(data, template) {
  if (data == null) return data;
  if (template === undefined) template = "DD MMM YYYY";
  return moment(new Date(data)).format(template);
}

export function FormatNumber(data) {
  if (data == null) return data;
  return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function Format(data, template) {
  if (data == null) return data;
  else if (data !== "Invalid Date") {
    if (template === undefined) template = "DD MMM YYYY";
    return moment(new Date(data)).format(template);
  } else if (!isNaN(data)) {
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else if (new Date(data) !== "Invalid Date" && !isNaN(new Date(data))) {
    if (template === undefined) template = "DD MMM YYYY";
    return moment(new Date(data)).format(template);
  } else return data;
}

// Hook
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // setting last update
      window.localStorage.setItem(key + "_lastUpdate", new Date().getTime());
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
export function expiredStorage(key) {
  return window.localStorage.getItem(key + "_lastUpdate") === null;
  // const last = (window.localStorage.getItem(key + "_lastUpdate") || -1) * 1;
  // if (last < 0) return true;
  // const now = new Date().getTime();
  // const tresshold = 2 * 60 * 1000; // 2 minutes
  // return now - last > tresshold;
}

export function evict(prefix) {
  prefix += "_";
  for (const key in window.localStorage) {
    if (key.indexOf(prefix) === 0) {
      window.localStorage.removeItem(key);
    }
  }
}
