Ext.define('sisprod.model.CompletionDiagramModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idCompletionDiagram', type: 'int', visible: false},
        {name: 'fileName', type: 'string', visible: true},
        {name: 'effectiveDate', type: 'date', dateFormat: 'Y-m-d', visible: false,mapping:'effectiveDate'},
        {name: 'well.idWell', type: 'int', visible: false,mapping:'well.idWell'}        
    ],

    idProperty: 'idCompletionDiagram'
});