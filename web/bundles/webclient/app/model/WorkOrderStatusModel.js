Ext.define('sisprod.model.WorkOrderStatusModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields: [    
        {name: 'idWorkOrderStatus', type: 'int', visible: false},
        {name: 'workOrderStatusName', type: 'string', visible: true},
        {name: 'hasCause', type: 'boolean', visible: true},
        {name: 'workOrderStatusColor', type: 'string', visible: true}
    ],

    idProperty: 'idWorkOrderStatus'
});