Ext.define('sisprod.model.SectorModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idSector', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'sectorName', type: 'string', visible: true},
        {name: 'sectorAcronym', type: 'string', visible: false}
    ],

    idProperty: 'idSector'
});