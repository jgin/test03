Ext.define('sisprod.store.CompletionDiagramByWell', {
    extend: 'Ext.data.Store',
    model: 'sisprod.model.CompletionDiagramModel',

    require: [
        'Ext.data.Store', 
        'sisprod.model.CompletionDiagramModel'
    ],

    proxy:{
        type: 'ajax',
        
        actionMethods: {
            read: 'GET'
        },
        
        api: {
            read: 'rest/completionDiagram/listByWell.htm'
        },

        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'idCompletionDiagram',
            totalProperty: 'total',
            messageProperty: 'message'
        }
    }
});