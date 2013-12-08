/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WellService.SdpFileGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        sdpFileTitle:"Sdp Files",
        fileNameLabel:"File Name",
        dateActivityLabel:"Date Activity",
        uploadButtonText:'Upload FIle',
        downloadButtonText:'Download',
        removeButtonText:'Remove',
        confirmText:'want to delete the file {0}?',
        alertMessage:'Message'
    },
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    id: 'sdpFileGrid',
    idSdp:null,
    store:null,
    height: 200,
    autoScroll:true,
    forceFit:true,
    initComponent: function(){
        var me = this;
        me.title=me.messages.sdpFileTitle;
        me.store = Ext.create('sisprod.store.SdpFileByWellServiceStore').load({
            params: { idSdp: me.idSdp }
        });
        me.columns= [
            {
                text: 'Id',
                dataIndex: 'idSdpFile',
                hidden:true,
                flex:1
            },
            {
                text: me.messages.fileNameLabel,
                dataIndex: 'fileName',
                flex:5
            },
            {
                text: me.messages.dateActivityLabel,
                dataIndex: 'dateActivity',
                flex:5
            },
            {
                text:me.messages.downloadButtonText,
                align:'center',
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                            var idSdpFile =record.raw['idSdpFile'];
                            return '<a href="rest/sdpFile/downloadSdp.htm?idSdpFile='+idSdpFile+'" target="_new"><img src="'+sisprod.getApplication().getImagePath('download.png')+'"/></a>';
                }
            }
        ];
        me.tbar=[
            {
                iconCls: 'remove',
                id: 'remove',
                text:me.messages.removeButtonText,
                action: 'removeFile' ,
                disabled: true
//                handler:function(){
//                    var grid=Ext.getCmp('sdpFileGrid');
//                    var record = grid.getSelectionModel().getSelection()[0];
//                    if(record){
//                    Ext.Msg.show({
//                        title: me.messages.alertMessage,
//                        msg: Ext.String.format(me.messages.confirmText, record.raw.fileName),
//                        buttons: Ext.Msg.YESNO,
//                        icon: Ext.Msg.QUESTION,
//                        fn: function(button){
//                            if(button==="yes"){
//                                var controllerName = sisprod.getApplication().getControllerName("SdpFile");    
//                                var controller = sisprod.getApplication().getController(controllerName);
//                                controller.deleteSdpFile(record,me);
//                            }
//                        }
//                    });
//                    }
//                }
            }
        ];
        me.listeners = {
            'selectionchange': function(view, records){
                me.down('#remove').setDisabled(!records.length);
            }
        };
    me.callParent(arguments);
    }
});


