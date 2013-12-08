/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.model.WorkTemplateProductModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idProduct', type: 'int', visible: false}, 
        {name: 'productName', type: 'string', visible: true},
        {name: 'productCode', type: 'string', visible: true},
        {name: 'quantity', type: 'float', visible: true},
        {name: 'idMeasureUnit', type: 'string', visible: false},
        {name: 'measureUnit', type: 'string', visible: true},
        {name: 'store', type: 'string', visible: true},
        {name: 'price', type: 'float', visible: true},
        {name: 'stock', type: 'float', visible: true}
    ],

    idProperty: 'idProduct'
});

