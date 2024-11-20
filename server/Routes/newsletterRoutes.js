const express=require("express");
const router=express.Router();
const {getNewsletter,createNewsletter}=require("../Controllers/newsletterController")
router.get("/",getNewsletter);
router.post("/",validateJwtToken,createNewsletter);