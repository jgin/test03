Ext.define('sisprod.model.Member', {
	extend: 'Ext.data.Model',

	require: [
		'Ext.data.Model'
	],

	fields:[
		{name: 'id', type: 'int', visible: false}, // Ext.data.Types.FLOAT
		{name: 'email', type: 'string', visible: true},
		{name: 'name', type: 'string', visible: true},
		{name: 'phoneNumber', type: 'string', visible: true}
	],

	idProperty: 'id'
});