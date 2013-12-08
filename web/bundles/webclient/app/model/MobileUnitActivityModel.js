Ext.define('sisprod.model.MobileUnitActivityModel', {
    extend: 'Ext.data.Model',
    require: [
        'Ext.data.Model'
    ],
    fields: [
        {name: 'idMobileUnitActivity', type: 'int', visible: false},
        {name: 'mobileUnitActivityAcronym', type: 'string', visible: true},
        {name: 'mobileUnitActivityName', type: 'string', visible: true},
        {name: 'isOperativeTime', type: 'boolean', visible: true}
    ],
    idProperty: 'idMobileUnitActivity'
});