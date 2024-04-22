const express =require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
// const ExpressError =require("../utils/ExpressError.js");
// const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} =require("../middleware.js");

const listingController=require("../controllers/listing.js");

const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Now you can use `upload` for your file uploads



router.route("/")
.get(wrapAsync(listingController.index))//index route
.post(isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing));//create route
// .post(upload.single("listing[image]"),(req,res)=>{
//     res.send(req.file);
// });

//New route
router.get("/new",isLoggedIn,listingController.renderNewForm); 
 
router.route("/:id")
    .get(wrapAsync(listingController.showListing))//show route
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))//Update route
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));//delete route
 //Edit route
  router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEdit));

  module.exports=router;