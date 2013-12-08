Ext.define('sisprod.model.PositionModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idPosition', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'externalId', type: 'int', visible: false},
        {name: 'positionName', type: 'string', visible: true}        
    ],

    idProperty: 'idPosition'
});