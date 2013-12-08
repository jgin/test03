Ext.define('sisprod.model.EntityModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'entityId', type: 'int', visible: false}, 
        {name: 'entityRuc', type: 'string', visible: true},
        {name: 'isCompany', type: 'boolean', visible: false},
        {name: 'address', type: 'string', visible: true},
        {name: 'email', type: 'string', visible: true},
        {name: 'entityName', type: 'string', visible: true}
    ],

    idProperty: 'entityId'
});