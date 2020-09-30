import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' 
import popper from 'popper.js'
global.Popper = popper 
import './main.html';
import '../lib/collection.js';
import'../lib/accounts-ui.js';

Meteor.subscribe("taskGallery")

Template.tasksLib.helpers({
  allTask() {
    return taskdb.find();
  },

userChoice(){ 
    if ((this.privatet == 1)){
      return true;
    }
    else {
      return false;
    }
  },

usershow(){
  if (this.privatet== 0){
    return true;
  }
  
  if(this.createdById == Meteor.userId() ){
    return true;
  }
  else{
    return false;
  }
}

});




Template.myJumbo.events({
	'click .js-addImage'(event, instance){
    console.log("Open modal");
 	 },
  	'click .js-exitAdd'(event, instance){
   
    $("#tName").val("");
    $("#tdesc").val("");
    $("#fdesc").val("");
    
  },

	'click .js-save'(event, instance){
 
    var puborpriv = 0;  
    if ($("#privatet").prop("checked")==true)
      puborpriv = 1;






    
    
    
		var tasktitle = $('#tName').val();
		var tdesc = $ ('#tdesc').val();
    var fulltask =$('#fdesc').val();

		taskdb.insert ({
    "privatet": puborpriv,
	  "tName" : tasktitle,
	  "tdesc" : tdesc,
    "fdesc" : fulltask,
    "completed" : false,
    "createdOn": new Date().getTime(),
    "createdBy": Meteor.users.findOne({_id:Meteor.userId()}).emails[0].address,
    "createdById": Meteor.userId()
    

		});

	
    $("#addTaskModal").modal("hide");
    $("#tName").val("");
    $("#tdesc").val("");
    $("#fdesc").val("");

  },


  
	
	
});
Template.tasksLib.events({
  
  'click .js-delete'(event, instance) {
      var myId = this._id;
        
        
        if ((this.createdById == undefined) || (this.createdById == Meteor.userId())){
          
      $("#deleteId").val(myId);
      $("#confirmModal").modal("show");
    }
    else {
      alert("You don't have permission to delete that.");
    }
    },

     'click .js-view'(event, instance){
    $("#viewTask").modal('show');
    var myID = this._id;
    
    $('#viewContent').html(taskdb.findOne({_id:myID}).fdesc);
    

  },
    'change .smartwater' : function(){
      var myId = this._id;
      
      var tcomp = this.completed;
      if(tcomp){
        taskdb.update({_id:myId},
          {$set:{
            "completed": false
          }});
      } else{
        taskdb.update({_id:myId},
          {$set:{
            "completed": true
          }});
      }
    }
});

Template.confirmTemp.events({
  'click .js-confirm'(event, instance){
    var myId = $("#deleteId").val();
    $("#"+myId).fadeOut('slow',function(){
      taskdb.remove({_id:myId});
    });
  },
});



