/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.TestProgram.ListTestProgram', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listTestProgram',
    options: {},
    entityName: '',
    title: '',
    listTitle: 'Listado Programas de Pruebas',
    
    usedInDailyReport: true,
    
    gridOptions: {
        region: 'center'
    },
    
    requires: [
       'sisprod.view.base.TabPanelGridItem'
    ],
    
    showCheckInactive: false,
    initComponent: function(){
        var me = this;
        var storeName = sisprod.getApplication().getStoreName(this.entityName);
        var modelName = sisprod.getApplication().getModelName(this.entityName);
        me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idTestProgram: {
                        header: 'Identificador de Registro'
                    },
                    idLot: {
                        header: 'Id Lote'
                    },        
                    lotName: {
                        header: 'Lote'
                    },
                    employeeElaborationName: {
                        header: 'Elaboro'
                    },
                    elaborationDate: {
                        header: 'Fecha de Elaboración'
                    },
                    effectiveStartDate: {
                        header: 'Fecha de Inicio'
                    },
                    effectiveEndDate: {
                        header: 'Fecha de Fín'
                    },
                    comment: {
                        header: 'Comentario'
                    }                
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});

