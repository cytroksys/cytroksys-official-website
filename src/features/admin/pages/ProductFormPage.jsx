import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Info, Sparkles, Truck, Tags } from 'lucide-react'
import { useAdminProducts } from '../hooks/useAdminProducts'
import ImageUpload from '../components/ImageUpload'
import { uploadProductImage } from '../../../services/storageService'
import { PRODUCT_CATEGORY_LIST, BRAND_LIST, DELIVERY_TYPES, LICENSE_TYPES } from '../../../lib/constants'

export default function ProductFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const { addProduct, editProduct, fetchProduct } = useAdminProducts()
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [loadingProduct, setLoadingProduct] = useState(isEdit)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: 'onTouched' })

  const watchedName = watch('name')
  const watchedShortDescription = watch('shortDescription')
  const watchedPrice = Number(watch('price') || 0)
  const watchedOldPrice = Number(watch('oldPrice') || 0)

  const generatedSlug = String(watchedName || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const savingsValue = watchedOldPrice > watchedPrice ? watchedOldPrice - watchedPrice : 0
  const savingsPercent = watchedOldPrice > watchedPrice && watchedOldPrice > 0
    ? Math.round((savingsValue / watchedOldPrice) * 100)
    : 0

  useEffect(() => {
    if (!isEdit) return
    fetchProduct(id).then((product) => {
      if (product) {
        reset({
          name: product.name || '',
          slug: product.slug || '',
          brand: product.brand || '',
          category: product.category || '',
          shortDescription: product.shortDescription || '',
          fullDescription: product.fullDescription || '',
          features: product.features?.join('\n') || '',
          duration: product.duration || '',
          deviceCount: product.deviceCount || 1,
          licenseType: product.licenseType || '',
          deliveryType: product.deliveryType || DELIVERY_TYPES.DIGITAL_KEY,
          deliveryTime: product.deliveryTime || 'Within 1 hour',
          price: product.price || '',
          oldPrice: product.oldPrice || '',
          currency: product.currency || 'INR',
          isActive: product.isActive ?? true,
          isFeatured: product.isFeatured ?? false,
          sortOrder: product.sortOrder || 0,
        })
        setImageUrl(product.imageUrl || '')
      }
      setLoadingProduct(false)
    })
  }, [id, isEdit, fetchProduct, reset])

  const handleImageUpload = async (file) => {
    setUploading(true)
    try {
      const productId = id || 'temp-' + Date.now()
      const url = await uploadProductImage(file, productId, setUploadProgress)
      setImageUrl(url)
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const onSubmit = async (values) => {
    const productData = {
      name: values.name,
      slug: values.slug || values.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      brand: values.brand,
      category: values.category,
      shortDescription: values.shortDescription,
      fullDescription: values.fullDescription,
      features: values.features ? values.features.split('\n').map((f) => f.trim()).filter(Boolean) : [],
      duration: values.duration,
      deviceCount: Number(values.deviceCount) || 1,
      licenseType: values.licenseType,
      deliveryType: values.deliveryType || DELIVERY_TYPES.DIGITAL_KEY,
      deliveryTime: values.deliveryTime || 'Within 1 hour',
      price: Number(values.price) || 0,
      oldPrice: values.oldPrice ? Number(values.oldPrice) : null,
      currency: values.currency || 'INR',
      imageUrl: imageUrl || '',
      isActive: values.isActive ?? true,
      isFeatured: values.isFeatured ?? false,
      sortOrder: Number(values.sortOrder) || 0,
    }

    if (isEdit) {
      await editProduct(id, productData)
    } else {
      await addProduct(productData)
    }
    navigate('/admin/products')
  }

  if (loadingProduct) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyber-cyan border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={() => navigate('/admin/products')}
        className="mb-4 inline-flex items-center gap-2 text-sm text-cyber-muted transition hover:text-cyber-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </button>

      <h1 className="mb-6 font-display text-xl text-cyber-text">
        {isEdit ? 'Edit Product' : 'Add New Product'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-3 rounded-2xl border border-cyber-cyan/20 bg-cyber-cyan/5 p-4 text-xs text-cyber-muted sm:grid-cols-3">
          <div className="rounded-xl border border-cyber-cyan/20 bg-white/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-cyber-cyan">Auto Slug</p>
            <p className="mt-1 truncate font-mono text-[11px] text-cyber-text">{generatedSlug || 'auto-generated-from-name'}</p>
          </div>
          <div className="rounded-xl border border-cyber-cyan/20 bg-white/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-cyber-cyan">Price Summary</p>
            <p className="mt-1 text-[11px] text-cyber-text">{watchedPrice > 0 ? `₹${watchedPrice.toLocaleString('en-IN')}` : 'Not set'}</p>
            {savingsPercent > 0 && <p className="mt-0.5 text-[10px] text-emerald-500">Save {savingsPercent}% (₹{savingsValue.toLocaleString('en-IN')})</p>}
          </div>
          <div className="rounded-xl border border-cyber-cyan/20 bg-white/70 p-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-cyber-cyan">Card Preview</p>
            <p className="mt-1 line-clamp-2 text-[11px] text-cyber-text">{watchedShortDescription || 'Short description preview appears here.'}</p>
          </div>
        </div>

        {/* Image */}
        <div className="rounded-2xl border border-cyber-line/40 bg-white p-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-cyber-text">
                <Sparkles className="h-4 w-4 text-cyber-cyan" />
                Product Media
              </h2>
              <p className="mt-1 text-xs text-cyber-muted">Upload a clean product image or provide an external URL.</p>
            </div>
          </div>
          <label className="mb-2 block text-xs uppercase tracking-[0.13em] text-cyber-muted">
            Product Image
          </label>
          <ImageUpload
            currentUrl={imageUrl}
            onUpload={handleImageUpload}
            onUrlChange={setImageUrl}
            uploading={uploading}
            progress={uploadProgress}
          />
        </div>

        {/* Basic info */}
        <div className="rounded-2xl border border-cyber-line/40 bg-white p-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-cyber-text">
                <Tags className="h-4 w-4 text-cyber-cyan" />
                Basic Product Details
              </h2>
              <p className="mt-1 text-xs text-cyber-muted">Used in product cards, detail page headers, and search.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Product Name *" hint="Keep it clear and searchable." error={errors.name?.message}>
              <input
                {...register('name', { required: 'Name is required' })}
                className="input-control text-sm"
                placeholder="Kaspersky Standard 1 Device 1 Year"
              />
            </Field>
            <Field label="Slug" hint="Optional. Auto-generated if blank." error={errors.slug?.message}>
              <input
                {...register('slug')}
                className="input-control text-sm"
                placeholder={generatedSlug || 'auto-generated-from-name'}
              />
            </Field>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Brand *" error={errors.brand?.message}>
              <select {...register('brand', { required: 'Brand is required' })} className="input-control text-sm">
                <option value="">Select brand</option>
                {BRAND_LIST.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Category *" error={errors.category?.message}>
              <select {...register('category', { required: 'Category is required' })} className="input-control text-sm">
                <option value="">Select category</option>
                {PRODUCT_CATEGORY_LIST.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl border border-cyber-line/40 bg-white p-5">
          <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-cyber-text">
            <Info className="h-4 w-4 text-cyber-cyan" />
            Marketing Content
          </h2>
          <p className="mt-1 text-xs text-cyber-muted">Write concise copy for cards and detailed copy for product pages.</p>

          <div className="mt-4 space-y-4">
            <Field label="Short Description *" hint="Visible on product cards and list view." error={errors.shortDescription?.message}>
              <textarea
                {...register('shortDescription', { required: 'Short description is required' })}
                className="input-control min-h-[60px] resize-y text-sm"
                placeholder="Brief product description for cards..."
              />
            </Field>

            <Field label="Full Description" hint="Shown on product detail pages.">
              <textarea
                {...register('fullDescription')}
                className="input-control min-h-[96px] resize-y text-sm"
                placeholder="Detailed product description..."
              />
            </Field>

            <Field label="Features (one per line)" hint="Each line becomes a bullet point.">
              <textarea
                {...register('features')}
                className="input-control min-h-[96px] resize-y text-sm"
                placeholder="Real-time threat protection&#10;Anti-phishing&#10;VPN included"
              />
            </Field>
          </div>
        </div>

        {/* Specs */}
        <div className="rounded-2xl border border-cyber-line/40 bg-white p-5">
          <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-cyber-text">
            <Truck className="h-4 w-4 text-cyber-cyan" />
            License & Delivery Configuration
          </h2>
          <p className="mt-1 text-xs text-cyber-muted">Configure duration, device count, delivery type, and SLA text.</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Field label="Duration *" error={errors.duration?.message}>
              <input
                {...register('duration', { required: 'Duration is required' })}
                className="input-control text-sm"
                placeholder="1 Year"
              />
            </Field>
            <Field label="Device Count *" error={errors.deviceCount?.message}>
              <input
                {...register('deviceCount', { required: 'Required', valueAsNumber: true })}
                type="number"
                min={1}
                className="input-control text-sm"
              />
            </Field>
            <Field label="License Type">
              <select {...register('licenseType')} className="input-control text-sm">
                <option value={LICENSE_TYPES.NEW}>{LICENSE_TYPES.NEW}</option>
                <option value={LICENSE_TYPES.RENEWAL}>{LICENSE_TYPES.RENEWAL}</option>
              </select>
            </Field>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Field label="Delivery Type">
              <select {...register('deliveryType')} className="input-control text-sm">
                {Object.values(DELIVERY_TYPES).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </Field>
            <Field label="Delivery Time" hint="Shown in checkout and email templates.">
              <input
                {...register('deliveryTime')}
                className="input-control text-sm"
                placeholder="Within 1 hour"
              />
            </Field>
            <Field label="Currency">
              <select {...register('currency')} className="input-control text-sm">
                <option value="INR">INR</option>
              </select>
            </Field>
          </div>
        </div>

        {/* Price */}
        <div className="rounded-2xl border border-cyber-line/40 bg-white p-5">
          <h2 className="text-sm font-semibold text-cyber-text">Pricing & Merchandising</h2>
          <p className="mt-1 text-xs text-cyber-muted">Set final price, optional old price, and sort priority.</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Field label="Price (₹) *" error={errors.price?.message}>
              <input
                {...register('price', { required: 'Price is required', valueAsNumber: true })}
                type="number"
                min={0}
                className="input-control text-sm"
                placeholder="999"
              />
            </Field>
            <Field label="Old Price (₹)" hint="Optional strike-through price.">
              <input
                {...register('oldPrice', { valueAsNumber: true })}
                type="number"
                min={0}
                className="input-control text-sm"
                placeholder="1499"
              />
            </Field>
            <Field label="Sort Order" hint="Lower value appears first.">
              <input
                {...register('sortOrder', { valueAsNumber: true })}
                type="number"
                min={0}
                className="input-control text-sm"
                placeholder="0"
              />
            </Field>
          </div>
        </div>

        {/* Toggles */}
        <div className="rounded-2xl border border-cyber-line/40 bg-white p-5">
          <h2 className="text-sm font-semibold text-cyber-text">Visibility Controls</h2>
          <p className="mt-1 text-xs text-cyber-muted">Control whether this product is publicly visible and promoted.</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="flex items-start gap-3 rounded-xl border border-cyber-line/40 bg-cyber-panel/20 p-3 text-sm text-cyber-text">
              <input type="checkbox" {...register('isActive')} className="mt-0.5 accent-cyber-cyan" />
              <span>
                <span className="block font-medium">Active Product</span>
                <span className="mt-0.5 block text-xs text-cyber-muted">Visible to customers on the store listing.</span>
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-xl border border-cyber-line/40 bg-cyber-panel/20 p-3 text-sm text-cyber-text">
              <input type="checkbox" {...register('isFeatured')} className="mt-0.5 accent-cyber-cyan" />
              <span>
                <span className="block font-medium">Featured Product</span>
                <span className="mt-0.5 block text-xs text-cyber-muted">Prioritized in hero or featured areas.</span>
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className="contact-submit-btn inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {isEdit ? 'Update Product' : 'Create Product'}
            </>
          )}
        </button>
      </form>
    </div>
  )
}

function Field({ label, hint, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-[0.13em] text-cyber-muted">{label}</span>
      {hint ? <span className="mb-2 block text-[11px] text-cyber-muted/80">{hint}</span> : null}
      {children}
      {error && <span className="mt-1 block text-xs text-rose-400">{error}</span>}
    </label>
  )
}
