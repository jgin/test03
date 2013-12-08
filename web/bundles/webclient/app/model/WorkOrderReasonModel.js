Ext.define('sisprod.model.WorkOrderReasonModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkOrderReason', type: 'int', visible: false},
        {name: 'workOrderReasonName', type: 'string', visible: true}
    ],

    idProperty: 'idWorkOrderReason'
});