Ext.define('sisprod.model.WorkRequestReferenceFileModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idWorkRequestReferenceFile', type: 'int', visible: false},
        {name: 'fileName', type: 'string', visible: true},
        {name: 'workRequest.idWorkRequest', type: 'int', visible: false,mapping:'workRequest.idWorkRequest'}        
    ],

    idProperty: 'idWorkRequestReferenceFile'
});