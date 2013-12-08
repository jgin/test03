/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.model.WorkTemplateActivityOtModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idActivityOt', type: 'int', visible: false}, 
        {name: 'description', type: 'string', visible: true},
        {name: 'manHours', type: 'float', visible: true},
        {name: 'machineHours', type: 'float', visible: true}
    ],

    idProperty: 'idActivityOt'
});

