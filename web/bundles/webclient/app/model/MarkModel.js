Ext.define('sisprod.model.MarkModel', {
    extend: 'Ext.data.Model',

    require: [
        'Ext.data.Model'
    ],

    fields:[
        {name: 'idMark', type: 'int', visible: false}, // Ext.data.Types.FLOAT
        {name: 'markName', type: 'string', visible: true}
    ],

    idProperty: 'idMark'
});