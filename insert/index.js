require('shelljs/global');

function insert(options) {
	this.insertType = options.insert || 'head';
	this.title = options.title || 'Document';
}

insert.prototype.apply = function(compiler) {
	var that = this;
	var title = this.title;
	var headInsert = bodyInsert = '';

  compiler.plugin('emit', function(compilation, callback) {
  	rm('./dist/**', '-rf')
  	var bundleNames = [];
  	var insertText = '';

  	for (var name in compilation.assets) {
  		bundleNames.push(name);
  	}

		bundleNames.forEach(function(item) {
			insertText += '<script type="text/javascript" src="' + item + '"></script>'
		});

		headInsert = that.insertType === 'head' ? insertText : '';
		bodyInsert = that.insertType === 'body' ? insertText : '';

		var template = '<!doctype html>' +
									 '<html lang="en">' +
											'<head>' +
												'<meta charset="UTF-8">' +
												'<title>' + title + '</title>'
												+ headInsert +
											'</head>' +
											'<body>' 
												+ bodyInsert +
											'</body>' +
										'</html>';
		
    compilation.assets['index.html'] = {
      source: function() {
        return template;
      },
      size: function() {
        return template.length;
      }
    };

    callback();
  });
};

module.exports = insert;