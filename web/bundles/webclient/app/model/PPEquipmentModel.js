Ext.define('sisprod.model.PPEquipmentModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idPPEquipment', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'description', type: 'string', visible: true},
        {name: 'isTool', type: 'boolean', visible: true}
    ],

    idProperty: 'idPPEquipment'
});