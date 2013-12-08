/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WellGroup.UpdateWellGroup', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateWellGroup',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Edit Well Group',
    modal: true,
    width: 400,
    
    messages: {
        msgWellGroupName: 'Well Group',
        msgId: 'Id'
    },
    
    initComponent: function(){
        var me = this;
        me.formOptions = {
            bodyPadding: 5,
            fieldDefaults: {
                fieldStyle: {
                    textTransform: 'uppercase'
                }
            },
            items: [
                {
                    xtype: 'textfield',
                    name : 'idWellGroup',
                    fieldLabel: me.messages.msgId,
                    hidden:true  
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'wellGroupName',
                    fieldLabel: me.messages.msgWellGroupName,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100,
                    margins: '5 5 0 5'
                }
            ]
        };
        me.callParent(arguments);
    }
});