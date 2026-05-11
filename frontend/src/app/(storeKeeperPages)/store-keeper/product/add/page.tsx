"use client"
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import React, { useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'


const AddProduct = () => {
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [discountPrice, setDiscountPrice] = useState('')
  const [rating, setRating] = useState('')
  const [img, setImg] = useState<File | null>(null)
  const [errorMessages, setErrorMessage] = useState('')

  const {

    authTokens,

    loader,
    setLoader,
    disableButton,
    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,




  } = useContext(AuthContext)!


  const {
    productCatergoriesData,
    ProductCatergoriesFunction
  } = useContext(AllDataContext)!;

  const handleImgFile = (files: File[]) => {
    if (files.length > 0) {
      setImg(files[0]);
    } else {
      setImg(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImgFile,
    accept: {
      'image/*': []
    }
  });



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = (data: FormData, e: any) => {
    if (img) {
      CreatProduct(e)
      setErrorMessage('')
    } else {
      setErrorMessage('This field is required')
    }

  }


  const CreatProduct = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const formData = new FormData()
    formData.append('category', category)
    formData.append('description', description)
    formData.append('name', productName)
    formData.append('price', `${price}`)
    formData.append('discount_price', `${discountPrice}`)
    formData.append('is_active', `${true}`)

    if (img) {
      formData.append('image', img)
    }
    formData.append('rating', `${rating}`)


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/product/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Product created')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setCategory('')
        setDescription('')
        setProductName('')
        setImg(null)
        setPrice('')
        setDiscountPrice('')
        setRating('')




      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setDisableButton(false)
        setIsSuccess(false)
        setLoader(false)
        showAlert()
      }


    } catch (error) {
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisableButton(false)
      setIsSuccess(false)
      setLoader(false)

    }
  }

  useEffect(() => {
    ProductCatergoriesFunction()

  }, [])






  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Create product</p>
              </div>


              <div className="p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">

                    <div className="col-md-6">
                      <label htmlFor="productName" className="form-label">Product Name<span className="text-danger">*</span></label>
                      <input type="text" className={`site-input ${errors.productName ? 'error-input' : ''}`} {...register('productName', { required: true })} placeholder='Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} />
                      {errors.productName && <p className="error-text">This field is required</p>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="category" className="form-label">Category<span className="text-danger">*</span></label>
                      <select className={`site-input ${errors.category ? 'error-input' : ''}`} {...register('category', { required: true })} value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select</option>
                        {productCatergoriesData.map((data) => (
                          <option key={data.id} value={data.id}>{data.name}</option>
                        ))}
                      </select>
                      {errors.category && <p className="error-text">This field is required</p>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="price" className="form-label">Price <span className="text-danger">*</span></label>
                      <input type="text" className={`site-input ${errors.price ? 'error-input' : ''}`} {...register('price', { required: true })} placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                      {errors.price && <p className="error-text">This field is required</p>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="discountPrice" className="form-label">Discount Price</label>
                      <input type="text" className={`site-input ${errors.discountPrice ? 'error-input' : ''}`} {...register('discountPrice')} placeholder='Discount Price' value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} />
                    </div>



                    <div className="col-md-6">
                      <label htmlFor="rating" className="form-label">Rating <span className="text-danger">*</span></label>
                      <input type="number" min="1" max="5" step="0.1" className={`site-input ${errors.rating ? 'error-input' : ''}`} {...register('rating', { required: true, min: 1, max: 5, })} placeholder='rating' value={rating} onChange={(e) => setRating(e.target.value)} />
                      {errors.rating?.type === 'required' && (
                        <p className="error-text">This field is required</p>
                      )}
                      {errors.rating?.type === 'min' && (
                        <p className="error-text">Rating must be at least 1</p>
                      )}
                      {errors.rating?.type === 'max' && (
                        <p className="error-text">Rating cannot be more than 5</p>
                      )}
                    </div>



                    <div className="col-12">
                      <label htmlFor="" className='form-label'>Description</label>
                      <textarea rows={6} className={`site-input ${errors.description ? 'error-input' : ''}`} {...register('description')} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Product Image <span className="text-danger">*</span></label>

                      <div {...getRootProps({ className: 'dropzone-box' })}>
                        <input {...getInputProps()} />

                        {img ? (
                          <div className="preview-box">
                            <img
                              src={URL.createObjectURL(img)}
                              alt="Selected img"
                              className="preview-image"
                            />
                            <p className="file-name">{img.name}</p>
                          </div>
                        ) : (
                          <p className="m-0">Drag & drop img here, or click to select file</p>
                        )}
                      </div>
                      {errorMessages && <p className="error-text">{errorMessages}</p>}
                    </div>

                    <div className="col-12">
                      <div className='mb-3'>
                        <button disabled={disableButton} type="submit" className={`Button site-btn px-3`}>
                          <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                          <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill me-2"></i> Submit</span>
                        </button>
                      </div>

                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct