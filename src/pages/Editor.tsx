
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
import whiteImage from './white-image.png'

const style = {
  h1: {
    paddingTop: '3em',
  },
  textarea: {
    marginTop: '1em'
  }
}


export const Editor = () =>
  <>
    <Header as='h1' content='My Notepad' style={style.h1} textAlign='center' />
    <Container>
      <Grid columns={2} stackable>
        <Grid.Column width={4}>
          <Menu fluid vertical>
            <Menu.Item>
              NoteX <Label>2</Label>
            </Menu.Item>
            <Menu.Item>
              NoteY <Label>2</Label>
            </Menu.Item>
            <Menu.Item>
              NoteZ <Label>2</Label>
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column width={12}>
          <Form>
            <Input transparent size='massive' placeholder='Title...' />
            <TextArea placeholder='Your notes...' style={style.textarea} rows={20} />
          </Form>
          <Divider />
          <Grid>
            <Grid.Column floated='right' width={6}>
              <Button as='a' fluid>
                Save changes to Arweave Ledger
              </Button>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </Container>
  </>