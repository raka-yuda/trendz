import { useDispatch } from 'react-redux';
import CardFour from '../components/CardFour.tsx';
import CardOne from '../components/CardOne.tsx';
import CardThree from '../components/CardThree.tsx';
import CardTwo from '../components/CardTwo.tsx';
import ChartOne from '../components/ChartOne.tsx';
import ChartThree from '../components/ChartThree.tsx';
import ChartTwo from '../components/ChartTwo.tsx';
import ChatCard from '../components/ChatCard.tsx';
import MapOne from '../components/MapOne.tsx';
import TableOne from '../components/TableOne.tsx';
import { useEffect, useState } from 'react';
import { fetchTweetsChartDashboardData, fetchTweetsChartScrapeSentiment, fetchTweetsChartSentiment } from '../actions/tweets.ts';
import CardItemDashboard from '../components/Cards/CardItemDashboard.tsx';
import { FaAddressCard, FaChartBar, FaTags, FaThList, FaTimes } from 'react-icons/fa';
import { fetchScrapeRequests } from '../actions/scrapeRequest.ts';
import SentimentChart from '../components/Charts/SentimentChart.tsx';
import utils from '../common/Utils/index.ts';
import SentimentChartTwo from '../components/Charts/SentimentChartTwo.tsx';

const Dashboard = () => {
  const dispatch = useDispatch();

  const [chartDashboardData, setChartDashboardData] = useState(null);

  const remapIconChart = (type) => {
    switch (type) {
      case 'count_success_topic_scrape':
        return {
          bgIcon: 'bg-opacity-10 bg-success',
          icon: <FaChartBar className="fill-success dark:fill-white"/>
        };
      case 'count_sentiment_scrape':
        return {
          bgIcon: 'bg-meta-2 dark:bg-meta-4',
          icon: <FaTags className="fill-primary dark:fill-white"/>
        };
      case 'count_topic_scrape':
        return {
          bgIcon: 'bg-opacity-10 bg-success',
          icon: <FaThList className="fill-success dark:fill-white"/>
        };
      case 'count_failed_sentiment':
        return {
          bgIcon: 'bg-opacity-10 bg-danger',
          icon: <FaTimes className="fill-danger dark:fill-danger"/>
        };
      default:
        return {
          bgIcon: 'bg-meta-2 dark:bg-meta-4',
          icon: <FaChartBar className="fill-primary dark:fill-white"/>
        };
    }
  }

  const remapChartDashboardData = (data) => {
    const {
      type,
      count
    } = data;

    if (type && count) {
      return {
        type,
        label: type.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
        count: parseInt(count),
        icon: remapIconChart(type).icon,
        bgIcon: remapIconChart(type).bgIcon
      }
    }

    return data;
  }

  useEffect(() => {
    dispatch(fetchTweetsChartDashboardData({}) as any)
      .then((res: any) => {
        if (res && res?.length > 0) {
          setChartDashboardData(res)
        }
      })
      .catch((e: Error) => {
        console.log(e)
      });
  }, [])

  const [chartSentimentData, setChartSentimentData] = useState([])
  const [scrapeRequest, setScrapeRequest] = useState<any>(null)
  const [request, setRequest] = useState(null)
  const [chartScrapeSentimentData, setChartScrapeSentimentData] = useState(null);

  useEffect(() => {
    dispatch(fetchTweetsChartSentiment({requestId: ((request && scrapeRequest) ? String(request) : String(1)) ?? ''}) as any)
      .then((res: any) => {
        if (res && res?.length > 0) {
          setChartSentimentData(res)
        }
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
      if(res?.items && res?.items.length > 0) {
        setRequest(res?.items[0]?.id);
        setScrapeRequest(res);
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-4">
        {(chartDashboardData && (chartDashboardData as any).length > 0) && 
          (chartDashboardData as any)
            .map((dashboardData) => remapChartDashboardData(dashboardData))
            .map((data, id: number) => <CardItemDashboard
              key={id} 
              customClassBgIcon={data.bgIcon}
              icon={data.icon} 
              value={data.count} 
              description={data.label}
            />
        )}

        {/* <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour /> */}

      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      
      {(chartSentimentData && (chartSentimentData as any).length > 0) && 
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
            topic={utils.getUniqueNamesOfObjectArray(chartSentimentData, 'topic')[0]}
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
              label: `${request?.trending_topic?.topic} - ${request?.id}`
            }))}
          />
        }
        {chartScrapeSentimentData && 
          <SentimentChartTwo 
            series={(chartScrapeSentimentData as any).series}
            categories={(chartScrapeSentimentData as any).category}
          />
        }
      </div>


      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </>
  );
};

export default Dashboard;
