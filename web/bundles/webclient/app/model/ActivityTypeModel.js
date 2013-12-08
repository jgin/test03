Ext.define('sisprod.model.ActivityTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idActivityType', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'activityTypeName', type: 'string', visible: true}
    ],

    idProperty: 'idActivityType'
});