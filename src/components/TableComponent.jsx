import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spinner } from 'react-bootstrap';

import fetchData from '../store/fetchThunk';
import { selectors, getActiveCompanyId } from '../store/companiesSlice';

import TableHeader from "./TableHeader.jsx";
import TableBody from "./TableBody.jsx";


export default function TableComponent() {
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await dispatch(fetchData());
      if (response.error) {
        console.log(response.error);
      } else {
        setPageLoaded(true);
      }
    })();
  }, [dispatch]);

  const companiesInfo = useSelector(selectors.selectAll);
  const activeCompanyId = useSelector(getActiveCompanyId);

  return (pageLoaded ? (
    <Table striped>
      <TableHeader companiesInfo={companiesInfo} activeCompanyId={activeCompanyId} />
      <TableBody companiesInfo={companiesInfo} activeCompanyId={activeCompanyId} />
    </Table>
    ) : (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  );
};
