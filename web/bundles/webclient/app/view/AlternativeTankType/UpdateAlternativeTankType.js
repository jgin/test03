/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.AlternativeTankType.UpdateAlternativeTankType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateAlternativeTankType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoMappingOptions: {
        autoMapping: false
    },
    messages:{
        alternativeTankTypeNameLabel:"Name",
        alternativeTankTypeAcronymLabel:"Acronym"
    },
    
    title: 'Update Alternative Tank Type',
    modal: true,
    width: 400,
    initComponent:function(){
        var me= this;
        me.formOptions= {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idAlternativeTankType'
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'alternativeTankTypeName',
                    fieldLabel:me.messages.alternativeTankTypeNameLabel,
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
                    name: 'alternativeTankTypeAcronym',
                    fieldLabel: me.messages.alternativeTankTypeAcronymLabel,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 10
                }
            ]
        };
        me.callParent(arguments);
    }
});