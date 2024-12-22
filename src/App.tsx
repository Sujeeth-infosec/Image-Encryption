import React from 'react';
import ImageEncryption from './components/ImageEncryption';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Secure Image Encryption</h1>
        </div>
      </header>
      <main className="py-10">
        <ImageEncryption />
      </main>
    </div>
  );
}

export default App;