import { useEffect, useMemo, useState } from 'react';
import { fetchScrapeRequests } from '../actions/scrapeRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import Breadcrumb from '../components/Breadcrumb';
import ScrapeRequestTable from '../components/Tables/ScrapeRequestTable';
import toast from 'react-hot-toast';
import AddScrapeRequestModal from '../components/Modals/AddScrapeRequestModal';
import DeleteScrapeRequestModal from '../components/Modals/DeleteScrapeRequestModal';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const ScrapeRequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useQuery();
  const notify = (message: string) => toast.error(message);
  const page = parseInt(query.get("page") ?? '1');

  const scrapeRequestState = useSelector((state: RootState) => state.scrapeRequest);
  const message = useSelector((state: RootState) => state.message);

  const [scrapeRequest, setScrapeRequest] = useState<any>(null)
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [scrapeRequestIdToDelete, setScrapeRequestIdToDelete] = useState(null);
  const [pageConfig, setPageConfig] = useState({
    page,
    limit: 10
  });
  const [filterOptions, setFilterOptions] = useState({
    status: ""
  })

  const handleMovePages = (page) => {
    setScrapeRequest(null)
    navigate(`/scrape-request?page=${page}`);
  }

  useEffect(() => {
    const latestMessage = (message as Record<string, string>)?.message
    if (latestMessage) notify((message as Record<string, string>)?.message)
    
  }, [message, dispatch])

  useEffect(() => {
    dispatch(fetchScrapeRequests({
      page: page,
      status: filterOptions?.status
    }) as any)
      .then((res: any) => {
        console.log(res)
        setScrapeRequest(res)
      })
      .catch((e: Error) => {
        console.log(e)
      });
  }, [dispatch, page, filterOptions])

  const handleDelete = (scrapeRequestId) => {
    // Set the ID and show the modal
    setScrapeRequestIdToDelete(scrapeRequestId);
    setIsDeleteModalVisible(true);
  };

  const handleFilter = (option) => {
    setFilterOptions({
      ...filterOptions,
      ...option
    });
  }

  return (
    <>
      <Breadcrumb pageName="Scrape Request" />
      <div className="flex flex-col gap-10">
        <AddScrapeRequestModal 
          visibility={isAddModalVisible}
          setVisibilityModal={setIsAddModalVisible}
          page={page}
          dispatch={dispatch}
        />
        <DeleteScrapeRequestModal 
          visibility={isDeleteModalVisible}
          setVisibilityModal={setIsDeleteModalVisible}
          page={page}
          dispatch={dispatch}
          scrapeRequestId={scrapeRequestIdToDelete}
        />
        <ScrapeRequestTable 
          currentPage={(scrapeRequestState as any)?.scrapeRequest?.currentPage}
          totalPage={(scrapeRequestState as any)?.scrapeRequest?.totalPages}
          handlePreviousPage={() => {
            if ((scrapeRequestState as any)?.scrapeRequest?.currentPage > 1) {
              handleMovePages(parseInt((scrapeRequestState as any)?.scrapeRequest?.currentPage) - 1)
            }
          }}
          handleFirstPage={() => {
            if ((scrapeRequestState as any)?.scrapeRequest?.currentPage != 1) {
              handleMovePages(1)
            }
          }}
          handleLastPage={() => {
            handleMovePages((scrapeRequestState as any)?.scrapeRequest?.totalPages)
          }}
          handleAfterPage={() => {
            if ((scrapeRequestState as any)?.scrapeRequest?.currentPage < (scrapeRequestState as any)?.scrapeRequest?.totalPages) {
              handleMovePages(parseInt((scrapeRequestState as any)?.scrapeRequest?.currentPage) + 1)
            }
          }}
          limit={pageConfig.limit}
          totalData={(scrapeRequestState as any)?.scrapeRequest?.totalItems}
          data={(scrapeRequestState as any)?.scrapeRequest?.items}
          handleShowAddModal={() => setIsAddModalVisible(true)}
          handleShowDeleteModal={(id: any) => {
            // console.log(`Deleting reqeuest id: ${id}`)
            setIsDeleteModalVisible(true)
          }}
          handleDelete={handleDelete}
          handleFilter={handleFilter}
        />
      </div>
    </>
  );
};

export default ScrapeRequest;
