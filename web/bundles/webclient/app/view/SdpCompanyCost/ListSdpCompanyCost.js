/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.SdpCompanyCost.ListSdpCompanyCost',{
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.listSdpCompanyCost',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        SdpCompanyCostTitle:"Cost",
        sdpCompanyNameLabel:"Company Name",
        amountLabel:"Amount",
        moneyNameLabel:"Money",
        addButtonText:'Add Cost Well Service',
        downloadButtonText:'Download',
        removeButtonText:'Remove',
        updateButtonText:'Update',
        confirmText:'want to delete the file {0}?',
        alertMessage:'Message',
        costTitle:'List Cost Well Service'
    },
    id: 'listSdpCompanyCost',
    data: {},
    store:null,
    hasButtons: false,
    width: 500,
    autoScroll:true,
    forceFit:true,
    title: 'List Cost Well Service',
    initComponent: function(){
        
        var me = this;
        var wellName = me.data['well.wellName'];
        if(Ext.isDefined(wellName) && wellName !== null){
            me.title = Ext.String.format('{0} ({1})', me.title, wellName);
        }
        me.formOptions= {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 120
        },
        items: [
            {
                xtype: 'gridpanel',
                id: 'gridSdpCompanyCost',
                title: me.messages.costTitle,
                store: Ext.create('sisprod.store.SdpCompanyCostStore').load({
                    params: {idSdp:  me.data['idSdp']  }
                }),
                collapsible: true,
                frame: true,
                height: 310,
                columns: [
                    {
                        text: 'Id',
                        dataIndex: 'idSdpCompanyCost',
                        hidden:true,
                        flex:1
                    },
                    {
                        text: me.messages.sdpCompanyNameLabel,
                        dataIndex: 'sdpCompany.company.companyName',
                        flex:5
                    },
                    {
                        text: me.messages.amountLabel,
                        dataIndex: 'amount',
                        flex:2
                    },
                    {
                        text: me.messages.moneyNameLabel,
                        dataIndex: 'money.moneyName',
                        flex:3
                    },
                    {
                        text:me.messages.downloadButtonText,
                        align:'center',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                                    var idSdpCompanyCost =record.raw['idSdpCompanyCost'];
                                    return '<a href="rest/sdpCompanyCost/downloadSdpCompanyCost.htm?idSdpCompanyCost='+idSdpCompanyCost+'" target="_new"><img src="'+sisprod.getApplication().getImagePath('download.png')+'"/></a>';
                        }
                    }
                ]
            }            
        ],
        buttons: [ 
        { 
            text: me.windowMessages.closeText, 
            iconCls: 'cancel', 
            action: 'close', 
            handler: function() { 
            me.close(); 
            } 
        } 
        ]
        };
        me.tbar=[,
            {
                iconCls: 'add',
                text:me.messages.addButtonText,
                action: 'addCostWellService'       
            },
            {
                iconCls: 'edit',
                text:me.messages.updateButtonText,
                action: 'updateCostWellService', 
                disabled: true,
                id: 'update'
            },
            {
                iconCls: 'remove',
                text:me.messages.removeButtonText,
                action: 'removeCostWellService', 
                disabled: true,
                id: 'remove'
            }            
        ];
    me.formOptions.items[0].listeners = {
        'selectionchange': function(view, records){
            me.down('#remove').setDisabled(!records.length);
            me.down('#update').setDisabled(!records.length);
        }
    };
    me.callParent(arguments);
    }
});


