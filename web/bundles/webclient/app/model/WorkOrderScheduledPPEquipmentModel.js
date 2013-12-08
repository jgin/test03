/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.model.WorkOrderScheduledPPEquipmentModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkOrderScheduledPPEquipment', type: 'int'}, 
        {name: 'idWorkOrder', type: 'int', mapping: 'workOrder.idWorkOrder'}, 
        {name: 'idPPEquipment', type: 'int', mapping: 'ppEquipment.idPPEquipment'}, 
        {name: 'description', type: 'string', mapping: 'ppEquipment.description'},
        {name: 'isTool', type: 'boolean', mapping: 'ppEquipment.isTool'},
        {name: 'quantity', type: 'int'}
    ],

    idProperty: 'idWorkOrderScheduledPPEquipment'
});

