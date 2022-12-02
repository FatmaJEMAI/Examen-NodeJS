var express = require('express');
var router = express.Router();

/* GET users listing. */
const etudiantModel = require('../model/etudiant');

router.get("/", async function (req,res,next){
try{
    const etudiants = await etudiantModel.find({});
    console.log(etudiants)
    res.render('form',{title:"etudiant list", etud:etudiants});

}catch(err){
    res.status(500).json({message:err.message});
}
});

 // ajout

 router.post("/",async function(req,res,next){
    const{nom,age,email,moyenne}= req.body;
    console.log(nom)
    const etudiant= new etudiantModel({
        nom,
        age,
        email,
        moyenne, 
        
   });
    try{
        await etudiant.save();
        res.redirect("/etudiant");
        
    }catch(err){
        res.status(400).json({messag:err.message});
    }
});
router.get("/delete/:id",async function(req,res,next){
    try{
      const {id}=req.params;
      const checkIfExist = await etudiantModel.findById(id);
      if(!checkIfExist){
        throw new Error("etudiant not found");
      }
      await etudiantModel.findByIdAndDelete(id);
      res.redirect('/etudiant');
    }catch(err){
        res.status(400).json({messag:err.message});
      }
    });

    router.get("/edit/:id", async function (req,res,next){
        try{
            const {id}=req.params;
            const etudiant= await etudiantModel.findById(id);
            if(!etudiant){
                throw new Error("etudiant not found");
            }
           
            res.render('edit',{title:"etudiant list", etud:etudiant});
        
        }catch(err){
            res.status(500).json({message:err.message});
        }
        });
    
    router.post("/edit/:id",async function(req,res,next){
        try{
          const {id}=req.params;
         const {nom,age,email,moyenne} =req.body;
         console.log(nom,id)
           const etudiant =await etudiantModel.findByIdAndUpdate(id,{
            nom,
            age,
            email,
            moyenne, 
            
           });
           if(!etudiant){
            throw new Error("error while updating etudiant");
        }
        res.redirect("/etudiant");
      
    
    }catch(err){
        res.status(500).json({message:err.message});
    }
    });
        

    router.get("/search", async function (req, res, next) {
        try {
            //object destructuring
            const { search } = req.query;
            const etudiant = await etudiantModel.find({ libelle: { $regex: search, $options: "i" } });
            res.status(200).json({etudiant});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
        
module.exports = router;