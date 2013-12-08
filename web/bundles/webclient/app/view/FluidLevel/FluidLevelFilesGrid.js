/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.FluidLevel.FluidLevelFilesGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        headers: {
            fileName: 'File Name'
        },
        filesTitle: 'Fluid Level Files',
        downloadButtonText: 'Download',
        removeButtonText: 'Remove',
        confirmText: 'Are you sure you want to delete {0}?',
        alertMessage: 'Message'
    },
    
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    id: 'fluidLevelFilesGrid',
    
    idFluidLevel: null,
    store: null,
    
    height: 200,
    autoScroll:true,
//    forceFit:true,
    
    initComponent: function(){
        var me = this;
        //
        me.store = Ext.create('sisprod.store.FluidLevelFilesByFluidLevelStore').load({
            params: { idFluidLevel: me.idFluidLevel }
        });
        //
        me.title=me.messages.filesTitle;        
        me.columns= [
            {
                text: 'Id',
                dataIndex: 'idFluidLevelFile',
                hidden: true,
                flex: 1
            },
            {
                text: me.messages.headers.fileName,
                dataIndex: 'fileName',
                flex: 5
            },
            {
                text: me.messages.downloadButtonText,
                align: 'center',
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                    var idFluidLevelFile = record.data['idFluidLevelFile'];
                    return ['<a href="rest/fluidLevelFile/download.htm?idFluidLevelFile=',
                        idFluidLevelFile,
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


