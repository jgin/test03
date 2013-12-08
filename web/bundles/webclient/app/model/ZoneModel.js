Ext.define('sisprod.model.ZoneModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idZone', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'zoneName', type: 'string', visible: true},
        {name: 'lot.idLot', type: 'int', visible: false, mapping:'lot.idLot'},
        {name: 'lot.lotName', type: 'string', visible: true, mapping:'lot.lotName'},
        {name: 'zoneLotName', type: 'string', visible: false,
                convert: function (newValue, model) {
                    return model.get('lot.lotName') + '-' + model.get('zoneName');
                }
        }
    ],

    idProperty: 'idZone'
});