/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Dependency.ListDependency', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listDependency',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       headers: {
            idDependency:'Dependency ID',
            externalId : 'External ID',
            dependencyName:'Name',
            dependencyAcronym:'Acronym',
            idDependencyParent:'Dependency Parent ID',
            dependencyParentName:'Dependency',
            idDependencyLevel:'Dependency Level ID',
            dependencyLevel:'Dependency Level'
       }
    },
   entityName: '',
   
   title: '',
   
   listTitle: 'Dependency List',
   
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
            topBarButtons : [
                {
                    xtype: 'button',
                    iconCls: 'sync',
                    text: me.gridMessages.buttonText.importData,
                    action: 'importDependency',
                    id: 'btnImport' + me.entityName
                }            
            ],
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idDependency: {header:me.messages.headers.idDependency},
                    externalId: {hideable: false},
                    dependencyName:{header:me.messages.headers.dependencyName},
                    dependencyAcronym:{header:me.messages.headers.dependencyAcronym},
                    'dependencyParent.idDependency':{header:me.messages.headers.idDependencyParent,hideable:false},
                    'dependencyParent.dependencyName':{header:me.messages.headers.dependencyParentName},
                    'dependencyLevel.idDependencyLevel':{header:me.messages.headers.idDependencyLevel,hideable:false},
                    'dependencyLevel.dependencyLevelName':{header:me.messages.headers.dependencyLevel}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});