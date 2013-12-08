/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.EquipmentType.UpdateEquipmentType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateEquipmentType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoMappingOptions: {
        autoMapping: false
    },
    messages:{
        equipmentTypeNameLabel:'Equipment Type',
        featureTitle:'Feature List',
        featureNameLabel:'Feature',
        addFeatureButtonText:'Add',
        removeFeatureButtonText:'Remove'
    },
    title: 'Update Equipment Type',
    modal: true,
    width: 570,
    initComponent:function(){
      var me =this;
      me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                id: 'idEquipmentType',
                name: 'idEquipmentType'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'equipmentTypeName',
                fieldLabel:me.messages.equipmentTypeNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth:120,
                anchor: '100%',
                allowBlank: false,
                maxLength: 150
            },
            {
                xtype: 'checkboxfield',
                id: 'usedInWorkOrder',
                name: 'usedInWorkOrder',
                labelWidth:190,
                fieldLabel: me.messages.usedInWorkOrderLabel,
                inputValue:true,
                anchor: '100%'
            },
            {
                    title:me.messages.featureTitle,
                    xtype: 'gridpanel',
                    id: 'featureGrid',
                    store: Ext.StoreManager.lookup('featureStoreGrid'),
                    collapsible: true,
                    columns: [
                        {
                            text: 'Id',
                            dataIndex: 'idFeature',
                            flex: 1,
                            hidden:true
                        },
                        {
                            text: me.messages.featureNameLabel,
                            dataIndex: 'featureName',
                            flex: 10
                        }
                    ],
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        items: ['->', 
                        {
                            xtype: 'sensitivecombobox',
                            width:410,
                            id: 'cboFeature',
                            fieldLabel:'',
                            store: Ext.create('sisprod.store.FeatureTemplate'),
//                                emptyText: me.messages.locationEmptyText,
                            forceSelection : true,
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">','{featureName}','</tpl>'),
                            valueField: 'idFeature',
                            listConfig: {
                                getInnerTpl: function() {
                                    return "{featureName}";
                                }
                            }
                        },
                        {
                            iconCls: 'add',
                            id: 'savefeature',
                            action: 'savefeature',
                            text: me.messages.addFeatureButtonText
                        }, 
                        {
                            iconCls: 'remove',
                            id: 'removefeature',
                            text: me.messages.removeFeatureButtonText
                        }
                        ]
                    }],
                    height: 200
                }
        ]
      };
      me.callParent(arguments);
    }    
});