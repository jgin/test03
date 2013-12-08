Ext.define('sisprod.view.Employee.AddEmployee', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.addEmployee',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Employee',
    modal: true,
    width: 700,
    height: 400,
    layout: 'fit',
    messages: {
        documentType: 'Document Type',
        documentNumber: 'Document Number',
        paternalSurname: 'Paternal Surname',
        maternalSurname: 'Maternal Surname',
        personName: 'Person Name',
        address: 'Address',
        email: 'Email',
        phone: 'Phone',        
        company: 'Company',
        area: 'Area',
        position: 'Position',
        msgPersonData: 'Data Person',
        msgEmployeeData: 'Data Employee',
        bloodGroup: 'Blood Group',
        messageText: 'Message',
        personEmptyText: 'Person Empty',
        validations: {
            selectLot: 'Select Document Type first...'
        }
        
    },
    
    initComponent: function(){
        var me = this;
        me.formOptions= {
            fieldDefaults: {
                labelWidth: 80
            },
            bodyPadding: 2,
            items: [
                {
                    xtype:'fieldset',
                    title: me.messages.msgPersonData,
                    items: [
                        
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox',
                                padding: '0 0 0 0'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    showAddButton: false,
                                    name: 'idDocumentType',
                                    id: 'idDocumentType',
                                    flex: 1,
                                    fieldLabel: me.messages.documentType,
                                    store : Ext.create('sisprod.store.DocumentTypeAll').load(),
                                    displayField : 'documentTypeName',
                                    valueField : 'idDocumentType',
                                    emptyText: ' ',
                                    forceSelection : true,
                                    allowBlank : false,
                                    editable : false
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'idPerson',
                                    id: 'idPerson'
                                },
                                {
                                    xtype: 'sensitivecombo',
                                    flex:1,
                                    name: 'documentNumber',
                                    fieldLabel: me.messages.documentNumber,
                                    hideTrigger: false,
                                    store: Ext.create('sisprod.store.PersonByDocumentNumberStore',{
                                        listeners: {
                                            beforeload: function(store, operation, options){
                                                var form = me.down('form');
                                                var DocumentTypeInput = form.queryById('idDocumentType');
                                                var selectedDocumentType = DocumentTypeInput.getValue();
                                                if(Ext.isDefined(selectedDocumentType) && selectedDocumentType!==null){
                                                    if(Ext.isDefined(operation.params) && operation.params!==null){
                                                        operation.params.idDocumentType = selectedDocumentType;
                                                        
                                                    }
                                                    else operation.params = {query: '', idDocumentType: selectedDocumentType};
                                                }
                                                else{
                                                    Ext.Msg.alert(me.messages.messageText, me.messages.validations.selectLot);
                                                    return false;
                                                }
                                            }
                                        }
                                    }),
                                    margin: '0 0 0 15',
                                    emptyText: me.messages.personEmptyText,
                                    id: 'cboDocumentNumber',
                                    allowBlank: false,
                                    displayTpl: Ext.create('Ext.XTemplate',
                                        '<tpl for=".">','{documentNumber}','</tpl>'),
                                    valueField: 'documentNumber',
                                    listConfig: {
                                        getInnerTpl: function() {
                                            return "{documentNumber}";
                                        }
                                    }
                                }
                            ]
                        },
                        {
                                    xtype: 'textfield',
                                    name: 'paternalSurname',
                                    id: 'paternalSurname',
                                    anchor:'49%',
                                    fieldLabel: me.messages.paternalSurname,
                                    fieldStyle: {
                                        textTransform: 'uppercase'
                                    },
                                    margin: '0 0 5 0',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'maternalSurname',
                                    id: 'maternalSurname',
                                    fieldStyle: {
                                        textTransform: 'uppercase'
                                    },
                                    anchor:'49%',
                                    fieldLabel: me.messages.maternalSurname,
                                    margin: '0 0 5 0'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'personName',
                                    id: 'personName',   
                                    anchor:'49%',
                                    fieldLabel: me.messages.personName,
                                    fieldStyle: {
                                        textTransform: 'uppercase'
                                    },
                                    margin: '0 0 5 0',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'combobox',
                                    showAddButton: false,
                                    name: 'idBloodGroup',
                                    id: 'idBloodGroup',
                                    anchor:'49%',
                                    fieldLabel: me.messages.bloodGroup,
                                    store : Ext.create('sisprod.store.BloodGroupAll').load(),
                                    displayField : 'bloodGroupName',
                                    valueField : 'idBloodGroup',
                                    emptyText: ' ',
                                    forceSelection : true,
                                    editable : false,
                                    margin: '0 0 5 0'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox',
                                        padding: '0 0 0 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'address',
                                            id: 'address',
                                            flex: 1,
                                            fieldLabel: me.messages.address
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'email',
                                            id: 'email',
                                            flex: 1,
                                            fieldLabel: me.messages.email,
                                            margin: '0 0 0 15'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'phone',
                                    id: 'phone',
                                    flex: 1,
                                    fieldLabel: me.messages.phone
                                }
                            ]
                        },
                        {
                    xtype:'fieldset',
                    title: me.messages.msgEmployeeData,
                    height: 75,
//                    layout: {
//                        type: 'vbox',
//                        padding: '0 0 0 0'
//                    },
                    fieldDefaults: {
                        labelWidth: 60
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'entityIdCompany',
                            id: 'entityIdCompany'
                        },
                        {
                            xtype: 'textfield',
                            name: 'company',
                            id: 'company',
                            anchor: '100%',                      
                            fieldLabel: me.messages.company,
                            readOnly:true
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox',
                                padding: '0 0 0 0'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    showAddButton: false,
                                    name: 'dependency.idDependency',
                                    id: 'area',
                                    flex: 1,
                                    fieldLabel: me.messages.area,
                                    store : Ext.create('sisprod.store.DependencyAll').load(),
                                    displayField : 'dependencyName',
                                    valueField : 'idDependency',
                                    emptyText: ' ',
                                    forceSelection : true,
                                    allowBlank : false,
                                    editable : false
                                },
                                {
                                    xtype: 'combobox',
                                    showAddButton: false,
                                    name: 'position.idPosition',
                                    id: 'position',
                                    flex: 1,
                                    fieldLabel: me.messages.position,
                                    store : Ext.create('sisprod.store.PositionAll').load(),
                                    displayField : 'positionName',
                                    valueField : 'idPosition',
                                    emptyText: ' ',
                                    forceSelection : true,
                                    allowBlank : false,
                                    editable : false,
                                    padding: '0 0 0 15'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        
        me.callParent(arguments);
    }
});