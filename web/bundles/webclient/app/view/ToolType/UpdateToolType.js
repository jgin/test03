/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.ToolType.UpdateToolType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateToolType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        toolTypeNameLabel:'Name',
        toolTypeAcronymLabel:'Acronym'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Tool Type',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idToolType'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'toolTypeName',
                fieldLabel:me.messages.toolTypeNameLabel,
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