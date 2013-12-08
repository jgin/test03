/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.model.WorkOrderActivityDetailModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkOrderActivityDetail', type: 'int', visible: false}, 
        {name: 'idWorkOrderActivity', type: 'int', visible: false, mapping: 'workOrderActivity.idWorkOrderActivity'},
        {name: 'activityDate', type: 'date', visible: true, dateFormat:'Y-m-d'},
        {name: 'manHours', type: 'float', visible: true},
        {name: 'machineHours', type: 'float', visible: true},
        {name: 'stringDate', type: 'string', visible: false},
        {name: 'description', type: 'string', visible: true},
        {name: 'isValid', type: 'string', visible: false}
    ], 

    idProperty: 'idWorkOrderActivityDetail'
});
