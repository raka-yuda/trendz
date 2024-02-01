import { useDispatch } from 'react-redux';
import BrandOne from '../images/brand/brand-01.svg';
import BrandTwo from '../images/brand/brand-02.svg';
import BrandThree from '../images/brand/brand-03.svg';
import BrandFour from '../images/brand/brand-04.svg';
import BrandFive from '../images/brand/brand-05.svg';
import { useEffect, useState } from 'react';
import { EyeIcon, TrashCanIcon, DownloadIcon } from '../Icons';
import { FaAngleLeft, FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import AddScrapeRequestModal from '../Modals/AddScrapeRequestModal';

export interface IScrapeRequest {
  created_at: string | null;
  id: number | null;
  tweets_limit: number | null;
  topic_id: number | null;
  status: string | null;
  last_running: string | null;
  query: string | null;
  metadata: string | null;
  updated_at: string | null;
}

export interface IScrapeRequestTable {
  data: IScrapeRequest[];
  currentPage: number;
  totalPage: number;
  handlePreviousPage: React.MouseEventHandler<HTMLButtonElement>;
  handleLastPage: React.MouseEventHandler<HTMLButtonElement>;
  handleAfterPage: React.MouseEventHandler<HTMLButtonElement>;
  handleFirstPage: React.MouseEventHandler<HTMLButtonElement>;
}
const badgeRequestStatusColor = (status: string = 'IN_QUEUE') => {
  // success
  // danger
  // warning

  // IN_QUEUE
  // IN_PROGRESS
  // FINISHED
  // FAILED
  switch (status) {
    case 'IN_QUEUE':
      return 'bg-primary text-primary';
    case 'IN_PROGRESS':
      return 'bg-warning text-warning';
    case 'FINISHED':
      return 'bg-success text-success';
    case 'FAILED':
      return 'bg-danger text-danger';
    default:
      return 'bg-primary text-primary';
  }
};

const ScrapeRequestTable = ({
  data,
  currentPage,
  totalPage: lastPage,
  handlePreviousPage,
  handleLastPage,
  handleAfterPage,
  handleFirstPage,
}: IScrapeRequestTable) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  return (
    <>
      <AddScrapeRequestModal 
        visibility={isAddModalVisible}
        setVisibilityModal={setIsAddModalVisible}
      />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-center py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Latest Request
          </h4>
          <button 
            className="hover:text-primary"
            onClick={() => setIsAddModalVisible(true)}
          >
            <FaPlus />
          </button>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="relative w-full table-auto">
            <thead className="sticky top-0">
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  No
                </th>
                <th className="py-4 px-4 min-w-[220px] font-medium text-black dark:text-white xl:pl-11">
                  Topic ID
                </th>
                <th className="py-4 px-4 min-w-[150px] font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 min-w-[120px] font-medium text-black dark:text-white">
                  Tweets Limit
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Metadata
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Last Running
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Query
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Created At
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((scrapeRequest: any, index) => {
                  // Convert the string to a Date object
                  const createdAtFormattedDate = (scrapeRequest?.created_at) ? new Date(scrapeRequest.created_at!).toLocaleString() : '-';
                  const lastRunningFormattedDate = (scrapeRequest?.last_running) ? new Date(scrapeRequest.last_running!).toLocaleString() : '-';

                  // Format the date using toLocaleString
                  // const formattedDate = dateObject.toLocaleString();

                  return (
                    <tr key={index + 1}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="text-sm font-medium text-black dark:text-white">
                          {index + 1}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="text-sm font-medium text-black dark:text-white">
                          {scrapeRequest?.trending_topic?.topic ?? '-'}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p
                          className={`text-sm font-medium inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm ${badgeRequestStatusColor(
                            scrapeRequest.status!,
                          )}`}
                        >
                          {scrapeRequest.status ?? '-'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-sm font-medium text-black dark:text-white">
                          {scrapeRequest.tweets_limit ?? '-'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-sm font-medium text-black dark:text-white">
                          {scrapeRequest.metadata ?? '-'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-sm font-medium text-black dark:text-white">
                          {lastRunningFormattedDate ?? '-'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-sm font-medium text-black dark:text-white">
                          {scrapeRequest.query ?? '-'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-sm font-medium text-black dark:text-white">
                          {createdAtFormattedDate ?? '-'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button className="hover:text-primary">
                            <EyeIcon />
                          </button>
                          <button className="hover:text-primary">
                            <TrashCanIcon />
                          </button>
                          <button className="hover:text-primary">
                            <DownloadIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11 text-center"
                    colSpan={8}
                  >
                    <h5 className="font-medium text-black dark:text-white">
                      Empty Data
                    </h5>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end py-4 mr-4">
          <div className="grid grid-cols-5 gap-1 items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              onClick={handlePreviousPage}
              className="rounded flex justify-center items-center py-2 px-2 text-base font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark dark:bg-boxdark bg-white shadow-card"
            >
              <FaChevronLeft/>
            </button>
            <button
              onClick={handleFirstPage}
              className={`rounded py-1 px-3 text-base font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark dark:bg-boxdark ${
                currentPage == 1 ? 'bg-white shadow-card' : ''
              }`}
            >
              1
            </button>
            <button
              className={`rounded py-1 px-3 text-base font-medium text-black  dark:text-white ${
                currentPage != 1 && currentPage != lastPage
                  ? 'bg-white shadow-card'
                  : ''
              }`}
            >
              {(currentPage == 1 || currentPage == lastPage) ? '...' : currentPage }
            </button>
            <button
              onClick={handleLastPage}
              className={`rounded py-1 px-3 text-base font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                currentPage == lastPage ? 'bg-white shadow-card' : ''
              }`}
            >
              {(lastPage == 1 ? '-' : lastPage) ?? '-'}
            </button>
            <button
              onClick={handleAfterPage}
              className="rounded flex justify-center items-center py-2 px-2 text-base font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark dark:bg-boxdark bg-white shadow-card"
            >
              <FaChevronRight/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrapeRequestTable;
