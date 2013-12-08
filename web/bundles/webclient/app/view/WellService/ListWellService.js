/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WellService.ListWellService', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   alias: 'widget.listWellService',
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   options: {},
   messages:{
       idWellService:'ID',
       wellServiceTypeNameHeader:'Type Service',
       wellNameHeader:'Well',
       CompanyMandatedNameHeader: 'Company Mandated',
       supervisorEmployeeHeader: 'Supervisor',
       totalCostHeader: 'Total Cost',
       sdpFileButtonText: 'Attach SDP File',
       sdpFileCostButtonText: 'Cost Company',
       sdpDescriptionHeader: 'Description',
       startupDateHeader: 'Startup Date',
       finishDateHeader: 'Finish Date',
       usedFrecuencyHeader: 'used Frecuency',
       moneyNameHeader: 'Money',
       updateWellParamsAndFeaturesButton: 'Param Well',
       equipment: 'Equipment'
   },
   entityName: '',
   
   title: '',
   
   listTitle: 'Well Service List',
   
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
                    idWellService: {header:me.messages.idWellService},
                    'wellServiceType.wellServiceTypeName': {header:me.messages.wellServiceTypeNameHeader, flex:1},
                    equipment: {header: me.messages.equipment, flex:1},
                    'well.wellName': {header:me.messages.wellNameHeader, flex:1},
                    'sdpCompanyMandated.company.companyName': {header:me.messages.CompanyMandatedNameHeader,flex:3},
                    'supervisorEmployee.person.personFullName': {header:me.messages.supervisorEmployeeHeader,flex:3},
                    totalCost: {header:me.messages.totalCostHeader, flex:1},
                    'wellServiceType.idWellServiceType': {hideable:false, hidden: true},
                    'well.idWell': {hideable:false, hidden: true},
                    'sdpCompanyMandated.idSdpCompany': {hideable:false, hidden: true},
                    'money.idMoney': {hideable:false, hidden: true},
                    wellTplName: {hideable:false, hidden: true},
                    wellServiceTypeTplName: {hideable:false, hidden: true},
                    sdpDescription: {header: me.messages.sdpDescriptionHeader},
                    startupDate: {header: me.messages.startupDateHeader},
                    finishDate: {header: me.messages.finishDateHeader},
                    usedFrecuency: {header: me.messages.usedFrecuencyHeader},
                    'money.moneyName': {header: me.messages.moneyNameHeader},
                    updateWellParamsAndFeaturesButton: {
                        header: me.messages.updateWellParamsAndFeaturesButton,
                        hideable: false,
                        flex: 1,
                        align: 'center',
                        xtype: 'actioncolumn',
                        excludeForExport: true,
                        sortable: false,
                        filter: null,
                        items: [
                            {
                                icon: sisprod.getApplication().getImagePath('view_detail.png'),
                                scope: me.controller,
                                handler: me.controller.updateWellParamsAndFeaturesButton_click
                            }
                        ]
                    }
                }
            },
            topBarButtons: [
                {
                    xtype: 'button',
                    text: me.messages.sdpFileButtonText,
                    iconCls: 'attach',
                    action: 'attachFiles'
                },
                {
                    xtype: 'button',
                    text: me.messages.sdpFileCostButtonText,
                    iconCls: 'dollar',
                    action: 'CostCompany'
                }
            ],
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       me.callParent(arguments);
   }
   
});