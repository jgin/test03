/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Feature.UpdateFeature', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateFeature',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        featureLabel:'Equipment Feature',
        featureTypeLabel:'Feature Type',
        measureUnitLabel:'Measure Unit',
        dropdownValuesTitle:'Dropdown Values',
        dropdownValuesLabel:'Value',
        addItemButtonText:'Add',
        removeItemButtonText:'Remove'
        
    },
    title: 'Update Feature',
    modal: true,
    width: 500,
    initComponent:function(){
        var me=this;
       me.formOptions= {
       bodyPadding: 5, 
       items: [
            {
                xtype: 'textfield',
                name : 'idFeature',
                id: 'idFeature',
                fieldLabel: 'id',
                hidden:true  
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'featureName',
                labelWidth:150,
                fieldLabel:me.messages.featureLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 100,
                margins: '5 5 0 5'
            },
            {
                xtype: 'combobox',
                grow: true,
                labelWidth:150,
                name: 'idFeatureType',
                id: 'idFeatureType',
                store: Ext.create('sisprod.store.FeatureTypeStore'),
                fieldLabel:me.messages.featureTypeLabel,
                displayField: 'featureTypeName',
                valueField: 'idFeatureType',
                forceSelection: true,
                anchor: '100%',
                allowBlank: false
            },
            {
                xtype: 'combofieldcontainer',
                comboBoxOptions: {
                    xtype: 'combobox',
                    grow: true,
                    labelWidth:150,
                    name: 'idMeasureUnit',
                    id: 'idMeasureUnit',
                    store: Ext.create('sisprod.store.MeasureUnitAll'),
                    fieldLabel: me.messages.measureUnitLabel,
                    displayField: 'measureUnitName',
                    valueField: 'idMeasureUnit',
                    forceSelection: true,
                    width:400
                }
            },
            {
                    title:me.messages.dropdownValuesTitle,
                    xtype: 'gridpanel',
                    id: 'itemFeatureGrid',
                    store: Ext.StoreManager.lookup('itemFeatureListStore'),
                    collapsible: true,
                    columns: [
                        {
                            text: 'Id',
                            dataIndex: 'idItemFeatureList',
                            flex: 1,
                            hidden:true
                        },
                        {
                            text: me.messages.dropdownValuesLabel,
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
                            fieldLabel: me.messages.dropdownValuesLabel,
                            maxLength: 255,
                            margins: '5 5 0 5'
                        }, 
                        {
                            iconCls: 'add',
                            action: 'addItem',
                            text: me.messages.addItemButtonText
                        }, 
                        {
                            iconCls: 'remove',
                            action: 'removeItem',
                            text: me.messages.removeItemButtonText
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