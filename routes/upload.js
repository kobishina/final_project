//upload page to uploads img to the public file
const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", async (req, res) => {
    res.json({ msg: "uploads works" });
})

//upload the file and check the size before post it
router.post("/", async (req, res) => {
    try {
        console.log(req.files.myFile);
        let myFile = req.files.myFile;

        //check the size
        if (myFile.size >= 1024 * 1024 * 5) {
            return res.status(400).json({ err: "file too big, Limit to 5MB" });
        }
        //check the extName
        let exts_arr = [".png", ".jpg", ".jpeg"];
        if (!exts_arr.includes(path.extname(myFile.name.toLowerCase()))) {
            return res.status(400).json({ err: "File Not Allowed, just " + exts_arr.toString() });
        }
        myFile.mv("public/images/" + myFile.name, (err) => {
            if (err) {
                return res.status(400).json({ err });
            }
            res.json({ msg: "file uploaded" });
        })



    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err });
    }

})

module.exports = router;