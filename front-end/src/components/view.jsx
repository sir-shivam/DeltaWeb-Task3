import React, { useContext, useEffect, useState } from "react";
import Nav from "./nav";
import { authGet } from "../utils/serverFetch";
import { SongCard } from "./SongCard";
import SongContext from "./context";
import Loader from "./loader/Loader";

export default function View() {
  const { currentData, setCurrentData } = useContext(SongContext);

  const [allSong, setAllSong] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const response = await authGet("/song/get/all");
        setAllSong(response);
        setCurrentData(response);
      } catch (error) {
        console.error("Error fetching song data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <div className="full w-screen h-screen bg-[#0f0f0f] flex">
      <div className="hidden md:block">
      <Nav />
      </div>
      <div className="h-[84%] md:h-[95%] md:w-[90%]   mt-2  md:p-2">
      <div className=" md:hidden">
      <Nav />
      </div>
          <div className="h-[8%] text-white w-[80%] ml-[10%] flex justify-center items-center  text-3xl border-b-[1px] mb-4">
            Available Songs
          </div>
          <div className=" h-[92%] w-full  overflow-auto md:px-16  ">
            {loading ? (
              <Loader />
            ) : (
              <>
                {allSong.map((item) => {
                  return <SongCard info={item} />;
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
