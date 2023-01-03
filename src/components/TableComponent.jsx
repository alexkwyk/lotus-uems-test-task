import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import Timer from './Timer';
import fetchData from '../slices/fetchThunk.js';
import { selectors, getActiveCompanyId, setActiveCompanyId } from '../slices/companiesSlice.js'

const TableComponent = () => {
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

  const changeActiveCompany = () => {
    if (companiesInfo.at(-1).id === activeCompanyId) {
      setActiveCompanyId(companiesInfo[0].id);
    } else {
      setActiveCompanyId(activeCompanyId + 1)
    }
  };

  return (
    <Table striped>
      <thead>
        <tr>
          {companiesInfo.map((item) => (
            <td key={item.id} className="text-center border-0">
              {item.id === activeCompanyId ? <Timer /> : ''}
            </td>
          ))}
        </tr>
        <tr>
          {companiesInfo.map((item, index) => (
            <td key={item.id} className="text-center text-uppercase font-monospace text-primary">
              <span className="">{`Участник №${index + 1}`}</span>
              <p className="fw-bold">{item.name}</p>
            </td>
          ))}
        </tr>
      </thead>
      <tbody>

      </tbody>
    </Table>
  )
}

export default TableComponent;