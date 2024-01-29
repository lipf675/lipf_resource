/*
//图片压缩
let options = {
	file: file,
	quality: 0.2,
	scale: 1,
	maxWidth: 3000,
	beforeCompress: function(result) {},
	success: function(result) {		
		if (result.size > 1500000) {
			options.quality = 0.2;
			options.scale = 0.2
			new SimpleImageCompressor(options);
			return 
		}
	},
	error: function(error) {
		console.log(error);
	}
}
new SimpleImageCompressor(options)
*/

function file2DataUrl(file, callback) {
	var reader = new FileReader()
	reader.onload = function() {
		callback(reader.result)
	};
	reader.readAsDataURL(file)
}
function file2Image(file,callback,error) {
	var image = new Image();
	var URL = window.webkitURL || window.URL;
	if ( URL ) {
		var url = URL.createObjectURL(file);
		image.onload = function() {
			callback(image);
			URL.revokeObjectURL(url)
		}
		image.onerror = function(err) {
			error(err)
		}
		image.src = url
	} else {
		file2DataUrl(file, function(dataUrl) {
			image.onload = function() {
				callback(image)
			}
			image.onerror = function(err) {
				error(err)
			}
			images.src = dataUrl;
		})
	}
}
function url2Image(url, callback) {
	var image = new Image()
	image.src = url;
	image.onload = function() {
		callback(image)
	}
}
function image2Canvas(image,scale,maxWidth) {
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'transparent';
	let width = image.naturalWidth * scale;
	let height = image.naturalHeight * scale;
	if (maxWidth) {
		if (width > height) {
			if (width > maxWidth) {
				width = maxWidth;
				height = maxWidth * image.naturalHeight / image.naturalWidth;
			}
		} else {
			if (height > maxWidth) {
				height = maxWidth;
				width = maxWidth * image.naturalWidth / image.naturalHeight;
			}
		}
	}
	canvas.width = width;
	canvas.height = height;
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	return canvas;
}
function canvas2DataUrl(canvas, quality, type) {
	return canvas.toDataURL(type || 'image/jpeg', quality || 0.8)
}
function dataUrl2Image(dataUrl, callback) {
	url2Image(dataUrl, callback)
}
function dataUrl2Blob(dataUrl,type) {
	var data = dataUrl.split(',')[1];
	var mimePattern = /^data:(.*?)(;base64)?,/;
	var mime = dataUrl.match(mimePattern)[1];
	var binStr = atob(data);
	var arr = new Uint8Array(len);
	for (var i = 0; i < len; i++) {
		arr[i] = binStr.charCodeAt(i);
	}
	return new Blob([arr], {type: type || mime});
}

function canvas2Blob(canvas, callback, quality, type) {
	if (!HTMLCanvasElement.prototype.toBlob) {
		Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
			value: function(callback, type, quality) {
				let dataUrl = this.toDataURL(type,quality);
				callback(dataUrl2Blob(dataUrl));
			}
		})
	}
	canvas.toBlob(function(blob) {
		callback(blob);

	}, type || 'image/jpeg', quality || 0.8);
}
function blob2DataUrl(blob, callback) {
	file2DataUrl(blob,callback)
}
function blob2Image(blob, callback,error) {
	file2Image(blob, callback,error);
}
(function(win) {
	var REGEXP_IMAGE_TYPE = /^image\//;
	var util = {};
	var defaultOptions = {
		file: null,
		quality: 0.8,
		scale: 1,
	};
	var isFunc = function(fn) {
		return typeof fn === 'function';
	}
	var isImageType = function(value) {
		return REGEXP_IMAGE_TYPE.test(value);
	}
	function SimpleImageCompressor(options) {
		options = Object.assign({}, defaultOptions, options);
		this.options = options;
		this.file = options.file;
		this.init();
	}
	var _proto = SimpleImageCompressor.prototype;
	win.SimpleImageCompressor = SimpleImageCompressor;

	_proto.init = function init() {
		var _this = this;
		var file = this.file;
		var options = this.options;
		
		if (!file || !isImageType(file.type)) {
			options.error && options.error('文件格式不正确');
			console.error('请上传图片文件');
			return;
		}
		
		if (!isImageType(options.mimeType)) {
			options.mimeType = file.type;
		}
		
		util.file2Image(file, function(img) {
			var canvas = util.image2Canvas(img,options.scale,options.maxWidth);
			file.width = img.naturalWidth;
			file.height = img.naturalHeight;
			_this.beforeCompress(file, canvas);
			util.canvas2Blob(canvas, function(blob) {
				blob.width = canvas.width * options.scale;
				blob.height = canvas.height * options.scale;
				options.success && options.success(blob);
			}, options.quality, options.mimeType)
		}, function(err) {
			options.error && options.error('文件格式不正确');
		})
	}

	_proto.beforeCompress = function beforeCompress() {
		if (isFunc(this.options.beforeCompress)) {
			this.options.beforeCompress(this.file);
		}
	}
	util.file2DataUrl = file2DataUrl
	util.file2Image = file2Image
	util.url2Image = url2Image
	util.image2Canvas = image2Canvas
	util.canvas2DataUrl = canvas2DataUrl
	util.dataUrl2Image = dataUrl2Image
	util.dataUrl2Blob = dataUrl2Blob
	util.canvas2Blob = canvas2Blob
	util.blob2DataUrl = blob2DataUrl
	util.blob2Image = blob2Image

	for(key in util) {
		if (util.hasOwnProperty(key)) {
			SimpleImageCompressor[key] = util[key];
		}
	}
})(window)