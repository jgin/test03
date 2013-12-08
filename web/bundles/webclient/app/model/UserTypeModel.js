Ext.define('sisprod.model.UserTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idUserType', type: 'int', visible: false}, 
        {name: 'userTypeName', type: 'string', visible: true},
        {name: 'defaultUserType', type: 'boolean', visible: true}
    ],

    idProperty: 'idUserType'
});