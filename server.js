const express = require('express');
const server = express();

const db = require("./db");

server.use(express.static("public"));

server.use(express.urlencoded({extended: true}));

const nunjucks = require('nunjucks');
nunjucks.configure("views",{
  express: server,
  noCache: true,
})

server.get("/", function(require,response){
  
  db.all(`
    SELECT * FROM ideas`, function(err,rows){
      if(err) {
        console.log(err)
        return response.send("erro no banco de dados")
      }

      const reversedIdeas = [...rows].reverse();

        let lastIdeas = [];
        for (let idea of reversedIdeas){
          if(lastIdeas.length < 2){
            lastIdeas.push(idea);
          }
        }

      return response.render("index.html", {ideas: lastIdeas});
  })
  
})

server.get("/ideias", function(require,response){

  db.all(`
    SELECT * FROM ideas`, function(err,rows){
      if(err) {
        console.log(err)
        return response.send("erro no banco de dados")
      }

      const reversedIdeas = [...rows].reverse();
      return response.render("ideias.html", {ideas: reversedIdeas});

  })
})

server.post("/", function(require, response){
    const query = `
    INSERT INTO ideas(
      image,
      title,
      category,
      description,
      link
    ) VALUES (?,?,?,?,?);
  `;
  const values = [
    require.body.image,
    require.body.title,
    require.body.category,
    require.body.description,
    require.body.link,
  ];
  db.run(query,values, function(err){
    if(err) {
      console.log(err)
      return response.send("erro no banco de dados")
    }

    return response.redirect("/ideias");
  });

});

server.get('/deletar/:id', function(require,response){
  const id = require.params.id;

  db.run(`DELETE FROM ideas where id = ?`, id, function(err){
    if(err) return console.log(err);

    return response.redirect("/ideias");
  });
})

server.listen(3000);

