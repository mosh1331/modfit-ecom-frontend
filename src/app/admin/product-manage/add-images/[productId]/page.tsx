"use client"
import { useState } from "react"
import { adminAPis } from "@/service/adminApis"
import { PageProps } from "../../../../../../.next/types/app/page"

export default function ProductImageUpload({ params }:  PageProps) {
  //@ts-ignore
  const { productId } = params
  const [images, setImages] = useState<File[]>([])
  const [images360, setImages360] = useState<File[]>([])
  const [preview, setPreview] = useState<string[]>([])
  const [preview360, setPreview360] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (files: FileList, type: "normal" | "360") => {
    const fileArray = Array.from(files)
    if (type === "normal") {
      setImages([...images, ...fileArray])
      setPreview([...preview, ...fileArray.map(f => URL.createObjectURL(f))])
    } else {
      setImages360([...images360, ...fileArray])
      setPreview360([...preview360, ...fileArray.map(f => URL.createObjectURL(f))])
    }
  }

  const handleRemove = (index: number, type: "normal" | "360") => {
    if (type === "normal") {
      setImages(images.filter((_, i) => i !== index))
      setPreview(preview.filter((_, i) => i !== index))
    } else {
      setImages360(images360.filter((_, i) => i !== index))
      setPreview360(preview360.filter((_, i) => i !== index))
    }
  }

  const handleUpload = async () => {
    if (!images.length && !images360.length) return alert("Upload at least one image")

    setUploading(true)
    setProgress(0)

    // 👉 Convert files to Base64 for API (or use signed URL upload)
    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = error => reject(error)
      })

    const imagesBase64 = await Promise.all(images.map(file => toBase64(file)))
    const images360Base64 = await Promise.all(images360.map(file => toBase64(file)))

    try {
      const res = await adminAPis().updateProductImages(
        productId,
        { images: imagesBase64, images360: images360Base64 },
        //@ts-ignore
        (event: ProgressEvent) => {
          if (event.total) {
            setProgress(Math.round((event.loaded * 100) / event.total))
          }
        }
      )
      if (res?.status === 200) {
        alert("✅ Product images uploaded & product activated!")
        setImages([])
        setImages360([])
        setPreview([])
        setPreview360([])
      }
    } catch (error) {
      console.error("Upload failed:", error)
      alert("❌ Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold">📸 Upload Product Images</h2>

      {/* Normal Images */}
      <div className="space-y-2">
        <label className="font-semibold">Product Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={e => e.target.files && handleFileChange(e.target.files, "normal")}
          className="w-full p-2 border rounded-lg"
        />
        <div className="grid grid-cols-3 gap-3">
          {preview.map((src, idx) => (
            <div key={idx} className="relative group">
              <img src={src} alt="" className="w-full h-28 object-cover rounded-lg" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs opacity-80 hover:opacity-100"
                onClick={() => handleRemove(idx, "normal")}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 360 Images */}
      <div className="space-y-2">
        <label className="font-semibold">360° Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={e => e.target.files && handleFileChange(e.target.files, "360")}
          className="w-full p-2 border rounded-lg"
        />
        <div className="grid grid-cols-3 gap-3">
          {preview360.map((src, idx) => (
            <div key={idx} className="relative group">
              <img src={src} alt="" className="w-full h-28 object-cover rounded-lg" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs opacity-80 hover:opacity-100"
                onClick={() => handleRemove(idx, "360")}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-600 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {uploading ? `Uploading... ${progress}%` : "Upload & Activate Product"}
      </button>
    </div>
  )
}
