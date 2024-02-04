import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import ScrapeRequestService from "../../services/scrape-request.service";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchScrapeRequests } from "../../actions/scrapeRequest";

const DeleteScrapeRequestModal = ({visibility = false, setVisibilityModal, page, dispatch, scrapeRequestId}) => {
  let navigate = useNavigate();
  // const dispatch = useDispatch();

  const [formDeleteScrapeRequest, setFormScrapeRequest] = useState({
    requestId: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormScrapeRequest((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // topicId
    // query
    // tweetsLimit
    console.log(`Deleting scrape request with id: ${scrapeRequestId}`)
    // setVisibilityModal(false);
    // const {
    //   requestId,
    // } = formDeleteScrapeRequest;
    
    if (scrapeRequestId) {
      ScrapeRequestService.deleteScrapeRequests({
        requestId: parseInt(scrapeRequestId),
      }).then(async () => {
        await dispatch(fetchScrapeRequests({page: page}) as any).then((res) => {
          console.log('fetchScrapeRequests: ', res)
        });
        toast.success('Success delete scrape request!');
        setVisibilityModal(false);
      }).catch((e: any) => {
        console.log(`Error Delete: `, e)
        toast.error(e?.response?.data?.message || 'Failed delete scrape request!')
        setVisibilityModal(false);
      });
    } else {
      toast.error('Please fill the data!');
    }
  };

  return (
    <>
      {visibility && 
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto xl:max-w-3xl sm:max-w-full">
                <div className="relative p-6 flex-auto">
                  <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                      <div className="flex justify-between items-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Delete Request
                        </h3>
                        <button 
                          className="rotate-45"
                          type="button"
                          onClick={() => setVisibilityModal(false)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                          <h3 className="pb-6 font-medium text-black dark:text-white">
                            Are you sure you want to delete this data?
                          </h3>
                          {/* <div className="mb-4.5 md:min-w-[360px] min-w-[200px]">
                            <label className="mb-2.5 block text-black dark:text-white">
                              Topic Id
                            </label>
                            <div className="relative z-20 bg-transparent dark:bg-form-input">
                              <input
                                name="topicId"
                                type="text"
                                placeholder="Fill topic id"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                value={formAddScrapeRequest.topicId}
                                onChange={handleChange}
                                // onChange={(e) => {
                                //   console.log(e.target)
                                // }}
                              />
                            </div>
                          </div> */}

                          {/* <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                              Tweet Limit
                            </label>
                            <input
                              name="tweetsLimit"
                              type="text"
                              placeholder="Fill tweet limit"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              value={formAddScrapeRequest.tweetsLimit}
                              onChange={handleChange}
                            />
                          </div> */}

                          {/* <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                              Additional Tweet Search Query 
                            </label>
                            <input
                              name="query"
                              type="text"
                              placeholder="Fill query"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              value={formAddScrapeRequest.query}
                              onChange={handleChange}
                            />
                          </div> */}
                          <button 
                            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                            type="submit"
                            // onSubmit={handleSubmit}
                          >
                            Sure
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          
          <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
        </>
      }
    </>
  );
};

export default DeleteScrapeRequestModal;
