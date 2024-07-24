const express = require("express");
const Song = require("./Song");
const Playlist = require("./Playlist");
const router = express.Router();

router.post("/create", async (req,res) => {
    const loggedUser = req.user;
    const {name , thumbnail , songs} = req.body;
    if(!name || !thumbnail ){
    return res.status(400).json("change data");

    }
    const playlist = await Playlist.create({name , thumbnail ,  owner: req.user.id, songs :songs});
    return res.status(200).json(playlist);
} );

router.get("/get/all", async (req,res)=> {
    const playlistId = req.user.id;
    const playlist = await Playlist.find();
    return res.send(playlist);
})

router.get("/get/byme", async (req,res)=> {
    const playlistId = req.user.id;
    const playlist = await Playlist.find({ owner: playlistId });
    return res.send(playlist);
})


router.get("/get/list/:playlistId", async (req,res)=> {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({_id : playlistId}).populate({
        path:"songs",
        populate:{
            path: "artist",
        }
    });
    // return res.status(200).json(playlist);
    console.log("working");
    return res.send(playlist);
})



router.get("/get/artist/:artistId" , async (req, res )=>{
    const artId = req.params.artistId;
    const playlist = await Playlist.find({owner: artId});
    return res.status(200).json(playlist);
})


router.post("/updatetime", async (req, res) => {
    const {totaltime , playlistId , allsongs} = req.body;

    await Playlist.findByIdAndUpdate(playlistId , { totaltime: totaltime , songs : allsongs });
    return res.status(200).json("success");
})

//song adding to a playlist
router.post("/add/song", async (req, res) => {
    const loggedUser = req.user;
    const {playlistId, songId} = req.body;

    const playlist = await Playlist.findOne({_id : playlistId});
    if(!playlistId){
    return res.status(200).json("playlist not  exist");
    }
    

    playlist.songs.push(songId);
    await playlist.save();
    return res.status(200).json(playlist);
})


router.post('/get/update', async (req, res) => {
    try {
      const songsToUpdate = await Playlist.find({ time: { $exists: false } }).populate("songs");
      const updatePromises = songsToUpdate.map(async (list) => {
        let time = 0;

        const updatesong = list.songs.map( async (song) => {
        console.log(song);
            
             time += song.time;
        })
  
        await Playlist.findByIdAndUpdate(list._id, { totaltime: time });
      });
  
      await Promise.all(updatePromises);
  
      res.status(200).json({ message: 'Songs updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating songs' });
    }
  });


  router.get("/view" , async (req,resp) =>{
    
    const data = await Playlist.find();
    resp.send(data);
    
  })
  


router.post("/insert", async (req,res)=>{
    // res.send("working");

   await Playlist.insertMany(listData);
   return res.status(200).json("inserted");
  
});

const listData = [
    {
      name: "Liked Songs",
      thumbnail: "https://plus.unsplash.com/premium_photo-1673456557398-27d089e901de?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      owner: null,
      totaltime: 0,
      songs: []
    },
  ];
  




module.exports = router;

