/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.EquipmentCondition.UpdateEquipmentCondition', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateEquipmentCondition',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        equipmentConditionNameLabel:'Equipment Condition',
        equipmentConditionAcronymLabel:'Acronym'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    
    initComponent:function(){
        var me = this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idEquipmentCondition'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'equipmentConditionName',
                fieldLabel: me.messages.equipmentConditionNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 50
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'equipmentConditionAcronym',
                fieldLabel: me.messages.equipmentConditionAcronymLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 5
            }
        ]
        }
        me.callParent(arguments);
    },
    
    title: 'Update Equipment Condition',
    modal: true,
    width: 400
});