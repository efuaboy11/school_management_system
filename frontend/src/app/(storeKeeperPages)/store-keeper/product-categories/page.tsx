"use client"
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pagination, Stack } from '@mui/material';
import AllDataContext from '@/context/AllData'
import AuthContext from '@/context/AuthContext'
import { debounce } from "lodash";


const ProductCategories = () => {

  const {
    productCatergoriesCount,
    productCatergoriesData,
    setProductCatergoriesData,
    productCatergoriesLoader,

    productCatergoriesSearch,
    setProductCatergoriesSearch,
    ProductCatergoriesFunction,
    FilterProductCatergories,

  } = useContext(AllDataContext)!;

  const {
    truncateText,
    authTokens,
    formatDate,
    formatName,


    loader,
    setLoader,
    disableButton,
    setDisableButton,

    setMessage,
    showAlert,
    setIsSuccess,

  } = useContext(AuthContext)!;

  useEffect(() => {
    if (!productCatergoriesSearch) {
      ProductCatergoriesFunction()
    } else if (productCatergoriesSearch) {
      const debouncedSearch = debounce(() => {
        FilterProductCatergories();
      }, 300);
      debouncedSearch();

      return () => {
        debouncedSearch.cancel();
      };

    }

  }, [productCatergoriesSearch])



  useEffect(() => {
    ProductCatergoriesFunction()

  }, [])




  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  const [statusLoader, setStatusLoader] = useState(false)
  const statusModal = useRef<any>(null)
  const [statusOverlay, setStatusOverlay] = useState(false)
  const [isProductActive, setIsProductActive] = useState(true)

  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [selectedDataId, setSelectedDataId] = useState(null);



  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };


  const showStatusModal = (id: any, status: boolean) => {
    setIsProductActive(status)
    if (statusModal.current) {
      statusModal.current.style.transform = `translateY(${0}px)`
      statusModal.current.style.transition = `all ${1.5}s ease`
    }
    setStatusOverlay(true)
    setSelectedDataId(id)
  }

  const hideStatusModal = () => {
    if (statusModal.current) {
      statusModal.current.style.transform = `translateY(${-650}%)`
      statusModal.current.style.transition = `all ${5}s ease`
    }
    setSelectedDataId(null)

  }


  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIDs = productCatergoriesData.map((data) => data.id);
      setSelectedIDs(allIDs);
    } else {
      setSelectedIDs([]);
    }
  };
  const handleCheckboxChange = (id: number) => {
    if (selectedIDs.includes(id)) {
      setSelectedIDs(selectedIDs.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIDs([...selectedIDs, id]);
    }
  }


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  // const productCatergoriesData = [...Array(100).keys()];
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = productCatergoriesData.slice(startIndex, startIndex + itemsPerPage);


  const deleteFunction = async () => {
    setDisableButton(true)
    setLoader(true)

    try {
      const response = await fetch('https://school.amanilightequity.com/api/delete-multiple-product-categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },
        body: JSON.stringify({
          ids: selectedIDs,
        }),

      })

      if (response.ok) {
        setLoader(false)
        setDisableButton(false)
        setProductCatergoriesData(productCatergoriesData.filter(dat => dat.id !== selectedIDs))
        setShowDeleteModal(false)
        setSelectedIDs([])
        setMessage("Data entry deleted successfully")
        ProductCatergoriesFunction()
        showAlert()
        setIsSuccess(true)


      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');

        setLoader(false)
        setDisableButton(false)
        setMessage(errorMessages)
        showAlert()
        setIsSuccess(false)

      }
    } catch {
      setLoader(false)
      setDisableButton(false)
      setMessage("An error occurred. Please try again.")
      showAlert()
      setIsSuccess(false)
    }
  }


  const UpdateStatus = async (e: any) => {
    e.preventDefault()
    setStatusLoader(true)
    setDisableButton(true)

    try {
      const response = await fetch(`https://school.amanilightequity.com/api/product-categories/${selectedDataId}/`, {
        method: 'PATCH',
        body: JSON.stringify({
          is_active: !isProductActive,
        }),
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
          "Content-Type": "application/json"
        }
      })

      if (response.ok) {
        showAlert()
        setMessage("Status updated sucessfully")
        setDisableButton(false)
        setIsSuccess(true)
        setStatusLoader(false)
        hideStatusModal()
        ProductCatergoriesFunction()
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setDisableButton(false)
        setStatusLoader(false)
        setIsSuccess(false)
        showAlert()

      }
    } catch (error) {
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred.');
      setDisableButton(false)
      setIsSuccess(false)
      setStatusLoader(false)

    }
  }




  useEffect(() => {
    if (showDeleteModal) {
      setAnimateModal(true)
    } else {
      setAnimateModal(false);
    }
  }, [showDeleteModal]);

  useEffect(() => {
    let timer: any;
    if (selectedDataId == null) {
      timer = setTimeout(() => {
        setStatusOverlay(false);
      }, 1000);
    }


    return () => clearTimeout(timer);
  }, [selectedDataId]);



  return (
    <div className='mb-5 pb-5'>
      {showDeleteModal && (
        <section className={` ${showDeleteModal ? 'overlay-background' : ''}`}>
          <div className='container-lg'>

            <div className=" row justify-content-center align-center2 height-90vh">

              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
                <div className="site-modal-conatiner">
                  <div className={`site-modal-content scroll-bar  ${animateModal ? 'show-modal' : 'hide-modal'}`}>
                    <div className="d-flex justify-content-center text-center">
                      <div>
                        <Image src="/img/icon/warning.png" alt="empty" width={100} height={100} />
                        <p className='md-text mt-3'>Are you sure?</p>
                        <p className="light-text">This action cannot be undone. {selectedIDs.length} selected {selectedIDs.length === 1 ? 'data entry' : 'data entries'} will be deleted.</p>
                        <div className='pt-4'>
                          <button className="site-delete-btn px-3 me-2 width-100 mb-4" onClick={deleteFunction} disabled={disableButton}>
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


      <div className={`${statusOverlay ? 'overlay-background pt-5 ' : ''}`}>
        <div className="dashboard-update-status-container" ref={statusModal}>
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6 col-sm-9 col-11">
              <div className="site-boxes px-4 py-3 border-radius-10px">
                <div className="d-flex justify-content-end">
                  <FontAwesomeIcon className='sm-text cursor-pointer' icon={faX} onClick={hideStatusModal} />
                </div>
                {isProductActive ? (
                  <div className="d-flex justify-content-center">
                    <div className="text-center">
                      <h5 className='pb-2'>This Product Categories is <span className="success-text">Active</span></h5>
                      <p className="light-text">This product categories is currently active, would you like to disable the product category.</p>
                      <p className="sm-text light-text italic-text">Note: THis action will make products under the categories not purchasable</p>

                      <button onClick={UpdateStatus} disabled={disableButton} type="submit" className={`mt-4 mb-3 Button width-100 site-btn px-3`}>
                        <span className={`${statusLoader ? 'site-submit-spinner' : ''}`}></span>
                        <span className={`${statusLoader ? 'site-submit-btn-visiblity' : ''}`}><i className="bi bi-ban me-2"></i>Disable</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="text-center">
                      <h5 className='pb-2'>This Product Categories is <span className="error-text">Disable</span></h5>
                      <p className="light-text">This product categories is currently not active, would you like to activate the product category.</p>
                      <p className="sm-text light-text italic-text">Note: THis action will make products under the categories  purchasable by users</p>

                      <button onClick={UpdateStatus} disabled={disableButton} type="submit" className={`mt-4 mb-3 Button width-100 site-btn px-3`}>
                        <span className={`${statusLoader ? 'site-submit-spinner' : ''}`}></span>
                        <span className={`${statusLoader ? 'site-submit-btn-visiblity' : ''}`}><i className="bi bi-check2-circle me-2"></i>Activate</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>



      <div className="container-xl pt-4">
        <div className="d-md-flex justify-content-between">
          <div>
            <p className="md-text">Product Categories</p>
            <p className="light-text pb-3">Total of {productCatergoriesCount} product categories avaliable</p>
          </div>

          <div className='d-flex mb-4'>
            <Link href='/store-keeper/product-categories/add' className="site-btn px-3 Link"><i className="ri-send-plane-fill pe-2"></i> Add category</Link>
          </div>
        </div>

        <div className="d-flex justify-content-end">

          <div>
            <div className="d-flex align-items-center">
              <input type="text" className="site-search-input" placeholder="Search" value={productCatergoriesSearch} onChange={(e) => setProductCatergoriesSearch(e.target.value)} />
              <button className="site-btn px-3 ms-2"><i className="ri-search-line"></i></button>
            </div>
          </div>
        </div>

        <div>
          {productCatergoriesLoader ? (
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
            <div className='mt-5'>
              {currentItems.length > 0 ? (
                <div>
                  {selectedIDs.length > 0 ? (
                    <div className='pb-2'>
                      <button onClick={handleShowDeleteModal} className='site-delete-btn px-3'><i className="ri-delete-bin-line me-2"></i>Delete</button>
                    </div>
                  ) : (
                    <div></div>
                  )
                  }
                  <div className='site-boxes  site-border border-radius-5px dahboard-table non-wrap-text scroll-bar'>
                    <table className='overflow-auto light-text'>
                      <thead className='sm-text'>
                        <tr>
                          <th className='py-2'>
                            <label className="custom-checkbox cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedIDs.length === productCatergoriesData.length && productCatergoriesData.length > 0}
                                onChange={handleSelectAll}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </th>
                          <th>Category name</th>
                          <th>Status</th>
                          <th>Description</th>
                          <th>Date</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentItems.length > 0 ? (
                          currentItems.map((data) => (
                            <tr key={data.id}>
                              <td className='py-3'>
                                <label className="custom-checkbox cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={selectedIDs.includes(data.id)}
                                    onChange={() => handleCheckboxChange(data.id)}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </td>
                              <td className='py-3'>
                                {formatName(truncateText(data.name, 2))}
                              </td>
                              {data.is_active ? (
                                <td>
                                  <div className="d-flex align-center">
                                    <div className="site-successful-dot me-2"></div>
                                    <p className="success-text">Active</p>
                                  </div>
                                </td>
                              ) : (
                                <td>
                                  <div className="d-flex align-center">
                                    <div className="site-declined-dot me-2"></div>
                                    <p className="error-text">Diable</p>
                                  </div>
                                </td>
                              )}
                              <td>{truncateText(data.description, 2)}</td>
                              <td>{formatDate(data.created_at)}</td>
                              <td>
                                <div className="d-flex align-center">
                                  <Link href={`/store-keeper/product-categories/individual/${data.id}`} className="Link site-border box-50px d-flex  align-center justify-content-center border-radius-5px cursor-pointer">
                                    <i className="ri-eye-line"></i>
                                  </Link>

                                  <div onClick={() => showStatusModal(data.id, data.is_active)} className='ms-3 cursor-pointer'>
                                    <i className="ri-edit-line"></i>
                                  </div>
                                </div>
                              </td>
                            </tr>

                          ))

                        ) : (
                          <tr>
                            <td className="py-4">No details available</td>
                          </tr>
                        )}


                      </tbody>

                    </table>

                  </div>

                  {productCatergoriesData.length > 10 && (
                    <div className="col-12 mb-4 mt-3">
                      <Stack spacing={2} alignItems="end">
                        <Pagination
                          count={Math.ceil(productCatergoriesData.length / itemsPerPage)}
                          page={page}
                          onChange={handleChange}
                          sx={{
                            '& .MuiPaginationItem-root': {
                              color: '#737b7d', // color of all numbers
                            },
                            '& .MuiPaginationItem-root.Mui-selected': {
                              backgroundColor: '#783ebc', // Your custom color
                              color: '#fff',
                            },
                          }}
                        />
                      </Stack>
                    </div>
                  )}
                </div>


              ) : (
                <div className="col-12 ">
                  <div className='site-boxes text-center pb-5 d-flex justify-content-center align-items-center  mt-5 pt-5'>
                    <div>
                      <Image src="/img/icon/thinking.png" alt="empty" width={100} height={100} />
                      <p className='light-text md-text'>No details available</p>
                      <p className="light-text">There is no  details right now. Check again later</p>
                    </div>

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

export default ProductCategories