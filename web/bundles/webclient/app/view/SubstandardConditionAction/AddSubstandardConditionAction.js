

Ext.define('sisprod.view.SubstandardConditionAction.AddSubstandardConditionAction', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addSubstandardConditionAction',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        substandardConditionActionDescriptionLabel:'Description'
    },
    title: 'Add Substandard Condition Action',
    modal: true,
    width: 400,
    initComponent:function(){
        var me= this;
        me.formOptions= {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 120
        },
        items: [
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