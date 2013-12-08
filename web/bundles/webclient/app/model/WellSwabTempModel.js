Ext.define('sisprod.model.WellSwabTempModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWell', type: 'int', visible: false},
        {name: 'wellName', type: 'string', visible: true}
    ],

    idProperty: 'idWell'
});