Ext.define('sisprod.model.DependencyLevelModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idDependencyLevel', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'externalId', type: 'int', visible: false},
        {name: 'dependencyLevelName', type: 'string', visible: true}        
    ],

    idProperty: 'idDependencyLevel'
});