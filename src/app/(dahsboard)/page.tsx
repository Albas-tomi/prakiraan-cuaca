"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "@/lib/context/context";
import CardWeather from "./(components)/CardWeather";
import { indoCity } from "@/utils/dummy";
import { currentDate } from "@/utils/getCurrentDate";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import { getWeatherImage } from "@/utils/getWeather";
import { toast } from "sonner";
import { TiWeatherSunny } from "react-icons/ti";
import { convertTime } from "@/utils/convertTime";

type WeatherData = {
  weather: {
    main: string;
  }[];
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [dataWeather, setDataWeather] = useState<WeatherData[]>([]);
  const [dataCity, setDataCity] = useState({} as any);
  const { searchCity, setSearchCity } = useAppContext();

  // get data from api
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity},ID&appid=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        setDataWeather(response?.data.list);
        setDataCity(response.data.city);
        setLoading(false);
      } catch (error) {
        toast.error("Data City is not found");
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, [searchCity]);

  // get current weather
  const currentWeather = dataWeather[0]?.weather[0]?.main;

  console.log({ dataCity });

  if (loading) {
    return (
      <div className="flex items-center  justify-center md:h-[80.5vh]  h-screen bg-none">
        <span className="loading loading-spinner text-white loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      {/* SECTION CITY */}
      <section className="flex items-center justify-center px-3">
        {indoCity.map((city, idx) => (
          <div key={idx} role="tablist" className="tabs tabs-bordered">
            <a
              role="tab"
              onClick={() => setSearchCity(city)}
              className={`tab text-xs md:text-xl ${
                city.toLowerCase() === searchCity.toLowerCase()
                  ? "tab-active"
                  : ""
              }`}
            >
              {city}
            </a>
          </div>
        ))}
      </section>

      {/* SECTION CITY ACTIVE */}
      <section className="pt-4 flex flex-col items-center ">
        <div>
          <h1 className="text-2xl flex justify-center items-center gap-2 w-full leading-relaxed p-2 text-center font-bold ">
            <IoLocationOutline />
            {dataCity.name}
            <Image
              alt="cloude"
              width={20}
              height={20}
              src={`/images/Assets/${getWeatherImage(currentWeather)}`}
            />
          </h1>
          <p className="my-3">{currentDate()}</p>
        </div>
        <div className=" h-fit relative  p-0 m-0">
          <svg
            className="relative my-2 top-0"
            width="200"
            height="110"
            viewBox="0 0 100 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0 50 A 50 50 0 0 1 100 50"
              stroke="orange"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <TiWeatherSunny className="absolute top-5 text-orange-400 left-[45%] text-xl" />
          <p className="absolute -left-5 top-[76%] text-xs text-white">
            Sunrise <br />
            <span className="text-orange-400">
              {convertTime(dataCity?.sunrise)}
            </span>
          </p>
          <p className="absolute -right-5 top-[76%] text-xs text-white">
            Sunset <br />
            <span className="text-orange-400">
              {convertTime(dataCity?.sunset)}
            </span>
          </p>
        </div>
      </section>

      {/* SECTION CARROUSEL */}
      <section className="carousel carousel-center w-full  rounded-box">
        {dataWeather.length > 0 && !loading ? (
          dataWeather.map((data: any, idx: number) => (
            <CardWeather key={idx} data={data} />
          ))
        ) : (
          <div className="flex  w-full text-center items-center justify-center">
            <p className="text-center  text-white  font-bold md:text-2xl text-lg">
              Data not found, please search again
            </p>
          </div>
        )}
      </section>
    </>
  );
}
