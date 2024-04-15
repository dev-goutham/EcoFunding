import React, { useState } from 'react';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const ImageField = ({ label, imageUrl, onImageUpload, storagePath }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const storage = getStorage();
    const fileRef = storageRef(storage, `${storagePath}/${file.name}`);
    
    try {
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      onImageUpload(url);
      setUploading(false);
    } catch (error) {
      console.error("Failed to upload image: ", error);
      setUploading(false);
    }
  };

  return (
    <div>
      <img src={imageUrl} alt={"sss"} style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />
    </div>
  );
};
export default ImageField;
