Ext.define('sisprod.model.SystemUserGroupModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'id', type: 'int', visible: false}, 
        {name: 'groupName', type: 'string', visible: true}
    ],

    idProperty: 'id'
});