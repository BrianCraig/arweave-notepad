import React, { useCallback, useState } from 'react';

const useStartStop = (initialState: boolean = false): [boolean, () => void, () => void] => {
  const [val, set] = useState<boolean>(initialState);
  return [val, useCallback(() => set(true), [set]), useCallback(() => set(false), [set])]
}

interface EditorUploadContextInterface {
  uploading: boolean,
  startUploading: () => void,
  stopUploading: () => void
}

export const EditorUploadContext = React.createContext<EditorUploadContextInterface>({
  uploading: false,
  startUploading: () => { },
  stopUploading: () => { }
});

export const EditorUploadContextProvider: React.FunctionComponent = ({ children }) => {
  const [uploading, startUploading, stopUploading] = useStartStop(false)
  return <EditorUploadContext.Provider value={
    {
      uploading,
      startUploading,
      stopUploading
    }} >
    {children}
  </EditorUploadContext.Provider >
}