const express = require("express");
const { auth } = require("../middlewares/auth");
const { validateTrip, TripModel } = require("../models/tripModel");
const router = express.Router();

//get: info, and can sorting or ordering by some conditions
router.get("/", async (req, res) => {
    let perPage = Math.min(req.query.perPage, 20) || 5;
    let page = req.query.page - 1 || 0;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1

    try {
        let data = await TripModel.find({})

            //limiting the pages by default 5 and adding /?perPage=20  will show until 20 //http://localhost:3002/trips/?perPage=1
            .limit(perPage)
            //skiping how many records to skip
            .skip(page * perPage)
            //sorting from small to big 1 , from big to small -1 // http://localhost:3002/trips/?sort=score&reverse=yes
            .sort({ [sort]: reverse })

        res.json(data);
    }
    catch (err) {
        console.log(err);
    }

})

//get: searching in the data
router.get("/search", async (req, res) => {
    let s = req.query.s;
    // using regular expression and "i" will cancel the case sensetive
    let sEXP = new RegExp(s, "i");
    try {
        // like INCLUDES check if the word exist and becose $or will check in 2 places in travel_purpose and in towns_id are present in DB
        //example: // http://localhost:3002/trips/search/?s=n
        let data = await TripModel.find({ $or: [{ travel_purpose: sEXP }, { towns_id: sEXP }] })
            .limit(20)
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err });
    }
})


//get: check how many collections have, and saves the run time that wont bring empty collections // just show count, dont bring Data!
router.get("/count", async (req, res) => {
    try {
        let perPage = Math.min(req.query.perPage, 10) || 5;
        let count = await TripModel.countDocuments({});
        // devide it by 5 by default and for example if i have 20 pages will bring 4 pages // http://localhost:3002/trips/count/?perPage=2
        res.json({ count, pages: Math.ceil(count / perPage) });
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err });
    }
})



//post sending data to the server and getting the token to know who  user add it
router.post("/", auth, async (req, res) => {
    let validBody = validateTrip(req.body);
    //if error in body will send the error from joi
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let trip = new TripModel(req.body);
        //use the token to know who the user post it from user collection 
        trip.userId_created = req.tokenData._id;

        await trip.save();
        res.status(201).json(trip);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

//edit all  by admin  by user just himself
router.put("/:id", auth, async (req, res) => {
    let validBody = validateTrip(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let id = req.params.id;
        let data;
        //check if he admin so can edit all trip collection 
        if (req.tokenData.role == "admin") {
            data = await TripModel.updateOne({ _id: id }, req.body);
        }
        //and if he some user, so can edit just himSelf and checked by token are includs the Id 
        else {
            data = await TripModel.updateOne({ _id: id, userId_created: req.tokenData._id }, req.body);
            console.log(req.tokenData._id);

        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err });
    }
})


// delete all by admin and user just himself 
router.delete("/:id", auth, async (req, res) => {
    let id = req.params.id;
    let data;
    try {
        let id = req.params.id;
        let data;
        //check if he admin so can delete all trip collection 
        if (req.tokenData.role == "admin") {
            data = await TripModel.deleteOne({ _id: id });
        }
        //and if not admin so can delete just himSelf and checked by token are includs the Id 
        else {
            data = await TripModel.deleteOne({ _id: id, userId_created: req.tokenData._id });
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err });
    }
})

module.exports = router;