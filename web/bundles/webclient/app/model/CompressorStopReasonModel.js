Ext.define('sisprod.model.CompressorStopReasonModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idCompressorStopReason', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'compressorStopReasonName', type: 'string', visible: true},
        {name: 'compressorStopReasonAcronym', type: 'string', visible: true},
        {name: 'discounted', type: 'boolean', visible: true}
    ],

    idProperty: 'idCompressorStopReason'
});