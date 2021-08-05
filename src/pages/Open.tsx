import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from 'use-http'
import { EncryptionContext, EncryptionContextProvider } from '../contexts/EncryptionContext';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { EditorContextProvider } from '../contexts/EditorContext';
import { Notes } from '../Types';
import { EditorLayout } from '../components/EditorLayout';
import { EditorUploadContextProvider } from '../contexts/EditorUploadContext';

const OpenLayout = () => {
  let { resourceid } = useParams<{ resourceid: string }>();
  const { loading, error, data } = useFetch<Buffer>(`/${resourceid}.bson`, { data: [], responseType: 'arrayBuffer' }, [resourceid])
  const { setPassword, decrypt } = useContext(EncryptionContext)
  const [decryptedData, setDecryptedData] = useState<Notes | undefined>();
  if (decryptedData) {
    return <EditorContextProvider notes={decryptedData}>
      <EditorUploadContextProvider>
        <EditorLayout />
      </EditorUploadContextProvider>
    </EditorContextProvider>
  }

  return <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 800 }}>
      <Header as='h2' textAlign='center'>
        Access your notepad
      </Header>
      {error && <Message error>
        The resource '{resourceid}' isn't a notepad, check the URL
      </Message>}
      <Form size='large'>
        <Segment stacked>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={evt => setPassword(evt.target.value)}
          />
          <Button color='teal' fluid size='large' onClick={() => decrypt(data!).then(setDecryptedData).catch(e => alert(e))} loading={loading} disabled={!!error}>
            Decrypt
          </Button>
        </Segment>
      </Form>
      <Message>
        Don't have a notepad? <Link to={"/new"}>Create a new one</Link>
      </Message>
    </Grid.Column>
  </Grid>
}

export const Open: React.FunctionComponent = () => {
  return <EncryptionContextProvider>
    <OpenLayout />
  </EncryptionContextProvider>
}