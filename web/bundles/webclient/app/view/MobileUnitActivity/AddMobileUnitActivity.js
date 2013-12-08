Ext.define('sisprod.view.MobileUnitActivity.AddMobileUnitActivity', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addMobileUnitActivity',
    require: [
        'sisprod.view.base.BaseDataWindow',
        'sisprod.view.base.SensitiveComboBox'
    ],
    messages: {
        mobileUnitActivityAcronymLabel: 'Acronym',
        mobileUnitActivityNameLabel: 'Name',
        isOperativeTimeLabel: 'Is Operative Time'
    },
    title: 'Add Mobile Unit Activity',
    modal: true,
    width: 350,
    initComponent: function() {
        var me = this;
        me.formOptions = {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'mobileUnitActivityName',
                    id: 'mobileUnitActivityName',
                    fieldLabel: me.messages.mobileUnitActivityNameLabel,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    labelWidth: 120,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 200
                },{
                    xtype: 'textfield',
                    grow: true,
                    name: 'mobileUnitActivityAcronym',
                    id: 'mobileUnitActivityAcronym',
                    fieldLabel: me.messages.mobileUnitActivityAcronymLabel,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    labelWidth: 120,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100
                },
                {
                    xtype: 'checkbox',
                    grow: true,
                    name: 'isOperativeTime',
                    id: 'isOperativeTime',
                    fieldLabel: me.messages.isOperativeTimeLabel,
                    labelWidth: 120,
                    anchor: '100%'
                }
            ]
        };
        me.callParent(arguments);
    }
});