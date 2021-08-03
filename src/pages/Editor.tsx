
import React from 'react'
import { EditorLayout } from '../components/EditorLayout'
import { EditorContextProvider } from '../contexts/EditorContext'
import { EditorUploadContextProvider } from '../contexts/EditorUploadContext'

export const Editor: React.FunctionComponent<{ new?: boolean }> = () =>
  <EditorContextProvider>
    <EditorUploadContextProvider>
      <EditorLayout />
    </EditorUploadContextProvider>
  </EditorContextProvider>