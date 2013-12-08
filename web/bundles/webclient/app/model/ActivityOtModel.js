Ext.define('sisprod.model.ActivityOtModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idActivityOt', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'description', type: 'string', visible: true}
    ],

    idProperty: 'idActivityOt'
});