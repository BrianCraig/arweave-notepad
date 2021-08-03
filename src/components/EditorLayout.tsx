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
  Modal,
  TextArea
} from 'semantic-ui-react'
import { EditorContext } from '../contexts/EditorContext'
import { EditorUploadContext } from '../contexts/EditorUploadContext'
import { EncryptionContext } from '../contexts/EncryptionContext'

const UploadModal = () => {
  const { uploading, startUploading, stopUploading } = useContext(EditorUploadContext)
  const { encrypt, setPassword } = useContext(EncryptionContext)
  const { notes } = useContext(EditorContext);
  return <Modal
    onClose={stopUploading}
    onOpen={startUploading}
    open={uploading}
  >
    <Modal.Header>Save changes to Arweawe Ledger</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Define a password for your notepad</Header>
        <p>
          This password will be asked whenever you open your notepad, keep in mind that there is no way for restoring it, so please make a paper copy.
        </p>
        <Input placeholder='Password...' type='password' onChange={evt => setPassword(evt.target.value)} />
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color='black' onClick={stopUploading}>
        Cancel
      </Button>
      <Button
        content="Proceed"
        labelPosition='right'
        icon='checkmark'
        onClick={() => encrypt(notes)}
        positive
      />
    </Modal.Actions>
  </Modal>
}

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
  return <>
    <Button color={'red'} disabled>
      Discard Note Changes
    </Button>
    <Button color={'red'} disabled>
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

export const EditorLayout = () =>
  <>
    <UploadModal />
    <Header as='h1' content='My Notepad' style={style.h1} textAlign='center' />
    <Container>
      <Grid columns={2} stackable>
        <Grid.Column width={4}>
          <Menu fluid vertical>
            <MenuItems />
          </Menu>
          <Button primary fluid>
            New note
          </Button>
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