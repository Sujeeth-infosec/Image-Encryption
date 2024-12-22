import { Buffer } from 'buffer';

export async function generateKey(): Promise<CryptoKey> {
  return await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256
    },
    true,
    ['encrypt', 'decrypt']
  );
}

export async function exportKey(key: CryptoKey): Promise<string> {
  const exported = await window.crypto.subtle.exportKey('raw', key);
  return Buffer.from(exported).toString('base64');
}

export async function importKey(keyStr: string): Promise<CryptoKey> {
  const keyBuffer = Buffer.from(keyStr, 'base64');
  return await window.crypto.subtle.importKey(
    'raw',
    keyBuffer,
    'AES-GCM',
    true,
    ['encrypt', 'decrypt']
  );
}

export async function encryptImage(file: File): Promise<{ encryptedData: string; key: string }> {
  const key = await generateKey();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  const arrayBuffer = await file.arrayBuffer();
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    arrayBuffer
  );

  const encryptedArray = new Uint8Array(encryptedBuffer);
  const combined = new Uint8Array(iv.length + encryptedArray.length);
  combined.set(iv);
  combined.set(encryptedArray, iv.length);

  return {
    encryptedData: Buffer.from(combined).toString('base64'),
    key: await exportKey(key)
  };
}

export async function decryptImage(encryptedData: string, keyStr: string): Promise<ArrayBuffer> {
  const key = await importKey(keyStr);
  const data = Buffer.from(encryptedData, 'base64');
  const iv = data.slice(0, 12);
  const encryptedContent = data.slice(12);

  return await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    encryptedContent
  );
}