Ext.define('sisprod.model.SystemAuditModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'systemAuditId', type: 'int', visible: false},
        {name: 'systemUser.username', type: 'string', visible: true},
        {name: 'eventDate', visible: true},
        {name: 'remoteIpAddress', type: 'string', visible: true},
        {name: 'systemEntity.entityCaption', type: 'string', visible: true},
        {name: 'actionName', type: 'string', visible: true},
        {name: 'instanceId', type: 'string', visible: true},
        {name: 'actionName', type: 'string', visible: true},
        {name: 'url', type: 'string', visible: true}
    ],
    
    idProperty: 'systemAuditId'
});