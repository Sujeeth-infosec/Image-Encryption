# Secure Image Encryption

![{2A66608C-99DF-4C42-ABCA-9786997C9DC6}](https://github.com/user-attachments/assets/a15e7b03-1ea9-4257-9d4c-4577c91e191b)


A modern web application for secure client-side image encryption using the AES-GCM algorithm. Built with React, TypeScript, and Web Crypto API.

## Features

- 🔒 Client-side AES-GCM encryption
- 🔑 Secure key generation and management
- 📤 Separate encrypted file and key file downloads
- 📱 Responsive design with Tailwind CSS
- 🛡️ Zero server storage - all operations performed locally
- 🖼️ Support for various image formats (PNG, JPG, GIF)

## Security

- Uses the Web Crypto API for cryptographic operations
- AES-GCM 256-bit encryption
- Encryption/decryption performed entirely in the browser
- No data transmitted to servers
- Separate key file for enhanced security

## Usage

### Encrypting an Image

1. Click the "Encrypt" tab
2. Upload an image file
3. Click "Encrypt"
4. Download both the encrypted file and key file
5. Store the key file securely and separately from the encrypted file

### Decrypting an Image

1. Click the "Decrypt" tab
2. Upload the encrypted file (.encrypted)
3. Upload the corresponding key file (.key)
4. Click "Decrypt" to view the original image

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Technologies

- React
- TypeScript
- Tailwind CSS
- Web Crypto API
- Vite
- Lucide Icons

## License

MIT
