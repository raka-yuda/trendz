import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb.tsx';
import ChartFour from '../components/ChartFour';
import ChartOne from '../components/ChartOne.tsx';
import ChartThree from '../components/ChartThree.tsx';
import ChartTwo from '../components/ChartTwo.tsx';
import { useDispatch } from 'react-redux';
import { fetchTweetsChartScrapeSentiment, fetchTweetsChartSentiment } from '../actions/tweets.ts';
import SentimentChart from '../components/Charts/SentimentChart.tsx';
import Utils from '../common/Utils';
import { fetchScrapeRequests } from '../actions/scrapeRequest.ts';
// import SenntimentChartTwo from '../components/Charts/SentimentChartTwo.tsx';
import SentimentChartTwo from '../components/Charts/SentimentChartTwo.tsx';
import SentimentChartThree from '../components/Charts/SentimentChartThree.tsx';


const Charts = () => {
  const dispatch = useDispatch();

  const [chartSentimentData, setChartSentimentData] = useState([])
  const [scrapeRequest, setScrapeRequest] = useState<any>(null)
  const [request, setRequest] = useState(null)
  const [chartScrapeSentimentData, setChartScrapeSentimentData] = useState(null);

  useEffect(() => {
    dispatch(fetchTweetsChartSentiment({requestId: ((request && scrapeRequest) ? String(request) : String(1)) ?? ''}) as any)
      .then((res: any) => {
        setChartSentimentData(res)
      })
      .catch((e: Error) => {
        console.log(e)
      });
  }, [request])

  useEffect(() => {
    dispatch(fetchScrapeRequests({
      status: 'FINISHED'
    }) as any)
    .then((res: any) => {
      setScrapeRequest(res);
      if(res?.items && res?.items.length > 0) {
        setRequest(res?.items[0]?.id);
      }
    })
    .catch((e: Error) => {
      console.log("Error: ", e.message)
    });
    
    dispatch(fetchTweetsChartScrapeSentiment({
      }) as any)
    .then((res: any) => {
      if (res?.data && res.data.length > 0) {
        const resChartScrapeSentiment = res.data;
        const transformedData = resChartScrapeSentiment.reduce((result, item) => {
          const { created_at, sentiment, count } = item;
      
          if (!result.category) {
              result.category = [];
          }
      
          if (!result.category.includes(sentiment)) {
              result.category.push(sentiment);
          }
      
          if (!result.series) {
              result.series = [];
          }
      
          const existingSeries = result.series.find(series => series.name === created_at);
      
          if (existingSeries) {
              existingSeries.data[result.category.indexOf(sentiment)] = count;
          } else {
              const newSeries = {
                  name: created_at,
                  data: Array(result.category.length).fill(null)
              };
              newSeries.data[result.category.indexOf(sentiment)] = count;
              result.series.push(newSeries);
          }
      
          return result;
        }, {});
        console.log("fetchTweetsChartScrapeSentiment: ", transformedData)

        setChartScrapeSentimentData(transformedData)
      }
    })
    .catch((e: Error) => {
      console.log("Error: ", e.message)
    });


  }, [])

  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <SentimentChart
          series={chartSentimentData.map((data: any) => parseInt(data?.count))}
          labels={chartSentimentData.map((data: any) => data?.sentiment)}
          data={chartSentimentData.map((data: any, index) => {
            const arrCount = chartSentimentData.map((data: any) => parseInt(data?.count))
            const totalCount = arrCount.reduce((partialSum, a) => partialSum + a, 0);
            const colors = ['#10B981', '#375E83', '#259AE6', '#FFA70B', '#FFA700', '#FFA7AA']
            return {
              sentiment: data?.sentiment,
              percentage: `${((data?.count / totalCount) * 100).toFixed(2)}%`,
              color: (index < colors.length - 1) ? colors[index] : colors[0]
            }
          })}
          topic={Utils.getUniqueNamesOfObjectArray(chartSentimentData, 'topic')[0]}
          handleChangeTopic={(e) => {
            setRequest(e.target.value)
          }}
          topicValue={((request && scrapeRequest) ? String(request) : String(1)) ?? ''}
          optionsTopic={scrapeRequest?.items.map((request: any) => ({
            value: request?.id,
            label: `${request?.trending_topic?.topic} - ${request?.id}`
          }))}
        />
        {chartScrapeSentimentData && 
          <SentimentChartTwo 
            series={(chartScrapeSentimentData as any).series}
            categories={(chartScrapeSentimentData as any).category}
          />
        }
        {/* <ChartTwo /> */}

        {/* <div className="col-span-12">
          <SentimentChartThree />
        </div> */}

        {/* <ChartFour />
        <ChartThree /> */}
      </div>
    </>
  );
};

export default Charts;
