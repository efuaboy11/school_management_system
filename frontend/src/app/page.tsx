import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bootstrap in Next.js</h1>
      
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Placeholder" />
            <div className="card-body">
              <h5 className="card-title">Card Title</h5>
              <p className="card-text">Some quick example text to build on the card title.</p>
              <Link href="/test" className="btn btn-primary">Go somewhere</Link>
            </div>
          </div>
        </div>
      </div>

      <form className="mt-5">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter your name" />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default Home;
