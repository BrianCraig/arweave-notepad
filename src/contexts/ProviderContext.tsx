
import Arweave from 'arweave'
import Transaction from 'arweave/node/lib/transaction';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { createContext, useContext, useEffect, useState } from "react";
import { EditorContext } from './EditorContext';
import { EncryptionContext } from "./EncryptionContext";
const arweave = Arweave.init({})

interface ProviderContextInterface {
  readyToDeploy: boolean
  deploy: () => void
  price: string | null
  deployed: boolean
  deployedAt: string | null
  confirmations: number
  error: Error | null
}

export const ProviderContext = createContext<ProviderContextInterface>({
  readyToDeploy: false,
  deploy: () => { },
  price: null,
  deployed: false,
  deployedAt: null,
  confirmations: 0,
  error: null
});

export const WalletProviderContextProvider: React.FunctionComponent<{ walletKey: JWKInterface }> = ({ children, walletKey }) => {
  const { encrypt } = useContext(EncryptionContext)
  const { notes } = useContext(EditorContext)
  const [transaction, setTransaction] = useState<Transaction | null>(null)

  useEffect(() => {
    const createTransaction = async () => {
      const ongoingTransaction = await arweave.createTransaction({
        data: await encrypt(notes)
      }, walletKey);
      ongoingTransaction.addTag('Content-Type', 'application/bson');

      await arweave.transactions.sign(ongoingTransaction, walletKey);
      setTransaction(ongoingTransaction);
      console.log({ ...ongoingTransaction })
      /* for await (const uploader of arweave.transactions.upload(ongoingTransaction)) {
        console.log(uploader);
      } */
      console.log(ongoingTransaction)
    }
    createTransaction();

    return () => { }
  }, [encrypt, walletKey, notes])

  return <ProviderContext.Provider value={
    {
      readyToDeploy: transaction !== null,
      deploy: () => { },
      price: transaction ? arweave.ar.winstonToAr(transaction.reward) : null,
      deployed: false,
      deployedAt: transaction ? transaction.id : null,
      confirmations: 0,
      error: null
    }} >
    {children}
  </ProviderContext.Provider >
}