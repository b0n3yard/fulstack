const {exec} = require('child_process')
exec(`npm i express express-handlebars express-session mysql2 sequelize dotenv  && npm i nodemon -D `,(err,stdout,stderr)=>{
    if (err) {
        console.error(`Command execution failed: ${err}`);
        return;
      }
      console.log(`Command output: ${stdout}`);

})