Ext.define('sisprod.view.SdpCompany.AddSdpCompany', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addSdpCompany',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        sdpCompanyDataTitle:'Data de Company',
        sdpCompanyLabel:'Company',
        msgCompany: 'Enter Company',
        sdpCompanyRUCLabel:'RUC',
        sdpCompanyAddressLabel:'Address',
        wellServiceTypeNameLabel:'Name',
        wellServiceTypeAcronymLabel:'Acronym',
        wellServiceTypeDataTitle:'Services'
    },
    title: 'Add Well Service on Company',
    modal: true,
    width: 400,
    initComponent:function(){
        var me= this;
        me.formOptions= {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 120
        },
        items: [
                {
                    xtype:'fieldset',
                    title: me.messages.sdpCompanyDataTitle,
                    items: [
                        {
                            xtype: 'sensitivecombocontainer',
                            showAddButton: false,
                            flex: 5,
                            anchor: '100%',
                            sensitiveComboBoxOptions:{
                                name: 'company.idCompany',
                                fieldLabel: me.messages.sdpCompanyLabel,
                                store: Ext.create('sisprod.store.CompanyAll'),
                                emptyText: me.messages.msgCompany,
                                id: 'idCompany',
                                fieldStyle: {
                                    textTransform: 'uppercase'
                                },
                                forceSelection : true,
                                allowBlank: false,
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">','{companyName}','</tpl>'),
                                valueField: 'idCompany',
                                listConfig: {
                                    getInnerTpl: function() {
                                         return "{companyName}";
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            grow: true,
                            name: 'defEntity.entityRuc',
                            id: 'sdpCompanyRuc',
                            fieldLabel:me.messages.sdpCompanyRUCLabel,
                            anchor: '100%',
                            readOnly: true,
                            maxLength: 20
                        },
                        {
                            xtype: 'textfield',
                            grow: true,
                            name: 'defEntity.address',
                            id: 'sdpCompanyAddress',
                            fieldLabel:me.messages.sdpCompanyAddressLabel,
                            anchor: '100%',
                            readOnly: true,
                            maxLength: 20
                        }
                    ]
                },
                {
                    height: 120,
                    title: me.messages.wellServiceTypeDataTitle,
                    xtype: 'gridpanel',
                    id: 'gridWellServiceTypeSelector',
                    store: Ext.create('sisprod.store.WellServiceTypeAll').load(),
                    collapsible: true,
                    frame: true,
                    autoScroll: true,
                    name: 'gridWellServiceTypeSelector',
                    selModel: Ext.create('Ext.selection.CheckboxModel',{ mode: 'MULTI'}),
                    columns: [
                        {
                            text: 'idWellServiceType',
                            dataIndex: 'idWellServiceType',
                            flex: 1,
                            hidden:true
                        },
                        {
                            text: me.messages.wellServiceTypeNameLabel,
                            dataIndex: 'wellServiceTypeName',
                            flex: 2
                        },
                        {
                            text: me.messages.wellServiceTypeAcronymLabel,
                            dataIndex: 'wellServiceTypeAcronym',
                            flex: 2
                        }
                    ]
                }
            ]
        };
        me.callParent(arguments);
    }
});