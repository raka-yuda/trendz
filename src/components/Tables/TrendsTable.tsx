import { useDispatch } from 'react-redux';
import BrandOne from '../images/brand/brand-01.svg';
import BrandTwo from '../images/brand/brand-02.svg';
import BrandThree from '../images/brand/brand-03.svg';
import BrandFour from '../images/brand/brand-04.svg';
import BrandFive from '../images/brand/brand-05.svg';
import { useEffect } from 'react';
import { EyeIcon, TrashCanIcon, DownloadIcon } from '../Icons';

export interface ITrendsTable {
  data: Record<string, any>[];
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

const TrendsTable = ({
  data,
  currentPage,
  totalPage: lastPage,
  handlePreviousPage,
  handleLastPage,
  handleAfterPage,
  handleFirstPage,
}: ITrendsTable) => {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Latest Request
        </h4>
        <div className="max-w-full overflow-x-auto">
          <table className="relative w-full table-auto">
            <thead className="sticky top-0">
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  No
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Topic ID
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Topic
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
                data.map((trend: any, index) => {
                  // Convert the string to a Date object
                  const dateObject = new Date(trend.created_at!);

                  // Format the date using toLocaleString
                  const formattedDate = dateObject.toLocaleString();

                  return (
                    <tr key={index + 1}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {index + 1}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {trend?.id ?? '-'}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <h5 className="font-medium text-black dark:text-white">
                          {trend.topic ?? '-'}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {formattedDate ?? '-'}
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
        <div className="flex justify-end py-4">
          <div className="grid grid-cols-5 gap-1 items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              onClick={handlePreviousPage}
              className="rounded py-1 px-3 text-base font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark dark:bg-boxdark bg-white shadow-card"
            >
              {'<'}
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
              className={`rounded py-1 px-3 text-base font-medium text-black dark:text-white  ${
                currentPage != 1 && currentPage != lastPage
                  ? 'bg-white shadow-card'
                  : ''
              }`}
            >
              ...
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
              className="rounded py-1 px-3 text-base font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark dark:bg-boxdark bg-white shadow-card"
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendsTable;
