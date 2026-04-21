import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../lib/firebase'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp']

/**
 * Upload a product image to Firebase Storage.
 * @param {File} file - The image file to upload
 * @param {string} productId - Product document ID for organized storage path
 * @param {function} onProgress - Optional progress callback (0-100)
 * @returns {Promise<string>} Download URL of the uploaded image
 */
export async function uploadProductImage(file, productId, onProgress) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only PNG, JPEG, and WebP are allowed.')
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size must be under 2MB.')
  }

  const ext = file.name.split('.').pop()
  const storageRef = ref(storage, `products/${productId}/${Date.now()}.${ext}`)

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        if (onProgress) onProgress(progress)
      },
      (error) => reject(error),
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          resolve(downloadURL)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

/**
 * Delete a product image from Firebase Storage.
 * @param {string} imageUrl - The full download URL of the image to delete
 */
export async function deleteProductImage(imageUrl) {
  if (!imageUrl) return
  try {
    const storageRef = ref(storage, imageUrl)
    await deleteObject(storageRef)
  } catch (error) {
    // If file doesn't exist, that's fine
    if (error.code !== 'storage/object-not-found') {
      throw error
    }
  }
}
