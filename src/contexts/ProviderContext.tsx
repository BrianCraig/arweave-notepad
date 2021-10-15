
import Arweave from 'arweave'
import Transaction from 'arweave/node/lib/transaction';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { createContext, useCallback, useContext, useEffect, useState } from "react";
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
  const [uploaded, setUploaded] = useState<boolean>(false)
  const [confirmations, setConfirmations] = useState<number>(0);

  useEffect(() => {
    const createTransaction = async () => {
      let ongoingTransaction = await arweave.createTransaction({
        data: await encrypt(notes)
      }, walletKey);
      ongoingTransaction.addTag('Content-Type', 'application/bson');

      await arweave.transactions.sign(ongoingTransaction, walletKey);
      setTransaction(ongoingTransaction);
    }
    createTransaction();

    return () => { }
  }, [encrypt, walletKey, notes])

  let deploy = useCallback(async () => {
    if (transaction !== null && uploaded === false) {
      const response = await arweave.transactions.post(transaction);
      if (response.status === 200) {
        setUploaded(true)
      }
    }
  }, [transaction, uploaded])

  useEffect(() => {
    if (transaction !== null && uploaded) {
      const lookupTransaction = async () => {
        const ongoingTransaction = await arweave.transactions.getStatus(transaction.id);
        if (ongoingTransaction.confirmed) {
          setConfirmations(ongoingTransaction.confirmed.number_of_confirmations);
        }
      }
      let interval = setInterval(lookupTransaction, 10 * 1000);

      return () => clearInterval(interval)
    }
  }, [transaction, uploaded])

  return <ProviderContext.Provider value={
    {
      readyToDeploy: transaction !== null,
      deploy,
      price: transaction ? arweave.ar.winstonToAr(transaction.reward) : null,
      deployed: uploaded,
      deployedAt: transaction ? transaction.id : null,
      confirmations,
      error: null
    }} >
    {children}
  </ProviderContext.Provider >
}