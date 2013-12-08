/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WellFeature.UpdateWellFeature', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateWellFeature',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Edit Well Feature',
    modal: true,
    width: 500,
    
    messages: {
        msgFeatureName : 'Well Feature',
        msgFeatureType : 'Feature Type',
        msgMeasureUnit : 'Measure Unit',
        msgTitleList: 'Dropdown Values',
        msgValue: 'Value',
        msgAdd:'Add',
        msgRemove:'Remove',
        msgUpdateInWellTest: 'Update in well test',
        msgUpdateInWellService: 'Update in well service'
    },
   
    initComponent: function(){
        var me = this;
        me.formOptions = {
            fieldDefaults: {
                labelWidth: 105
            }, 
            bodyPadding: 5, 
            items: [
                 {
                     xtype: 'textfield',
                     name : 'idWellFeature',
                     id: 'idWellFeature',
                     fieldLabel: 'id',
                     hidden:true  
                 },
                 {
                    xtype: 'textfield',
                    grow: true,
                    name: 'wellFeatureName',
                    fieldLabel: me.messages.msgFeatureName,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 100,
                    margins: '5 5 0 5'
                },
                {
                    xtype: 'combobox',
                    grow: true,
                    name: 'idFeatureType',
                    id: 'idFeatureType',
                    store: Ext.create('sisprod.store.FeatureTypeStore').load({
                        callback: function(){
                            if(Ext.isDefined(me.controller) && me.controlle !== null)
                                me.controller.loadItemWellFeatures();
                        }
                    }),
                    fieldLabel: me.messages.msgFeatureType,
                    displayField: 'featureTypeName',
                    valueField: 'idFeatureType',
                    emptyText: 'Seleccione',
                    anchor: '100%',
                    allowBlank: false
                },
                {
                    xtype: 'combofieldcontainer',
                    comboBoxOptions:{
                        xtype: 'combobox',
                        grow: true,
                        name: 'idMeasureUnit',
                        id: 'idMeasureUnit',
                        store: 'MeasureUnitAll',
                        fieldLabel: me.messages.msgMeasureUnit,
                        displayField: 'measureUnitName',
                        valueField: 'idMeasureUnit',
                        emptyText: 'Seleccione',
                        forceSelection: true,
                        anchor: '100%'
                    }
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldDefaults:{
                        labelWidth: 180
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            name: 'updateInWellTest',
                            fieldLabel: me.messages.msgUpdateInWellTest,
                            id: 'updateInWellTest',
                            inputValue: true
                        },
                        {
                            xtype: 'checkboxfield',
                            name: 'updateInWellService',
                            fieldLabel: me.messages.msgUpdateInWellService,
                            id: 'updateInWellService',
                            inputValue: true
                        }
                    ]
                },
                {
                        title: me.messages.msgTitleList,
                        xtype: 'gridpanel',
                        id: 'itemWellFeatureGrid',
                        store: Ext.StoreManager.lookup('itemWellFeatureListStore'),
                        collapsible: true,
                        columns: [
                            {
                                text: 'Id',
                                dataIndex: 'idItemWellFeatureList',
                                flex: 1,
                                hidden:true
                            },
                            {
                                text: me.messages.msgValue,
                                dataIndex: 'itemValue',
                                flex: 10
                            }
                        ],
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [ 
                            {
                                xtype: 'textfield',
                                grow: true,
                                name: 'itemValue',
                                id: 'itemValue',
                                flex: 8,
                                labelWidth: 30,
                                fieldLabel: me.messages.msgValue,
                                maxLength: 255,
                                margins: '5 5 0 5'
                            }, 
                            {
                                iconCls: 'add',
                                action: 'addItem',
                                text: me.messages.msgAdd
                            }, 
                            {
                                iconCls: 'remove',
                                action: 'removeItem',
                                text: me.messages.msgRemove
                            }
                            ]
                        }],
                        height: 200,
                        hidden: true
                }
             ]
         };
         me.callParent(arguments);        
    }
});