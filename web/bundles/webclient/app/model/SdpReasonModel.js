Ext.define('sisprod.model.SdpReasonModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idSdpReason', type: 'int', visible: false}, 
        {name: 'sdpReasonName', type: 'string', visible: true},
        {name: 'sdpReasonAcronym', type: 'string', visible: true}
    ],

    idProperty: 'idSdpReason'
});