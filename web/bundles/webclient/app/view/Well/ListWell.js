/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.Well.ListWell', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listWell',
    options: {},
    entityName: '',
    title: '',
    listTitle: 'Well List',
    
    usedInDailyReport: true,
    
    gridOptions: {
        region: 'center'
    },
    
    requires: [
       'sisprod.view.base.TabPanelGridItem'
    ],
    
    messages: {
        msgId: 'Id',
        msgWell: 'Well',
        msgCode: 'Code',
        msgIdLocation: 'Id Location',
        msgLocation: 'Location',
        msgIdWellState: 'Id Well State',
        msgWellState: 'Well State',
        msgIdWellGroup: 'Id Well Group',
        msgWellGroup: 'Well Group',
        msgIdField: 'Id Field',
        msgField: 'Field',
        msgIdBattery: 'Id Battery',
        msgBattery: 'Battery',
        msgIdWellTypeByState: 'Id Well Type by State',
        msgWellTypeByState: 'Well Type by State',
        msgIdWellTypeByProduction: 'Id Well Type by Production',
        msgWellTypeByProduction: 'Well Type by Production',
        msgIdExtractionType: 'Id Extraction Type',
        msgExtractionType: 'Extraction Type',
        msgIdOilMeasureUnit: 'Id Oil Measure Unit',
        msgOilMeasureUnit: 'Oil Measure Unit',
        msgIdWaterMeasureUnit: 'Id Water Measure Unit',
        msgWaterMeasureUnit: 'Water Measure Unit',
        msgIdGasMeasureUnit: 'Id Gas Measure Unit',
        msgGasMeasureUnit: 'Gas Measure Unit',
        msgWorkingTime: 'Working Time',
        msgBreakTime: 'Break Time',
        msgOilMeasure: 'Oil Measure',
        msgWaterMeasure: 'Water Measure',
        msgGasMeasure: 'Gas Measure',
        msgStartHour: 'Start Hour',
        msgEndHour: 'End Hour',
        msgIdCarreraMeasureUnit: 'Carrera Measure Unit',
        msgCarreraMeasureUnit: 'Carrera Measure',
        msgCarrera: 'Carrera',
        msgSpm: 'SPM',
        msgOnHour: 'Hours On',
        msgOffHour: 'Hours Off',
        attachFilesButtonText: 'Attach Files',
        assignEquipmentsButtonText: 'Assign Equipments',
        msgLot: 'Lot',
        msgIdLot: 'Id Lot',
        uploadFile: 'Uploading completion diagram'
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
                    idWell: {
                        header: me.messages.msgId
                    },
                    wellName: {
                        header: me.messages.msgWell
                    },
                    wellCode: {
                        header: me.messages.msgCode
                    },
                    'location.idLocation': {
                        header: me.messages.msgIdLocation
                    },
                    'location.locationName': {
                        header: me.messages.msgLocation
                    },        
                    'lot.idLot': {
                        header: me.messages.msgIdLot
                    },
                    'lot.lotName': {
                        header: me.messages.msgLot
                    },  
                    'wellState.idWellState': {
                        header: me.messages.msgIdWellState
                    },
                    'wellState.wellStateName': {
                        header: me.messages.msgWellState
                    },                            
                    'wellGroup.idWellGroup': {
                        header: me.messages.msgIdWellGroup
                    },
                    'wellGroup.wellGroupName': {
                        header: me.messages.msgWellGroup
                    },                                 
                    'field.idField': {
                        header: me.messages.msgIdField
                    },
                    'field.fieldName': {
                        header: me.messages.msgField
                    },                        
                    'battery.idBattery': {
                        header: me.messages.msgIdBattery
                    },
                    'battery.batteryName': {
                        header: me.messages.msgBattery
                    },                     
                    'wellTypeByState.idWellTypeByState': {
                        header: me.messages.msgIdWellTypeByState
                    },
                    'wellTypeByState.wellTypeByStateName': {
                        header: me.messages.msgWellTypeByState
                    },    
                    'wellTypeByProduction.idWellTypeByProduction': {
                        header: me.messages.msgIdWellTypeByProduction
                    },
                    'wellTypeByProduction.wellTypeByProductionName': {
                        header: me.messages.msgWellTypeByProduction
                    },                  
                    'extractionType.idExtractionType': {
                        header: me.messages.msgIdExtractionType
                    },
                    'extractionType.extractionTypeName': {
                        header: me.messages.msgExtractionType
                    },                  
                    'oilMeasureUnit.oilIdMeasureUnit': {
                        header: me.messages.msgIdOilMeasureUnit
                    },
                    'oilMeasureUnit.oilMeasureUnitName': {
                        header: me.messages.msgOilMeasureUnit
                    },            
                    'waterMeasureUnit.waterIdMeasureUnit': {
                        header: me.messages.msgIdWaterMeasureUnit
                    },
                    'waterMeasureUnit.waterMeasureUnitName': {
                        header: me.messages.msgWaterMeasureUnit
                    },            
                    'gasMeasureUnit.gasIdMeasureUnit': {
                        header: me.messages.msgIdGasMeasureUnit
                    },
                    'gasMeasureUnit.gasMeasureUnitName': {
                        header: me.messages.msgGasMeasureUnit
                    },            
                    'workingTime': {
                        header: me.messages.msgWorkingTime
                    }, 
                    'breakTime': {
                        header: me.messages.msgBreakTime
                    }, 
                    'oil': {
                        header: me.messages.msgOilMeasure
                    }, 
                    'water': {
                        header: me.messages.msgWaterMeasure
                    }, 
                    'gas': {
                        header: me.messages.msgGasMeasure
                    }, 
                    'startupHour': {
                        header: me.messages.msgStartHour
                    }, 
                    'endHour': {
                        header: me.messages.msgEndHour
                    },
                    'carreraMeasureUnit.carreraIdMeasureUnit': {
                        header: me.messages.msgIdCarreraMeasureUnit
                    },
                    'carreraMeasureUnit.carreraMeasureUnitName': {
                        header: me.messages.msgCarreraMeasureUnit
                    },
                    'carrera':{
                        header: me.messages.msgCarrera
                    },
                    'spm':{
                        header: me.messages.msgSpm
                    },
                    'onHour':{
                        header: me.messages.msgOnHour
                    },
                    'offHour':{
                        header: me.messages.msgOffHour
                    }
//                    'uploadFile':{
//                        header: me.messages.uploadFile,
//                        hideable: false,
//                        align: 'center',
//                        xtype: 'actioncolumn',
//                        excludeForExport: true,
//                        sortable: false,
//                        filter: null,
//                        items: [
//                            {
//                                icon: sisprod.getApplication().getImagePath('upload.png'),
//                                handler: function(grid, rowIndex, colIndex){
//                                    var record = grid.getStore().getAt(rowIndex);
//                                    if(record){
//                                        var form = Ext.create('sisprod.view.Well.UploadCompletionDiagram');
//                                        form.show();
//                                    }
//                                }
//                            }
//                        ]
//                    }        
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName),/*,
            defaultFilters: [
                {dataIndex: 'wellName', value: Ext.getCmp('envProductionPeriodDate').getRawValue()}
            ]*/
            topBarButtons: [
                {
                    xtype: 'button',
                    text: me.messages.attachFilesButtonText,
                    iconCls: 'attach',
                    action: 'attachFiles'
                },
                {
                    xtype: 'button',
                    text: me.messages.assignEquipmentsButtonText,
                    iconCls: 'tools',
                    action: 'assignEquipments'
                }
            ]
        };
        me.callParent(arguments);
    }
});

