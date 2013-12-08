/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.EmployeeController', {
   extend: 'sisprod.controller.Base',
   stores : ['EmployeeStore'],
   models : ['EmployeeModel'],
   entityName: 'Employee',
   refs: [{ref: 'listEmployee', selector: 'listEmployee'}],
   views : ['Employee.ListEmployee'],
   
   requires: [
       'sisprod.store.EmployeeStore'
   ],
   messages:{
       msgEmployeeExist: 'employee already registered!!'
   },
   deleteOptions: {
       deleteKeys: ['idEmployee'],
       caption: function(data){ 
               return data['person'].personName;
       }
   },
   
   init : function(){
        this.control({
           'listEmployee button[action=add]':{
               click: this.showAdd
           },
           'listEmployee button[action=activate]':{
               click: this.activate
           },
           'listEmployee button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listEmployee dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listEmployee button[action=delete]': {
               click: this.destroy
           },
           
           'listEmployee button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addEmployee button[action=save]': {
               click: this.saveEntity
           },
           
           'updateEmployee button[action=save]': {
               click: this.saveEntity
           },
           'listEmployee button[action=importEmployee]': {
               click: this.importEmployee
           },
           'addEmployee combobox[id=cboDocumentNumber]': {
               select: this.onSelectDocumentNumber
           },
           'addEmployee combobox[id=documentTypeName]': {
               select: this.onSelectDocumentType
           },
           'addEmployee':{
               afterrender: this.showInitialCompany
           }
//           'updateEmployee':{
//               afterrender: this.showInitialCompany
//           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListEmployee();
        return tabGrid.getGridPanel();
    },
    
    autoMappingFunction: function(grid, form, record){
        var me = this;
        var formPanel = form.down('form');
        formPanel.loadRecord(record);
        var cmbEmployeeType = formPanel.query("[name=idDocumentType]")[0];
        var cmbDependency = formPanel.query("[name=dependency.idDependency]")[0];
        var cmbPosition = formPanel.query("[name=position.idPosition]")[0];
        var cmbDocumentNumber = formPanel.query("[name=documentNumber]")[0];
        var cmbBloodGroup = formPanel.query("[name=idBloodGroup]")[0];
        var idDocumentType = record.raw.person.documentType.idDocumentType;
        cmbEmployeeType.getStore().load({
            scope: this,
            callback: function(records, operation, success){
                cmbEmployeeType.select(idDocumentType);
            }
        });
        var idDependency = 0;
        if(record.raw.dependency!=null){
            idDependency = record.raw.dependency.idDependency;
        }
        cmbDependency.getStore().load({
            scope: this,
            callback: function(records, operation, success){
                cmbDependency.select(idDependency);
            }
        });
        var idPosition = 0;
        if(record.raw.position!=null){
            idPosition = record.raw.position.idPosition;
        }
        cmbPosition.getStore().load({
            scope: this,
            callback: function(records, operation, success){
                cmbPosition.select(idPosition);
            }
        });
        if(record.raw.person.documentNumber!=null){
            cmbDocumentNumber.setValue(new Ext.create(sisprod.getApplication().getModelName('Person'),{
                idDocumentType: record.raw.person.documentType.idDocumentType,
                documentNumber: record.raw.person.documentNumber
            }));
        }
        if(record.raw.defEntity!=null){
            Ext.getCmp("company").setValue(record.raw.defEntity.entityName);
        }
        var idBloodGroup = 0;
        if(record.raw.person.bloodGroup!=null){
            idBloodGroup = record.raw.person.bloodGroup.idBloodGroup;
            cmbBloodGroup.getStore().load({
                scope: this,
                callback: function(records, operation, success){
                    cmbBloodGroup.select(idBloodGroup);
                    }
            });
        }
        
        Ext.getCmp('idPerson').setValue(record.raw.person.idPerson);
        Ext.getCmp("entityIdCompany").setValue(record.raw.defEntity.entityId);
        Ext.getCmp("entityId").setValue(record.raw.person.defEntity.entityId);
        Ext.getCmp("email").setValue(record.raw.person.defEntity.email);
        Ext.getCmp("paternalSurname").setValue(record.raw.person.paternalSurname);
        Ext.getCmp("maternalSurname").setValue(record.raw.person.maternalSurname);
        Ext.getCmp("personName").setValue(record.raw.person.personName);
        
        var GMPEntity = this.getGMPEntity();
        if(record.raw.defEntity.entityId!=GMPEntity){
            cmbEmployeeType.readOnly = true;
            cmbEmployeeType.allowBlank = true;
            cmbDependency.readOnly = true;
            cmbDependency.allowBlank = true;
            cmbPosition.readOnly = true;
            cmbPosition.allowBlank = true;
            Ext.getCmp("email").readOnly = true;
            Ext.getCmp("address").readOnly = true;
            Ext.getCmp("phone").readOnly = true;
            Ext.getCmp("paternalSurname").readOnly = true;
            Ext.getCmp("paternalSurname").allowBlank = true;
            Ext.getCmp("maternalSurname").readOnly = true;
            Ext.getCmp("personName").readOnly = true;
            Ext.getCmp("personName").allowBlank = true;
            cmbDocumentNumber.readOnly = true;
            cmbDocumentNumber.allowBlank = true;
            cmbBloodGroup.readOnly = true;
            Ext.getCmp("saveEmployee").hide();
        }
//        me.showInitialCompany;
    }, 
    importEmployee : function(button){
        var me = this;
        Ext.BaseAjax.request({
            url: 'rest/employee/importExternalEmployee.htm',
            method: 'GET',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);                
                if(objResponse.success == true){
                    showAlertMessage(objResponse.message);
                    var grid =me.getGridForEntity();
                    var store = grid.getStore();
                    store.reload();
                } else {                    
                    showAlertMessage(objResponse.message);    
                }
            }
        });
    },
    onSelectDocumentType: function(combo, selectedRecords, eOpts) { 
        var cboDocumenNumber = Ext.getCmp('cboDocumentNumber'); 
        cboDocumenNumber.clearValue();
        cboDocumenNumber.getStore().reload();
    },
    onSelectDocumentNumber: function(combo, selectedRecords, eOpts) { 
//        var idPerson = selectedRecords[0].data.idPerson;
        var me = this;
        var cboDocumentType = Ext.getCmp('idDocumentType'); 
        var paternalSurname = Ext.getCmp('paternalSurname'); 
        var maternalSurname = Ext.getCmp('maternalSurname'); 
        var personName = Ext.getCmp('personName'); 
        var address = Ext.getCmp('address'); 
        var email = Ext.getCmp('email'); 
        var phone = Ext.getCmp('phone'); 
        var idDocumentType = cboDocumentType.getValue();
        var documentNumber = selectedRecords[0].data.documentNumber;
        
        Ext.BaseAjax.request({
            url: 'rest/employee/getEmployee.htm',
            method: 'POST',
            params: {idDocumentType: idDocumentType, documentNumber: documentNumber},
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                    if(objResponse.isEmployee === false){
                        paternalSurname.setValue(objResponse.data.paternalSurname);
                        maternalSurname.setValue(objResponse.data.maternalSurname);
                        personName.setValue(objResponse.data.personName);
                        address.setValue(objResponse.data.defEntity.address);
                        email.setValue(objResponse.data.defEntity.email);
                        phone.setValue(objResponse.data.defEntity.phone);
                        Ext.getCmp('idPerson').setValue(objResponse.data.idPerson);
                    }else{
                        showAlertMessage(me.messages.msgEmployeeExist);
                        var cboDocumenNumber = Ext.getCmp('cboDocumentNumber'); 
                        cboDocumenNumber.clearValue();
                        paternalSurname.setValue('');
                        maternalSurname.setValue('');
                        personName.setValue('');
                        address.setValue('');
                        email.setValue('');
                        phone.setValue('');
                        Ext.getCmp('idPerson').setValue('');
                    }
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){
            }
        });
    },
    showInitialCompany: function (win) {
        var me=this;
        Ext.BaseAjax.request({
            url: 'rest/configParam/getGMPEntity.htm',
            method: 'POST',
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                    Ext.getCmp("company").setValue(objResponse.defEntity.entityName);
                    Ext.getCmp("entityIdCompany").setValue(objResponse.defEntity.entityId);
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            },
            failure: function(response, options){
            }
        });
        
    },
    getGMPEntity:function(){
        var me = this;
        var entityId=0;
        Ext.BaseAjax.request({
            url: 'rest/configParam/getGMPEntity.htm',
            method: 'POST',
            async:false,
            success: function(response, options){
                var responseData = Ext.decode(response.responseText);
                if(responseData.success){
                    entityId=responseData.defEntity.entityId;
                }      
            }
        });
        return entityId;
    }
});

