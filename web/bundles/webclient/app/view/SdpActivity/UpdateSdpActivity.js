/* 
 * To change this template, choose Users | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SdpActivity.UpdateSdpActivity', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateSdpActivity',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        sdpActivityNameLabel:'Name'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Well Service Activity',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idSdpActivity'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'sdpActivityName',
                fieldLabel:me.messages.sdpActivityNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 150
            }
        ]
        };
        me.callParent(arguments);
    }
});