Ext.define('sisprod.model.LocationModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idLocation', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'locationName', type: 'string', visible: true},
        {name: 'locationAcronym', type: 'string', visible: true},
        {name: 'locationParent.idLocation', type: 'int', visible: false, mapping:'locationParent.idLocation'},
        {name: 'locationParent.locationName', type: 'string', visible: true, mapping:'locationParent.locationName'},
        {name: 'locationType.idLocationType', type: 'int', visible: false, mapping:'locationType.idLocationType'},
        {name: 'locationType.locationTypeName', type: 'string', visible: true, mapping:'locationType.locationTypeName'},
        {name: 'lot.idLot', type: 'int', visible: false, mapping:'lot.idLot'},
        {name: 'lot.lotName', type: 'string', visible: true, mapping:'lot.lotName'}
    ],

    idProperty: 'idLocation'
});