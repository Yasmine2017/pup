var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bcrypt=require('bcryptjs');
var app = express();
var db = null;
MongoClient.connect('mongodb://localhost:27017/project', function (err, dbconn) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connnected");
        db = dbconn;
    }
});
    client = require('socket.io').listen(8080).sockets; //done


var bodyparser = require('body-parser');
var ObjectID=require('mongodb').ObjectID;
app.use(express.static('public'));
var router=express.Router();
app.use(bodyparser.json());
//var meows = ['h',
//    'a',
//    'hh',
//    'hello'];

router.get('/', function(req, res, next) {
  res.render('public/index');
});
/*router.get('/register', function(req, res, next) {
  res.render('public/register', { title: 'Shopping Cart' });
});*/
module.exports = router;

//mongo.connect('mongodb://localhost:27017/project' , function(err , db){ //done
  //  if(err) throw err;

    client.on('connection',function(socket){ //done
        console.log("Server Connected");
        
        var col = db.collection('messages'), //done
            sendStatus = function(s){
                socket.emit('status',s);
            };

        col.find().limit(100).sort({_id: 1}).toArray(function(err,res){
            if(err) throw err;
            socket.emit('output',res);
        });        

        socket.on('inpyt',function(data){ //done
            var name = data.name,
            message = data.message,
            whitespacePattern = /^\s*$/;//done

        if(whitespacePattern.test(name) || whitespacePattern.test(message)){//done
            sendStatus('Name and message is required.');   
        } 
        else{
             col.insert({name: name, message:message}, function(){//done

             client.emit('output', [data]);

             sendStatus({
                 message:"Message sent",
                 clear:true
             });
        });            
        }   

           
        });
});
//});    

app.get('/meows', function (req, res, next) {
    db.collection('meows', function (err, meowscollect) {
        meowscollect.find().toArray(function (err, meows) {
          //  console.log(meows);
        return res.send(meows);

        });
    });
});

app.get('/doctors', function (req, res, next) {
    db.collection('doctors', function (err, meowscollect) {
        meowscollect.find().toArray(function (err, doctors) {
           // console.log(doctors);
        return res.send(doctors);

        });
    });
});
app.get('/doctor:id', function (req, res, next) {
    //console.log(1);
    var id=parseInt(req.query.id);
    console.log(id);
    db.collection('doctors', function (err, collect) {
        collect.find({"id" : id}).toArray(function (err, doctors) {
        console.log(doctors);
        return res.send(doctors);
        });
    });
});

app.get('/doctor:id', function (req, res, next) {
    //console.log(1);
    var id=(string)(req.query.id);
    console.log(id);
    db.collection('doctors', function (err, collect) {
        collect.find({"category" : id}).toArray(function (err, doctors) {
       console.log(doctors.email);
        return res.send(doctors);
        });
    });
});
app.post('/meows', function (req, res, next) {
    //meows.push(req.body.newmeow);
    db.collection('meows', function (err, meowscollect) {
        var newmeow = { text: req.body.newmeow };
        meowscollect.insert(newmeow, { w: 1 }, function (err) {
            return res.send();
        });
    });
});

app.put('/meows/remove', function (req, res, next) {
    //meows.push(req.body.newmeow);
    db.collection('meows', function (err, meowscollect) {
        var meowid = req.body.meow._id;
        meowscollect.remove({_id:ObjectID(meowid) },{ w: 1 }, function (err) {
            return res.send();
        });
    });
});
//app.use(bodyParser.json());

app.post('/doctors', function (req, res, next) {
db.collection('doctors', function (err, doctorscollect) {
bcrypt.genSalt(10,function(err,salt){
bcrypt.hash(req.body.password,salt,function(err,hash){
var newdoctor={
name:req.body.name,
email:req.body.email,
image:req.body.image,
phone:req.body.phone,
address:req.body.address,
category:req.body.category,
password:hash};
doctorscollect.insert(newdoctor, { w: 1 }, function (err)
     {
            //return res.send();
     });
});
});
});
console.log("post");
res.sendFile(__dirname+"/public/home.html");
res.end();
});

app.put('/doctors', function (req, res, next) {
    console.log("put");
db.collection('doctors', function (err, doctorscollect) {
bcrypt.genSalt(10,function(err,salt){
bcrypt.hash(req.body.password,salt,function(err,hash){
var newdoctor=req.body;
console.log(req.body);
/*email:req.body.email,
image:req.body.image,
phone:req.body.phone,
address:req.body.address,
category:req.body.category,
password:hash};*/
doctorscollect.update({"id":newdoctor.id},{$set:{name:newdoctor.name,
email:newdoctor.email,image:newdoctor.image,phone:newdoctor.phone,address:newdoctor.address,
category:newdoctor.category}}, function (err)
     {
            //return res.send();
     });
});
});
});
console.log("update");
//res.sendFile(__dirname+"/public/home.html");
res.end();
});

app.put('/doctors', function (req, res, next) {
  console.log(req.body);
   db.collection('doctors', function (err, doctorscollect) {
doctorscollect.findOne({name: req.body.name},function(err,doctor){
bcrypt.compare(req.body.password, doctor.password, function(err,result){
if(result){
   return res.send();
}else{
  return res.status(400).send();
}
});
});

 });
});
  
 //   });
//});
app.listen(3333, function () {
    console.log("3333");
});