"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { useAppContext } from "@/lib/context/context";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { searchCity } = useAppContext();
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity},ID&appid=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        alert("city not found");
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, [searchCity]);

  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return <h1 className={styles.h1}>Halo dunia</h1>;
}
