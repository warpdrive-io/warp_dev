Template.metrics.helpers({
    'hasData': function() {
        var websiteId = FlowRouter.getParam('id');
        var website = Websites.findOne(websiteId);
        return websiteId && website && (website.metrics.length > 0) 
    }
});

Template.timingTable.helpers({
	'metrics': function() {
	    var websiteId = FlowRouter.getParam('id');
        return Websites.findOne(websiteId).metrics;
    }
});
Template.weightTable.helpers({
	'metrics': function() {
		var websiteId = FlowRouter.getParam('id');
        return Websites.findOne(websiteId).metrics;
	}
});
