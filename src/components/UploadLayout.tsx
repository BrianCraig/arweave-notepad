import React, { useContext, useEffect } from 'react'
import {
  Button,
  Card,
  Header,
  Input,
  Modal
} from 'semantic-ui-react'
import { EditorUploadContext, EditorUploadStages } from '../contexts/EditorUploadContext'
import { EncryptionContext, EncryptionContextProvider } from '../contexts/EncryptionContext'

import { useFilePicker } from 'use-file-picker'
import { ProviderContext } from '../contexts/ProviderContext'


const PasswordStage = () => {
  const { setPassword, hasKey } = useContext(EncryptionContext)
  const { setStage, stopUploading } = useContext(EditorUploadContext)
  return <>
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
        onClick={() => setStage(EditorUploadStages.provider)}
        positive
      />
    </Modal.Actions>
  </>
}

const ProviderWalletCard = () => {
  const { setProvider } = useContext(EditorUploadContext)

  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    accept: '.json',
    multiple: false,
  });

  const file = filesContent[0]
  useEffect(() => {
    if (file) {
      setProvider(JSON.parse(file.content))
    }
  }, [file, setProvider])

  return <Card onClick={openFileSelector}>
    <Card.Content>
      <Card.Header>Use your wallet file</Card.Header>
      <Card.Description>
        Click to Select your wallet file
      </Card.Description>
      {loading && <Card.Description>
        Loading...
      </Card.Description>}
      {filesContent.map((file) => (
        <Card.Description>
          <b>{file.name}</b> selected
        </Card.Description>
      ))}
    </Card.Content>
  </Card>
}

const ProviderStage = () => {
  const { setStage, stopUploading } = useContext(EditorUploadContext)
  return <>
    <Modal.Header>Save changes to Arweawe Ledger</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Define a provider for storing your notepad</Header>
        <Card.Group>
          <Card>
            <Card.Content>
              <Card.Header>ArConnect</Card.Header>
              <Card.Meta>May contain additional fees</Card.Meta>
              <Card.Description>
                Click to Link to your ArConnect Plugin
              </Card.Description>
            </Card.Content>
          </Card>
          <ProviderWalletCard />
        </Card.Group>
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
        onClick={() => setStage(EditorUploadStages.uploading)}
        positive
      />
    </Modal.Actions>
  </>
}

const UploadingStage = () => {
  const { readyToDeploy, deploy, deployedAt, price, deployed } = useContext(ProviderContext)
  const { setStage, stopUploading } = useContext(EditorUploadContext)
  return <>
    <Modal.Header>Save changes to Arweawe Ledger</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Upload notepad</Header>
        <Button color='black' onClick={deploy} disabled={!readyToDeploy}>
          Start Uploading
        </Button>
        {price && <p>Transaction costs {price} AR.</p>}
        {deployedAt && <p>ID will be {deployedAt}.</p>}
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
        disabled={!deployed}
        onClick={() => setStage(EditorUploadStages.done)}
        positive
      />
    </Modal.Actions>
  </>
}

const DoneStage = () => {
  const { stopUploading } = useContext(EditorUploadContext)
  return <>
    <Modal.Header>Save changes to Arweawe Ledger</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Your notepad has been uploaded!</Header>
        <p>
          Your new url is xxx
        </p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color='black' onClick={stopUploading}>
        Close
      </Button>
    </Modal.Actions>
  </>
}


const stagesComponentMap: Record<EditorUploadStages, React.FunctionComponent> = {
  [EditorUploadStages.closed]: () => null,
  [EditorUploadStages.password]: PasswordStage,
  [EditorUploadStages.provider]: ProviderStage,
  [EditorUploadStages.uploading]: UploadingStage,
  [EditorUploadStages.done]: DoneStage,
}

const UploadModal = () => {
  const { stage, startUploading, stopUploading } = useContext(EditorUploadContext)
  const StageComponent = stagesComponentMap[stage]
  return <Modal
    onClose={stopUploading}
    onOpen={startUploading}
    open={stage !== EditorUploadStages.closed}
  >
    <StageComponent />
  </Modal>
}

export const UploadLayout = () => {
  return <EncryptionContextProvider>
    <UploadModal />
  </EncryptionContextProvider>
}