Ext.define('sisprod.model.WorkRequestStatusReasonModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkRequestStatusReason', type: 'int', visible: false},
        {name: 'idWorkRequestStatus', type: 'int', visible: false},
        {name: 'workRequestStatusReasonName', type: 'string', visible: true},
        {name: 'workRequestStatusReasonDescription', type: 'string', visible: true}
    ],

    idProperty: 'idWorkRequestStatusReason'
});