/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Company.ListCompany', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   alias: 'widget.listCompany',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   messages: {
       headers : {
            idCompany: 'Company ID',
            externalId: 'External ID',
            companyName : 'Company',
            entityRuc: 'RUC',            
            address: 'Address',
            email : 'Email',
            isAuthorized : 'Authorized'
       }
    },
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Companys List',
   
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
           baseGridOptions: {
                allowAdd: false,
                allowUpdate: false,
                allowDelete: false,
                allowPrint: true  
            },
           topBarButtons : [
                {
                    xtype: 'button',
                    iconCls: 'sync',
                    text: me.gridMessages.buttonText.importData,
                    action: 'importCompany',
                    id: 'btnImport' + me.entityName
                }            
           ],
           autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idCompany: {header:me.messages.headers.idCompany},                    
                    'defEntity.entityRuc': {header:me.messages.headers.entityRuc},
                    'companyName': {header:me.messages.headers.companyName},
                    'defEntity.email': {header:me.messages.headers.email},
                    'isAuthorized': {header:me.messages.headers.isAuthorized},
                    'defEntity.address': {hideable : false},
                    'entityId': {hideable : false},
                    'externalId': {hideable : false}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);        
   }
   
});