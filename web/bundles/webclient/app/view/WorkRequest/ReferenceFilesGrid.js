/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WorkRequest.ReferenceFilesGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        headers: {
            referenceFileName: 'File Name'
        },
        referenceFilesTitle: 'Reference Files',
        downloadButtonText: 'Download',
        removeButtonText: 'Remove',
        confirmText: 'Are you sure you want to delete {0}?',
        alertMessage: 'Message'
    },
    
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    id: 'referenceFilesGrid',
    
    idWorkRequest: null,
    store: null,
    
    height: 200,
    autoScroll:true,
//    forceFit:true,
    
    initComponent: function(){
        var me = this;
        //
        me.store = Ext.create('sisprod.store.ReferenceFilesByWorkRequestStore').load({
            params: { idWorkRequest: me.idWorkRequest }
        });
        //
        me.title=me.messages.referenceFilesTitle;        
        me.columns= [
            {
                text: 'Id',
                dataIndex: 'idWorkRequestReferenceFile',
                hidden: true,
                flex: 1
            },
            {
                text: me.messages.headers.referenceFileName,
                dataIndex: 'fileName',
                flex: 5
            },
            {
                text: me.messages.downloadButtonText,
                align: 'center',
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                    var idWorkRequestReferenceFile = record.data['idWorkRequestReferenceFile'];
                    return ['<a href="rest/workRequestReferenceFile/download.htm?idWorkRequestReferenceFile=',
                        idWorkRequestReferenceFile,
                        '" target="_new"><img src="',
                        sisprod.getApplication().getImagePath('download.png'),
                        '"/></a>'].join('');
                }
            }
        ];
        me.tbar = [
            {
                iconCls: 'remove',
                id: 'remove',
                text: me.messages.removeButtonText,
                    action: 'removeFile',
                disabled: true
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


