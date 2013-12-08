/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Quadrille.ListQuadrille', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listQuadrille',
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Quadrilles List',
   messages: {
       headers: {
           idQuadrille: 'ID',
           'workShop.workShopName': 'Workshop',
           quadrilleName: 'Name',
           quadrilleAcronym: 'Acronym',
           numberOfMembers: 'Nbr. Of Members'
       }
   },
   
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
                    idQuadrille:{header: me.messages.headers.idQuadrille},
                    'workShop.idWorkShop': {hideable: false},
                    'workShop.workShopName':{header: me.messages.headers['workShop.workShopName']},
                    quadrilleName: {header: me.messages.headers.quadrilleName},
                    quadrilleAcronym: {header: me.messages.headers.quadrilleAcronym},
                    numberOfMembers: {header: me.messages.headers.numberOfMembers}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
   }
   
});