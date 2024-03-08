import Layout from '@/components/Layout';
import Loading from '@/components/Loading/Loading';
import SearchBar from '@/components/SearchBar';
import WeatherResult from '@/components/WeatherResult';
import { API_KEY, BASE_URL, fetchData } from '@/lib/weather-services';
import { WeatherData } from '@/models/customTypes';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Weather = () => {

  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('Seoul');
  const [tempIsLow, setTempIsLow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // temp 3도 기준점으로 실행
  useEffect(() => {
    if (currentWeather) {
      const temp = +currentWeather?.main.temp.toFixed();
      if (temp < 3) {
        setTempIsLow(true);
      } else {
        setTempIsLow(false)
      }
    }
  }, [currentWeather])

  // 날씨 데이터 가져오기
  useEffect(() => {
    const getWeatherData = async () => {
      if (city.trim().length > 0) {
        setIsLoading(true);
        try {
          const weather: WeatherData = await fetchData(
            `${BASE_URL}weather?q=${city}&limit=6&appid=${API_KEY}&units=metric`
          )
          // console.log(weather);
          setCurrentWeather(weather);
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      }
    }
    getWeatherData();
  }, [city])

  // 로그아웃
  const logoutHandler = () => {
    const data = signOut({ redirect: false, callbackUrl: '/' })
    data.then((res) => {
      router.push(res.url)
    });
  };

  const cardBg = tempIsLow ? 'bg-tempLow' : 'bg-tempHigh';

  // 로딩중 화면
  let weatherResiltContent = <Loading />
  if (!isLoading && !currentWeather) {
    weatherResiltContent = <p className='py-5'>Nothing Found!</p>
  }
  if (!isLoading && currentWeather) {
    weatherResiltContent = <WeatherResult weatherData={currentWeather} />
  }

  return (
    <Layout className={`w-3/4 ${cardBg} bg-cover bg-card bg-blend-overlay lg:w-1/4`} >
      <div className='weather'>
        <SearchBar onCityChange={setCity} />
        {weatherResiltContent}
        <button
          className='btn btn__secondary'
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </Layout>
  )
}

export default Weather

// 잘못된 접근 처리
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: '/unauthenticated',
        permanent: false
      }
    }
  }
  return {
    props: {
      session
    }
  }
}