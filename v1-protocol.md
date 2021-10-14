# V1 Arweave Notepad Protocol

This is pseudocode only intended to communicate the notepads encryption/decryption

## generating a symmetric key

``` javascript
AESCBC({
  key: SHA256('arweave-notepad: ' + password )
})
```

## Encoding 

``` javascript
IV = RandomBytes(16)
BSON({
  {
    protocol: "Arweave Notepad v1", 
    iv: IV,
    data: AESCBCEncrypt({
      BSON({
        notes: [
          {
            title: string,
            content: string
          },
          ...[moreNotes]
        ]
      }),
      key,
      IV
    })
  }
})
```

## Decoding

Inverse of encoding, getting the IV from the BSON