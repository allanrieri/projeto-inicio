const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ws.db');

db.serialize(function() {

  //CRIAR TABELA
  db.run(`
    CREATE TABLE IF NOT EXISTS ideas(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT
    );
  `)

 // INSERIR DADO NA TABELA
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
    "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    "Curso de Programação",
    "Estudo",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet voluptates quasi ab porro quibusdam molestiae maiores reiciendis, temporibus sint hic incidunt asperiores dolores voluptate tenetur distinctio accusantium fugiat omnis praesentium.",
    "https://www.google.com"
  ];
  // db.run(query,values, function(err){
  //   if(err) return console.log(err);

  //   console.log(this);
  // });

  //DELETAR DADOS

  // db.run(`DELETE FROM ideas where id = ?`, [1], function(err){
  //   if(err) return console.log(err)

  //   console.log("deletei", this);
  // });

  // CONSULTAR DADOS DA TABELA
  // db.all(`
  //   SELECT * FROM ideas`, function(err,rows){
  //     if(err) return console.log(err);

  //     console.log(rows);
  //   })

});

module.exports = db;