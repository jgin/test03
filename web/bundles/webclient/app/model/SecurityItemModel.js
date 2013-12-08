Ext.define('sisprod.model.SecurityItemModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
        
    ],

    fields:[
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'}
    ],

    idProperty: 'id'
});