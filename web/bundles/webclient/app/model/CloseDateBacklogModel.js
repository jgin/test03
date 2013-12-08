Ext.define('sisprod.model.CloseDateBacklogModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idCloseDateBacklog', type: 'int'},
        {name: 'closeDateYear', type: 'int'},
        {name: 'closeDateMonth', type: 'int'},
        {name: 'closeDate', type: 'string'}
    ],

    idProperty: 'idCloseDateBacklog'
});