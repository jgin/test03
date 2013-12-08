Ext.define('sisprod.model.SdpActivityModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idSdpActivity', type: 'int', visible: false}, 
        {name: 'sdpActivityName', type: 'string', visible: true}
    ],

    idProperty: 'idSdpActivity'
});