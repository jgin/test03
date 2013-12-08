/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.GasTargetType.UpdateGasTargetType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateGasTargetType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        gasTargetTypeNameLabel:'Name'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    
    title: 'Update Gas Target Type',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idGasTargetType'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'gasTargetTypeName',
                fieldLabel: me.messages.gasTargetTypeNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 255
            }
        ]
        };
        me.callParent(arguments);
    }
});