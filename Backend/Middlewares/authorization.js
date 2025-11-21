const {NoteModel}=require("../Models/note.model")

const authorization=async(req,res,next)=>{
    
    const userId = req.body.userId
    const checkedData=await NoteModel.findOne({_id:req.params.id})
    if(checkedData.userId===userId){
        next()
    }
    else{
        return res.send("You are not authorized to perform this operation.")
    }

}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ msg: "Please enter your email" });
    }
    // For now, we will just return a success message.
    return res.status(200).json({ msg: "Password reset link sent to your email" });
}

module.exports={
    authorization,
    forgotPassword
}