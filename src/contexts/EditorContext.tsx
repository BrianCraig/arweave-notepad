import React, { Dispatch, SetStateAction, useState } from 'react';
import { Notes } from '../Types';

interface EditorContextInterface {
  uploading: boolean,
  setUploading: Dispatch<SetStateAction<boolean>>
  notes: Notes,
  setNotes: Dispatch<SetStateAction<Notes>>
}

export const EditorContext = React.createContext<EditorContextInterface>({
  uploading: false,
  setUploading: () => { },
  notes: [],
  setNotes: () => { }
});

export const EditorContextProvider: React.FunctionComponent<{ notes?: Notes }> = ({ children, notes: inputNotes }) => {
  const [uploading, setUploading] = useState(false)
  const [notes, setNotes] = useState(inputNotes || [{ title: '', content: '' }])
  return <EditorContext.Provider value={
    {
      uploading,
      setUploading,
      notes,
      setNotes
    }} >
    {children}
  </EditorContext.Provider >
}