Ext.define('sisprod.controller.ChemicalTreatmentGoalController', {
    extend: 'sisprod.controller.Base',
    models: ['ChemicalTreatmentGoalModel'],
    stores: ['ChemicalTreatmentGoalStore'],
    entityName: 'ChemicalTreatmentGoal',
    refs: [{ref: 'listChemicalTreatmentGoal', selector: 'listChemicalTreatmentGoal'}],
    views: ['ChemicalTreatmentGoal.ListChemicalTreatmentGoal'],
    requires: [
        'sisprod.store.ChemicalTreatmentGoalStore'
    ],
    deleteOptions: {
        deleteKeys: ['idChemicalTreatmentGoal'],
        caption: function(data) {
            return data['chemicalTreatmentGoalName'];
        }
    },
    init: function() {
        this.control({
            'listChemicalTreatmentGoal button[action=activate]': {
                click: this.activate
            },
            'listChemicalTreatmentGoal button[action=add]': {
                click: this.showAdd
            },
            'listChemicalTreatmentGoal button[action=update]': {
                click: this.showUpdateOnButton
            },
            'listChemicalTreatmentGoal dataview': {
                itemblclick: this.showUpdate
            },
            'listChemicalTreatmentGoal button[action=delete]': {
                click: this.destroy
            },
            'listChemicalTreatmentGoal button[action=print]': {
                click: this.showPrint
            },
//            'basePrintWindow button[action=print]': {
//                click: this.onPrint
//            },
            'addChemicalTreatmentGoal button[action=save]': {
                click: this.saveEntity
            },
            'updateChemicalTreatmentGoal button[action=save]': {
                click: this.saveEntity
            }
        });
        this.callParent(arguments);
    },
    getGridForEntity: function() {
        var tabGrid = this.getListChemicalTreatmentGoal();
        return tabGrid.getGridPanel();
    }
});