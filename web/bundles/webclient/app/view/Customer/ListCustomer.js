/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Customer.ListCustomer', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   alias: 'widget.listCustomer',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
         idCustomerHeader:'Customer ID',
         entityIdHeader : 'Entity ID',
         idActivityTypeHeader :'Activity ID',
         idActivityTypeNameHeader :'Activity',
         entityRucHeader :'RUC',
         isCompanyHeader :'Is Company',
         entityNameHeader :'Client',
         adressHeader :'Adress',
         phoneHeader :'Phone',
         emailHeader :'Email',
         imageHeader :'Image'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Client List',
   
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
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idCustomer:{header: me.messages.idCustomerHeader},
                    'entity.entityId':{header:me.messages.entityIdHeader},
                    'entity.activityType.idActivityType': {header: me.messages.idActivityTypeHeader},
                    'entity.activityType.activityTypeName': {header:me.messages.idActivityTypeNameHeader},
                    'entity.entityRuc': {header:me.messages.entityRucHeader},
                    'entity.isCompany': {header:me.messages.isCompanyHeader},
                    'entity.entityName':{header:me.messages.entityNameHeader},
                    'entity.address': {header: me.messages.adressHeader},
                    'entity.phone': {header: me.messages.phoneHeader},
                    'entity.email': {header: me.messages.emailHeader},
                    'entity.image': {header: me.messages.imageHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
       
       me.callParent(arguments);
   }   
});