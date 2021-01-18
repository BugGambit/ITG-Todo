import { useState } from "react";

const TOKEN_KEY = "token";

export function getApiKeyFromLocalStorage() {
  return localStorage.getItem(TOKEN_KEY);
}

export default function useApiKey() {
  const [, setTmp] = useState("");
  const apiKey = getApiKeyFromLocalStorage();
  const setApiKey = (apiKey: string) => {
    localStorage.setItem(TOKEN_KEY, apiKey);
    setTmp(apiKey);
  };
  return { apiKey, setApiKey };
}
