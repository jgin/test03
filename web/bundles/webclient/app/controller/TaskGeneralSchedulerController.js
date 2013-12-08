/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.TaskGeneralSchedulerController', {
   extend: 'sisprod.controller.Base',
   stores : ['TaskGeneralSchedulerStore'],
   models : ['TaskGeneralSchedulerModel'],
   entityName: 'TaskGeneralScheduler',
   refs: [{ref: 'listTaskGeneralScheduler', selector: 'listTaskGeneralScheduler'}],
   views : ['TaskGeneralScheduler.ListTaskGeneralScheduler'],
   
   requires: [
       'sisprod.store.TaskGeneralSchedulerStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idTaskGeneralScheduler'],
       caption: function(data){
           var message = Ext.String.format("{0} ({1} - {2})", data["employee"]["person"]["personFullName"], 
                data["employee"]["person"]["documentType"]["documentTypeAcronym"],
                data["employee"]["person"]["documentNumber"]);
           return message;
       }
   },
   
   init : function(){
        this.control({
           'listTaskGeneralScheduler button[action=activate]':{
               click: this.activate
           },
            
           'listTaskGeneralScheduler button[action=add]':{
               click: this.showAdd
           },
           
           'listTaskGeneralScheduler button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listTaskGeneralScheduler dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listTaskGeneralScheduler button[action=delete]': {
               click: this.destroy
           },
           
           'listTaskGeneralScheduler button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addTaskGeneralScheduler button[action=save]': {
               click: this.saveEntity
           },
           
           'updateTaskGeneralScheduler button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListTaskGeneralScheduler();
        return tabGrid.getGridPanel();
    },
            
    autoMappingFunction: function(grid, window, record){
        var me = this;
        var formPanel = window.down('form');
        var data = record.raw;
        var idTaskGeneralSchedulerInput = formPanel.queryById('idTaskGeneralScheduler');
        idTaskGeneralSchedulerInput.setValue(data.idTaskGeneralScheduler);
        var employeeInput = formPanel.queryById('idEmployee');
        employeeInput.setValue(new Ext.create(sisprod.getApplication().getModelName('EmployeeTemp'),{
            idEmployee: data.employee.idEmployee,
            personFullName: data.employee.person.personFullName,
            fullDocumentNumber: data.employee.person.fullDocumentNumber
        }));
    }
});

