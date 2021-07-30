
import React, { Component } from 'react'
import { createMedia } from '@artsy/fresnel'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Label,
  List,
  Menu,
  Segment,
  Sidebar,
  TextArea,
  Visibility,
} from 'semantic-ui-react'
import { EditorContextProvider } from '../contexts/EditorContext'

const style = {
  h1: {
    paddingTop: '3em',
  },
  textarea: {
    marginTop: '1em'
  }
}

const EditorLayout = () =>
  <>
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
              <Button color={'red'} disabled>
                Discard Note Changes
              </Button>
              <Button color={'red'} disabled>
                Remove Note
              </Button>
              <Button primary>
                Save changes to Arweave Ledger
              </Button>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </Container>
  </>


export const Editor = () =>
  <EditorContextProvider>
    <EditorLayout />
  </EditorContextProvider>