Ext.define('sisprod.model.WellServiceTypeModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWellServiceType', type: 'int', visible: false}, 
        {name: 'wellServiceTypeName', type: 'string', visible: true},
        {name: 'wellServiceTypeAcronym', type: 'string', visible: true}
    ],

    idProperty: 'idWellServiceType'
});