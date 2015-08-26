let cssRules = {
	attributes: [{
		'display': "inline-block; "
	},{
		'position': "relative; "
	},{
		'border': "1px dashed red; "
	},{
		'font-size': '20px; '
	}]
};

let cssStyle = '.content {';

for (let i = 0; i < cssRules.attributes.length; i += 1) {
	for (var item in cssRules.attributes[i]) {
		console.log(item);
		console.log(cssRules.attributes[i][item]);
		cssStyle += item + ':' + cssRules.attributes[i][item];
	}
}

cssStyle += '\n}';

function importStyle() {
	$('head').append('<style>' + cssStyle + '</style>');
}

export default {
	importStyle : importStyle
}