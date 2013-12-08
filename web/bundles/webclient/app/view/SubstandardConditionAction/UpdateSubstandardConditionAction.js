/* 
 * To change this template, choose Users | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SubstandardConditionAction.UpdateSubstandardConditionAction', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateSubstandardConditionAction',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        substandardConditionActionDescriptionLabel:'Description'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Substandard Condition Action',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idSubstandardConditionAction'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'description',
                fieldLabel:me.messages.substandardConditionActionDescriptionLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 100
            }
        ]
        };
        me.callParent(arguments);
    }
});