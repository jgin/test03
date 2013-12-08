Ext.define('sisprod.view.ChemicalTreatmentGoal.ListChemicalTreatmentGoal', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listChemicalTreatmentGoal',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   options: {},
   messages: {
       idChemicalTreatmentGoal: 'Chemical Treatment Goal ID',
       chemicalTreatmentGoalAcronym: 'Acronym',
       chemicalTreatmentGoalName: 'Name'
   },
   entityName: '',
   title: '',
   listTitle: 'Chemical Treatment Goal List',
   gridOptions: {
       region: 'center'
   },
   initComponent: function() {
       var me= this;
       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
       me.gridOptions = {
           title: me.listTitle,
           entityName: me.entityName,
           autoGenerationOptions: {
               model: modelName,
               autoGenerateColumns: true,
               columnOptions: {
                   idChemicalTreatmentGoal: {header: me.messages.idChemicalTreatmentGoal},
                   chemicalTreatmentGoalAcronym: {header: me.messages.chemicalTreatmentGoalAcronym},
                   chemicalTreatmentGoalName: {header: me.messages.chemicalTreatmentGoalName}
               }
           },
           region: 'center',
           store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
});