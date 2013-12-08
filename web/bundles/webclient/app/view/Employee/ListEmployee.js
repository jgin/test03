/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Employee.ListEmployee', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   alias: 'widget.listEmployee',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   messages: {
       headers : {
            idEmployee: 'Employee ID', 
            idPerson : 'Person ID',
            entityName : 'Company',
            paternalSurname: 'Paternal Surname',
            maternalSurname: 'Maternal Surname',
            personName: 'Name',
            documentTypeAcronym: 'Document Type',
            documentNumber: 'Document Number',
            bloodGroupName : 'blood Group',
            dependencyName:'Dependency',
            positionName:'Position',
            email:'email',
            digitalSignature:'digitalSignature'
       }
    },
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Employees List',
   
   gridOptions: {
        region: 'center' 
    },
    
    initComponent: function(){
        var me = this;
        var storeName = sisprod.getApplication().getStoreName(me.entityName);
        var modelName = sisprod.getApplication().getModelName(me.entityName);
        me.gridOptions = {
           title: me.listTitle,
           entityName: me.entityName,
//           baseGridOptions: {
//                allowAdd: false,
//                allowUpdate: false,
//                allowDelete: false,
//                allowPrint: true  
//            },
           topBarButtons : [
                {
                    xtype: 'button',
                    iconCls: 'sync',
                    text: me.gridMessages.buttonText.importData,
                    action: 'importEmployee',
                    id: 'btnImport' + me.entityName
                }            
           ],
           autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idEmployee: {header:me.messages.headers.idEmployee},                    
                    'defEntity.entityName': {header:me.messages.headers.entityName},
                    'person.paternalSurname': {header:me.messages.headers.paternalSurname},
                    'person.maternalSurname': {header:me.messages.headers.maternalSurname},
                    'person.personName': {header:me.messages.headers.personName},
                    'person.documentType.documentTypeAcronym': {header:me.messages.headers.documentTypeAcronym},
                    'person.documentNumber': {header:me.messages.headers.documentNumber},
                    'person.bloodGroup.bloodGroupName': {header:me.messages.headers.bloodGroupName},
                    'dependency.dependencyName': {header:me.messages.headers.dependencyName},
                    'position.positionName': {header:me.messages.headers.positionName},
                    'defEntity.email': {header:me.messages.headers.email},
                    'person.idPerson': {hideable : false},
                    'person.digitalSignature': {hideable : false},
                    'person.documentType.documentTypeName': {hideable: false},
                    'person.documentType.idDocumentType': {hideable: false},
                    'address': {hideable: false},
                    'phone': {hideable: false},
                    'dependency.idDependency': {hidden:true, hideable: false},
                    'position.idPosition': {hideable: false}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);        
   }
   
});