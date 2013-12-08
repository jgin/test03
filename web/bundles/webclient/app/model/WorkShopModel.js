Ext.define('sisprod.model.WorkShopModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkShop', type: 'int', visible: false},
        {name: 'idSector', type: 'int', visible: false, mapping: 'sector.idSector'},
        {name: 'sector.sectorName', type: 'string', visible: true, mapping: 'sector.sectorName'},
        {name: 'workShopName', type: 'string', visible: true},
        {name: 'workShopAcronym', type: 'string', visible: true}
    ],

    idProperty: 'idWorkShop'
});