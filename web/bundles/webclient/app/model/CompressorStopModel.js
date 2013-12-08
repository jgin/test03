Ext.define('sisprod.model.CompressorStopModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idCompressorStop', type: 'int', visible: false},
        {name: 'equipment.idEquipment', type: 'int', visible: false, mapping:'equipment.idEquipment'},
        {name: 'equipment.equipmentName', type: 'string', visible: true, mapping:'equipment.equipmentName'},
        {name: 'compressorStopReason.idCompressorStopReason', type: 'int', visible: false, mapping:'compressorStopReason.idCompressorStopReason'},
        {name: 'compressorStopReason.compressorStopReasonName', type: 'string', visible: true, mapping:'compressorStopReason.compressorStopReasonName'},
        {name: 'startTime', type: 'string', visible: true},        
        {name: 'finishTime', type: 'string', visible: true},
        {name: 'stopHours', type: 'float', visible: true,align:true},        
        {name: 'pressure', type: 'float', visible: true},
        {name: 'volume', type: 'float', visible: true},     
        {name: 'comment', type: 'string', visible: true},   
        {name: 'productionPeriod.idProductionPeriod', type: 'int', visible: false, mapping:'productionPeriod.idProductionPeriod'},
        {name: 'productionPeriod.productionPeriodDate', type: 'date', dateFormat: 'Y-m-d', visible: false,mapping:'productionPeriod.productionPeriodDate'},
        {name: 'productionPeriodDate', type: 'string',visible: true,mapping:'productionPeriod.productionPeriodDate'}
    ],

    idProperty: 'idCompressorStop'
});