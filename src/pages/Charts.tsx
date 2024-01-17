import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb.tsx';
import ChartFour from '../components/ChartFour';
import ChartOne from '../components/ChartOne.tsx';
import ChartThree from '../components/ChartThree.tsx';
import ChartTwo from '../components/ChartTwo.tsx';
import { useDispatch } from 'react-redux';
import { fetchTweetsChartSentiment } from '../actions/tweets.ts';
import SentimentChart from '../components/Charts/SentimentChart.tsx';
import Utils from '../common/Utils';
import { fetchScrapeRequests } from '../actions/scrapeRequest.ts';

const Charts = () => {

  const dispatch = useDispatch();

  const [chartSentimentData, setChartSentimentData] = useState([])
  const [scrapeRequest, setScrapeRequest] = useState<any>(null)
  const [request, setRequest] = useState(null)

  useEffect(() => {
    dispatch(fetchTweetsChartSentiment({requestId: ((request && scrapeRequest) ? String(request) : String(1)) ?? ''}) as any)
    .then((res: any) => {
      console.log("res: ", res)
      // console.log(res.map((data: any) => parseInt(data?.count)))
      // console.log(Utils.getUniqueNamesOfObjectArray(res, 'topic'))
      setChartSentimentData(res)
    })
    .catch((e: Error) => {
      console.log(e)
    });
  }, [request])

  useEffect(() => {
    dispatch(fetchScrapeRequests({}) as any)
    .then((res: any) => {
      console.log(res)
      setScrapeRequest(res)
    })
    .catch((e: Error) => {
      console.log(e)
    });
  }, [])

  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <SentimentChart
          series={chartSentimentData.map((data: any) => parseInt(data?.count))}
          labels={chartSentimentData.map((data: any) => data?.sentiment)}
          data={chartSentimentData.map((data: any) => {
            const arrCount = chartSentimentData.map((data: any) => parseInt(data?.count))
            const totalCount = arrCount.reduce((partialSum, a) => partialSum + a, 0);
            return {
              sentiment: data?.sentiment,
              percentage: `${((data?.count / totalCount) * 100).toFixed(2)}%`
            }
          })}
          topic={Utils.getUniqueNamesOfObjectArray(chartSentimentData, 'topic')[0]}
          handleChangeTopic={(e) => {
            console.log('Select: ', e.target.value)
            setRequest(e.target.value)
          }}
          topicValue={((request && scrapeRequest) ? String(request) : String(1)) ?? ''}
          // optionsTopic={[
          //   {
          //     value: '1',
          //     label: '1'
          //   },
          //   {
          //     value: '2',
          //     label: '2'
          //   },
          // ]}
          optionsTopic={scrapeRequest?.items.map((request: any) => ({
            value: request?.id,
            label: request?.trending_topic?.topic
          }))}
        />
        {/* <div className="col-span-12">
          <ChartFour />
        </div>
        <ChartOne />
        <ChartTwo />
        <ChartThree /> */}
      </div>
    </>
  );
};

export default Charts;
