/* 
 * To change this template, choose Users | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SdpReason.UpdateSdpReason', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateSdpReason',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        sdpReasonNameLabel:'Name',
        sdpReasonAcronymLabel:'Acronym'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Service Reason',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idSdpReason'
            },
            {
            xtype: 'textfield',
            grow: true,
            name: 'sdpReasonName',
            fieldLabel:me.messages.sdpReasonNameLabel,
            fieldStyle: {
                textTransform: 'uppercase'
            },
            anchor: '100%',
            allowBlank: false,
            maxLength: 150
            },
            {
            xtype: 'textfield',
            grow: true,
            name: 'sdpReasonAcronym',
            fieldLabel:me.messages.sdpReasonAcronymLabel,
            fieldStyle: {
                textTransform: 'uppercase'
            },
            anchor: '100%',
            allowBlank: false,
            maxLength: 20
            }
        ]
        };
        me.callParent(arguments);
    }
});