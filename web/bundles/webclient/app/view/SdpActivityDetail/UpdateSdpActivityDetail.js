

Ext.define('sisprod.view.SdpActivityDetail.UpdateSdpActivityDetail', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateSdpActivityDetail',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        wellServiceNameLabel:'Well',
        wellServiceTypeNameLabel:'Well Service Type',
        activityNameLabel:'Activity',
        dateActivityLabel:'Date Activity',
        sdpCompanyNameLabel:'Company',
        descriptionLabel:'Description',
        totalHoursLabel:'Total Hours',
        isCompletedLabel: 'Completed',
        messageText: 'Message',
        entityEmptySDPText: 'Seletect Well by SDP',
        validations: {
            selectWell: 'Select Well first...'
        }
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Sdp Activity Detail',
    modal: true,
    width: 400,
    initComponent:function(){
        var me= this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idSdpActivityDetail'
                },
                {
                    xtype: 'sensitivecombocontainer',
                    showAddButton: false,      
                    anchor:'75%',
                    sensitiveComboBoxOptions:{
                        name: 'wellService.idSdp',
                        hideTrigger: false,
                        fieldLabel: me.messages.wellServiceNameLabel,
                        store: Ext.create('sisprod.store.WellServiceBySdpProductionPeriodAll'),
                        id: 'idSdp',
                        emptyText: me.messages.entityEmptySDPText,
                        forceSelection : true,
                        allowBlank: false,
                        displayTpl: Ext.create('Ext.XTemplate',// - {wellServiceType.wellServiceTypeName}
                                '<tpl for=".">','{wellTplName} - {wellServiceTypeTplName}','</tpl>'),
                        valueField: 'idSdp',
                        listConfig: {
                                getInnerTpl: function() {
                                        return '{wellTplName} - {wellServiceTypeTplName}';
                                }
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    anchor:'75%',
                    name: 'wellServiceTypeName',
                    fieldLabel:me.messages.wellServiceTypeNameLabel,
                    readOnly: true,
                    id: 'wellServiceTypeName'
                },
                {
                    xtype: 'sensitivecombo',
                    anchor:'75%',
                    name: 'sdpCompany.idSdpCompany',
                    fieldLabel: me.messages.sdpCompanyNameLabel,
                    hideTrigger: false,
                    store: Ext.create('sisprod.store.SdpCompanyByWellServiceAll',{
                        listeners: {
                            beforeload: function(store, operation, options){
                                var form = me.down('form');
                                var idSdp = form.queryById('idSdp');
                                var selectedSdp = idSdp.getValue();
                                if(Ext.isDefined(selectedSdp) && selectedSdp!==null){
                                    if(Ext.isDefined(operation.params) && operation.params!==null)
                                        operation.params.idSdp = selectedSdp;
                                    else operation.params = {query: '', idSdp: selectedSdp};
                                }
                                else{
                                    Ext.Msg.alert(me.messages.messageText, me.messages.validations.selectWell);
                                    return false;
                                }
                            }
                        }
                    }),
                    id: 'cboSdpCompany',
                    allowBlank: false,
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">','{companyName}','</tpl>'),
                    valueField: 'idSdpCompany',
                    listConfig: {
                        getInnerTpl: function() {
                            return "{companyName}";
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    anchor:'75%',      
                    fieldLabel : me.messages.activityNameLabel,
                    store : Ext.create('sisprod.store.SdpActivityAll').load(),
                    allowBlank: false,
                    displayField : 'sdpActivityName',
                    valueField : 'idSdpActivity',
                    name:'sdpActivity.idSdpActivity',
                    forceSelection : true,
                    editable : false
                },
                {
                    xtype: 'datefield',
                    name: 'dateActivity',
                    id: 'dateActivity',
                    value : new Date(),
                    anchor:'75%',
                    fieldLabel: me.messages.dateActivityLabel
                },
                {
                    xtype: 'textareafield',
                    anchor: '100%',
                    fieldLabel: me.messages.descriptionLabel,
                    name: 'description',
                    id: 'description',
                    height: 50
                },
                {
                    xtype: 'numberfield',
                    grow: true,
                    name: 'totalHour',
                    fieldLabel: me.messages.totalHoursLabel,
                    anchor:'75%',
                    allowBlank: false,
                    allowDecimals: true,
                    allowNegative: false,
                    decimalSeparator:'.',
                    minValue:0
                },
                {
                    xtype: 'checkboxfield',
                    name: 'isCompleted',
                    fieldLabel: me.messages.isCompletedLabel,
                    inputValue:true,
                    allowBlank: false
                }
            ]
        };
        me.callParent(arguments);
    }
});