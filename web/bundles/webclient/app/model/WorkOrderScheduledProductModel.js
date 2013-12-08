/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.model.WorkOrderScheduledProductModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkOrderScheduledProduct', type: 'int'}, 
        {name: 'idProduct', type: 'int', mapping: 'product.idProduct'}, 
        {name: 'productName', type: 'string', mapping: 'product.productName'},
        {name: 'productCode', type: 'string', mapping: 'product.productCode'},
        {name: 'productStore', type: 'string', mapping: 'product.store'},
        {name: 'productStock', type: 'float', mapping: 'product.stock'},
        {name: 'productPrice', type: 'float', mapping: 'product.price'},
        {name: 'quantity', type: 'float'},
        {name: 'idMeasureUnit', type: 'int', mapping: 'measureUnit.idMeasureUnit'},
        {name: 'measureUnitName', type: 'string', mapping: 'measureUnit.measureUnitName'},
        {name: 'isUsed', type: 'boolean'},
        {name: 'usedQuantity', type: 'float'},
        {name: 'requestNumber', type: 'string'}
    ],

    idProperty: 'idWorkOrderScheduledProduct'
});

