import { useEffect, useState } from 'react';
import './Company.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllLocations, selectAllLocations } from '../locations/locationSlice';
import { selectAllCompanies } from './companySlice';
import Aos from 'aos';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { Link } from 'react-router-dom';
import CompanyList from './CompanyList';

const SearchCompany = () => {
  const companies = useSelector(selectAllCompanies);
  const [selectedFilters, setSelectedFilters] = useState({
    companyName: '',
    locationId:''
  });


  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLocations());
  }, [dispatch]);

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const locations = useSelector(selectAllLocations);
  const locationsOpt = locations.map((location) => (
    
    <option key={location.id} value={location.id}>
      
      {location.name}
    </option>
  ));
 

const handleInputChange = (e) => {
  setSelectedFilters({
    ...selectedFilters,
    [e.target.name]: e.target.value,
  });
  console.log(selectedFilters.locationId);
};

const handleSearch = () => {
  const { companyName, locationId } = selectedFilters;

  // Filter companies based on selected filters
  const filteredData = companies.filter((company) => {
    if (companyName && !company.name.toLowerCase().includes(companyName.toLowerCase())) {
      return false;
    }
    if (locationId && company.location && company.location.id !== parseInt(locationId)) {
      return false;
    }
    return true;
  });

  setFilteredCompanies(filteredData);
};


  return (
    <>
      <div
        className="container bg-primary mb-2 fadeIn"
        data-delay="0.1s"
        style={{ padding: '30px' }}
      >
        <div className="container">
          <div className=" row g-2 comSearch ">
            <div className="col-md-12 justify-content-end align-items-center text-center ">
              <div className="row g-2  ">
                <div className="col-md-5 ">
                  <input
                    type="text"
                    className="form-control border-0 h-100 "
                    placeholder="Company Name"
                    name="companyName"
                    value={selectedFilters.companyName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-5">
                  <select className="form-select border-0" name="locationId" onChange={handleInputChange}>
                    <option value="">Choose Location</option>
                    {locationsOpt}
                  </select>
                </div>
                <div className="col-md-2 ">
                  <button className="searchCom btn btn-outline-secondary border-0 w-100 " onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="role container text-center d-flex my-5">
          <div className="col-md-4">
            <h3>Loading</h3>
          </div>
          <div className="col-md-8">
            <PropagateLoader color={'#119BFF'} loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        </div>
      ) : (
        <div className="container py-3">
          <div className="container">
            <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
              Companies List
            </h1>

            {filteredCompanies.length === 0 ? (
              <CompanyList/>
            ) : (
              <div className="row g-4 text-left" data-aos="fade-up">
                {filteredCompanies.map((company) => (
                  <div className="col-lg-2 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                    <Link className="com-item rounded p-4" to={`/company/${company.id}`}>
                      <img
                        className="flex-shrink-0 img-fluid border rounded mb-2"
                        src={company.logo}
                        alt=""
                        style={{ width: '80px', height: '80px' }}
                      />

                      <div key={company.id}>
                        <h6 className="mb-2 text-dark">{company.name}</h6>
                        <p className="mb-2 text-dark">{company.jobOpening} Jobs</p>
                        <p className="mb-2 text-dark mb-3"><i class="fa fa-map-marker-alt text-primary me-2"/>{company.address} </p>
                        <Link className="view btn btn-outline-primary" to={`/company/${company.id}`}>
                          <i className="fas fa-arrow-right "></i>
                        </Link>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchCompany;
