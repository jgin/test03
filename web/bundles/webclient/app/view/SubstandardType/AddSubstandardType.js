Ext.define('sisprod.view.SubstandardType.AddSubstandardType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addSubstandardType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        substandardTypeNameLabel: 'Name',
        substandardTypeAcronymLabel: 'Acronym'
    },
    title: 'Add Substandard Type',
    modal: true,
    width: 400,
    initComponent: function() {
        var me = this;
        me.formOptions = {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'substandardTypeName',
                    id: 'substandardTypeName',
                    fieldLabel: me.messages.substandardTypeNameLabel,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'substandardTypeAcronym',
                    id: 'substandardTypeAcronym',
                    fieldLabel: me.messages.substandardTypeAcronymLabel,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 5
                }
            ]
        };
        me.callParent(arguments);
    }
});