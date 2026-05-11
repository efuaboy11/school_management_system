"use client"
import AuthContext from '@/context/AuthContext'
import React, { useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'


const AddBankAcount = () => {
  const [bankName, setBankName] = useState('')
  const [description, setDescription] = useState('')
  const [accountName, setAccountName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
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
    formData.append('bank_name', bankName)
    formData.append('description', description)
    formData.append('account_name', accountName)
    formData.append('account_number', `${accountNumber}`)
    formData.append('is_active', `${true}`)

    if (img) {
      formData.append('bank_img', img)
    }


    try {
      const response = await fetch(`https://school.amanilightequity.com/api/bank-account/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })


      if (response.ok) {
        showAlert()
        setMessage('Bank account created')
        setIsSuccess(true)
        setLoader(false)
        setDisableButton(false)
        setBankName('')
        setDescription('')
        setAccountName('')
        setImg(null)
        setAccountNumber('')

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






  return (
    <div>
      <div className="container-lg my-5 pt-2">
        <div className="row justify-content-center">
          <div className="col-sm-8">
            <div className="site-boxes border-radius-10px">
              <div className="border-bottom1 text-center p-3">
                <p>Create bank account</p>
              </div>


              <div className="p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">

                    <div className="col-md-6">
                      <label htmlFor="bankName" className="form-label">Bank Name<span className="text-danger">*</span></label>
                      <input type='text' className={`site-input ${errors.bankName ? 'error-input' : ''}`} {...register('bankName', { required: true })} value={bankName} onChange={(e) => setBankName(e.target.value)} />
                      {errors.bankName && <p className="error-text">This field is required</p>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="accountName" className="form-label">Account Name<span className="text-danger">*</span></label>
                      <input type="text" className={`site-input ${errors.accountName ? 'error-input' : ''}`} {...register('accountName', { required: true })} placeholder='Account Name' value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                      {errors.accountName && <p className="error-text">This field is required</p>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="accountNumber" className="form-label">Account Number</label>
                      <input type="text" className={`site-input ${errors.accountNumber ? 'error-input' : ''}`} {...register('accountNumber')} placeholder='Account Number' value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                    </div>




                    <div className="col-12">
                      <label htmlFor="" className='form-label'>Description</label>
                      <textarea rows={6} className={`site-input ${errors.description ? 'error-input' : ''}`} {...register('description')} value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Bank Image <span className="text-danger">*</span></label>

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

export default AddBankAcount