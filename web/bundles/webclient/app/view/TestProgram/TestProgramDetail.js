/**
 * @author mvasquezj
 * @param {string} nombre de clase
 * @param {object} atributos de clase.
 */
Ext.define('sisprod.view.TestProgram.TestProgramDetail', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.testProgramDetail',
    
    requires: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Test Program Detail',
    modal: true,
    width: 1150,
    height: 500,
    layout: 'fit',
    month: null,
    year: null,
    textPeriod: '',
    gridStore: null,
    showWarningBeforeCancel: true,
    messages: {
        msgTitleGrid: 'Programming days',
        msgWell: 'Well',
        msgWellGroup: 'Group',
        msgWellType: 'Type',
        msgIn: 'in'
    },
    
    generateColumns: function(){    
        var gridColumns = new Array();
        if(this.year === null && this.month === null) return gridColumns;
        var gridColumns = new Array();
        gridColumns.push(
            {
                text: this.messages.msgWell,
                dataIndex: 'wellCode',
                width: 50
            },
            {
                text: this.messages.msgWellGroup,
                dataIndex: 'wellGroupName'
            },
            {
                text: this.messages.msgWellType,
                dataIndex: 'wellTypeByProductionAcronym',
                flex: 2
            });
        var numberDays = getDaysInMonthOfYear(this.month, this.year);
        for(var i = 1; i <= numberDays; i++){
            var column = {
                text: '<div align="center">' + getAcronymDay(new Date(this.year || new Date().getFullYear(), this.month - 1, i)) + '<br>' + i + '</div>',
                width: 45,
                dataIndex: '' + getStringDate(i, this.month, this.year),
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    //spinUpEnabled: false,
                    minValue: 0,
                    maxValue: 24
                }
            };
            gridColumns.push(column);
        }
        return gridColumns;
    },
            
    initComponent: function(){
        var me = this;
        me.formOptions = {
            fieldDefaults: {
                labelWidth: 100,
                margins: '0 0 0 5'
            },
            bodyPadding: 5,
            items: [
                {
                    frame: true,
                    renderTo: Ext.getBody(),
                    width: '100%',
                    height: 427,
                    margins: '5 0 0 0',
                    xtype: 'gridpanel',
                    id: 'gridTestProgramDetail',
                    title: me.messages.msgTitleGrid + ' - ' + me.batteryRecord.raw.batteryName + ' - ' + this.textPeriod,
                    plugins: [new Ext.grid.plugin.CellEditing({clicksToEdit: 1})],
                    collapsible: true,
                    columns: me.generateColumns(),
                    store: me.gridStore,
                    columnLines: true,
                    enableColumnMove: false
                }
            ]
        };
        me.callParent(arguments);
    }
});