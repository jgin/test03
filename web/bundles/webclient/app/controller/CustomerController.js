/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.CustomerController', {
   extend: 'sisprod.controller.Base',
   stores : ['CustomerStore'],
   models : ['CustomerModel'],
   entityName: 'Customer',
   refs: [{ref: 'listCustomer', selector: 'listCustomer'},{ref: 'addCustomer', selector: 'addCustomer'}],
   views : ['Customer.ListCustomer'],
   idPerson:null,
   idCompany:null,
   requires: [
       'sisprod.store.CustomerStore'
   ],
   messages:{
        customerAlreadyRegisterError:'There is a customer registered with this RUC',
        customerAlreadyRegisterAndInactiveError:'There is a customer registered with this RUC, Inactive customer',
        noValidRuc:'Wrong Ruc Format',
        rucAlreadyRegister:'Ruc Already Register',
        wrongFormatError :'Check the file to upload. We only accept the following extensions: {0}'
   }, 
   deleteOptions: {
       deleteKeys: ['idCustomer'],
       caption: function(data){ 
               return data['entity'].entityName;
       } 
   },
   
   init : function(){
        this.control({
           'listCustomer button[action=add]':{
               click: this.showAdd
           },
           
           'listCustomer button[action=update]':{
               click: this.showUpdateOnButton
           },
           'listCustomer button[action=activate]':{
               click: this.activate
           },
           
           'listCustomer dataview': {
               itemdblclick: this.showUpdate
           },
           
           'listCustomer button[action=delete]': {
               click: this.destroy
           },
           
           'listCustomer button[action=print]': {
               click: this.showPrint
           },
           
//           'basePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'addCustomer button[action=save]': {
               click: this.saveEntity
           },
           'addCustomer button[id=searchEntity]': {
               click: this.searchEntity
           },
           'addCustomer checkbox[id=isCompany]':{
                change: this.onChangeIsCompany
           },
           'updateCustomer checkbox[id=isCompany]':{
                change: this.onChangeIsCompany
           },
           
           'updateCustomer button[action=save]': {
               click: this.saveEntity
           },
           'updateCustomer filefield[id=digitalSignatureFile]': {
               change: function(input,value,opt){
//                   var digitalSignatureFile = Ext.getCmp('digitalSignatureFile');
                   this.validateFileExtension(input);
               }
           },
           'updateCustomer': {
               beforeshow: this.onbeforeshow
           }
       });
       this.callParent(arguments);
    },
            
    getGridForEntity: function(){
        var tabGrid = this.getListCustomer();
        return tabGrid.getGridPanel();
    },
    onbeforeshow: function(window, option){
        
    },
    searchEntity:function(){
        var ruc=Ext.getCmp('entityRuc');
        
        if(ruc.isValid()){
            var form = this.getAddCustomer();
            var companyData=Ext.getCmp('companyData');
            var entityData=Ext.getCmp('entityData');
            var personData=Ext.getCmp('personData');
            var isCompany=Ext.getCmp('isCompany');
            var btnSearch=Ext.getCmp('searchEntity');
            var me = this;
            Ext.BaseAjax.request({
                url: 'rest/customers/getCustomerByRuc.htm',
                method:"GET",
                async:false,
                params: {ruc: ruc.getValue()},
                success: function(response){
                    var responseText = response.responseText;
                    var jsonData = Ext.JSON.decode(responseText);
                    if(jsonData.success){
                        if(jsonData.customer.active)
                            Ext.Msg.alert('SISPROD',me.messages.customerAlreadyRegisterError);
                        else
                            Ext.Msg.alert('SISPROD',me.messages.customerAlreadyRegisterAndInactiveError);
                    }
                    else{
                        form.setWidth(625);
                        if(jsonData.entity==null){
                            personData.setVisible(true);
                            isCompany.setValue(false);
                            isCompany.setVisible(true);
                        }
                        else{
                            me.setEntityData(jsonData.entity);
                            if(jsonData.company!=null){
                                companyData.setVisible(true);
                                isCompany.setValue(true);
                                me.setCompanyData(jsonData.company);
                            }
                            if(jsonData.person!=null){
                                personData.setVisible(true);
                                isCompany.setValue(false);
                                me.setPersonData(jsonData.person);
                            } 
                        }
                        ruc.setEditable(false);
                        entityData.setVisible(true);
                        btnSearch.disable();
                        form.center();
                    }

                },
                failure: function(response){

                }
            });
        }
        else{
            Ext.Msg.alert('SISPROD',this.messages.noValidRuc);
        }
    },
    setCompanyData:function(data){
        var idCompany = Ext.getCmp('idCompany');
        var companyName = Ext.getCmp('companyName');
        idCompany.setValue(data.idCompany);
        companyName.setValue(data.companyName);
    },
    setPersonData:function(data){
        var idPerson = Ext.getCmp('idPerson');
        var personName = Ext.getCmp('personName');
        var cboBloodGroup = Ext.getCmp('cboBloodGroup');
        var cboDocumentType = Ext.getCmp('cboDocumentType');
        var documentNumber = Ext.getCmp('documentNumber');
        var paternalSurname = Ext.getCmp('paternalSurname');
        var maternalSurname = Ext.getCmp('maternalSurname');
        var digitalSignatureFile = Ext.getCmp('digitalSignatureFile');
        var digitalSignature = Ext.getCmp('digitalSignature');
        idPerson.setValue(data.idPerson);
        personName.setValue(data.personName);
        paternalSurname.setValue(data.paternalSurname);
        maternalSurname.setValue(data.maternalSurname);
        documentNumber.setValue(data.documentNumber);
        digitalSignatureFile.setRawValue(data.digitalSignature)
        digitalSignature.setValue(data.digitalSignature)
        if(data.documentType!=null)cboDocumentType.setValue(data.documentType.idDocumentType);
        if(data.bloodGroup!=null)cboBloodGroup.setValue(data.bloodGroup.idBloodGroup);        
    },
    setEntityData:function(data){
        var entityId = Ext.getCmp('entityId');
        var cboActivityType = Ext.getCmp('cboActivityType');
        var address = Ext.getCmp('address');
        var email = Ext.getCmp('email');
        var image = Ext.getCmp('image');
        var phone  = Ext.getCmp('phone');
        entityId.setValue(data.entityId);
        address.setValue(data.address);
        email.setValue(data.email);
        phone.setValue(data.phone);
        if(data.activityType!=null)cboActivityType.setValue(data.activityType.idActivityType);
    },
    autoMappingFunction: function(grid, form, record){
        var form = form.down('form');
        var me = this;
        var ruc = record.raw.entity.entityRuc;
        var isCompany = Ext.getCmp('isCompany');
        var personData = Ext.getCmp('personData');
        var companyData = Ext.getCmp('companyData');
        var idCustomer = Ext.getCmp('idCustomer');
        var inputRuc = Ext.getCmp('entityRuc');
        Ext.BaseAjax.request({
            url: 'rest/customers/getCustomerByRuc.htm',
            method:"GET",
            async:false,
            params: {ruc: ruc},
            success: function(response){
                var responseText = response.responseText;
                var jsonData = Ext.JSON.decode(responseText);
                if(jsonData.customer!=null){
                    inputRuc.setValue(ruc);
                    idCustomer.setValue(jsonData.customer.idCustomer);
                    var entity = jsonData.entity;
                    if(Ext.isDefined(entity) && entity!==null){
                        me.setEntityData(entity);
                        if(entity.isCompany){
                            me.setCompanyData(jsonData.company);
                            isCompany.setValue(true);
                            companyData.setVisible(true);
                        }
                        else{
                           me.setPersonData(jsonData.person);
                           isCompany.setValue(false);
                           personData.setVisible(true);
                        }
                    }
                }
            },
            failure: function(response){
        
            }
        });    
    },
    enablePerson:function(){
        
    },
    onChangeIsCompany: function(checkboxfield, newValue, oldValue, options){ 
        var me = this;
        var formPanel = checkboxfield.up('form');
        var window = formPanel.up('window');
        if(Ext.isDefined(formPanel) && formPanel!==undefined){
            //Datos de Compañia
            var companyName = formPanel.query('[name=companyName]')[0];
            //Datos de Persona
            var cboBloodGroup = formPanel.query('[name=cboBloodGroup]')[0];
            var cboDocumentType = formPanel.query('[name=cboDocumentType]')[0];
            var documentNumber = formPanel.query('[name=documentNumber]')[0];
            var paternalSurname = formPanel.query('[name=paternalSurname]')[0];
            var maternalSurname = formPanel.query('[name=maternalSurname]')[0];
            var personName = formPanel.query('[name=personName]')[0];
            var companyData = Ext.getCmp('companyData');
            var personData = Ext.getCmp('personData');
            if(newValue===true){
                cboDocumentType.allowBlank=true;
                cboBloodGroup.allowBlank=true;
                documentNumber.allowBlank=true;
                paternalSurname.allowBlank=true;
                maternalSurname.allowBlank=true;
                personName.allowBlank=true;
                companyName.allowBlank=false; 
                companyData.setVisible(true);
                personData.setVisible(false);
            }else{
                cboDocumentType.allowBlank=false;
                cboBloodGroup.allowBlank=false;
                documentNumber.allowBlank=false;
                paternalSurname.allowBlank=false;
                maternalSurname.allowBlank=false;
                personName.allowBlank=false;
                companyName.allowBlank=true;
                companyData.setVisible(false);
                personData.setVisible(true);
            }
        }
    },
    beforeSaveEntity:function(win, form, values){
        var isCompany=Ext.getCmp("isCompany").getValue();
        var maternalSurname=Ext.getCmp("maternalSurname").getValue();
        var paternalSurname=Ext.getCmp("paternalSurname").getValue();
        var personName=Ext.getCmp("personName").getValue();
        var companyName=Ext.getCmp("companyName").getValue();
//        var fileInput =document.getElementsByName('digitalSignatureFile')[0];
//        var digitalSignatureFile = fileInput.files[0];
        var saveEntity=true;
        if(values.entityId==""){
            values.entityId=-1;
        }
        if(values.idCompany==""){
            values.idCompany=-1;
        }
        if(values.idPerson==""){
            values.idPerson=-1;
        }
        if(isCompany){
            values.entityName=companyName;
            values.idDocumentType='';
            values.documentNumber='';
            values.paternalSurname='';
            values.personName='';
            values.maternalSurname='';
        }else{
            values.entityName=paternalSurname+' '+maternalSurname+' '+personName;
            values.companyName='';   
//            values.digitalSignatureFile=digitalSignatureFile;
        }
        var ruc=Ext.getCmp('entityRuc');
        var entityId=Ext.getCmp('entityId');
        var me = this;
        if(Ext.isDefined(entityId) && entityId!=null){
            Ext.BaseAjax.request({
                url: 'rest/customers/getEntityByRuc.htm',
                method:"GET",
                async:false,
                params: {ruc: ruc.getValue()},
                success: function(response){
                    var responseText = response.responseText;
                    var jsonData = Ext.JSON.decode(responseText);
                    if(jsonData.entity!=null){
                        if(jsonData.entity.entityId!=entityId.getValue()){
                            Ext.Msg.alert('SISPROD',me.messages.rucAlreadyRegister);
                            saveEntity=false;
                        }
                    }
                },
                failure: function(response){

                }
            });
        }
        return saveEntity;
    },
    saveEntity: function(button){
        var me = this;
        var window = button.up('window');
        var form = window.down('form');
        var singleAddition = Ext.isDefined(window.singleAddition)?window.singleAddition:false;
//        if(!form.isValid() || !me.extraValid()) return;
        if(!form.isValid()) return;
        
        var values= form.getValues();
        var store = me.getStore(sisprod.getApplication().getStoreName(me.entityName));
        var model = me.getModel(sisprod.getApplication().getModelName(me.entityName));
        var idProperty;
        if(Ext.isDefined(model.prototype) && Ext.isDefined(model.prototype.idProperty)){
            idProperty = model.prototype.idProperty;
        } else{
            Ext.Error.raise('No idProperty attribute declared in ' + model.$className +'!');
            return;
        }
        var url;
        if(values[idProperty] !== undefined && values[idProperty] > 0){
            url = store.proxy.api.update;
            if(!Ext.isDefined(url)){
                Ext.Error.raise('No proxy:{api:{update}} attribute declared in ' + store.$className +'!');
                return;
            }
        }
        else{
            url = store.proxy.api.create;
            if(!Ext.isDefined(url)){
                Ext.Error.raise('No proxy:{api:{create}} attribute declared in ' + store.$className +'!');
                return;
            }
        }
        var jsonData = {};
        if(!this.beforeSaveEntity(window, form, values, jsonData)) return;
        if (form.isValid()) {
            // Submit the Ajax request and handle the response
            form.submit({
                url: url,
                method:"POST",
                params: values,
                success: function(form, action){
                    var response=action.response.responseText;
                    response=Ext.JSON.decode(response);
                    if(response.success){
                        store.reload();
                        if(!singleAddition){
                            var selectionModel = me.getGridForEntity().getSelectionModel();
                            selectionModel.deselectAll();
                        }
                        window.close();
                    }
                },
                failure:function(){
                    Ext.Msg.alert('Error', 'Error');
                }
            });
        }
    },
    validateFileExtension:function(input) { 
            var file=input.getRawValue();
            var extentionsAllow = new Array(".gif", ".jpg", ".bmp", ".png",".jpeg"); 
            //recupero la extensión de este nombre de archivo 
            var extention = (file.substring(file.lastIndexOf("."))).toLowerCase(); 
            var allow = false; 
            for (var i = 0; i < extentionsAllow.length; i++) { 
               if (extentionsAllow[i] == extention) { 
                    allow = true; 
                    break; 
               } 
            } 
            if (!allow) { 
               Ext.Msg.alert(this.controllerMessages.alertMessage,Ext.String.format(this.messages.wrongFormatError,extentionsAllow.join()));
               input.setRawValue('');
            }
         } 
});

