
import React from 'react'
import { EditorLayout } from '../components/EditorLayout'
import { EditorContextProvider } from '../contexts/EditorContext'

export const Editor: React.FunctionComponent<{ new?: boolean }> = () =>
  <EditorContextProvider>
    <EditorLayout />
  </EditorContextProvider>