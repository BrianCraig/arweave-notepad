import { serialize, deserialize } from 'bson';
import React, { useCallback, useState } from 'react';
import { Notes } from '../Types';

const keyFromString = async (password: string): Promise<CryptoKey> =>
  crypto.subtle.importKey(
    "raw",
    await crypto.subtle.digest('SHA-256', (new TextEncoder()).encode(`arweave-notepad: ${password}`)),
    "AES-CBC",
    false,
    ["encrypt", "decrypt"]
  );

interface EncryptionContextInterface {
  setPassword: (password: string) => Promise<void>,
  decrypt: (input: Buffer) => Promise<Notes>,
  encrypt: (input: Notes) => Promise<Buffer>,
  hasKey: boolean
}

export const EncryptionContext = React.createContext<EncryptionContextInterface>({
  setPassword: async () => { },
  decrypt: async () => ([]),
  encrypt: async () => Buffer.alloc(0),
  hasKey: false
});

export const EncryptionContextProvider: React.FunctionComponent = ({ children }) => {
  const [key, setKey] = useState<CryptoKey | undefined>();
  const decrypt = useCallback(async (data: Buffer) => {
    let dataObject, iv, dataBuffer, decryptedDataBSON;
    if (!key) {
      throw new Error("No password set")
    }
    try {
      dataObject = deserialize(data)
      iv = dataObject.iv.buffer
      dataBuffer = dataObject.data.buffer
    } catch (e) {
      throw new Error("Not a Notepad resource, check ID")
    }
    if (dataObject.protocol !== "Arweave Notepad v1") {
      throw new Error(`This app doesn't support the ${dataObject.protocol} protocol, check for updated app`)
    }
    try {
      decryptedDataBSON = await crypto.subtle.decrypt({ name: "AES-CBC", iv: iv }, key, dataBuffer)
      return deserialize(decryptedDataBSON).notes as Notes
    } catch (e) {
      throw new Error("Couldn't decrypt notepad, check password")
    }
  }, [key])

  const encrypt = useCallback(async (notes) => {
    if (!key) {
      throw new Error("No password set")
    }
    const serializedNotes = serialize({ notes })
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encryptedData = await crypto.subtle.encrypt({ name: "AES-CBC", iv: iv }, key, serializedNotes)
    const final = await serialize({ protocol: "Arweave Notepad v1", iv, data: new Uint8Array(encryptedData) })

    return final
  }, [key])

  const setPassword = useCallback(async (password: string) => {
    setKey(await keyFromString(password))
  }, [])

  return <EncryptionContext.Provider value={
    {
      setPassword,
      decrypt,
      encrypt,
      hasKey: key !== undefined
    }} >
    {children}
  </EncryptionContext.Provider >
}
