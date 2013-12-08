/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.TaskGeneralScheduler.ListTaskGeneralScheduler', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listTaskGeneralScheduler',
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'General Task Scheduler List',
   messages: {
       headers: {
           idTaskGeneralScheduler: 'ID',
           idEmployee: 'Employee ID',
           personFullName: 'Employee Fullname',
           documentTypeAcronym: 'Document Type',
           documentNumber: 'Document Number',
           dependencyName: 'Dependency'
       }
   },
   
   initComponent: function(){
       var me = this;

       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
       me.gridOptions = {
           title: me.listTitle,
           entityName: me.entityName,
           autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idTaskGeneralScheduler:{header: me.messages.headers.idTaskGeneralScheduler},
                    'employee.idEmployee': {hideable: false},
                    'employee.person.personFullName': {header: me.messages.headers.personFullName},
                    'employee.person.documentType.documentTypeAcronym': {header: me.messages.headers.documentTypeAcronym, flex: .2},
                    'employee.person.documentNumber': {header: me.messages.headers.documentNumber},
                    'employee.dependency.dependencyName': {header: me.messages.headers.dependencyName}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
   }
   
});