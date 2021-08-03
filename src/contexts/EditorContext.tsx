import React, { useState } from 'react';
import { Note, Notes } from '../Types';

interface EditorContextInterface {
  notes: Notes,
  selectedNote: Note,
  updateSelectedNote: (note: Note) => any,
  updateSelectedNoteIndex: (id: number) => any
}

export const EditorContext = React.createContext<EditorContextInterface>({
  notes: [],
  selectedNote: { title: '', content: '' },
  updateSelectedNote: () => { },
  updateSelectedNoteIndex: () => { }
});

export const EditorContextProvider: React.FunctionComponent<{ notes?: Notes }> = ({ children, notes: inputNotes }) => {
  const [notes, setNotes] = useState(inputNotes || [{ title: '', content: '' }])
  const [selectedNoteIndex, updateSelectedNoteIndex] = useState(0);
  const updateSelectedNote = (note: Note) => {
    setNotes(Object.assign([], notes, { [selectedNoteIndex]: note }));
  }
  return <EditorContext.Provider value={
    {
      notes,
      selectedNote: notes[selectedNoteIndex],
      updateSelectedNote,
      updateSelectedNoteIndex
    }} >
    {children}
  </EditorContext.Provider >
}