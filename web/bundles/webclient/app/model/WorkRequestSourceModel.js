Ext.define('sisprod.model.WorkRequestSourceModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkRequestSource', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'workRequestSourceName', type: 'string', visible: true},
        {name: 'workRequestSourceAcronym', type: 'string', visible: true}
    ],

    idProperty: 'idWorkRequestSource'
});