Ext.define('sisprod.view.ChemicalTreatmentGoal.AddChemicalTreatmentGoal', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addChemicalTreatmentGoal',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        chemicalTreatmentGoalAcronymLabel: 'Acronym',
        chemicalTreatmentGoalNameLabel: 'Name'
    },
    title: 'Add Chemical Treatment Goal',
    modale: true,
    width: 400,
    initComponent: function() {
        var me = this;
        me.formOptions = {
            bodyPadding: 2,
            fieldDefaults: {
                labelWidth: 120
            },
            items: [
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'chemicalTreatmentGoalName',
                    fieldLabel: me.messages.chemicalTreatmentGoalNameLabel,
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
                    name: 'chemicalTreatmentGoalAcronym',
                    fieldLabel: me.messages.chemicalTreatmentGoalAcronymLabel,
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