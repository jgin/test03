Ext.define('sisprod.model.DeferredProductionTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idDeferredProductionType', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'deferredProductionTypeName', type: 'string', visible: true}
    ],

    idProperty: 'idDeferredProductionType'
});