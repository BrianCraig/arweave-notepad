import { serialize, deserialize } from 'bson';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Notes } from '../Types';

interface EncryptionContextInterface {
  setPassword: Dispatch<SetStateAction<string>>,
  decrypt: (input: Buffer) => Promise<Notes>,
  encrypt: (input: Notes) => Promise<Buffer>,
  hasPassword: boolean
}

export const EncryptionContext = React.createContext<EncryptionContextInterface>({
  setPassword: () => { },
  decrypt: async () => ([]),
  encrypt: async () => Buffer.alloc(0),
  hasPassword: false
});

export const EncryptionContextProvider: React.FunctionComponent = ({ children }) => {
  const [password, setPassword] = useState('');
  const decrypt = useCallback(async (data: Buffer) => {
    const ddata = deserialize(data)
    console.log(ddata)
    const key256 = await crypto.subtle.digest('SHA-256', (new TextEncoder()).encode(password))
    console.log(key256)
    const iv = ddata.iv.buffer
    console.log(iv)
    const key = await crypto.subtle.importKey(
      "raw",
      key256,
      "AES-CBC",
      true,
      ["encrypt", "decrypt"]
    );
    console.log(key)
    const decryptedData = await crypto.subtle.decrypt({ name: "AES-CBC", iv: iv }, key, ddata.data.buffer)
    console.log(decryptedData)
    const out = deserialize(decryptedData) as Notes
    console.log(out)
    return out
  }, [password])

  const encrypt = useCallback(async (notes) => {
    const serializedNotes = serialize(notes)
    console.log(serializedNotes)
    const key256 = await crypto.subtle.digest('SHA-256', (new TextEncoder()).encode(password))
    console.log(key256)
    const iv = crypto.getRandomValues(new Uint8Array(16));
    console.log(iv)
    const key = await crypto.subtle.importKey(
      "raw",
      key256,
      "AES-CBC",
      true,
      ["encrypt", "decrypt"]
    );
    console.log(key)
    const encryptedData = await crypto.subtle.encrypt({ name: "AES-CBC", iv: iv }, key, serializedNotes)
    console.log(encryptedData)
    const final = await serialize({ protocol: "Arweave Notepad v1", iv, data: new Uint8Array(encryptedData) })
    console.log(final)

    const blob = new Blob([final], {
      type: 'application/octet-stream'
    })


    const downloadURL = (data: string, fileName: string) => {
      const a = document.createElement('a')
      a.href = data
      a.download = fileName
      document.body.appendChild(a)
      a.style.display = 'none'
      a.click()
      a.remove()
    }

    const url = window.URL.createObjectURL(blob)

    downloadURL(url, 'example.bson')

    return final
  }, [password])

  return <EncryptionContext.Provider value={
    {
      setPassword,
      decrypt,
      encrypt,
      hasPassword: password !== ''
    }} >
    {children}
  </EncryptionContext.Provider >
}

//crypto.subtle.digest('SHA-256', (new TextEncoder()).encode("Hi")).then(console.log)

/*

const rawKey = window.crypto.getRandomValues(new Uint8Array(16));

function importSecretKey(rawKey) {
  return window.crypto.subtle.importKey(
    "raw",
    rawKey,
    "AES-CBC",
    true,
    ["encrypt", "decrypt"]
  );
}

*/