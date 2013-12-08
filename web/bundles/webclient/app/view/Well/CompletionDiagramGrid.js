
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.Well.CompletionDiagramGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        headers: {
            referenceFileName: 'File Name',
            effectiveDate: 'Effective Date'
        },
        completionDiagramTitle: 'Completion Diagrams',
        downloadButtonText: 'Download',
        removeButtonText: 'Remove',
        confirmText: 'Are you sure you want to delete {0}?',
        alertMessage: 'Message'
    },
    conversionFormats:{
        dateFormat: 'd-m-Y'
    },
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    id: 'completionDiagramGrid',
    
    idWorkRequest: null,
    store: null,
    
    height: 200,
    autoScroll:true,
//    forceFit:true,
    
    initComponent: function(){
        var me = this;
        //
        me.store = Ext.create('sisprod.store.CompletionDiagramByWell').load({
            params: { idWell: me.idWell }
        });
        //
        me.title=me.messages.completionDiagramTitle;        
        me.columns= [
            {
                text: 'Id',
                dataIndex: 'idCompletionDiagram',
                hidden: true,
                flex: 1
            },
            {
                text: me.messages.headers.referenceFileName,
                dataIndex: 'fileName',
                flex: 5
            },
            {
                text: me.messages.headers.effectiveDate,
                dataIndex: 'effectiveDate',
                flex: 2,
                renderer:function(value, metaData, record, rowIndex, colIndex, store, view){
                    return Ext.util.Format.date(value, me.conversionFormats.dateFormat);
                }              
            },
            {
                text: me.messages.downloadButtonText,
                align: 'center',
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
                    var idCompletionDiagram = record.data['idCompletionDiagram'];
                    return ['<a href="rest/completionDiagram/downloadCompletionDiagram.htm?idCompletionDiagram=',
                        idCompletionDiagram,
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


