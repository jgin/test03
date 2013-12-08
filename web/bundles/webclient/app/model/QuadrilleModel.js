Ext.define('sisprod.model.QuadrilleModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idQuadrille', type: 'int', visible: false},
        {name: 'workShop.idWorkShop', type: 'int', visible: false, mapping: 'workShop.idWorkShop'},
        {name: 'workShop.workShopName', type: 'string', visible: true, mapping: 'workShop.workShopName'},
        {name: 'quadrilleName', type: 'string', visible: true},
        {name: 'quadrilleAcronym', type: 'string', visible: true},
        {name: 'numberOfMembers', type: 'int', visible: true}
    ],

    idProperty: 'idQuadrille'
});