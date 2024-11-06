export function encrypt(plaintext, key) {
  let encrypted = '';
  for (let i = 0; i < plaintext.length; i++) {
      encrypted += String.fromCharCode(plaintext.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return encrypted;
}
export function decrypt(encrypted, key) {
  if (typeof encrypted !== 'string' || typeof key !== 'string') {
    console.warn("Invalid input for decryption function");
    return '';
  }
  
  let decrypted = '';
  for (let i = 0; i < encrypted.length; i++) {
    decrypted += String.fromCharCode(encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return decrypted;
}
