
const Domos = require('../models/domoSchema');
const Users = require('../models/userSchema');
const objectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req,res)=>{

    const users = await Users.find().select('-password');
    res.status(200).json(users);

} 


module.exports.userInfo = async (req,res)=>{

    console.log(req.params);

    if(!objectID.isValid(req.params.id))
    res.status(400).send('id unknown' + req.params.id );

    Users.findById (req.params.id,(err,docs)=>{

      if(!err) res.send(docs);
     else  console.log('id unknown' + err)
    }).select('-password');

}

module.exports.updateUser  = async (req, res) => {
    if (!objectID.isValid(req.params.id))
      return res.status(400).send("ID invalid : " + req.params.id);
  
    try {
      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
                  userName : req.body.userName,
                  email  : req.body.email ,
                  password : req.body.password,  
                  phone  : req.body.phone ,
                  
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
        .then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

module.exports.deleteUser = async (req,res)=>{

    if(!objectID.isValid(req.params.id))
    res.status(400).send('id unknown' + req.params.id );


    try{
        await Users.remove({_id : req.params.id }).exec();
        res.status(200).json({message : "Scuccessfuly deleted."});

        }catch(err){
            return res.status(500).json(err);
        }


}