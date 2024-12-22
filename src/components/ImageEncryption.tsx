import React, { useState } from 'react';
import { Lock, Download, Key } from 'lucide-react';
import { encryptImage } from '../utils/encryption';
import FileUpload from './FileUpload';
import DecryptionForm from './DecryptionForm';

export default function ImageEncryption() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [encryptedData, setEncryptedData] = useState<string>('');
  const [encryptionKey, setEncryptionKey] = useState<string>('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('encrypt');

  const handleEncrypt = async () => {
    if (!selectedFile) return;
    
    setIsEncrypting(true);
    try {
      const { encryptedData, key } = await encryptImage(selectedFile);
      setEncryptedData(encryptedData);
      setEncryptionKey(key);
    } catch (error) {
      console.error('Encryption failed:', error);
    }
    setIsEncrypting(false);
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('encrypt')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'encrypt'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Encrypt
          </button>
          <button
            onClick={() => setActiveTab('decrypt')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'decrypt'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Decrypt
          </button>
        </div>

        {activeTab === 'encrypt' ? (
          <div className="space-y-6">
            <FileUpload
              label="Select Image to Encrypt"
              accept="image/*"
              onChange={setSelectedFile}
              file={selectedFile}
            />

            {selectedFile && (
              <div className="space-y-4">
                <button
                  onClick={handleEncrypt}
                  disabled={isEncrypting}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  {isEncrypting ? 'Encrypting...' : 'Encrypt'}
                </button>

                {encryptedData && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => downloadFile(encryptedData, `${selectedFile.name}.encrypted`)}
                      className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Encrypted File
                    </button>
                    <button
                      onClick={() => downloadFile(encryptionKey, `${selectedFile.name}.key`)}
                      className="flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Download Key
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <DecryptionForm />
        )}
      </div>
    </div>
  );
}