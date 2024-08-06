
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema= new Schema({
    title :{ 
       type: String,
       required :true,
    },

    description : String,
    image : { 
        url:String,
        filename:String,
        /*type: String,
        default :
        "https://unsplash.com/photos/a-woman-standing-in-front-of-a-red-house-1YbN_A4JkQM",
        set :(v)=>
            v==="" 
              ? "https://unsplash.com/photos/a-woman-standing-in-front-of-a-red-house-1YbN_A4JkQM"
              :v,*/
     },
     price : Number,
    location : String,
    country : String,
});

const Listing= mongoose.model("Listing",listingSchema);
module.exports = Listing;

