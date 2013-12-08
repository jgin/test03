/* 
 * Filters: Equipo, Tipo Equipo, Fecha desde, hasta.
 */
Ext.define('sisprod.view.Reports.EquipmentAndWorkOrdersExecutedReports', {
    extend: 'sisprod.view.base.TabPanelItem',
    require: [
        'sisprod.view.base.BaseDataWindow',
        'sisprod.view.base.SensitiveComboBox'
    ],
    closable: true,
    layout:{
        type: 'vbox',
        align: 'center'
    },
    padding: '50 0 0 0',
    initComponent: function(){
       var me = this;
       
       me.items = new Array();
       
       var form = Ext.create('Ext.form.Panel', {
           title: 'Reporte',
           frame: true,
           width:400,
           layout:'anchor',
           defaults: {
                labelWidth: 100,
                anchor:'100%'
           },
           items:[
               {
                    xtype: 'combobox',
                    anchor: '70%',
                    fieldLabel : 'Tipo de Equipo',
                    store : Ext.create('sisprod.store.EquipmentTypeAll'),
                    displayField: 'equipmentTypeName',
                    valueField: 'idEquipmentType',
                    name:'idSelectEquipmentType',
                    emptyText: 'Seleccione'
//                    allowBlank:false,
//                    forceSelection : true
                },
                {
                   
                        xtype: 'sensitivecombobox',
                        name: 'idEquipment',
                        fieldLabel: 'Equipo',
                        store: Ext.create('sisprod.store.EquipmentNotAsignedTemplate'),
                        emptyText: 'Escriba el nombre del equipo',
                        forceSelection : true,
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">','{equipmentName}','</tpl>'),
                        valueField: 'idEquipment',
                        listConfig: {
                            getInnerTpl: function() {
                                return "{equipmentName} - {equipmentTypeName}";
                            }
                        }
                    
                },
                {
                     xtype: 'datefield',
                     anchor: '50%',                    
                     name: 'datefrom',
                     fieldLabel: 'Desde',
                     allowBlank: false,
                     value: new Date()
                },
                {
                     xtype: 'datefield',
                     anchor: '50%',
                     name: 'dateOfValidity',
                     fieldLabel: 'Hasta',
                     allowBlank: false,
                     value: new Date()
                }
            ],
            buttons:[
                {
                    id:'btnClearEquipmentAndWorkOrdersExecutedReports',
                    text:'Limpiar'
                },
                {
                    id:'btnPrintEquipmentAndWorkOrdersExecutedReports',                   
                    text:'Imprimir'
                }
            ]
        });
       me.items.push(form);
       me.callParent(arguments);
    }
});