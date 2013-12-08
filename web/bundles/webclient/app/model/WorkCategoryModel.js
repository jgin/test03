Ext.define('sisprod.model.WorkCategoryModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkCategory', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'workCategoryName', type: 'string', visible: true}
    ],

    idProperty: 'idWorkCategory'
});