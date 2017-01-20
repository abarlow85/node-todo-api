const fs = require('fs');


module.exports = (app) => {

  fs.readdirSync(__dirname).forEach(file => {
    if (!file.includes('index') && file.includes('js')) {
      try {
        require(`./${file}`)(app);
      } catch (e) {
        console.log('Unable to require file', file);
      }

    }
  });



};
