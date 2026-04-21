import { useEffect, useRef, useState } from 'react'
import { Link2, Upload, X } from 'lucide-react'

export default function ImageUpload({
  currentUrl,
  onUpload,
  onUrlChange,
  uploading = false,
  progress = 0,
}) {
  const [preview, setPreview] = useState(currentUrl || '')
  const [urlInput, setUrlInput] = useState(currentUrl || '')
  const [mode, setMode] = useState('upload')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => {
    setPreview(currentUrl || '')
    setUrlInput(currentUrl || '')
  }, [currentUrl])

  const handleFile = (file) => {
    if (!file) return

    const allowed = ['image/png', 'image/jpeg', 'image/webp']
    if (!allowed.includes(file.type)) {
      alert('Only PNG, JPEG, and WebP images are allowed.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('File must be under 2MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(file)
    setMode('upload')
    onUpload(file)
  }

  const isValidHttpUrl = (value) => {
    try {
      const parsed = new URL(value)
      return parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {
      return false
    }
  }

  const applyUrl = () => {
    const nextUrl = urlInput.trim()
    if (!nextUrl) {
      clearPreview()
      return
    }

    if (!isValidHttpUrl(nextUrl)) {
      alert('Enter a valid image URL (http or https).')
      return
    }

    setPreview(nextUrl)
    onUrlChange?.(nextUrl)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const clearPreview = () => {
    setPreview('')
    setUrlInput('')
    if (fileRef.current) fileRef.current.value = ''
    onUrlChange?.('')
  }

  return (
    <div>
      <div className="mb-3 inline-flex rounded-xl border border-cyber-line/50 bg-cyber-panel/30 p-1">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            mode === 'upload' ? 'bg-cyber-cyan/15 text-cyber-cyan' : 'text-cyber-muted hover:text-cyber-text'
          }`}
        >
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            mode === 'url' ? 'bg-cyber-cyan/15 text-cyber-cyan' : 'text-cyber-muted hover:text-cyber-text'
          }`}
        >
          <Link2 className="h-3.5 w-3.5" />
          Image URL
        </button>
      </div>

      {preview && (
        <div className="mb-3 relative inline-block">
          <img
            src={preview}
            alt="Product preview"
            className="h-32 w-32 rounded-xl border border-cyber-line/50 object-contain bg-cyber-ink p-2"
          />
          <button
            type="button"
            onClick={clearPreview}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white"
          >
            <X className="h-3 w-3" />
          </button>
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/60">
              <span className="text-xs font-semibold text-cyber-cyan">{progress}%</span>
            </div>
          )}
        </div>
      )}

      {mode === 'upload' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`flex h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition ${
            dragOver
              ? 'border-cyber-cyan/50 bg-cyber-cyan/5'
              : 'border-cyber-line/40 bg-cyber-panel/20 hover:border-cyber-line'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyber-cyan border-t-transparent" />
              <span className="text-xs text-cyber-muted">{progress}%</span>
            </div>
          ) : (
            <>
              <Upload className="mb-2 h-5 w-5 text-cyber-muted" />
              <p className="text-xs text-cyber-muted">Drop image or click to upload</p>
              <p className="mt-1 text-[10px] text-cyber-muted/50">PNG, JPEG, WebP • Max 2MB</p>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/product-image.png"
            className="input-control text-sm"
          />
          <button
            type="button"
            onClick={applyUrl}
            className="rounded-lg border border-cyber-line/60 bg-cyber-panel/50 px-4 py-2 text-xs font-semibold text-cyber-text transition hover:border-cyber-cyan hover:text-cyber-cyan"
          >
            Use URL
          </button>
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  )
}
