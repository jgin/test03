Ext.define('sisprod.view.WellService.UpdateWellService', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateWellService',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        WellServiceDataTitle:'Data de Well Service',
        wellNameLabel: 'Well',
        wellServiceTypeNameLabel: 'Well Service Type',
        sdpCompanyLabel:'Company',
        equipmentLabel:'Equipment',
        supervisorIdEmployeeLabel: 'Supervisor',
        employeeEmptyText: 'Enter Supervisor',
        isFrequencyLabel: 'Frequency',
        descriptionLabel:'Description',
        msgCompany: 'Enter Company',
        sdpReasonNameLabel:'Name',
        sdpReasonAcronymLabel:'Acronym',
        sdpReasonDataTitle:'Sdp Reason',
        startupDateLabel: 'Startup Date',
        finishDateLabel: 'Finish Date',
        moneyLabel: 'Money',
        lotLabel : 'Lot'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Well Service on Company',
    modal: true,
    width: 450,
    initComponent:function(){
        var me= this;
        var tabItems = new Array();
        
        tabItems.push(
            {
                xtype:'fieldset',
                title: me.messages.WellServiceDataTitle,
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'idSdp'
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'totalCost'
                    },
                    {
                        xtype: 'combobox',
                        grow: true,
                        name: 'idLot',
                        id: 'idLot',
                        store: Ext.create('sisprod.store.LotAll'),
                        fieldLabel: me.messages.lotLabel,
                        displayField: 'lotName',
                        valueField: 'idLot',
                        allowBlank: false,
                        forceSelection: true,
                        editable: false,
                        readOnly: true
                    },
                    {
                        xtype: 'sensitivecombocontainer',
                        showAddButton: false,   
                        anchor:'65%',
                        sensitiveComboBoxOptions:{
                            name: 'well.idWell',
                            hideTrigger: false,
                            fieldLabel: me.messages.wellNameLabel,
                            emptyText: me.messages.wellSelected,
                            readOnly: true,
                            store: Ext.create('sisprod.store.WellByLotStore',{
                                listeners: {
                                    beforeload: function(store, operation, options){
                                        var idLot = me.down('#idLot').getValue();
                                        if(Ext.isDefined(idLot) && idLot!==null){
                                            if(Ext.isDefined(operation.params) && operation.params!==null)
                                                operation.params.idLot = idLot;
                                        }
                                        else{
                                            Ext.Msg.alert(me.messages.validation.alertTitle, me.messages.validation.selectLotFirst);
                                            return false;
                                        }
                                    }
                                }
                            }),
                            id: 'idWell',
                            forceSelection : true,
                            allowBlank: false,
                            displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">','{wellName}','</tpl>'),
                            valueField: 'idWell',
                            listConfig: {
                                    getInnerTpl: function() {
                                            return '{wellName}';
                                    }
                            }
                        }
                    },
//                    {
//                        xtype: 'sensitivecombocontainer',
//                        showAddButton: false,      
//                        anchor:'65%',
//                        sensitiveComboBoxOptions:{
//                            name: 'well.idWell',
//                            hideTrigger: false,
//                            fieldLabel: me.messages.wellNameLabel,
//                            store: Ext.create('sisprod.store.WellAll'),
//                            id: 'idWell',
//                            forceSelection : true,
//                            allowBlank: false,
//                            displayTpl: Ext.create('Ext.XTemplate',
//                                    '<tpl for=".">','{wellName}','</tpl>'),
//                            valueField: 'idWell',
//                            listConfig: {
//                                    getInnerTpl: function() {
//                                            return '{wellName}';
//                                    }
//                            }
//                        }
//                    },
                    {
                        xtype: 'combobox',         
                        fieldLabel : me.messages.wellServiceTypeNameLabel,
                        store : Ext.create('sisprod.store.WellServiceTypeAll').load(),
                        displayField : 'wellServiceTypeName',
                        valueField : 'idWellServiceType',
                        id: 'idWellServiceType',
                        name:'wellServiceType.idWellServiceType',
                        forceSelection : true,
                        allowBlank : false,
                        editable : false
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: me.messages.sdpCompanyLabel,
                        store:Ext.create('sisprod.store.SdpCompanyAll').load(),
                        displayField:'companyName',
                        valueField: 'idSdpCompany',
                        id:'idSdpCompany',
                        name:'sdpCompanyMandated.idSdpCompany',
                        forceSelection: true,
                        allowBlank: false,
                        editable: false
                    },
                    {
                        xtype: 'combobox',     
                        fieldLabel : me.messages.moneyLabel,
                        store : Ext.create('sisprod.store.MoneyAll').load(),
                        displayField : 'moneyName',
                        valueField : 'idMoney',
                        name:'money.idMoney',
                        forceSelection : true,
                        editable : false
                    },
                    {
                        xtype: 'textareafield',
                        anchor: '100%',
                        fieldLabel: me.messages.equipmentLabel,
                        name: 'equipment',
                        id: 'equipment',
                        allowBlank: false,
                        height: 50
                    },
                    {
                        xtype: 'sensitivecombocontainer',
                        showAddButton: false,
                        anchor: '100%',
                        sensitiveComboBoxOptions:{
                            name: 'supervisorEmployee.idEmployee',
                            hideTrigger: false,
                            fieldLabel: me.messages.supervisorIdEmployeeLabel,
                            store: Ext.create('sisprod.store.EmployeeFromGMP'),
                            emptyText: me.messages.employeeEmptyText,
                            id: 'idEmployee',
                            forceSelection : true,
                            allowBlank: false,
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">','{personFullName} ({fullDocumentNumber})','</tpl>'),
                            valueField: 'idEmployee',
                            listConfig: {
                                getInnerTpl: function() {
                                    return '{personFullName} ({fullDocumentNumber})';
                                }
                            }
                        }
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'usedFrecuency',
                        fieldLabel: me.messages.isFrequencyLabel,
                        inputValue:true,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textareafield',
                        anchor: '100%',
                        fieldLabel: me.messages.descriptionLabel,
                        name: 'sdpDescription',
                        id: 'sdpDescription',
                        allowBlank: false,
                        height: 50
                    },
                    {
                        xtype: 'datefield',
                        name: 'startupDate',
                        id: 'startupDate',
                        fieldLabel: me.messages.startupDateLabel,
                        allowBlank: false,
                        vtype: 'daterange',
                        endDateField: 'finishDate'
                    },
                    {
                        xtype: 'datefield',
                        name: 'finishDate',
                        id: 'finishDate',
                        fieldLabel: me.messages.finishDateLabel,
                        vtype: 'daterange',
                        startDateField: 'startupDate'
                    }
                ]
            }
        );
        
        tabItems.push(
                Ext.create('sisprod.view.WellService.ReasonsGrid', {
                    title: me.messages.sdpReasonDataTitle,
                    store: Ext.create('sisprod.store.SdpReasonAll').load({
                        callback : function(record, options, success) {
                            var idSdp = me.record.data['idSdp'];
                            me.controller.getSdpReasonDetail.apply(me.controller, [idSdp, me]);
                        }
                    })
                }).doLayout()
//                me.getSdpReasonDetail()
        );  
        var tabPanel = Ext.create('Ext.tab.Panel', {
            deferredRender: false,
            items: tabItems
        });
        
        me.formOptions = {
            region: 'center',
            labelWidth: 120,
            bodyStyle: 'padding:5px 5px 0',
            layout: 'fit',
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    autoScroll: true,
                    items: tabPanel
                }
            ]
        };
        me.callParent(arguments);
    },
    getSdpReasonDetail: function(){
        var me = this;
        var items = {};
        items = {
            
        };
        return items;
    }
});