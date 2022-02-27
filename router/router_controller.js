const express = require("express");
const model = require("../models/movie");
const repo = require ("../repositories/repository");

const router = express.Router();

router.get("/all",(req,res)=>{
    repo.returnAllMovie(req,(data)=>{
        res.send(data);
    })
});

router.get("/find/name/",(req,res)=>{
    repo.findByName(req.body.name,(data)=>{
        res.send(data);
    })
})

router.get("/topthree", (req,res)=>{
    repo.topThreeRated(req,(data)=>{
        res.send(data);
    })
})

router.patch("/update",(req,res)=>{
    const movie_to_update = new model (req.body.name, req.body.genre, req.body.rating, req.body.language, req.body.achievements, req.body.id);

    repo.update(movie_to_update,()=>{
        res.send("The update was successful");
    })
})

router.post("/save/",(req,res)=>{
    const movie_to_update = new model (req.body.name, req.body.genre, req.body.rating, req.body.language, req.body.achievements);

    repo.save(movie_to_update,()=>{
        res.send("The save was a success");
    })
})

router.get("/achiever/", (req, res)=>{
    repo.returnIfHaveAchievement(req, (data)=>{
        res.send(data);
    })
})

router.get("/dualachiever/", (req, res)=>{
    repo.returnIfHaveBOTHAchievements(req, (data)=>{
        res.send(data);
    })
})

module.exports = router;