import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/nav'
import { useParams } from 'react-router-dom'
import { authGet } from '../utils/serverFetch';
import { SongCard } from '../components/SongCard';
import SongContext from '../components/context';

export default function SinglePlaylist() {
    const [listDetail, setlistDetail] = useState({});
    const {  currentData , setCurrentData  } = useContext(SongContext);
    


    const {playlistId} = useParams();

    useEffect(() => {
        const getData =  async ()=>{
            const response = await authGet("/playlist/get/list/" + playlistId );
            setlistDetail(response);
            setCurrentData(response.songs);
        }
        getData();
    },[]);

  return (
    <div>
        <div className="full w-screen h-screen bg-[#0f0f0f] flex ">
        <Nav />
        <div className="w-[80vw] h-[93vh] mt-8 text-white  p-10 overflow-auto">
            {
                listDetail._id && <div>
        <div className='flex justify-center items-center font-bold text-2xl mt-[-30px] h-16 sticky '>Playlist :   {listDetail.name} </div>
        <div className="space-y-3 h-[80%]   ">
                
                {listDetail.songs.map((item) => {
                  return <SongCard info={item} key={JSON.stringify(item)} playSound={()=>{}}  />;
                  })}
              </div>
              </div>
                  }
        </div>
        </div>
    </div>
  )
}
