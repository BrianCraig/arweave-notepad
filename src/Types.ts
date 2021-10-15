export interface Note {
  title: string,
  content: string
}

export type Notes = Note[]

export interface UploadProvider {
  name: string,
  uploader: (data: Buffer) => Promise<string>
}

export type UploadProviders = UploadProvider[]