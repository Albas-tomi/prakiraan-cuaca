import React from "react";
import { BiCloud } from "react-icons/bi";
import Image from "next/image";
import { WiWindBeaufort0 } from "react-icons/wi";
import { getWeatherImage } from "@/utils/getWeather";

const CardWeather = ({
  data,
  setDetailData,
}: {
  data: any;
  setDetailData?: React.Dispatch<React.SetStateAction<{} | undefined>>;
}) => {
  const { clouds, dt_txt, main, weather, wind } = data;
  const date = new Date(dt_txt);

  const formattedDate = date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      key={1 + Math.random()}
      onClick={() => {
        if (setDetailData) setDetailData(data);
      }}
      className="bg-white/20 mx-3 carousel-item hover:-translate-y-1 transition-all duration-300 flex max-h-96 max-w-80 bg-blend-saturation  rounded-xl shadow-sm p-5 "
    >
      <div className="flex flex-col gap-3">
        <div className="flex  flex-col justify-center items-center">
          <p className="font-bold">{formattedDate}</p>
          <p className="font-medium text-gray-600">{formattedTime}</p>
        </div>
        <div className="flex gap-3 justify-center items-center ">
          <div className="">
            <p className="flex gap-2">
              <span className="text-white font-bold">
                {weather[0]?.description || ""}
              </span>
              <span className="text-[10px]">
                {Math.round(main.temp - 273.15)}°C
              </span>
            </p>
            <Image
              alt="cloude"
              width={100}
              height={100}
              src={`/images/Assets/${getWeatherImage(weather[0].main)}`}
            />
          </div>
          <div className="">
            <p>Feels: {Math.round(main.feels_like - 273.15)} °C</p>
            <p>Min: {Math.round(main.temp_min - 273.15)} °C</p>
            <p>Max: {Math.round(main.temp_max - 273.15)} °C</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <BiCloud className="text-xl" />
            <span>Cloud: {clouds.all} %</span>
          </div>
          <div className="flex items-center gap-2">
            <WiWindBeaufort0 className="text-xl" />
            <span>Wind: {wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWeather;
