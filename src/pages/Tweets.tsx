import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import TableThree from '../components/TableThree';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import toast from 'react-hot-toast';
import { fetchTweets } from '../actions/tweets';
import TweetsTable from '../components/Tables/TweetsTable';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const Tweets = () => {
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
    dispatch(fetchTweets({page: page}) as any)
    .then((res: any) => {
      console.log(res?.items)
      setTweets(res)
    })
    .catch((e: Error) => {
      console.log(e)
    });
  }, [page])

  const [tweets, setTweets] = useState<any>(null)

  let navigate = useNavigate();

  const handleMovePages = (page) => {
    setTweets(null)
    navigate(`/tweets?page=${page}`);
  }

  return (
    <>
      <Breadcrumb pageName="Tweets" />

      <div className="flex flex-col gap-10">
        <TweetsTable
          currentPage={tweets?.currentPage}
          totalPage={tweets?.totalPages}
          handlePreviousPage={() => {
            if (tweets?.currentPage > 1) {
              handleMovePages(parseInt(tweets?.currentPage) - 1)
            }
          }}
          handleFirstPage={() => {
            if (tweets?.currentPage != 1) {
              handleMovePages(1)
            }
          }}
          handleLastPage={() => {
            handleMovePages(tweets?.totalPages)
          }}
          handleAfterPage={() => {
            if (tweets?.currentPage < tweets?.totalPages) {
              handleMovePages(parseInt(tweets?.currentPage) + 1)
            }
          }}
          data={tweets?.items}
        />
      </div>
    </>
  );
};

export default Tweets;