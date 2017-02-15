var mongoose = require('mongoose');

var dbUri = 'mongodb://127.0.0.1:27017/vms';

if(process.env.NODE_ENV === 'production'){
  dbUri = 'mongodb://178.62.206.7:27017/vms'
}

mongoose.connect(dbUri, function(){
  console.log('Connected to MongoDB');
});

require('./models/company');
require('./models/location');
require('./models/meeting');
require('./models/note');
require('./models/persons');
require('./models/project');
