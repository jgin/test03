Ext.define('sisprod.model.WorkOrderActivityModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkOrderActivity', type: 'int'},
        {name: 'idActivityOt', type: 'int', mapping: 'activityOt.idActivityOt'},
        {name: 'description', type: 'string', mapping: 'activityOt.description'},
        {name: 'manHours', type: 'float'},
        {name: 'machineHours', type: 'float'},
        {name: 'isPlanned', type: 'boolean'},
        {name: 'isPerformed', type: 'boolean'},
        {name: 'performedManHours', type: 'float'},
        {name: 'performedMachineHours', type: 'float'},
        {name: 'unperformedReasonName', type: 'string', mapping: 'unperformedReason.unperformedReasonName'},
        {name: 'idUnperformedReason', type: 'int', mapping: 'unperformedReason.idUnperformedReason'},
        {name: 'observation', type: 'string'},
        {name: 'listWorkOrderActivityDetail'}
    ],

    idProperty: 'idWorkOrderActivity'
});