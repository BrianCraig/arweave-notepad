import { JWKInterface } from 'arweave/node/lib/wallet';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { WalletProviderContextProvider } from './ProviderContext';

export enum EditorUploadStages {
  closed,
  password,
  provider,
  uploading,
  done
}

const useStartStop = (initialState: boolean = false): [boolean, () => void, () => void] => {
  const [val, set] = useState<boolean>(initialState);
  return [val, useCallback(() => set(true), [set]), useCallback(() => set(false), [set])]
}

interface EditorUploadContextInterface {
  stage: EditorUploadStages,
  setStage: Dispatch<SetStateAction<EditorUploadStages>>,
  setProvider: (key: any) => void,
  startUploading: () => void,
  stopUploading: () => void
}

export const EditorUploadContext = React.createContext<EditorUploadContextInterface>({
  stage: EditorUploadStages.closed,
  setStage: () => { },
  setProvider: () => { },
  startUploading: () => { },
  stopUploading: () => { }
});

export const EditorUploadContextProvider: React.FunctionComponent = ({ children }) => {
  const [stage, setStage] = useState<EditorUploadStages>(EditorUploadStages.closed)
  const [provider, setProvider] = useState<JWKInterface | null>(null)
  const addProviderContext = provider !== null && (stage === EditorUploadStages.uploading || EditorUploadStages.done)
  return <EditorUploadContext.Provider value={
    {
      stage,
      setStage,
      setProvider,
      startUploading: useCallback(() => setStage(EditorUploadStages.password), []),
      stopUploading: useCallback(() => setStage(EditorUploadStages.closed), [])
    }} >
    {
      addProviderContext ?
        <WalletProviderContextProvider walletKey={provider as JWKInterface}>{children}</WalletProviderContextProvider> :
        children
    }
  </EditorUploadContext.Provider >
}