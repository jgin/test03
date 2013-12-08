Ext.define('sisprod.model.BatteryModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idBattery', type: 'int', visible: false}, // Ext.data.s.FLOAT
        {name: 'batteryName', type: 'string', visible: true},
        {name: 'batteryAcronym', type: 'string', visible: true},
        {name: 'batteryCode', type: 'string', visible: true},        
        {name: 'batteryType.idBatteryType', type: 'int', visible: false, mapping:'batteryType.idBatteryType'},
        {name: 'batteryType.batteryTypeName', type: 'string', visible: true, mapping:'batteryType.batteryTypeName'},
        {name: 'zone.idZone', type: 'int', visible: false, mapping:'zone.idZone'},
        {name: 'zone.zoneName', type: 'string', visible: true, mapping:'zone.zoneName'},
        {name: 'zone.lot.idLot', type: 'string', visible: false, mapping:'zone.lot.idLot'},
        {name: 'zone.lot.lotName', type: 'string', visible: true, mapping:'zone.lot.lotName'},
        {name: 'adjustmentFactor', type: 'float', visible: false}
        
    ],
    
    //idLocation: int NOT NULL (FK)

    idProperty: 'idBattery'
});