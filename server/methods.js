Meteor.methods({
	'warptest': function(websiteId, userId) {

		import phantomas from 'phantomas';

        var website = Websites.findOne(websiteId);
        var url = website.url;

        console.log('User: ' + userId);
        console.log('Website: ' + websiteId);
        console.log('url: ' + url);

		var data = Async.runSync(function (done) {
			var task = phantomas(url, function(err, json, results) {
				var metrics = results.getMetrics();
                var offenders = results.getAllOffenders();
                var data = {metrics: metrics, offenders: offenders, time: new Date()};
				done(err, data);
			});

			task.on('progress', function(progress) {
			    // reports page loading progress
				console.log("Loading Progress: %d%", progress);
			});

			task.on('log', function(msg) {
			    // emitted on every log message sent by phantomas
			    console.log("Log: %s", msg);
			});

			task.on('error', function(exitCode) {
			    // reports phantomas exit code (if not zero)
			    console.log("Exit Code: %d", exitCode);
			});
		});

		Websites.update({_id: websiteId}, {$push: {data: data.result}});
		console.log('Updated website: %s', websiteId);
	},
    'sendMail': function(name, email, message) {
        this.unblock();
        Meteor.Mailgun.send({
            to: 'tim@warpdrive.io',
            from: name,
            subject: email + ' Warpdrive Contact Form',
            text: message
        });
    } 
});
