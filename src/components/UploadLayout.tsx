import { useContext } from 'react'
import {
  Button,
  Header,
  Input,
  Modal
} from 'semantic-ui-react'
import { EditorContext } from '../contexts/EditorContext'
import { EditorUploadContext } from '../contexts/EditorUploadContext'
import { EncryptionContext } from '../contexts/EncryptionContext'

export const UploadLayout = () => {
  return <UploadModal />
}

const UploadModal = () => {
  const { uploading, startUploading, stopUploading } = useContext(EditorUploadContext)
  const { encrypt, setPassword, hasKey } = useContext(EncryptionContext)
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
        disabled={!hasKey}
        onClick={() => encrypt(notes)}
        positive
      />
    </Modal.Actions>
  </Modal>
}