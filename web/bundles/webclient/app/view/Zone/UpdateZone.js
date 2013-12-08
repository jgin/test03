/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Zone.UpdateZone', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateZone',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        zoneLabel: 'Zone',
        lotLabel: 'Lot'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    
    title: 'Update Zone',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idZone'
                },
                {
                xtype: 'textfield',
                grow: true,
                name: 'zoneName',
                fieldLabel:me.messages.zoneLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
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
       };
       me.callParent(arguments);
    }    
});