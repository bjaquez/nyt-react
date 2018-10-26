const router = require("express").Router();
const Article = require("../models/Article.js");

router.post("/api/save", function(req, res) {
  Article.create(req.body).then(function(data){
    res.json(data);
  });  

});

router.get("/api/articles", function(req, res){
  Article.find({}).then(function(data){
    res.json(data);
  });
});


router.delete("/api/articles/:id", function(req, res){
  Article.remove({_id: req.params.id}).then(function(data){
    res.json(data);
  });
});

router.get("*", function(req, res){
  res.sendFile("./client/build/index.html")
})

module.exports = router;