Ext.define('sisprod.model.DependencyModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idDependency', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'externalId', type: 'int', visible: false},
        {name: 'dependencyName', type: 'string', visible: true},
        {name: 'dependencyAcronym', type: 'string', visible: true},
        {name: 'dependencyParent.idDependency', type: 'int', visible: false, mapping:'dependencyParent.idDependency'},
        {name: 'dependencyParent.dependencyName', type: 'string', visible: true, mapping:'dependencyParent.dependencyName'},
        {name: 'dependencyLevel.idDependencylevel', type: 'int', visible: false, mapping:'dependencyLevel.idDependencyLevel'},
        {name: 'dependencyLevel.dependencyLevelName', type: 'string', visible: true, mapping:'dependencyLevel.dependencyLevelName'}
    ],

    idProperty: 'idDependency'
});