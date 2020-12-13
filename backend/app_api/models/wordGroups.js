const mongoose = require('mongoose');

const WordGroupSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    require: true
  },
  wordIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Words',
  }]

});

WordGroupSchema.index({ name: 1, owner: 1 }, { unique: true });
WordGroupSchema.pre('save', function (next) {
  this.wordIds = _.uniq(this.wordIds);
  next();
});
mongoose.model('WordGroup', WordGroupSchema);