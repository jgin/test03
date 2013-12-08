/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.HsseSupervisorController', {
   extend: 'sisprod.controller.Base',
   stores : ['HsseSupervisorStore'],
   models : ['HsseSupervisorModel'],
   entityName: 'HsseSupervisor',
   refs: [{ref: 'listHsseSupervisor', selector: 'listHsseSupervisor'}],
   views : ['HsseSupervisor.ListHsseSupervisor'],
   
   requires: [
       'sisprod.store.HsseSupervisorStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idHsseSupervisor'],
       caption: function(data){
           var message = Ext.String.format("{0} ({1} - {2})", data["employee"]["person"]["personFullName"], 
                data["employee"]["person"]["documentType"]["documentTypeAcronym"],
                data["employee"]["person"]["documentNumber"]);
           return message;
       }
   },
   
   init : function(){
        this.control({
           'listHsseSupervisor button[action=activate]':{
               click: this.activate
           },
            
           'listHsseSupervisor button[action=add]':{
               click: this.showAdd
           },
           
           'listHsseSupervisor button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listHsseSupervisor dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listHsseSupervisor button[action=delete]': {
               click: this.destroy
           },
           
           'listHsseSupervisor button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addHsseSupervisor button[action=save]': {
               click: this.saveEntity
           },
           
           'updateHsseSupervisor button[action=save]': {
               click: this.saveEntity
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListHsseSupervisor();
        return tabGrid.getGridPanel();
    },
            
    autoMappingFunction: function(grid, window, record){
        var me = this;
        var formPanel = window.down('form');
        var data = record.raw;
        var idHsseSupervisorInput = formPanel.queryById('idHsseSupervisor');
        idHsseSupervisorInput.setValue(data.idHsseSupervisor);
        var employeeInput = formPanel.queryById('idEmployee');
        employeeInput.setValue(new Ext.create(sisprod.getApplication().getModelName('EmployeeTemp'),{
            idEmployee: data.employee.idEmployee,
            personFullName: data.employee.person.personFullName,
            fullDocumentNumber: data.employee.person.fullDocumentNumber
        }));
    }
});

