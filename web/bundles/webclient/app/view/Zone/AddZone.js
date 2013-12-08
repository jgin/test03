

Ext.define('sisprod.view.Zone.AddZone', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias:'widget.addZone',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Zone',
    modal: true,
    width: 400,
//    height: 150,
    messages: {
        zoneLabel: 'Zone',
        lotLabel: 'Lot'
    },
    initComponent:function(){
        var me =this;
        me. formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'zoneName',
                fieldLabel:me.messages.zoneLabel,
                anchor: '100%',
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                allowBlank: false,
                maxLength: 150
            },
            {
                xtype: 'combobox',
                anchor: '100%',             
                fieldLabel :me.messages.lotLabel,
                store : Ext.create('sisprod.store.LotAll').load(),
                displayField : 'lotName',
                valueField : 'idLot',
                name:'lot.idLot',
                width : 150,
                forceSelection : true,
                allowBlank : false,
                editable : false
            }
        ]
        }
        me.callParent(arguments)
    }
});