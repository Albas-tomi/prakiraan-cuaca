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
        alert("city not found");
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, [searchCity]);
  const currentWeather = dataWeather[1]?.weather[0]?.main;

  if (loading) {
    return (
      <div className="flex items-center bg-white justify-center md:h-[80.5vh]  h-screen bg-none">
        <span className="loading loading-spinner loading-lg"></span>
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
          <p className="my-2">{currentDate()}</p>
        </div>
      </section>

      {/* SECTION CARROUSEL */}
      <section className="carousel carousel-center w-full  rounded-box">
        {dataWeather.length > 0 ? (
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
