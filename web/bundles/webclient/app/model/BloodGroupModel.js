Ext.define('sisprod.model.BloodGroupModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idBloodGroup', type: 'int', visible: false},
        {name: 'bloodGroupName', type: 'string', visible: true}
    ],

    idProperty: 'idBloodGroup'
});