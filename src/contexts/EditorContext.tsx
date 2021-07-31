import React, { Dispatch, SetStateAction, useState } from 'react';

interface EditorContextInterface {
  uploading: boolean,
  setUploading: Dispatch<SetStateAction<boolean>>
}

export const EditorContext = React.createContext<EditorContextInterface>({
  uploading: false,
  setUploading: () => { },
});

export const EditorContextProvider: React.FunctionComponent = ({ children }) => {
  const [uploading, setUploading] = useState(false)
  return <EditorContext.Provider value={
    {
      uploading,
      setUploading
    }} >
    {children}
  </EditorContext.Provider >
}