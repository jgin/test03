Ext.define('sisprod.model.UnperformedReasonModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idUnperformedReason', type: 'int', visible: false}, 
        {name: 'unperformedReasonCode', type: 'string', visible: true},
        {name: 'unperformedReasonName', type: 'string', visible: true}
    ],

    idProperty: 'idUnperformedReason'
});