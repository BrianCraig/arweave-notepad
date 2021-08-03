import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface EncryptionContextInterface {
  setPassword: Dispatch<SetStateAction<string>>,
  decrypt: (input: any) => any,
  encrypt: (input: any) => any,
  hasPassword: boolean
}

export const EncryptionContext = React.createContext<EncryptionContextInterface>({
  setPassword: () => { },
  decrypt: () => { },
  encrypt: () => { },
  hasPassword: false
});

export const EncryptionContextProvider: React.FunctionComponent = ({ children }) => {
  const [password, setPassword] = useState('');

  const decrypt = useCallback(() => password, [password])
  const encrypt = useCallback(() => password, [password])

  return <EncryptionContext.Provider value={
    {
      setPassword,
      decrypt,
      encrypt,
      hasPassword: password !== ''
    }} >
    {children}
  </EncryptionContext.Provider >
}

//crypto.subtle.digest('SHA-256', (new TextEncoder()).encode("Hi")).then(console.log)

/*

const rawKey = window.crypto.getRandomValues(new Uint8Array(16));

function importSecretKey(rawKey) {
  return window.crypto.subtle.importKey(
    "raw",
    rawKey,
    "AES-CBC",
    true,
    ["encrypt", "decrypt"]
  );
}

*/