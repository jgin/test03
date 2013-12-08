/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.model.WorkOrderScheduledEquipmentModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkOrderScheduledEquipment', type: 'int'}, 
        {name: 'idWorkOrder', type: 'int', mapping: 'workOrder.idWorkOrder'}, 
        {name: 'idEquipmentType', type: 'int', mapping: 'equipmentType.idEquipmentType'}, 
        {name: 'equipmentTypeName', type: 'string', mapping: 'equipmentType.equipmentTypeName'},
        {name: 'quantity', type: 'int'},
        {name: 'isUsed', type: 'boolean'},
        {name: 'usedQuantity', type: 'int'}
    ],

    idProperty: 'idWorkOrderScheduledEquipment'
});

