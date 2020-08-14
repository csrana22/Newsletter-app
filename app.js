const express= require("express");  //
const app=express();
const bodyp= require("body-parser");
var https= require("https");
const request=require("request");



app.use(bodyp.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/sign.html");
});
app.use(express.static("public"));

app.post("/",function(req,res){
  var fname= req.body.fname;
  var lname= req.body.lname;
  var email=req.body.email;

  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };
var jsdata=JSON.stringify(data);
const url="https://us19.api.mailchimp.com/3.0/lists/be83ba38fe";
const options={
  method: "POST",
  auth: "sameer:283c040c9d0bac8346fdd252a648eb89-us19"
}
var request =https.request(url,options,function(response){
   if(response.statusCode===200)
   {
    response.sendFile(__dirname+"/success.html");
   }
   else {
 response.sendFile(__dirname+"/fail.html");
   }

response.on("data",function(data){
  console.log(JSON.parse(data))
})
})
request.write(jsdata);
request.end();
});



app.listen(process.env.PORT||3000,function(){
  console.log("running");
});
