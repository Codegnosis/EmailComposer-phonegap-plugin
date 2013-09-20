/**
 *Email Composer plugin for PhoneGap/Cordova
 * window.plugins.emailComposer
 *
 * Unified and updated API to be cross-platform by Gal Cohen in 2013.
 * galcohen26@gmail.com
 * https://github.com/GalCohen
 *
 * Original code from:
 * android: https://github.com/phonegap/phonegap-plugins/tree/master/Android/EmailComposerWithAttachments
 * ios https://github.com/phonegap/phonegap-plugins/tree/5cf45fcade4989668e95a6d34630d2021c45291a/iOS/SMSComposer
 * js: https://github.com/phonegap/phonegap-plugins/blob/5cf45fcade4989668e95a6d34630d2021c45291a/iOS/SMSComposer/SMSComposer.js
 *
 */

cordova.define("cordova/plugin/EmailComposer",

function(require, exports, module) {

	var exec = require("cordova/exec");

	var EmailComposer = function() {
		this.ComposeResultType = {
		    Cancelled:0,
		    Saved:1,
		    Sent:2,
		    Failed:3,
		    NotSent:4
		};
	};

	// -------------------------------------------------------------------
	

	// showEmailComposer : all args optional
    EmailComposer.prototype.showEmailComposer = function(subject, body, toRecipients, ccRecipients, bccRecipients, bIsHTML, attachments) {
        var args = {};
        args.subject = subject ? subject : "";
        args.body = body ? body : "";
        args.toRecipients = toRecipients ? toRecipients : [];
        args.ccRecipients = ccRecipients ? ccRecipients : [];
        args.bccRecipients = bccRecipients ? bccRecipients : [];
        args.bIsHTML = bIsHTML ? true : false;
        args.attachments = attachments ? attachments : [];
        cordovaRef.exec(null, null, "EmailComposer", "showEmailComposer", [args]);
    }

    EmailComposer.prototype.showEmailComposerWithCallback = function(callback, subject, body, toRecipients, ccRecipients, bccRecipients, isHTML, attachments) {
        this.resultCallback = callback;
        this.showEmailComposer.apply(this, [subject, body, toRecipients, ccRecipients, bccRecipients, isHTML, attachments]);
    }

    EmailComposer.prototype._didFinishWithResult = function(res) {
        this.resultCallback(res);
    }

	var emailComposer = new EmailComposer();
	module.exports = emailComposer;
});


