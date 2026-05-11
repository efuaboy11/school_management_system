"use client"
import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChalkboardUser, faPeopleGroup, faUserSlash } from '@fortawesome/free-solid-svg-icons'
import "../../../../../css/adminCss/staff.css"
const HrDept = () => {
	return (
		<div>
			<div className="container-lg">
				<div>
					<p className="md-text">Hr Dashboard</p>
					<p className="light-text sm-text">Click on any boxes to carry out your specific task</p>
				</div>

				<div className="row g-4 mt-4">
					<div className="col-4">
						<Link href='/admin/hr-dept/add' className='Link '>
							<div className="site-boxes staff-home-boxes light-text p-3 border-radius-10px">
								<div className='light-text '>
									<FontAwesomeIcon className='md-text' icon={faChalkboardUser}/>
									<div className='pt-3'>
										<p className='font-size-20px'>Add Hr</p>
									</div>
								</div>
							</div>
						</Link>
					</div>

					<div className="col-4">
						<Link href='/admin/hr-dept/all' className='Link '>
							<div className="site-boxes staff-home-boxes light-text p-3 border-radius-10px">
								<div className='light-text '>
									<FontAwesomeIcon className='md-text' icon={faPeopleGroup}/>
									<div className='pt-3'>
										<p className='font-size-20px'>All HRs</p>
									</div>
								</div>
							</div>
						</Link>
					</div>

					<div className="col-4">
						<Link href='/admin/hr-dept/disable-account' className='Link '>
							<div className="site-boxes staff-home-boxes light-text p-3 border-radius-10px">
								<div className='light-text '>
									<FontAwesomeIcon className='md-text' icon={faUserSlash}/>
									<div className='pt-3'>
										<p className='font-size-20px'>Disable Hr Account</p>
									</div>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>  
		</div>
	)
}

export default HrDept