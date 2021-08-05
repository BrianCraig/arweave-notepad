import React, { useCallback, useState } from 'react';
import { Note, Notes } from '../Types';

const emptyNote: Note = { title: 'Title', content: '' }

interface EditorContextInterface {
  notes: Notes,
  selectedNote: Note,
  updateSelectedNote: (note: Note) => void,
  updateSelectedNoteIndex: (id: number) => void,
  deleteSelectedNote: () => void,
  createNote: () => void
}

export const EditorContext = React.createContext<EditorContextInterface>({
  notes: [],
  selectedNote: { title: '', content: '' },
  updateSelectedNote: () => { },
  updateSelectedNoteIndex: () => { },
  deleteSelectedNote: () => { },
  createNote: () => { }
});

export const EditorContextProvider: React.FunctionComponent<{ notes?: Notes }> = ({ children, notes: inputNotes }) => {
  const [notes, setNotes] = useState(inputNotes || [emptyNote])
  const [selectedNoteIndex, updateSelectedNoteIndex] = useState(0);
  const updateSelectedNote = useCallback((note: Note) => {
    setNotes(Object.assign([], notes, { [selectedNoteIndex]: note }));
  }, [notes, selectedNoteIndex])
  const deleteSelectedNote = useCallback(() => {
    let newNotes = notes.filter((_, index) => index !== selectedNoteIndex)
    if (newNotes.length === 0) {
      newNotes = [emptyNote]
    }
    setNotes(newNotes);
    updateSelectedNoteIndex(Math.max(0, selectedNoteIndex - 1))
  }, [notes, selectedNoteIndex])
  const createNote = useCallback(() => {
    setNotes([...notes, emptyNote]);
    updateSelectedNoteIndex(notes.length)
  }, [notes])

  return <EditorContext.Provider value={
    {
      notes,
      selectedNote: notes[selectedNoteIndex],
      updateSelectedNote,
      updateSelectedNoteIndex,
      deleteSelectedNote,
      createNote
    }} >
    {children}
  </EditorContext.Provider >
}