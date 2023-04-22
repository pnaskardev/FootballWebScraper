// IMPORTS FROM PACKAGES

// IMPORTS FROM FILES
const User = require('../models/user');
// const Standings=require('../models/standings');
// INIT


// CONTROLLERS
exports.patchSelectedLeagues=async(req,res,next)=>
{
    const userId = req.query.userId;
    const selectedLeagues = req.body;
    console.log(userId);
    console.dir(selectedLeagues);
    if(!selectedLeagues.length)
    {
        return res.status(400).json({message:"selectedLeagues is empty"});
    }
    try 
    {
        const updatedUser = await User.findByIdAndUpdate
        (
            userId,
            { 
                $addToSet: 
                { selectedLeagues: 
                    { $each: selectedLeagues } 
                } 
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) 
    {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}