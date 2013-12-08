Ext.define('sisprod.model.SdpFileModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idSdpFile', type: 'int', visible: false}, 
        {name: 'fileName', type: 'string', visible: true},
        {name: 'wellService.idSdp', type: 'int', visible: false,mapping:'wellService.idSdp'},
        {name: 'dateActivity', type: 'string', dateFormat: 'Y-m-d', visible: true}        
    ],

    idProperty: 'idSdpFile'
});