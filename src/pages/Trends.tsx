import { useEffect, useMemo, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import TableThree from '../components/TableThree';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchTrends } from '../actions/trends';
import TrendsTable from '../components/Tables/TrendsTable';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const Trends = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = parseInt(query.get("page") ?? '1');

  const [trends, setTrends] = useState<any>(null)
  const [pageConfig, setPageConfig] = useState({
    page,
    limit: 10
  })

  const message = useSelector((state: RootState) => state.message);

  const notify = (message: string) => toast.error(message);

  const handleMovePages = (page) => {
    setTrends(null)
    navigate(`/trends?page=${page}`);
  }

  useEffect(() => {
    const latestMessage = (message as Record<string, string>)?.message
    if (latestMessage) notify((message as Record<string, string>)?.message)
    
  }, [message, dispatch])


  useEffect(() => {
    dispatch(fetchTrends({page: page}) as any)
    .then((res: any) => {
      setTrends(res)
    })
    .catch((e: Error) => {
      console.log(e)
    });
  }, [page])

  return (
    <>
      <Breadcrumb pageName="Trends" />

      <div className="flex flex-col gap-10">
        <TrendsTable 
          currentPage={trends?.currentPage}
          totalPage={trends?.totalPages}
          handlePreviousPage={() => {
            if (trends?.currentPage > 1) {
              handleMovePages(parseInt(trends?.currentPage) - 1)
            }
          }}
          handleFirstPage={() => {
            if (trends?.currentPage != 1) {
              handleMovePages(1)
            }
          }}
          handleLastPage={() => {
            handleMovePages(trends?.totalPages)
          }}
          handleAfterPage={() => {
            if (trends?.currentPage < trends?.totalPages) {
              handleMovePages(parseInt(trends?.currentPage) + 1)
            }
          }}
          data={trends?.items}
          limit={pageConfig.limit}
          totalData={(trends as any)?.totalItems}
        />
      </div>
    </>
  );
};

export default Trends;
