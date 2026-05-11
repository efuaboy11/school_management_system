"use client"
import AuthContext from '@/context/AuthContext'
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'
import Image from 'next/image'

import AllDataContext from '@/context/AllData';
import { useDropzone } from 'react-dropzone';


const IndivivdualProduct = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)

  const {
    authTokens,
    formatName,
    formatCurrency,


    loader,
    setLoader,
    disableButton,
    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,

  } = useContext(AuthContext)!;

  const {
    productCatergoriesData,
    ProductCatergoriesFunction
  } = useContext(AllDataContext)!;

  const [Loading, setLoading] = useState(true)
  const [details, setDetails] = useState<any>(null)

  const [categoriesName, setCategoriesName] = useState('')
  const [description, setDescription] = useState('')
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [discountPrice, setDiscountPrice] = useState('')
  const [rating, setRating] = useState('')
  const [img, setImg] = useState<File | null>(null)
  const [deleteModal, setDeleteModal] = useState(false)

  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const router = useRouter();

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

  const handleClosenModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleShowDeleteModal = () => {
    setDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModal(false)
  }








  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = (data: any, e: any) => {
    EditDetails(e)

  }

  const IndividualDetailsFunction = async () => {
    try {
      const response = await fetch(`https://school.amanilightequity.com/api/product/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },

      })
      const data = await response.json()

      if (response.ok) {
        setDetails(data)
        console.log('data', data)

        setCategoriesName(data?.category || '')
        setDescription(data?.description || '')
        setProductName(data?.name || '')
        setPrice(data?.price || '')
        setDiscountPrice(data?.disabled || '')
        setRating(data?.rating || '')
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch {
      console.log('error')
      setLoading(false)
    }

  }

  const deleteUserFunction = async () => {

    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/product/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })

      if (response.ok) {
        setLoader(false)
        setDisableButton(false)
        router.push('/store-keeper/product')
        setDeleteModal(false)
        showAlert()
        setIsSuccess(true)
        setMessage('Product categories  deleted')
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setLoader(false)
        setDisableButton(false)
        showAlert()
        setIsSuccess(false)
        setIsSuccess(true)
        setDisableButton(false)
      }

    } catch {
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisableButton(false)
      setIsSuccess(false)
      setLoader(false)
      setLoader(false)

    }
  }

  const EditDetails = async (e: any) => {
    e.preventDefault()
    setLoader(true)

    const formData = new FormData()

    formData.append('category', categoriesName)
    formData.append('description', description)
    formData.append('name', productName)
    formData.append('price', `${price}`)
    if (discountPrice) {
      formData.append('discount_price', `${discountPrice}`)
    }
    if (img) {
      formData.append('image', img)
    }
    formData.append('rating', `${rating}`)



    try {
      const response = await fetch(`https://school.amanilightequity.com/api/product/${id}/`, {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Details updated successfully')
        setIsSuccess(true)
        setShowModal(false)
        IndividualDetailsFunction()
        setLoader(false)
        setDisableButton(false)

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
    if (showModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showModal]);

  useEffect(() => {
    IndividualDetailsFunction()
    ProductCatergoriesFunction()
  }, [])

  useEffect(() => {
    if (deleteModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [deleteModal]);



  return (
    <div>
      <div>
        {showModal && (
          <section className={` ${showModal ? 'overlay-background' : ''}`}>
            <div className='container-lg'>

              <div className=" row justify-content-center align-center2 height-90vh">

                <div className="col-md-8 col-sm-10 col-12">
                  <div className="site-modal-conatiner">
                    <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                      <div>
                        <div className="d-flex justify-content-between pb-2">
                          <p className='font-size-20px '>Edit Product Category</p>
                          <div onClick={handleClosenModal} className='cursor-pointer'>
                            <i className="ri-close-line md-text"></i>
                          </div>
                        </div>


                        <div className='pt-4'>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row g-3">
                              <div className="col-md-6">
                                <label htmlFor="productName" className="form-label">Product Name</label>
                                <input type="text" className={`site-input ${errors.productName ? 'error-input' : ''}`} {...register('productName', { required: true })} placeholder='Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} />
                                {errors.productName && <p className="error-text">This field is required</p>}
                              </div>


                              <div className="col-md-6">
                                <label htmlFor="categoriesName" className="form-label">Category Name<span className="text-danger">*</span></label>
                                <select className={`site-input ${errors.categoriesName ? 'error-input' : ''}`} {...register('categoriesName', { required: true })} value={categoriesName} onChange={(e) => setCategoriesName(e.target.value)}>
                                  <option value="">Select</option>
                                  {productCatergoriesData.map((data) => (
                                    <option key={data.id} value={data.id}>{data.name}</option>
                                  ))}
                                </select>
                                {errors.categoriesName && <p className="error-text">This field is required</p>}
                              </div>

                              <div className="col-md-6">
                                <label htmlFor="price" className="form-label">Price <span className="text-danger">*</span></label>
                                <input type="text" className={`site-input ${errors.price ? 'error-input' : ''}`} {...register('price', { required: true })} placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                                {errors.price && <p className="error-text">This field is required</p>}
                              </div>


                              <div className="col-md-6">
                                <label htmlFor="discountPrice" className="form-label">Discount Price</label>
                                <input type="text" className={`site-input ${errors.discountPrice ? 'error-input' : ''}`} {...register('Discoun Price')} placeholder='discountPrice' value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} />
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

                              <div className="col-md-12">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea rows={6} className={`site-input ${errors.description ? 'error-input' : ''}`} {...register('description', { required: true })} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Offspring name'></textarea>
                                {errors.description && <p className="error-text">This field is required</p>}
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
                              </div>



                              <div className="col-12 mt-4">
                                <button type='submit' className='site-btn px-4'>
                                  <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                                  <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-send-plane-fill pe-2"></i> Sumbit</span>
                                </button>

                              </div>
                            </div>

                          </form>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>


              </div>

            </div>
          </section>
        )}

        {deleteModal && (
          <section className={` ${deleteModal ? 'overlay-background' : ''}`}>
            <div className='container-lg'>

              <div className=" row justify-content-center align-center2 height-90vh">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
                  <div className="site-modal-conatiner">
                    <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                      <div className="d-flex justify-content-center text-center">
                        <div>
                          <Image src="/img/icon/warning.png" alt="empty" width={100} height={100} />
                          <p className='md-text mt-3'>Are you sure?</p>
                          <p className="light-text">This action cannot be undone. This user  will be deleted from the database.</p>
                          <div className='pt-4'>
                            <button className="site-delete-btn px-3 me-2 width-100 mb-4" onClick={deleteUserFunction} disabled={disableButton}>
                              <span className={`${loader ? 'site-submit-spinner' : ''}`}></span>
                              <span className={`${loader ? 'site-submit-btn-visiblity' : ''}`}><i className="ri-delete-bin-line pe-2"></i> Delete</span>
                            </button>
                            <button onClick={handleCloseDeleteModal} className="site-btn site-cancel-btn px-3 width-100"><i className="ri-close-circle-line pe-2"></i>Cancel</button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        <div>

          {Loading ? (
            <div>
              <div className="mt-5 pt-5">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="book-loader">
                    <div className="book red"></div>
                    <div className="book blue"></div>
                    <div className="book green"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (

            <div className="container-lg">
              {details ? (
                <div className="row justify-content-center pt-5">
                  <div className="col-lg-9">
                    <div className="row g-3">

                      <div className="col-md-6">
                        <div className="site-boxes border-radius-10px p-3">
                          <img className='width-100 border-radius-5px' src={details.image} alt="" />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="site-boxes border-radius-10px">
                          <div className="border-bottom1  d-flex justify-content-end">
                            <div className="d-flex p-3">
                              <div className="me-3">
                                <button onClick={handleShowModal} className='site-inverse-btn px-3'><i className="ri-edit-line"></i><span className="ms-2 d-none d-md-inline">Edit</span></button>
                              </div>

                              <div>
                                <button onClick={handleShowDeleteModal} className='site-delete-btn px-3'><i className="ri-delete-bin-line "></i><span className="ms-2 d-none d-md-inline">Delete</span></button>
                              </div>
                            </div>

                          </div>

                          <div className='light-text p-3'>
                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Product Name</p>
                              <p>{formatName(details.name)}</p>
                            </div>


                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Category name</p>
                              <p>{formatName(details.category_name.name)}</p>
                            </div>


                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Price</p>
                              <p>{formatCurrency(details.price ? details.price : 0.00)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Discount Price</p>
                              <p>{formatCurrency(details.discount_price ? details.discount_price : 0.00)}</p>
                            </div>

                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Rating</p>
                              <p>{details.rating}</p>
                            </div>


                            <div className="pb-3 d-sm-flex justify-content-between">
                              <p className="pb-2 sm-text">Is active?</p>
                              {details.is_active ? (
                                <div className="d-flex align-center">
                                  <div className="site-successful-dot me-2"></div>
                                  <p className="success-text">Active</p>
                                </div>
                              ) : (
                                <div className="d-flex align-center">
                                  <div className="site-declined-dot me-2"></div>
                                  <p className="error-text">Diable</p>
                                </div>
                              )}

                            </div>

                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="site-boxes border-radius-10px">
                          <div className="border-bottom1">
                            <div className="p-3">
                              <p>Description</p>
                            </div>

                          </div>
                          <div className='p-3'>
                            {details.description ? (
                              <p className='light-text'>{details.description}</p>
                            ) : (
                              <p className="light-text">No description Placed</p>
                            )}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='mt-5 site-boxes border-radius-10px text-center pb-3 d-flex justify-content-center align-items-center  mt-4 pt-3'>
                  <div>
                    <Image src="/img/icon/thinking.png" alt="empty" width={70} height={70} />
                    <p className='light-text md-text'>No details available</p>
                    <p className="light-text">Details not avalaible. Check again later</p>
                  </div>

                </div>
              )}


            </div>
          )}


        </div>
      </div>
    </div>

  )
}

export default IndivivdualProduct