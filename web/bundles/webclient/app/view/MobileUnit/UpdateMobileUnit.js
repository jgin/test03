Ext.define('sisprod.view.MobileUnit.UpdateMobileUnit', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateMobileUnit',
    messages: {
        basicDataTitle: 'Basic Data',
        componentsTitle: 'Allocation of Components',
        featuresTitle: 'Additional Features',
        equipmentNameLabel: 'Equipment Name',
        equipmentModelLabel: 'Model',
        equipmentCodeLabel: 'Code',
        serialNumberLabel: 'Serial Number',
        equipmentTypeLabel: 'Equipment Type',
        markLabel: 'Mark',
        equipmentConditionLabel: 'Condition',
        locationLabel: 'Location',
        locationEmptyText: 'Type a Location',
        equipmentEmptyText: 'Type a Equipment',
        addButtonText: 'Add',
        removeButtonText: 'Remove',
        supplierLabel: 'Owner',
        isOwn: 'Is Own',
        firstSelectALot: 'Select a Lot First',
        lot: 'Lot'
    },
    title: 'Update Mobile Unit',
    modal: true,
    width: 550,
    initComponent: function() {
        var me = this;
        me.formOptions = {
            bodyPadding: 2,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idMobileUnit',
                    id: 'idMobileUnit'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'idEquipment',
                    id: 'idEquipment'
                },
                {
                    xtype: 'tabpanel',
                    height: 350,
                    items: [
                        {
                            id: 'basicData',
                            xtype: 'panel',
                            layout: 'anchor',
                            title: me.messages.basicDataTitle,
                            autoScroll: true,
                            margin: '5 5 0 5',
                            items: [
                                {
                                    xtype: 'textfield',
                                    grow: true,
                                    name: 'equipmentName',
                                    fieldLabel: me.messages.equipmentNameLabel,
                                    fieldStyle: {
                                        textTransform: 'uppercase'
                                    },
                                    labelWidth: 120,
                                    anchor: '100%',
                                    allowBlank: false,
                                    maxLength: 200
                                },
                                {
                                    xtype: 'textfield',
                                    grow: true,
                                    name: 'equipmentModel',
                                    fieldLabel: me.messages.equipmentModelLabel,
                                    fieldStyle: {
                                        textTransform: 'uppercase'
                                    },
                                    labelWidth: 120,
                                    anchor: '100%',
                                    maxLength: 100
                                },
                                {
                                    xtype: 'textfield',
                                    grow: true,
                                    name: 'equipmentCode',
                                    fieldLabel: me.messages.equipmentCodeLabel,
                                    fieldStyle: {
                                        textTransform: 'uppercase'
                                    },
                                    labelWidth: 120,
                                    anchor: '100%',
                                    maxLength: 200
                                },
                                {
                                    xtype: 'textfield',
                                    grow: true,
                                    name: 'serialNumber',
                                    fieldLabel: me.messages.serialNumberLabel,
                                    fieldStyle: {
                                        textTransform: 'uppercase'
                                    },
                                    labelWidth: 120,
                                    anchor: '100%',
                                    maxLength: 50
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: me.messages.supplierLabel,
                                    store: Ext.create('sisprod.store.SupplierAll').load(),
                                    displayField: 'entityName',
                                    valueField: 'idSupplier',
                                    name: 'cboSupplier',
                                    id: 'cboSupplier',
                                    labelWidth: 120,
                                    forceSelection: true,
                                    allowBlank: true,
                                    editable: false,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'combofieldcontainer',
                                    showButtons: false,
                                    comboBoxOptions: {
                                        xtype: 'combobox',
                                        anchor: '100%',
                                        fieldLabel: me.messages.equipmentTypeLabel,
                                        labelWidth: 120,
                                        store: Ext.create('sisprod.store.EquipmentTypeAll').load(),
                                        displayField: 'equipmentTypeName',
                                        valueField: 'idEquipmentType',
                                        name: 'idEquipmentType',
                                        id: 'idEquipmentType',
                                        allowBlank: false,
                                        forceSelection: true,
                                        editable: false,
                                        width: 455,
                                        readOnly: true
                                    }
                                },
                                {
                                    xtype: 'combofieldcontainer',
                                    comboBoxOptions: {
                                        xtype: 'combobox',
                                        width: 455,
                                        fieldLabel: me.messages.markLabel,
                                        labelWidth: 120,
                                        store: Ext.create('sisprod.store.MarkAll').load(),
                                        displayField: 'markName',
                                        valueField: 'idMark',
                                        name: 'idMark',
                                        id: 'idMark',
                                        forceSelection: true,
                                        editable: false
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    grow: true,
                                    name: 'idLot',
                                    id: 'idLot',
                                    labelWidth: 120,
                                    store: Ext.create('sisprod.store.LotAll'),
                                    fieldLabel: me.messages.lot,
                                    displayField: 'lotName',
                                    valueField: 'idLot',
                                    allowBlank: false,
                                    margins: '0 5 0 0',
                                    forceSelection: true,
                                    editable: false,
                                    flex: 1
                                },
                                {
                                    xtype: 'sensitivecombocontainer',
                                    anchor: '100%',
                                    sensitiveComboBoxOptions: {
                                        labelWidth: 120,
                                        width: 455,
                                        name: 'idLocation',
                                        id: 'idLocation',
                                        fieldLabel: me.messages.locationLabel,
                                        store: Ext.create('sisprod.store.LocationTemplate'),
                                        emptyText: me.messages.locationEmptyText,
                                        forceSelection: true,
                                        displayTpl: Ext.create('Ext.XTemplate',
                                                '<tpl for=".">', '{locationName}', '</tpl>'),
                                        valueField: 'idLocation',
                                        listConfig: {
                                            getInnerTpl: function() {
                                                return "{locationName}";
                                            }
                                        }
                                    }
                                },
                                {
                                    xtype: 'combofieldcontainer',
                                    comboBoxOptions: {
                                        xtype: 'combobox',
                                        anchor: '100%',
                                        fieldLabel: me.messages.equipmentConditionLabel,
                                        labelWidth: 120,
                                        store: Ext.create('sisprod.store.EquipmentConditionAll').load(),
                                        displayField: 'equipmentConditionName',
                                        valueField: 'idEquipmentCondition',
                                        name: 'idEquipmentCondition',
                                        id: 'idEquipmentCondition',
                                        forceSelection: true,
                                        editable: false,
                                        width: 455
                                    }
                                },
                                {
                                    xtype: 'checkbox',
                                    grow: true,
                                    name: 'own',
                                    id: 'own',
                                    fieldLabel: me.messages.isOwn,
                                    labelWidth: 120,
                                    anchor: '100%'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'anchor',
                            autoScroll: true,
                            title: me.messages.componentsTitle,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    id: 'componentsGrid',
                                    store: Ext.StoreManager.lookup('componentStoreGrid'),
                                    collapsible: true,
                                    columns: [
                                        {
                                            text: 'Id',
                                            dataIndex: 'idEquipment',
                                            flex: 1,
                                            hidden: true
                                        },
                                        {
                                            text: me.messages.equipmentNameLabel,
                                            dataIndex: 'equipmentName',
                                            flex: 10
                                        }
                                    ],
                                    dockedItems: [{
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            items: ['->',
                                                {
                                                    xtype: 'sensitivecombo',
                                                    width: 350,
                                                    name: 'cboComponent',
                                                    fieldLabel: '',
                                                    store: Ext.create('sisprod.store.EquipmentNotAsignedTemplate'),
                                                    emptyText: me.messages.equipmentEmptyText,
                                                    id: 'cboComponent',
                                                    forceSelection: true,
                                                    displayTpl: Ext.create('Ext.XTemplate',
                                                            '<tpl for=".">', '{equipmentName}', '</tpl>'),
                                                    valueField: 'idEquipment',
                                                    listConfig: {
                                                        getInnerTpl: function() {
                                                            return "{equipmentName} - {equipmentTypeName}";
                                                        }
                                                    }
                                                },
                                                {
                                                    iconCls: 'add',
                                                    id: 'savecomponent',
                                                    action: 'savecomponent',
                                                    text: me.messages.addButtonText
                                                },
                                                {
                                                    iconCls: 'remove',
                                                    id: 'removecomponent',
                                                    text: me.messages.removeButtonText
                                                }
                                            ]
                                        }]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: 'featuresPanel',
                            layout: 'anchor',
                            autoScroll: true,
                            title: me.messages.featuresTitle,
                            width: '100%',
                            height: 250,
                            border: true,
                            bodyPadding: 5,
                            fieldDefaults: {
                                labelWidth: 250
                            },
                            items: [
                            ]
                        }

                    ]
                }
            ]
        };
        me.callParent(arguments);
    }
});