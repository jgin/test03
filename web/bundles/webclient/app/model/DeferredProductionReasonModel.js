Ext.define('sisprod.model.DeferredProductionReasonModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idDeferredProductionReason', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'deferredProductionReasonName', type: 'string', visible: true},
        {name: 'deferredProductionCode', type: 'string', visible: true},  
        {name: 'deferredProductionType.idDeferredProductionType', type: 'int', visible: false, mapping:'deferredProductionType.idDeferredProductionType'},
        {name: 'deferredProductionType.deferredProductionTypeName', type: 'string', visible: true, mapping:'deferredProductionType.deferredProductionTypeName'}
    ],

    idProperty: 'idDeferredProductionReason'
});