const express = require("express");
const router = express.Router();
const { PoetryModel, UserModel } = require("../model/index")
router.get("/", (req, res) => {
    res.send("Hello from Poetry")
})


router.get("/allpoetrys", async (req, res) => {
    try {
        const GetAllPoetrys = await PoetryModel.find();
        res.json(GetAllPoetrys);
    } catch (error) {
        res.json(`Getting all Poetry failed ${error}`)
    }
})

router.get("/:_id", async (req, res) => {
    try {
        const GetPoetry = await PoetryModel.findById(req.params._id);
        res.json(GetPoetry);
    } catch (error) {
        res.json(`Single Poetry getting failed ${error}`)
    }
})

router.get("/*/:uid", async (req, res) => {
    try {
        const GetPoetry = await PoetryModel.find({ uid: req.params.uid });
        res.json(GetPoetry);
    } catch (error) {
        res.json(`Fatching your all poetrys failed ${error}`)
    }
})

router.delete("/delete/:_id", async (req, res) => {
    try {
        const DeletePoetry = await PoetryModel.findByIdAndDelete(req.params._id);
        res.json(DeletePoetry);
    } catch (error) {
        res.json(`Poetry deletaion failed ${error}`)
    }
})
router.patch("/update/:_id", async (req, res) => {
    try {
        const UpdatePoetry = await PoetryModel.findByIdAndUpdate({ _id: req.params._id }, {
            $set: {
                title: req.body.title,
                content: req.body.content,
                date: req.body.date,
                username: req.body.username
            },
        }, { new: true });
        res.json(UpdatePoetry);
    } catch (error) {
        res.json(`Poetry updation failed ${error}`)
    }
})



router.post("/addpoetry", async (req, res) => {
    try {
        const AddPoetry = await PoetryModel.create(req.body);
        res.json(AddPoetry);
    } catch (error) {
        res.status(500).json({ "Poetry insertion failed ": error });
    }
})


router.patch("/addlike/:_id", async (req, res) => {
    try {
        const AddLike = await PoetryModel.findByIdAndUpdate({_id:req.params._id},{
            $push :{
                likes: req.body.uid
            }
        },{new:true});

        const AddLikeInToLiker = await UserModel.findOneAndUpdate({ uid: req.body.uid }, {
            $push: {
                liked: req.params._id
            }
        }, { new: true });

        res.json({
            success: true,
            message: "Liked id Successfully added in user side ",
            PoetryData:AddLike,
            UserLikedData:AddLikeInToLiker

        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ "Doesn't Able to Add Like ": error });
    }
});

router.patch("/removelike/:_id",async(req,res)=>{
    try {
        const RemoveLike = await PoetryModel.findByIdAndUpdate({_id:req.params._id},{
            $pull :{
                likes: req.body.uid
            }
        },{new:true});
        res.json(RemoveLike);
    } catch (error) {
        res.status(500).json({ "Doesn't Able to Remove Like ": error });
        
    }
});


module.exports = router