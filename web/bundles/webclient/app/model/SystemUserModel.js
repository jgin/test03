Ext.define('sisprod.model.SystemUserModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'id', type: 'int', visible: false},
        {name: 'username', type: 'string', visible: true},
        {name: 'entity.entityName', type: 'string', visible: true,mapping:'entity.entityName'},
        {name: 'enabled', type: 'boolean', visible: true},
        {name: 'groupsString', type: 'string', visible: true},
        {name: 'multiSession', type: 'boolean', visible: false},
        {name: 'entity.entityId', type: 'int', visible: false,mapping:'entity.entityId'},        
        {name: 'expirationDate', type: 'string', visible: false},
        {name: 'resetPasswordAndSendToMailButton' , type : 'string', visible : true }
    ],
    
    idProperty: 'id'
});