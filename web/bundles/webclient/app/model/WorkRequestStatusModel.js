Ext.define('sisprod.model.WorkRequestStatusModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields: [    
        {name: 'idWorkRequestStatus', type: 'int', visible: false},
        {name: 'workRequestStatusName', type: 'string', visible: true},
        {name: 'hasCause', type: 'boolean', visible: true},
        {name: 'workRequestStatusColor', type: 'string', visible: true}
    ],

    idProperty: 'idWorkRequestStatus'
});