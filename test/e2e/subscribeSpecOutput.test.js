describe('#Allocate messages in arrays of output()', function () {

	var pubnub4 = new window.PubNubAngular();

	var channelName1 = getRandomChannel();
	var channelName2 = getRandomChannel();
	var channelName3 = getRandomChannel();
	var stringMessage = 'hey ';

	pubnub4.init(config.demo);

	pubnub4.subscribe({channels: [channelName1], triggerEvents: true, withPresence: true});
	pubnub4.subscribe({channels: [channelName1, channelName2], triggerEvents: true, withPresence: true});
	pubnub4.subscribe({channels: [channelName1, channelName3], triggerEvents: true, withPresence: true});

	var result1 = pubnub4.getMessage(channelName1);

	describe('Get an array with length equal 1', function () {
		var newStringMessege = stringMessage + '1';

		it('Should be triggered', function (done) {
			pubnub4.getMessage(channelName1, function (m) {
				expect(m).to.not.equal(null);
				expect(result1).to.have.length(1);
				expect(m.message).to.be.equal(newStringMessege);
				done();
			});

			pubnub4.publish({channel: channelName1, message: newStringMessege});
		});
	});

	describe('Get an array with length equal 2', function () {
		it('Should be triggered', function (done) {
			var newStringMessege = stringMessage + '2';

			pubnub4.getMessage(channelName1, function (m) {
				expect(m).to.not.equal(null);
				expect(result1).to.have.length(2);
				expect(m.message).to.be.equal(newStringMessege);
				done();
			});

			pubnub4.publish({channel: channelName1, message: newStringMessege});
		});
	});

	describe('Get an array with length equal 3', function () {
		it('Should be triggered', function (done) {
			var newStringMessege = stringMessage + '3';

			pubnub4.getMessage(channelName1, function (m) {
				expect(m).to.not.equal(null);
				expect(result1).to.have.length(3);
				expect(m.message).to.be.equal(newStringMessege);
				done();
			});

			pubnub4.publish({channel: channelName1, message: newStringMessege});
		});
	});

	describe('Get a message to be allocated in an array of a set of channels and a single channel', function () {
		it('Should be triggered', function (done) {
			var result2 = pubnub4.getMessage([channelName1, channelName2]);

			var newStringMessege = stringMessage + '4';

			pubnub4.getMessage([channelName1, channelName2], function (m) {
				expect(m).to.not.equal(null);
				expect(result1).to.have.length(4);
				expect(result2).to.have.length(1);
				done();
			});

			pubnub4.publish({channel: channelName1, message: newStringMessege});
		});
	});

	describe('Receive a message from the callback equal to the message pushed in an array', function() {
		it('Should be triggered', function(done) {
			var result3 = pubnub4.getMessage([channelName1, channelName3]);

			var newStringMessege = stringMessage + '5';

			pubnub4.getMessage([channelName1, channelName3], function (m) {
				expect(m).to.not.equal(null);
				expect(result3).to.have.length(1);
				expect(m.message).to.be.equal(result3[0].message);
				done();
			});

			pubnub4.publish({channel: channelName1, message: newStringMessege});
		});
	});
});