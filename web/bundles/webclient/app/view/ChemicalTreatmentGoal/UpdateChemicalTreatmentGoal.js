Ext.define('sisprod.view.ChemicalTreatmentGoal.UpdateChemicalTreatmentGoal', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateChemicalTreatmentGoal',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        chemicalTreatmentGoalAcronymLabel: 'Acronym',
        chemicalTreatmentGoalNameLabel: 'Name'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Chemical Treatment Goal',
    model: true,
    width: 400,
    initComponent: function() {
        var me= this;
        me.formOptions = {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idChemicalTreatmentGoal'
                },
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
