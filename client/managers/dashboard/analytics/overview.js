Template.overview.helpers({
    'hasData': function() {
        var websiteId = FlowRouter.getParam('id');
        var website = Websites.findOne(websiteId);
        return websiteId && website && (website.metrics.length > 0) 
    },
	'loadTimeChart': function() {
		var chart = nv.models.lineChart()
					  		 .showXAxis(true)
					  		 .showYAxis(true)
					  		 .showLegend(true);

        var websiteId = FlowRouter.getParam('id');
        var website = Websites.findOne(websiteId);

		var frontendTime = website.metrics.map(function(obj, index) {
			return {x: obj.time, y: obj.httpTrafficCompleted*obj.timeFrontend/100};
		});

		var backendTime = website.metrics.map(function(obj, index) {
			return {x: obj.time, y: obj.httpTrafficCompleted*obj.timeBackend/100};
		});

		chart.xAxis.tickFormat(function(d) { return d3.time.format('%X')(new Date(d)); })
		chart.yAxis.axisLabel('Time (ms)').tickFormat(d3.format(',r'));

		nv.addGraph(function() {
			d3.select('#time-chart svg').datum(
				[{values: frontendTime, key: 'Frontend Time'},
				 {values: backendTime, key: 'Backend Time'}]
			).call(chart);

		    nv.utils.windowResize(function() {chart.update();});
			
			return chart;
		});
	}
});