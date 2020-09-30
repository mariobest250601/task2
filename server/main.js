import { Meteor } from 'meteor/meteor';
import '../lib/collection.js';

Meteor.startup(() => {
  
});

Meteor.publish('taskGallery', function () {
  return taskdb.find({}, {
   
  });
});