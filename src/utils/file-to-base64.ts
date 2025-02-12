export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      // Extract only the Base64 part (remove data URL prefix)
      const result = reader.result as string
      const base64Data = result.split(',')[1]
      resolve(base64Data)
    }

    reader.onerror = (error) => {
      reject(error)
    }

    // Read the file as a data URL (Base64 encoded)
    reader.readAsDataURL(file)
  })
}
