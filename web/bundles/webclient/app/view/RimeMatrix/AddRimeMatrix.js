/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.RimeMatrix.AddRimeMatrix', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addRimeMatrix',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add RIME Matrix',
    messages: {
        labels: {
            workCategory: 'Work Category',
            workCategoryDetail: 'Work Type',
            criticalityLevel: 'Criticality Level',
            riskLevel: 'Risk Level',
            consequenceCriteriaGroup: 'Consequence',
            ocurrenceProbability: 'Ocurrence Probability',
            results: 'Results',
            risk: 'Risk',
            criticality: 'Criticality',
            rime: 'RIME',
            rimeCriteria: 'Criteria',
            rimeIndex: 'Index',
            attentionMaxDays: 'Attent. Days',
            description: 'Description',
            value: 'Value'
        },
        headers: {
            criteriaFactorName: 'Criteria Factor',
            criteriaLevelName: 'Criteria Level',
            description: 'Description'
        },
        validations: {
            criticalityBlankText: 'Complete all data in Criticality Level...',
            riskBlankText: 'Complete all data in Risk Level...',
            rimeIndexBlankText: 'Adjust a risk and/or criticality level(s) to find its value...'
        },
        valueNotApplied: 'NOT APPLIED',
        workCategoryDetailEmptyText: 'Type work type name...',
        workCategoryFieldSet: 'Work Category',
        alertMessage:'Message',
        selectWorkCategory:'Select work category first'
    },
    modal: true,
    width: 600,
    layout: 'fit',
    
    initComponent: function(){
        var me = this;
        
        var formItems = [
            {
                xtype:'fieldset',
                columnWidth: 0.5,
                title: me.messages.workCategoryFieldSet,
                defaultType: 'textfield',
                defaults: {anchor: '100%'},
                layout: 'anchor',
                items: [
                     {
                        xtype: 'combobox',
                        name: 'idWorkCategory',
                        id: 'idWorkCategory',
                        anchor: '80%',
                        flex: 1,
                        labelWidth: 100,
                        store: Ext.create('sisprod.store.WorkCategoryAll'),
                        fieldLabel:me.messages.labels.workCategory,
                        displayField: 'workCategoryName',
                        valueField: 'idWorkCategory',
                        forceSelection: true,
                        allowBlank: false
                    },
                    {
                        xtype: 'sensitivecombocontainer',
                        anchor: '100%',
                        showAddButton: false,
                        sensitiveComboBoxOptions:{
                            hideTrigger: false,
                            name: 'idWorkCategoryDetail',
                            id: 'idWorkCategoryDetail',
                            fieldLabel: me.messages.labels.workCategoryDetail,
                            labelWidth: 100,
//                            store: Ext.create('sisprod.store.WorkCategoryDetailByCategory'),
                            store: Ext.create('sisprod.store.WorkCategoryDetailByCategory',{
                                listeners: {
                                    beforeload: function(store, operation, options){
                                        var idWorkCategory = me.down('#idWorkCategory').getValue();
                                        if(Ext.isDefined(idWorkCategory) && idWorkCategory!==null){
                                            if(Ext.isDefined(operation.params) && operation.params!==null)
                                                operation.params.idWorkCategory = idWorkCategory;
                                            else operation.params = {query: '', idWorkCategory: idWorkCategory};
                                        }
                                        else{
                                            Ext.Msg.alert(me.messages.alertMessage,me.messages.selectWorkCategory);
                                            return false;
                                        }
                                    }
                                }
                            }),
                            emptyText: me.messages.workCategoryDetailEmptyText,
                            forceSelection : true,
                            allowBlank: false,
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">','{workCategoryDetailName} ({workCategoryName})','</tpl>'),
                            valueField: 'idWorkCategoryDetail',
                            listConfig: {
                                getInnerTpl: function() {
                                    return "{workCategoryDetailName} ({workCategoryName})";
                                }
                            }
                        }
                    }
                ]
            }
        ];
        var tabItems = new Array();
        tabItems.push(me.getCriticalityLevelItems());
        var riskLevelPanelItems = new Array();
        riskLevelPanelItems.push({
            xtype: 'combobox',
            name: 'idOcurrenceProbability',
            id: 'idOcurrenceProbability',
            anchor: '80%',
            labelWidth: 150,
            store: Ext.create('sisprod.store.AllOcurrenceProbabilityStore'),
            fieldLabel: me.messages.labels.ocurrenceProbability,
            displayField: 'ocurrenceProbabilityName',
            valueField: 'idOcurrenceProbability',
            forceSelection: true,
            allowBlank: false,
            editable: false,
            listeners: {
                change: function(){
                    me.getRiskCriteria();
                }
            }
        });
        riskLevelPanelItems.push(me.getConsequenceLevelItems());
        var riskLevelPanel = Ext.create('Ext.panel.Panel', {
            title: me.messages.labels.riskLevel,
            layout: 'anchor',
            items: riskLevelPanelItems
        });
        tabItems.push(riskLevelPanel);
        var tab = Ext.create('Ext.tab.Panel', {
            items: tabItems
        });
        formItems.push(tab);
        formItems.push(me.getResultsFieldSet());
        
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
                    items: formItems
                }
            ]
        };
        me.callParent(arguments);
    },
    
    getCriticalityLevelItems: function(){
        var me = this;
        var rows = [];
        Ext.BaseAjax.request({
            url: 'rest/criteriaFactor/listAllByCriticalityCriteriaGroup.htm',
            async: false,
            method: "POST",
            success: function(response){
                var responseData = Ext.decode(response.responseText);
                Ext.Object.each(responseData, function(key, value, myself){
                    var row = Ext.create('sisprod.model.CriteriaFactorLevelModel',
                    {
                        idCriteriaFactor: value['idCriteriaFactor'],
                        criteriaFactorName: value['criteriaFactorName']
                    });
                    rows.push(row);
                });
            }
        });
        var items = new Array();
        var grid = me.generateGrid('criticalityGrid', me.getCriticalityLevelStore());
        grid.store.loadData(rows, false);
        items.push(grid);
        var panel = {
                title   : me.messages.labels.criticalityLevel,
                columnWidth: 0.5,
                defaultType: 'textfield',
                defaults: {anchor: '100%'},
                layout: 'anchor',
                items: items
            };  
        return panel;
    },
    
    getConsequenceLevelItems: function(){
        var me = this;
        var rows = [];
        Ext.BaseAjax.request({
            url: 'rest/criteriaFactor/listAllByConsequenceCriteriaGroup.htm',
            async: false,
            method: "POST",
            success: function(response){
                var responseData = Ext.decode(response.responseText);
                Ext.Object.each(responseData, function(key, value, myself){
                    var row = Ext.create('sisprod.model.CriteriaFactorLevelModel',
                    {
                        idCriteriaFactor: value['idCriteriaFactor'],
                        criteriaFactorName: value['criteriaFactorName']
                    });
                    rows.push(row);
                });
            }
        });
        var grid = me.generateGrid('consequenceGrid', me.getConsequenceLevelStore());
        grid.store.loadData(rows, false);
        grid.title = me.messages.labels.consequenceCriteriaGroup;
        return grid;
    },
    
    getCriticalityLevelStore: function(){
        var me = this;
        var store = Ext.create('sisprod.store.AllCriticalityCriteriaLevelStore');
        return store;
    },
    
    getConsequenceLevelStore: function(){
        var me = this;
        var store = Ext.create('sisprod.store.AllConsequenceCriteriaLevelStore');
        return store;
    },
    
    generateGrid: function(id, levelStore){
        var me = this;
        
        var store = Ext.create('Ext.data.Store',{
            model: 'sisprod.model.CriteriaFactorLevelModel',
            proxy: {
                type: 'memory',
                reader: {type: 'json'}
            }
        });
        
        var grid = {
            xtype: 'gridpanel',
            store: store,
            autoScroll: true,
            height: 125,
            id: id,
            columns: [
                {
                    dataIndex: 'idCriteriaFactor',
                    hidden: true
                },
                {
                    text: me.messages.headers.criteriaFactorName,
                    dataIndex: 'criteriaFactorName',
                    flex: 2
                },
                {
                    dataIndex: 'idCriteriaLevel',
                    hidden: true
                },
                {
                    text: me.messages.headers.criteriaLevelName,
                    dataIndex: 'criteriaLevelName',
                    flex: 2,
                    editor: {
                        xtype: 'combobox',
                        store: levelStore,
                        forceSelection: true,
                        allowBlank: false,
                        editable: false,
                        valueField: 'criteriaLevelName',
                        displayField: 'criteriaLevelName',
                        listeners: {
                            change: function(combobox, newValue, oldValue, options){
                                me.onSelectLevel(combobox, newValue, oldValue, options);
                            }
                        }
                    }
                },
                {
                    text: 'criteriaLevelValue',
                    dataIndex: 'criteriaLevelValue',
                    hidden: true
                },
                {
                    text: me.messages.headers.description,
                    dataIndex: 'description',
                    flex: 3
                }
            ]
        };
        //
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            errorSummary: false,
            listeners:{
                'canceledit': function(editor, context, options){
                },
                'validateedit': function(editor, context, options){
                },
                'afteredit': function(editor, object, data, rowIndex){
                    if(id==='criticalityGrid') me.getCriticalityMaximumValue();
                    else me.getRiskCriteria();
                }
            }
        });
        grid.plugins = [rowEditing];
        return grid;
    },
    
    onSelectLevel: function(combobox, newValue, oldValue, options){
        var me = this;
        var grid = combobox.up('grid');
        var selection = grid.getSelectionModel().getSelection()[0];
        var store = combobox.store;
        var record = store.findRecord('criteriaLevelName', newValue);
        if(record === null) return;
        var data = record.raw;
        if(data === null) return;
        Ext.BaseAjax.request({
            url: 'rest/criteriaFactorLevel/findByFactorAndLevel.htm',
//                async: false,
            method: "POST",
            params: {
                idCriteriaFactor: selection.data['idCriteriaFactor'],
                idCriteriaLevel: data['idCriteriaLevel']
            },
            success: function(response){
                var responseData = Ext.decode(response.responseText);
                selection.set('description', responseData['description']);
                selection.set('idCriteriaLevel', data['idCriteriaLevel']);
                selection.set('criteriaLevelValue', data['criteriaLevelValue']);
            }
        });
    },
    
    getResultsFieldSet: function(){
        var me = this;
        var items = new Array();
        var riskContainer = {
            xtype: 'fieldcontainer',
            fieldLabel: me.messages.labels.risk,
            defaults: {xtype: 'textfield', labelAlign: 'top', labelSeparator: ''},
            layout: 'hbox',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idRiskLevel',
                    id: 'idRiskLevel'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    name: 'riskName',
                    id: 'riskName',
                    allowBlank: false,
                    blankText: me.messages.validations.riskBlankText,
                    fieldLabel: me.messages.labels.description,
                    flex: 3
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    name: 'riskValue',
                    id: 'riskValue',
                    fieldLabel: me.messages.labels.value,
                    fieldStyle: 'text-align: center;',
                    flex: 1,
                    listeners: {
                        change: function(input, newValue, oldValue, options){
                            me.getRIMECriteria();
                        }
                    }
                }
            ]
        };
        var criticalityContainer = {
            xtype: 'fieldcontainer',
            fieldLabel: me.messages.labels.criticality,
            layout: 'hbox',
            defaults: {xtype: 'textfield', labelAlign: 'top', labelSeparator: ''},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idCriteriaLevel',
                    id: 'idCriteriaLevel'
                },
                {
                    name: 'criticalityName',
                    id: 'criticalityName',
                    readOnly: true,
                    fieldLabel: me.messages.labels.description,
                    allowBlank: false,
                    blankText: me.messages.validations.criticalityBlankText,
                    flex: 3
                },
                {
                    readOnly: true,
                    name: 'criticalityValue',
                    id: 'criticalityValue',
                    fieldLabel: me.messages.labels.value,
                    flex: 1,
                    fieldStyle: 'text-align: center;',
                    listeners: {
                        change: function(input, newValue, oldValue, options){
                            me.getRIMECriteria();
                        }
                    }
                }
            ]
        };
        var rimeIndexContainer = {
            xtype: 'fieldcontainer',
            fieldLabel: me.messages.labels.rime,
            layout: 'hbox',
            defaults: { xtype: 'textfield', labelAlign: 'top', labelSeparator: '' },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idRimeCriteriaValue',
                    id: 'idRimeCriteriaValue'
                },
                {
                    name: 'rimeIndex',
                    id: 'rimeIndex',
                    fieldLabel: me.messages.labels.rimeIndex,
                    readOnly: true,
                    blankText: me.messages.validations.rimeIndexBlankText,
                    allowBlank: false,
                    flex: 1,
                    fieldStyle: 'text-align: center;'
                },
                {
                    xtype: 'textfield',
                    name: 'rimeCriteriaName',
                    id: 'rimeCriteriaName',
                    fieldLabel: me.messages.labels.rimeCriteria,
                    readOnly: true,
                    flex: 3
                },
                {
                    xtype: 'textfield',
                    fieldLabel: me.messages.labels.attentionMaxDays,
                    name: 'maximumTimeAttention',
                    id: 'maximumTimeAttention',
                    readOnly: true,
                    flex: 1,
                    fieldStyle: 'text-align: center;'
                }
            ]
        };
        items.push(riskContainer);
        items.push(criticalityContainer);
        items.push(rimeIndexContainer);
        var fieldSet = {
            xtype:'fieldset',
            columnWidth: 0.5,
            title: me.messages.labels.results,
            defaultType: 'textfield',
            defaults: {anchor: '100%'},
            layout: 'anchor',
            items: items
        };
        return fieldSet;
    },
            
    getCriticalityMaximumValue: function(){
        var me = this;
        var criticalityGrid = me.down('#criticalityGrid');
        var store = criticalityGrid.store;
        var maximumData = store.getAt(0);
        var flag = false;
        if(!Ext.isDefined(maximumData) || maximumData === null) return;
        for(var i=1; i<store.getCount(); i++){
            var maximumValue = maximumData.data['criteriaLevelValue'];
            if(!Ext.isDefined(maximumValue) || maximumValue===null && maximumValue!==0) break;
            //
            var row = store.getAt(i);
            var criteriaLevelValue = row.data['criteriaLevelValue'];
            if(Ext.isDefined(criteriaLevelValue) && criteriaLevelValue!==null){
                if(criteriaLevelValue>maximumValue){
                    maximumData = row;
                }
            } else {flag = false; break;}
            flag = true;
        }
        if(flag){
            //
            var idCriteriaLevel = me.down('#idCriteriaLevel');
            idCriteriaLevel.setValue(maximumData.data['idCriteriaLevel']);
            //
            var criticalityName = me.down('#criticalityName');
            criticalityName.setValue(maximumData.data['criteriaLevelName']);
            var criticalityValue = me.down('#criticalityValue');
            criticalityValue.setValue(maximumData.data['criteriaLevelValue']);
        }
    },
    
    getRiskCriteria: function(){
        var me = this;
        var maximumData = me.getRiskMaximumValue();
        if(!Ext.isDefined(maximumData) || maximumData===null) return;
        var probabilityData = me.getOcurrenceProbabilityData();
        if(!Ext.isDefined(probabilityData) || probabilityData===null) return;
        //
        var value = maximumData['criteriaLevelValue']*probabilityData['ocurrenceProbabilityValue']
        if(Ext.isDefined(value) && value!==null){
            Ext.BaseAjax.request({
                url: 'rest/riskLevel/getSingleByValue.htm',
//                async: false,
                method: "POST",
                params: { value: value },
                success: function(response){
                    var responseText = response.responseText;
                    var riskName = me.down('#riskName');
                    if(Ext.isDefined(responseText) && responseText!==null && responseText!==''){
                        var responseData = Ext.decode(responseText);
                        if(Ext.isDefined(responseData) && responseData!==null && responseData!==''){
                            var idRiskLevel = me.down('#idRiskLevel');
                            idRiskLevel.setValue(responseData['idRiskLevel']);
                            //
                            riskName.setValue(responseData['riskLevelName']);
                            var riskValue = me.down('#riskValue');
                            riskValue.setValue(value);
                        } else riskName.setValue(me.messages.valueNotApplied);
                    } else riskName.setValue(me.messages.valueNotApplied);
                }
            });
        }
    },
    
    getRiskMaximumValue: function(){
        var me = this;
        var consequenceGrid = me.down('#consequenceGrid');
        var store = consequenceGrid.store;
        var maximumData = store.getAt(0);
        var flag = false;
        if(!Ext.isDefined(maximumData) || maximumData === null) return;
        for(var i=1; i<store.getCount(); i++){
            var maximumValue = maximumData.data['criteriaLevelValue'];
            if(!Ext.isDefined(maximumValue) || maximumValue===null && maximumValue!==0) break;
            //
            var row = store.getAt(i);
            var criteriaLevelValue = row.data['criteriaLevelValue'];
            if(Ext.isDefined(criteriaLevelValue) && criteriaLevelValue!==null){
                if(criteriaLevelValue>maximumValue){
                    maximumData = row;
                }
            } else {
                flag = false; break;
            }
            flag = true;
        }
        if(flag){
            return maximumData.data;
        } else return null;
    },
            
    getOcurrenceProbabilityData: function(){
        var me = this;
        var combobox = me.down('#idOcurrenceProbability');
        var idOcurrenceProbability = combobox.getValue();
        if(!Ext.isDefined(idOcurrenceProbability) || idOcurrenceProbability===null) return;
        var store = combobox.store;
        var record = store.findRecord('idOcurrenceProbability', idOcurrenceProbability);
        if(record === null) return;
        var data = record.raw;
//        if(data === null) return;
        return data;
    },
            
    getRIMECriteria: function(){
        var me = this;
        var riskValueInput = me.down('#riskValue');
        var criticalityValueInput = me.down('#criticalityValue');
        var riskValue = riskValueInput.getValue(),
            criticalityValue = criticalityValueInput.getValue();
        if((Ext.isDefined(riskValue) && riskValue!==null && riskValue!=='') &&
            (Ext.isDefined(criticalityValue) && criticalityValue!==null && criticalityValue!=='')){
            var rimeIndex = riskValue*criticalityValue;
            var rimeIndexInput = me.down('#rimeIndex');
            if(Ext.isDefined(rimeIndex) && rimeIndex!==null){
                rimeIndexInput.setValue(rimeIndex);
                Ext.BaseAjax.request({
                    url: 'rest/rimeCriteriaValue/getSingleByValue.htm',
                    method: "POST",
                    params: { value: rimeIndex },
                    success: function(response){
                        var responseText = response.responseText;
                        var rimeCriteriaName = me.down('#rimeCriteriaName');
                        if(Ext.isDefined(responseText) && responseText!==null && responseText!==''){
                            var responseData = Ext.decode(responseText);
                            //
                            var maximumTimeAttention = me.down('#maximumTimeAttention');
                            if(Ext.isDefined(responseData) && responseData!==null && responseData!==''){
                                var idRimeCriteriaValue = me.down('#idRimeCriteriaValue');
                                idRimeCriteriaValue.setValue(responseData['idRimeCriteriaValue']);
                                //
                                rimeCriteriaName.setValue(responseData['rimeCriteria']['rimeCriteriaName']);
                                maximumTimeAttention.setValue(responseData['maximumTimeAttention']);
                            } else rimeCriteriaName.setValue(me.messages.valueNotApplied);
                        } else rimeCriteriaName.setValue(me.messages.valueNotApplied);
                    }
                });
            }
        }
    }
});