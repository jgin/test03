Ext.define('sisprod.model.ProductTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idProductType', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'productTypeName', type: 'string', visible: true}
    ],

    idProperty: 'idProductType'
});