Ext.define('sisprod.model.TankTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idTankType', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'tankTypeName', type: 'string', visible: true},
        {name: 'tankTypeAcronym', type: 'string', visible: true}
    ],

    idProperty: 'idTankType'
});