/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.ManometricTest.ManometricTestData', {
    extend: 'Ext.panel.Panel',
    
    title: 'Manometric Test',
    
    messages: {
        labels: {
            initialLevel: 'Initial Level',
            finalLevel: 'Final Level',
            manometricTimeTest: 'Hour',
            comments: 'Comments',
            testDuration: 'Duration',
            minutes: 'Minutes',
            seconds: 'Seconds'
        }
    },
    
    layout: 'anchor',
    
    initComponent: function() {
        var me = this;
        
        var data = me['data'];
        var idManometricTest = null;
        var initialLevel = 0, finalLevel = 0, minutes = 0, seconds = 0, manometricTestTime;
        var comment = '';
        if(Ext.isDefined(data) && data !== null) {
            idManometricTest = data['idManometricTest'];
            initialLevel = data['initialLevel'];
            finalLevel = data['finalLevel'];
            minutes = data['minutes'];
            seconds = data['seconds'];
            manometricTestTime = data['manometricTestTime'];
            comment = data['comment'];
        }
        
        me.items = [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                padding: '8 8 8 8',
                items: [
                    {
                        xtype: 'numberfield',
                        name: 'initialLevel',
                        id: 'initialLevel',
                        fieldLabel: me.messages.labels.initialLevel,
                        flex: 1,
                        labelWidth: 80,
                        allowBlank: false,
                        vtype: 'numberrange',
                        endNumberField: 'finalLevel',
                        value: initialLevel
                    },
                    {
                        xtype: 'numberfield',
                        name: 'finalLevel',
                        id: 'finalLevel',
                        fieldLabel: me.messages.labels.finalLevel,
                        flex: 1,
                        allowBlank: false,
                        margins: '0 0 0 10',
                        vtype: 'numberrange',
                        startNumberField: 'initialLevel',
                        value: finalLevel
                    },
                    {
                        xtype: 'numberfield',
                        name: 'minutes',
                        fieldLabel: me.messages.labels.minutes,
                        flex: 1,
                        margins: '0 0 0 10',
                        minValue: 0,
                        allowBlank: false,
                        allowDecimals: false,
                        value: minutes
                    },
                    {
                        xtype: 'numberfield',
                        name: 'seconds',
                        fieldLabel: me.messages.labels.seconds,
                        flex: 1,
                        margins: '0 0 0 10',
                        minValue: 0,
                        maxValue: 60,
                        allowBlank: false,
                        allowDecimals: false,
                        value: seconds
                    }
                ]
            },
            {
                xtype: 'timefield',
                name: 'manometricTestTime',
                padding: '8 8 8 8',
                labelWidth: 80,
                fieldLabel: me.messages.labels.manometricTimeTest,
                format: 'H:i:s',
                anchor: '45%',
                flex: 1,
                value: manometricTestTime
            },
//            {
//                xtype: 'fieldcontainer',
//                layout: 'hbox',
//                padding: '8 8 8 8',
//                fieldLabel: me.messages.testDuration,
//                items: [
//                    {
//                        xtype: 'numberfield',
//                        name: 'initialLevel',
//                        fieldLabel: me.messages.labels.minutes,
//                        flex: 1
//                    },
//                    {
//                        xtype: 'numberfield',
//                        name: 'finalLevel',
//                        fieldLabel: me.messages.labels.seconds,
//                        flex: 1,
//                        margins: '0 0 0 10'
//                    }
//                ]
//            },
            {
                xtype: 'textarea',
                name: 'comment',
                labelWidth: 80,
                fieldLabel: me.messages.labels.comments,
                padding: '8 8 8 8',
                anchor: '100%',
                value: comment
            }
        ];
        if(Ext.isDefined(idManometricTest) && idManometricTest !== null) {
            me.items.push({
                xtype: 'hiddenfield',
                name: 'idManometricTest',
                value: idManometricTest
            });
        }
        me.callParent(arguments);
    }
});
