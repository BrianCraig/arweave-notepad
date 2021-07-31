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