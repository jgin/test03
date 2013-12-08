Ext.define('sisprod.model.BatteryTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idBatteryType', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'batteryTypeName', type: 'string', visible: true},
        {name: 'batteryTypeAcronym', type: 'string', visible: true}
    ],

    idProperty: 'idBatteryType'
});