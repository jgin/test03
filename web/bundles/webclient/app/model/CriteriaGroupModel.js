Ext.define('sisprod.model.CriteriaGroupModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idCriteriaGroup', type: 'int', visible: false},
        {name: 'criteriaGroupName', type: 'string', visible: true},
        {name: 'criteriaGroupOrder', type: 'int', visible: true}
    ],

    idProperty: 'idCriteriaGroup'
});