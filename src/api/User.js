const express = require("express");
const router = express.Router();
const { UserModel } = require("../model/index");

router.get("/", (req, res) => {
    res.send("Hello from User")
})

router.post("/newUser", async (req, res) => {
    try {
        const CreateUser = await UserModel.create(req.body);
        res.json(CreateUser);
    } catch (error) {
        console.log(`error from user side ${error}`)

    }
});
router.get("/lookuser/:_id", async (req, res) => {
    try {
        const FindUserById = await UserModel.findById({ _id: req.params._id });
        return res.json(FindUserById);
    } catch (error) {
        console.log(`error from user side ${error}`)

    }
})
router.get("/searchuser", async (req, res) => {
    try {

        const FindUserByName = await UserModel.find({ name: { $regex: req.query.name } });
        return res.json(FindUserByName);

    } catch (error) {
        console.log(error);
    }
});

router.get("/following/count/:_id",async(req,res)=>{
    try {
        
        const TotalCount = await UserModel.findById({_id:req.params._id})
        res.json(TotalCount);
    } catch (error) {
        console.log(error);
    }
})
router.get("/allusers", async (req, res) => {
    try {
        const GetAllUser = await UserModel.find();
        res.json(GetAllUser);
    } catch (error) {
        console.log(`error from user side ${error}`)
    }
})

router.patch("/edit/:uid", async (req, res) => {
    try {
        const UpdateUserDetail = await UserModel.findOneAndUpdate({ uid: req.params.uid }, {
            $set: {
                name: req.body.name,
                bio: req.body.bio,

            }
        }, { new: true });
        return res.json({ UpdateUserDetail });
    } catch (error) {
        console.log(`error from user side ${error}`)

    }
});




router.patch("/follow/:uid", async (req, res) => {
    try {

        const AddtoFollowersOnReciever = await UserModel.findOneAndUpdate({ uid: req.params.uid }, {
            $push: {
                following: req.body.yourUid
            }
        }, { new: true });

        const AddtoFollowingOnsender = await UserModel.findOneAndUpdate({ uid: req.body.yourUid }, {
            $push: {
                followers: req.params.uid
            }
        }, { new: true });


        res.json({
            success: true,
            message: "Follow details Successfully added in both side "
        });


    } catch (error) {
        console.log(`error from user side ${error}`)

    }
})

router.patch("/liked/:_id", async (req, res) => {
    try {

        const AddLikeInToLiker = await UserModel.findOneAndUpdate({ uid: req.body.uid }, {
            $push: {
                liked: req.params._id
            }
        }, { new: true });

     
        res.json({
            success: true,
            message: "Liked id Successfully added in user side "
        });


    } catch (error) {
        console.log(`error from user side ${error}`)

    }
})


router.patch("/unfollow/:uid", async (req, res) => {
    try {
        const RemoveToFollowersOnReciever = await UserModel.findOneAndUpdate({ uid: req.params.uid }, {
            $pull: {
                following: req.body.yourUid
            }
        }, { new: true });

        const RemoveToFollowingOnsender = await UserModel.findOneAndUpdate({ uid: req.body.yourUid }, {
            $pull: {
                followers: req.params.uid
            }
        }, { new: true });


        res.json({
            success: true,
            message: "Followed details Successfully removed in both side ",
            recieverSide: RemoveToFollowersOnReciever,
            senderSide: RemoveToFollowingOnsender
        });

    } catch (error) {
        console.log(`error from user side ${error}`)

    }
});






module.exports = router