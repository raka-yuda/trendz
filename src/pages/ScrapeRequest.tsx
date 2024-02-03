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
  const dataScrape = [{
    created_at: null,
    id: 1,
    tweets_limit: null,
    topic_id: null,
    status: null,
    last_running: null,
    query: null,
    metadata: null,
    updated_at: null,
  }]

  const scrapeRequestState = useSelector((state: RootState) => state.scrapeRequest);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const message = useSelector((state: RootState) => state.message);

  const notify = (message: string) => toast.error(message);

  useEffect(() => {
    const latestMessage = (message as Record<string, string>)?.message
    if (latestMessage) notify((message as Record<string, string>)?.message)
    
  }, [message, dispatch])

  let query = useQuery();
  const page = parseInt(query.get("page") ?? '1');

  useEffect(() => {
    dispatch(fetchScrapeRequests({page: page}) as any)
      .then((res: any) => {
        setScrapeRequest(res)
      })
      .catch((e: Error) => {
        console.log(e)
      });
  }, [dispatch, page])

  const [scrapeRequest, setScrapeRequest] = useState<any>(null)

  const handleMovePages = (page) => {
    setScrapeRequest(null)
    navigate(`/scrape-request?page=${page}`);
  }

  useEffect(() => {
    console.log('Scrape Request Rendered..')
  }, [page])

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [scrapeRequestIdToDelete, setScrapeRequestIdToDelete] = useState(null);


  const handleDelete = (scrapeRequestId) => {
    // Set the ID and show the modal
    setScrapeRequestIdToDelete(scrapeRequestId);
    setIsDeleteModalVisible(true);
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
          data={(scrapeRequestState as any)?.scrapeRequest?.items}
          handleShowAddModal={() => setIsAddModalVisible(true)}
          handleShowDeleteModal={(id: any) => {
            // console.log(`Deleting reqeuest id: ${id}`)
            setIsDeleteModalVisible(true)
          }}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default ScrapeRequest;
