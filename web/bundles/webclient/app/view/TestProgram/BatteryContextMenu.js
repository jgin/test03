/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.TestProgram.BatteryContextMenu', {
   extend: 'Ext.menu.Menu',
   alias: 'widget.batteryContextMenu',
   messages: {
       msgBattery: 'Battery',
       msgBatteryCode: 'Code',
       msgTitleList: 'No Program Battery',
       msgTipProgram: 'Program Battery'
   },
   width: 300,
   maxHeight:200,
   gridStore: null,
   initComponent: function(){
       var me = this;
       Ext.apply(this, {
           items: [
                {
                    title: me.messages.msgTitleList,
                    xtype: 'panel',
                    dockedItems: [{
                        dock: 'right',
                        xtype: 'toolbar',
                        items: [
                            {
                                iconCls: 'calendar',
                                xtype: 'button',
                                tooltip: me.messages.msgTipProgram,
                                action: 'programBattery'
                            }
                        ]
                    }],
                    items: [
                        {
                            margins: '5 0 0 0',
                            xtype: 'gridpanel',
                            id: 'gridTestProgramContext',
                            store: me.gridStore,
                            sortableColumns: false,
                            enableColumnHide: false,
                            columns: [
                                {
                                    text: me.messages.msgBattery,
                                    dataIndex: 'batteryName',
                                    flex: 10
                                },
                                {
                                    text: me.messages.msgBatteryCode,
                                    dataIndex: 'batteryCode',
                                    flex: 5
                                }
                            ]
                        }
                    ]
                }
           ]
       });
       me.callParent(arguments);
   }
});

