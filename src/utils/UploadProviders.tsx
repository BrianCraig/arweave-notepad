import { UploadProvider, UploadProviders } from "../Types";

export const uploadProviders: UploadProviders = [
  {
    name: "Arweave Key",
    uploader: async () => 'inprogress'
  },
  {
    name: "ArConnect",
    uploader: async () => 'inprogress'
  },
  {
    name: "Browser Storage",
    uploader: async () => 'inprogress'
  }
]