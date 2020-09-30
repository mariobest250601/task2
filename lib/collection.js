taskdb = new Mongo.Collection ('taskcollection');	

taskdb.allow({
	insert :function(userId, doc){
		return true;
	},

	remove:function(userId,doc){
		if(userId){
			return true;
		}
		else{
			return false;
		}
	},

	update:function(userId,doc){
		if(userId){
			return true;
		}
		else{
			return false;
		}
	},
});