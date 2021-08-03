import React, { useContext } from 'react'
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Menu,
  Modal,
  TextArea
} from 'semantic-ui-react'
import { EditorContext } from '../contexts/EditorContext'

const UploadModal = () => {
  const { uploading, setUploading } = useContext(EditorContext)
  return <Modal
    onClose={() => setUploading(false)}
    onOpen={() => setUploading(true)}
    open={uploading}
  >
    <Modal.Header>Save changes to Arweawe Ledger</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Define a password for your notepad</Header>
        <p>
          This password will be asked whenever you open your notepad, keep in mind that there is no way for restoring it, so please make a paper copy.
        </p>
        <Input placeholder='Password...' type='password' />
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color='black' onClick={() => setUploading(false)}>
        Cancel
      </Button>
      <Button
        content="Proceed"
        labelPosition='right'
        icon='checkmark'
        onClick={() => setUploading(false)}
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
  const { setUploading } = useContext(EditorContext);
  return <>
    <Button color={'red'} disabled>
      Discard Note Changes
    </Button>
    <Button color={'red'} disabled>
      Remove Note
    </Button>
    <Button primary onClick={() => setUploading(true)}>
      Save changes to Arweave Ledger
    </Button>
  </>
}

export const EditorLayout = () =>
  <>
    <UploadModal />
    <Header as='h1' content='My Notepad' style={style.h1} textAlign='center' />
    <Container>
      <Grid columns={2} stackable>
        <Grid.Column width={4}>
          <Menu fluid vertical>
            <Menu.Item>
              NoteX
            </Menu.Item>
            <Menu.Item>
              NoteY
            </Menu.Item>
            <Menu.Item active>
              NoteZ
            </Menu.Item>
            <Menu.Item icon='unlocked' >
              <Icon name='hdd outline' />
              NoteZ
            </Menu.Item>
            <Menu.Item>
              NoteZ
            </Menu.Item>
            <Menu.Item>
              NoteZ
            </Menu.Item>
          </Menu>
          <Button primary fluid>
            New note
          </Button>
        </Grid.Column>
        <Grid.Column width={12}>
          <Form>
            <Input transparent size='massive' placeholder='Title...' />
            <TextArea placeholder='Your notes...' style={style.textarea} rows={20} />
          </Form>
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