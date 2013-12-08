/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkOrderExecution.EvidenceFilesGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        evidenceFilesTitle:"Evidence Files",
        evidenceNameLabel:"Files Name",
        evidenceTypeName:"Evidence Type",
        uploadButtonText:'Upload Evidence',
        downloadButtonText:'Download',
        removeButtonText:'Remove',
        confirmText:'want to delete the file {0}?',
        alertMessage:'Message'
    },
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    id: 'evidenceFilesGrid',
    idWorkOrder:null,
//    store: Ext.create('sisprod.store.EvidenceFileByWorkOrderStore').load({params:{idWorkOrder:idWorkOrder}}),
    store:null,
    height: 200,
    autoScroll:true,
    forceFit:true,
    initComponent: function(){
        var me = this;
        me.title=me.messages.evidenceFilesTitle;
        me.columns= [
            {
                text: 'Id',
                dataIndex: 'idEvidenceFile',
                hidden:true,
                flex:1
            },
            {
                text: me.messages.evidenceNameLabel,
                dataIndex: 'fileName',
                flex:5
            },
            {
                text: me.messages.evidenceTypeName,
                dataIndex: 'evidenceDocumentType.evidenceDocumentTypeName',
                flex:2
            },
            {
//                xtype: 'actioncolumn',
                text:me.messages.downloadButtonText,
                align:'center',
//                icon:sisprod.getApplication().getImagePath('download.png'),
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                            var idEvidenceFile =record.raw['idEvidenceFile'];
                            return '<a href="rest/evidenceFile/downloadEvidence.htm?idEvidenceFile='+idEvidenceFile+'" target="_new"><img src="'+sisprod.getApplication().getImagePath('download.png')+'"/></a>';
                }
            }
        ];
        me.tbar=[,
            {
                iconCls: 'upload',
                text:me.messages.uploadButtonText,
                action: 'uploadFile'       
            },
            {
                iconCls: 'remove',
                text:me.messages.removeButtonText,
                action: 'removeFile',  
                handler:function(){
                    var grid=Ext.getCmp('evidenceFilesGrid');
                    var record = grid.getSelectionModel().getSelection()[0];
                    if(record){
                    Ext.Msg.show({
                        title: me.messages.alertMessage,
                        msg: Ext.String.format(me.messages.confirmText, record.raw.fileName),
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.Msg.QUESTION,
                        fn: function(button){
                            if(button==="yes"){
                                var controllerName = sisprod.getApplication().getControllerName("EvidenceFile");    
                                var controller = sisprod.getApplication().getController(controllerName);
                                controller.deleteEvidenceFile(record,me);
                            }
                        }
                    });
                    }
                }
            }
        ]
    me.callParent(arguments);
    }
});


