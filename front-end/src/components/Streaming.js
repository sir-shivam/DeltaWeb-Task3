import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import Nav from "./nav";
import { Howl, Howler } from "howler";
import SongContext from "./context";
import AddtoPlaylist from "../pages/AddtoPlaylist";
import { authPost } from "../utils/serverFetch";


export default function Streaming() {
  const [addtolist, setAddtolist] = useState(false);

  const { songInfo, setSongInfo } = useContext(SongContext);
  console.log(songInfo);
  const [soundPlayed, setsoundPlayed] = useState(null);
  const [isPaused, setPause] = useState(true);
  let status = "play";
  
  const first = useRef(true);

  useLayoutEffect(()=>{


    if(!songInfo){
      return
    }
    changeSound(songInfo.track);

  }, [songInfo || songInfo.track] )

  const changeSound = (songsrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }

    let sound = new Howl({
      src: [songsrc],
      html5: true,
    });
    setsoundPlayed(sound);
    sound.play();
    setPause(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const playSound = ()=>{
    if(!soundPlayed){
      return;
    }
    soundPlayed.play();
  }


  const addTolist1 = async (playlistId)=>{
    const songId = songInfo._id;
    const added = {playlistId , songId};
    const response = await authPost("/playlist/add/song",added);
    console.log(response);
    if(response._id){
      setAddtolist(false);
    }
  }

  const togglePlay = () => {
    if (isPaused) {
      status = "play";
      playSound();
      setPause(false);
      console.log(status);
    } else {
      pauseSound();
      setPause(true);
      status = "pause";
      console.log(status);
    }
  };

  return (
    <div>
      {addtolist && <AddtoPlaylist closeModel={()=> {setAddtolist(false)}} 
        addTolist1={addTolist1} />}
      
      <div className="streaming w-[50vw] h-[20vh] bg-gradient-to-br from-[#c81d77] to-[#6710c2] fixed bottom-6 ml-[30vw] rounded-3xl flex ">
        <div className="circle w-[160px] h-[160px] rounded-[50%] bg-gradient-to-tr from-[#a11313]  ml-[-10%] border mt-2 flex justify-center items-center ">
          <img
            className="border w-[70%] h-[70%] rounded-[50%]"
            src={songInfo.thumbnail}
          />
        </div>
        <div className=" w-[70%] ml-[5%] flex flex-col justify-around items-center">
          <div className=" w-[100%] h-[50%] flex justify-between items-center border">
            <div className="w-2/5  flex flex-col justify-center items-center border">
              <div className="text-3xl">{songInfo.name} </div>
              <div className=" opacity-60"> Artist Name</div>
            </div>
            <div >
              <i class="fa-regular fa-heart text-4xl  mx-2 "></i>
              

              <i class="fa-regular fa-add text-4xl mx-2 " onClick={()=>{setAddtolist(true)}}  ></i>
              
            </div>
          </div>
          <input
            type="range"
            name="range"
            min={"0"}
            max={"100"}
            className="w-[90%]  mt-[-15px]  "
          />
          <div className=" w-[40%] h-[20%] justify-around flex items-center text-3xl ">
            <i class="fa-solid fa-backward-step"></i>
            <div
              onClick={() => {
                togglePlay();
              }}
              className="w-10 h-10 hover:bg-slate-700 rounded-full  flex justify-center items-center"
            >
              {isPaused ? (
                <i class={`fa-solid fa-play ml-[6px]`} />
              ) : (
                <i class={`fa-solid fa-pause`} />
              )}
            </div>
            <i class="fa-solid fa-forward-step"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
