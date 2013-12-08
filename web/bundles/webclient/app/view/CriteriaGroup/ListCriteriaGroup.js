/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.CriteriaGroup.ListCriteriaGroup', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listCriteriaGroup',
   
   options: {},
   
   entityName: '',
   
   messages: {
       headers: {
           idCriteriaGroup: 'ID',
           criteriaGroupName: 'Name',
           criteriaGroupOrder: 'Order'
       },
       buttons: {
           descriptionsButton: 'Factor Descriptions'
       }
   },
   
   listTitle: 'Criteria Groups List',
   
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
                    idCriteriaGroup:{
                        header: me.messages.headers.idCriteriaGroup
                    },
                    criteriaGroupName: {
                        header: me.messages.headers.criteriaGroupName
                    },
                    criteriaGroupOrder: {
                        header: me.messages.headers.criteriaGroupOrder
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),
            baseGridOptions: {
                allowAdd: false,
                allowUpdate: true,
                allowDelete: false,
                allowPrint: true
            },
            topBarButtons: [
                {
                    xtype: 'button',
                    text: me.messages.buttons.descriptionsButton,
                    action: 'showFactorDescriptions',
                    iconCls: 'viewDetail'
                }
            ]
       };
       
       me.callParent(arguments);
   }
   
});