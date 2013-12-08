/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.model.WorkTemplatePPEquipmentModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idPPEquipment', type: 'int', visible: false}, 
        {name: 'description', type: 'string', visible: true},
        {name: 'isTool', type: 'boolean', visible: true},
        {name: 'quantity', type: 'int', visible: false}
    ],

    idProperty: 'idPPEquipment'
});

