/* 
 * To change this template, choose Users | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.UnperformedReason.UpdateUnperformedReason', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateUnperformedReason',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        unperformedReasonNameLabel:'Name',
        unperformedReasonCodeLabel:'Code'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Unperformed Reason',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idUnperformedReason'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'unperformedReasonCode',
                fieldLabel:me.messages.unperformedReasonCodeLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '50%',
                allowBlank: false,
                maxLength: 10
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'unperformedReasonName',
                fieldLabel:me.messages.unperformedReasonNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 100
            }
        ]
        }
        me.callParent(arguments);
    }
});