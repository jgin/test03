Ext.define('sisprod.model.EntitySwabTempModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'entityId', type: 'int', visible: false},
        {name: 'entityName', type: 'string', visible: true}
    ],

    idProperty: 'entityId'
});