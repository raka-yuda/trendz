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
  }, [page])

  const [scrapeRequest, setScrapeRequest] = useState<any>(null)
  // const [page, ]


  // // useEffect(() => {
  // //   console.log("query all: ", query)
  // //   console.log("query: ", query.get("page"))
  // //   console.log("query: ", query.get("color"))
  // // })

  let navigate = useNavigate();

  const handleMovePages = (page) => {
    setScrapeRequest(null)
    navigate(`/scrape-request?page=${page}`);
  }

  useEffect(() => {
    console.log('Scrape Request Rendered..')
  }, [page])

  return (
    <>
      <Breadcrumb pageName="Scrape Request" />
      <div className="flex flex-col gap-10">
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
        />
      </div>
    </>
  );
};

export default ScrapeRequest;
