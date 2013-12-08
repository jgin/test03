Ext.define('sisprod.model.ProductModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idProduct', type: 'int', visible: false},
        {name: 'productName', type: 'string', visible: true},
        {name: 'productCode', type: 'string', visible: true},
        {name: 'partNumber', type: 'string', visible: true},
        {name: 'stock', type: 'float', visible: true},        
        {name: 'price', type: 'float', visible: true},        
        {name: 'store', type: 'string', visible: true},        
        {name: 'productType.idProductType', type: 'int', visible: false, mapping:'productType.idProductType'},
        {name: 'productType.productTypeName', type: 'string', visible: true, mapping:'productType.productTypeName'},
        {name: 'measureUnit.idMeasureUnit', type: 'int', visible: false, mapping:'measureUnit.idMeasureUnit'},
        {name: 'measureUnit.measureUnitName', type: 'string', visible: true, mapping:'measureUnit.measureUnitName'},     
        {name: 'measureUnitName', type: 'string', visible: true, mapping:'measureUnit.measureUnitName'},     
        {name: 'money.idMoney', type: 'int', visible: false, mapping:'money.idMoney'},      
        {name: 'money.moneyName', type: 'string', visible: true, mapping:'money.moneyName'},
        {name: 'measureUnitName', type: 'string', visible: true, mapping:'measureUnit.measureUnitName'}
    ],

    idProperty: 'idProduct'
});