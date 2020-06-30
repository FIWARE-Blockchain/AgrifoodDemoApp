function wrapAsync(fn) {
	return function(req, res, next) {
		fn(req, res, next).catch(e => {
			next(e);
		});
	};
}

function isUrl(url) {
	var pattern = /(tcp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (pattern.test(url)) {
            return true;
		}
	return false;
}

function isModeValid(modeType) {
	if(modeType === 'public' || modeType === 'restricted') {
		return true;
	}
	return false;
}

function isNotEmpty(value) {
	return typeof value == 'string' && value.trim() || typeof value !== 'undefined' || value !== null;
}

exports.wrapAsync = wrapAsync;
exports.isUrl = isUrl;
exports.isNotEmpty = isNotEmpty;
exports.isModeValid = isModeValid;
