/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.model.WorkTemplateEquipmentModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idEquipmentType', type: 'int', visible: false}, 
        {name: 'equipmentTypeName', type: 'string', visible: true},
        {name: 'quantity', type: 'int', visible: false}
    ],

    idProperty: 'idEquipmentType'
});

