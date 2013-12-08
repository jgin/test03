/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Member.ListMember', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   
   entityName: '',
   
   title: 'Anything',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;
       
//       me.gridOptions = {};
       
       //
       me.gridOptions = {
            title: me.title,
            autoGenerationOptions:{
                model: 'sisprod.model.'+me.entityName,
                autoGenerateColumns: true,
                columnNames: {
                    id: 'pkMember',
                    email: 'Correo Electrónico',
                    name: 'Nombre',
                    phoneNumber: 'Teléfono'
                }
            },
            store: Ext.create('sisprod.store.'+me.entityName),
            region: 'center',
            callBackFunction: {
                addCallBack: function(button, event, baseGrid){
//                                        Ext.Msg.alert('Event', 'addition option');
//                    Ext.create('sisprod.view.WorkCategory.AddWorkCategory', {
//                        store:baseGrid.store
//                    }).show();
                },
                updateCallBack: function(){
                    Ext.Msg.alert('Event', 'updating option');
                },
                getDeleteCaption: 'name'
            }
        };
       
       me.callParent(arguments);
   }
   
});