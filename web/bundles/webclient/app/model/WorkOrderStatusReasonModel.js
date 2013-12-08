Ext.define('sisprod.model.WorkOrderStatusReasonModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkOrderStatusReason', type: 'int', visible: false},
        {name: 'idWorkOrderStatus', type: 'int', visible: false},
        {name: 'workOrderStatusReasonName', type: 'string', visible: true},
        {name: 'workOrderStatusReasonDescription', type: 'string', visible: true}
    ],

    idProperty: 'idWorkOrderStatusReason'
});