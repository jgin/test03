/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.DeferredProductionType.UpdateDeferredProductionType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateDeferredProductionType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoMappingOptions: {
        autoMapping: false
    },
    messages:{
            deferredProductionTypeNameLabel:'Name'
    },
    title: 'Update Deferred Production Type',
    width: 400,
    initComponent:function(){
        var me =this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idDeferredProductionType'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'deferredProductionTypeName',
                fieldLabel:me.messages.deferredProductionTypeNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 100
            }
        ]
        }
        me.callParent(arguments)
    }
});