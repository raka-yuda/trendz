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
        />
        <ScrapeRequestTable 
          currentPage={scrapeRequest?.currentPage}
          totalPage={scrapeRequest?.totalPages}
          handlePreviousPage={() => {
            if (scrapeRequest?.currentPage > 1) {
              handleMovePages(parseInt(scrapeRequest?.currentPage) - 1)
            }
          }}
          handleFirstPage={() => {
            if (scrapeRequest?.currentPage != 1) {
              handleMovePages(1)
            }
          }}
          handleLastPage={() => {
            handleMovePages(scrapeRequest?.totalPages)
          }}
          handleAfterPage={() => {
            if (scrapeRequest?.currentPage < scrapeRequest?.totalPages) {
              handleMovePages(parseInt(scrapeRequest?.currentPage) + 1)
            }
          }}
          data={scrapeRequest?.items}
          handleShowAddModal={() => setIsAddModalVisible(true)}
          handleShowDeleteModal={(id: any) => {
            // console.log(`Deleting reqeuest id: ${id}`)
            setIsDeleteModalVisible(true)
          }}
        />
      </div>
    </>
  );
};

export default ScrapeRequest;
