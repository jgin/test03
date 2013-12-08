Ext.define('sisprod.model.TankModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idTank', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'tankName', type: 'string', visible: true},
        {name: 'tankAcronym', type: 'string', visible: true},
        {name: 'maximumCapacity', type: 'float', visible: true},
        {name: 'minimumCapacity', type: 'float', visible: true},
        {name: 'heightInFeet', type: 'float', visible: true},
        {name: 'diameterInFeet', type: 'float', visible: true},
        {name: 'adjustmentFactor', type: 'float', visible: true},
        {name: 'startupDate', type: 'date', dateFormat: 'Y-m-d', visible: true},
        {name: 'tankType.idTankType', type: 'int', visible: false,mapping:'tankType.idTankType'},
        {name: 'tankType.tankTypeName', type: 'string', visible: true,mapping:'tankType.tankTypeName'},
        {name: 'alternativeTankType.idAlternativeTankType', type: 'int', visible: false,mapping:'alternativeTankType.idAlternativeTankType'},
        {name: 'alternativeTankType.alternativeTankTypeName', type: 'string', visible: true,mapping:'alternativeTankType.alternativeTankTypeName'},
        {name: 'lot.idLot', type: 'int', visible: false, mapping:'lot.idLot'},
        {name: 'lot.lotName', type: 'string', visible: true, mapping:'lot.lotName'},
        {name: 'location.idLocation', type: 'int', visible: false, mapping:'location.idLocation'},
        {name: 'location.locationName', type: 'string', visible: true, mapping:'location.locationName'}
    ],

    idProperty: 'idTank'
});