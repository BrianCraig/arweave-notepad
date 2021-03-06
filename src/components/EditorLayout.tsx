import React, { useContext } from 'react'
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Input,
  Menu,
  TextArea
} from 'semantic-ui-react'
import { EditorContext } from '../contexts/EditorContext'
import { EditorUploadContext } from '../contexts/EditorUploadContext'
import { UploadLayout } from './UploadLayout'

const style = {
  h1: {
    paddingTop: '3em',
  },
  textarea: {
    marginTop: '1em'
  }
}

const EditorButtons = () => {
  const { startUploading } = useContext(EditorUploadContext)
  const { deleteSelectedNote } = useContext(EditorContext);
  return <>
    <Button color={'red'} onClick={deleteSelectedNote}>
      Remove Note
    </Button>
    <Button primary onClick={startUploading}>
      Save changes to Arweave Ledger
    </Button>
  </>
}

const MenuItems: React.FunctionComponent = () => {
  const { notes, selectedNote, updateSelectedNoteIndex } = useContext(EditorContext);
  return <>{notes.map((note, index) =>
    <Menu.Item
      children={note.title}
      key={index}
      active={selectedNote === note}
      onClick={() => updateSelectedNoteIndex(index)}
    />
  )}</>
}

interface MyEventTarget extends EventTarget {
  value: string
}

export const EditorForm = () => {
  const { selectedNote, updateSelectedNote } = useContext(EditorContext)
  const updateEvent = (value: 'title' | 'content') => (event: React.ChangeEvent<MyEventTarget>) => {
    updateSelectedNote({ ...selectedNote, [value]: event.target.value })
  }

  return <Form>
    <Input fluid transparent size='massive' placeholder='Title...' onChange={updateEvent('title')} value={selectedNote.title} />
    <TextArea placeholder='Your notes...' value={selectedNote.content} style={style.textarea} onChange={updateEvent('content')} rows={20} />
  </Form>
}

const NewNote = () => {
  const { createNote } = useContext(EditorContext);
  return <Button primary fluid onClick={createNote}>
    New note
  </Button>
}

export const EditorLayout = () =>
  <>
    <UploadLayout />
    <Header as='h1' content='My Notepad' style={style.h1} textAlign='center' />
    <Container>
      <Grid columns={2} stackable>
        <Grid.Column width={4}>
          <Menu fluid vertical>
            <MenuItems />
          </Menu>
          <NewNote />
        </Grid.Column>
        <Grid.Column width={12}>
          <EditorForm />
          <Divider />
          <Grid>
            <Grid.Column>
              <EditorButtons />
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </Container>
  </>