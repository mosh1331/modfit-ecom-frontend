// Upload360ImagesForm.jsx
import { useState } from 'react';
import axios from 'axios';

const Upload360Images = () => {
    const [folderName, setFolderName] = useState('');
    const [images, setImages] = useState([]);
    const [productId, setProductId] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!folderName || images.length === 0) {
          setMessage('Please provide a folder name and select images.');
          return;
        }
    
        const form = new FormData();
        images.forEach((img) => form.append('images', img));
        form.append('folderName', folderName);
        if (productId) form.append('productId', productId);
    
        try {
          setUploading(true);
          const { data } = await axios.post('http://localhost:5001/api/cloudinary/upload', form, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          setMessage('✅ Uploaded successfully!');
          console.log(data);
        } catch (err) {
          console.error(err);
          setMessage('❌ Upload failed.');
        } finally {
          setUploading(false);
        }
      };


    return (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Upload 360° Product Images</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Folder Name</label>
                    <input
                        type="text"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        placeholder="e.g. red-shirt"
                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Product ID (optional)</label>
                    <input
                        type="number"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        placeholder="Product ID (optional)"
                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setImages([...e.target.files])}
                        className="mt-1 w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                >
                    {uploading ? 'Uploading...' : 'Upload Images'}
                </button>
            </form>

            {message && (
                <div className="mt-4 text-center text-sm text-gray-700">
                    {message}
                </div>
            )}
        </div>
    );
};

export default Upload360Images;
