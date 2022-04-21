//set up multer for storing uploaded files

const Domos = require('../models/domoSchema');
const objectID = require('mongoose').Types.ObjectId;

module.exports.domoCreate = async (req,res) =>{
   try{

   const  title = req.body.title;
    const bedrooms = req.body.bedrooms;
    const bathrooms =req.body.bathrooms;  
    const  beds = req.body.beds;
    const homeType = req.body.homeType;
    const residenceType = req.body.residenceType;
    const arrivalDate = req.body.arrivalDate;
    const  departureDate = req.body. departureDate;
      
     // console.log(req.file.path);
      const domo = new Domos({
         title : title,
         bedrooms : bedrooms ,
         bathrooms :  bathrooms ,
         beds : beds,
         homeType : homeType ,
         residenceType : residenceType,
         arrivalDate : arrivalDate,
         departureDate  : departureDate,
         user : req.user._id,
         
      })

      const domoCre = await domo.save();
      console.log (domoCre);
      res.status(200).send(" Domo Registered");

   }catch(error){
        res.status(400).send(error)
      
    }
  
}
module.exports.getAllDomos = async (req,res)=>{

   const domos = await Domos.find();
   res.status(200).json(domos);

} 

module.exports.domoInfo = async (req,res)=>{

   console.log(req.params);

   if(!objectID.isValid(req.params.id))
   res.status(400).send('id unknown' + req.params.id );

   Domos.findById (req.params.id,(err,docs)=>{

     if(!err) res.send(docs);
    else  console.log('id unknown' + err)
   });

}

module.exports.updateDomo = async (req, res) => {
  if (!objectID.isValid(req.params.id))
    return res.status(400).send("ID invalid : " + req.params.id);

  try {
    await Domos.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
                title : req.body.title,
                bedrooms : req.body.bedrooms,
                 bathrooms : req.body.bathrooms,  
                 beds : req.body.beds,
                homeType : req.body.homeType,
                residenceType :req.body.residenceType,
                arrivalDate : req.body.arrivalDate,
                departureDate : req.body. departureDate,
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

module.exports.deleteDomo = async (req,res)=>{

   if(!objectID.isValid(req.params.id))
   res.status(400).send('id unknown' + req.params.id );


   try{
       await Domos.remove({_id : req.params.id }).exec();
       res.status(200).json({message : "Scuccessfuly deleted."});

       }catch(err){
           return res.status(500).json(err);
       }


}
