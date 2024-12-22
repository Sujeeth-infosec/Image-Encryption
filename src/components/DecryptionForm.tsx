import React, { useState } from 'react';
import { Upload, Unlock } from 'lucide-react';
import { decryptImage } from '../utils/encryption';
import FileUpload from './FileUpload';

export default function DecryptionForm() {
  const [encryptedFile, setEncryptedFile] = useState<File | null>(null);
  const [keyFile, setKeyFile] = useState<File | null>(null);
  const [decryptedImage, setDecryptedImage] = useState<string>('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleDecrypt = async () => {
    if (!encryptedFile || !keyFile) return;
    
    setIsDecrypting(true);
    setError('');
    
    try {
      // Read the encrypted data
      const encryptedData = await encryptedFile.text();
      
      // Read the key file
      const key = await keyFile.text();
      
      // Decrypt the image
      const decryptedBuffer = await decryptImage(encryptedData, key);
      
      // Create object URL for preview
      const blob = new Blob([decryptedBuffer], { type: 'image/*' });
      setDecryptedImage(URL.createObjectURL(blob));
    } catch (error) {
      setError('Failed to decrypt image. Please check your encrypted file and key.');
      console.error('Decryption failed:', error);
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileUpload
          label="Upload Encrypted File"
          accept=".encrypted"
          onChange={setEncryptedFile}
          file={encryptedFile}
        />
        
        <FileUpload
          label="Upload Key File"
          accept=".key"
          onChange={setKeyFile}
          file={keyFile}
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={handleDecrypt}
        disabled={!encryptedFile || !keyFile || isDecrypting}
        className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
      >
        <Unlock className="w-4 h-4 mr-2" />
        {isDecrypting ? 'Decrypting...' : 'Decrypt Image'}
      </button>

      {decryptedImage && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Decrypted Image:</h3>
          <img
            src={decryptedImage}
            alt="Decrypted"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}