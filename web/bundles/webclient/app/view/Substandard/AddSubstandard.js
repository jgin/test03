Ext.define('sisprod.view.Substandard.AddSubstandard', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addSubstandard',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        substandardNameLabel: 'Name',
        substandardAcronymLabel: 'Acronym',
        substandardTypeLabel: 'Type'
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
                    xtype: 'combofieldcontainer',
                    anchor: '100%',
                    name: 'idSubstandardType',
                    comboBoxOptions: {
                        xtype: 'combobox',
                        anchor: '100%',
                        fieldLabel: me.messages.substandardTypeLabel,
                        store: Ext.create('sisprod.store.SubstandardTypeAll').load(),
                        displayField: 'substandardTypeName',
                        valueField: 'idSubstandardType',
                        name: 'idSubstandardType',
                        id: 'idSubstandardType',
                        forceSelection: true,
                        allowBlank: false,
                        editable: false,
                        width: 335
                    }
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'substandardName',
                    id: 'substandardName',
                    fieldLabel: me.messages.substandardNameLabel,
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
                    name: 'substandardAcronym',
                    id: 'substandardAcronym',
                    fieldLabel: me.messages.substandardAcronymLabel,
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