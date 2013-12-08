Ext.define('sisprod.model.SubstandardConditionActionModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idSubstandardConditionAction', type: 'int', visible: false}, 
        {name: 'description', type: 'string', visible: true}
    ],

    idProperty: 'idSubstandardConditionAction'
});