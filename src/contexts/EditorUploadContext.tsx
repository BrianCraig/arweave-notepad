import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

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
  startUploading: () => void,
  stopUploading: () => void
}

export const EditorUploadContext = React.createContext<EditorUploadContextInterface>({
  stage: EditorUploadStages.closed,
  setStage: () => { },
  startUploading: () => { },
  stopUploading: () => { }
});

export const EditorUploadContextProvider: React.FunctionComponent = ({ children }) => {
  const [stage, setStage] = useState<EditorUploadStages>(EditorUploadStages.closed)
  return <EditorUploadContext.Provider value={
    {
      stage,
      setStage,
      startUploading: useCallback(() => setStage(EditorUploadStages.password), []),
      stopUploading: useCallback(() => setStage(EditorUploadStages.closed), [])
    }} >
    {children}
  </EditorUploadContext.Provider >
}