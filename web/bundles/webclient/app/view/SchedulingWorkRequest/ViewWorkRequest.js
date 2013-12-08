/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SchedulingWorkRequest.ViewWorkRequest', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.wiewWorkRequest',
    
    require: [
        'sisprod.view.base.BaseDataWindow',
        'sisprod.view.base.SensitiveComboBox'
    ],
    
    messages: {
        formTitle: 'Request Data',
        lotLabel: 'Lot',
        requestDateLabel: 'Date',
        workCategoryLabel: 'Work Category',
        workCategoryDetailLabel: 'Work Type',
        workRequestSourceLabel: 'Work Request Source',
        workRequestFullNumberLabel: 'Request Number',
        equipmentTypeLabel: 'Equipment Type',
        equipmentLabel: 'Equipment',
        locationLabel: 'Location',
        applicantLabel: 'Applicant',
        workDetailsLabel: 'Type work detail to perform',
        isSubstandardConditionLabel: 'Condition SubStandard',
        detectionDateLabel: 'Detencion Date',
        subStandardLabel: 'SubStandard',
        subStandardConditionActionLabel: 'SubStandard Condition Action',
        hsseSupervisorLabel: 'Supervisor',
        subStandardTitle: 'SubStandard',
        multiOrder: 'Will it generate more orders?'
    },
    
    title: 'View Work Request Details',
    modal: true,
    width: 660,
    layout: 'fit',
    
    initComponent: function(){
        var me = this;
        // Substandard Data
        var substandardWorkRequest = me.substandardWorkRequest,
            hsseSupervisor, substandard, detectionDate;
        if(Ext.isDefined(substandardWorkRequest) && substandardWorkRequest !== null) {
            if(Ext.isDefined(substandardWorkRequest['hsseSupervisor']) && substandardWorkRequest['hsseSupervisor'] !== null) {
                hsseSupervisor = Ext.String.format('{0} ({1})', substandardWorkRequest['hsseSupervisor']['employee']['person']['personFullName'],
                    substandardWorkRequest['hsseSupervisor']['employee']['person']['fullDocumentNumber']);
            }
            substandard = substandardWorkRequest['substandard']['substandardName'];
            detectionDate = substandardWorkRequest['detectionDate'];
        }
        //
        me.formOptions = {
            region: 'center',
            bodyStyle: 'padding:5px 5px 0',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'idWorkRequest',
                    id: 'idWorkRequest',
                    value: me.workRequest['idWorkRequest']
                },
                {
                    xtype:'fieldset',
                    title: me.messages.formTitle,
                    defaultType: 'textfield',
                    defaults: {anchor: '100%', labelWidth: 120},
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            anchor: '100%',
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 5,
                                    fieldLabel: me.messages.workRequestFullNumberLabel,
                                    labelWidth: 120,
                                    readOnly: true,
                                    value: me.workRequest['workRequestFullNumber']
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 3,
                                    labelWidth: 60,
                                    fieldLabel: me.messages.lotLabel,
                                    readOnly: true,
                                    margin: '0 0 0 10',
                                    value: me.workRequest['lot']['lotName']
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: me.messages.requestDateLabel,
                                    flex: 3,
                                    labelWidth: 60,
                                    readOnly: true,
                                    margin: '0 0 0 10',
                                    value: me.workRequest['requestDate']
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            anchor: '80%',
                            fieldLabel: me.messages.workRequestSourceLabel,
                            labelWidth: 120,
                            readOnly: true,
                            value: me.workRequest['workRequestSource']['workRequestSourceName']
                        },
                        {
                            xtype: 'textfield',
                            anchor: '80%',
                            labelWidth: 120,
                            readOnly: true,
                            fieldLabel: me.messages.workCategoryLabel,
                            value: me.workRequest['workCategoryDetail']['workCategory']['workCategoryName']
                        },
                        {
                            xtype: 'textfield',
                            anchor: '80%',
                            fieldLabel: me.messages.workCategoryDetailLabel,
                            labelWidth: 120,
                            readOnly: true,
                            value: me.workRequest['workCategoryDetail']['workCategoryDetailName']
                        },
                        {
                            xtype: 'textfield',
                            anchor: '50%',
                            fieldLabel : me.messages.equipmentTypeLabel,
                            labelWidth: 120,
                            readOnly: true,
                            value: me.workRequest['equipment']['equipmentType']['equipmentTypeName']
                        },
                        {
                            xtype: 'textfield',
                            anchor: '80%',
                            labelWidth: 120,
                            readOnly: true,
                            fieldLabel: me.messages.equipmentLabel,
                            value: Ext.String.format('{0} - {1} ({2})', me.workRequest['equipment']['equipmentName'],
                                me.workRequest['equipment']['equipmentCode'], me.workRequest['equipment']['location']['locationName'])
                        },
                        {
                            xtype: 'textfield',
                            anchor: '80%',
                            fieldLabel: me.messages.applicantLabel,
                            labelWidth: 120,
                            readOnly: true,
                            value: Ext.String.format('{0} ({1})', me.workRequest['applicant']['person']['personFullName'],
                                me.workRequest['applicant']['person']['fullDocumentNumber'])
                        },
                        {
                            xtype: 'checkbox',
                            anchor: '50%',
                            labelWidth: 120,
                            fieldLabel: me.messages.isSubstandardConditionLabel,
                            inputValue: true,
                            readOnly: true,
                            checked: me.workRequest['isSubstandardCondition']
                        }   
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: me.messages.subStandardTitle,
                    layout: 'anchor',
                    id: 'ipPanelSubstandard',
                    hidden: !me.workRequest['isSubstandardCondition'],
                    bodyPadding: 2,
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            labelWidth: 120,
                            readOnly: true,
                            fieldLabel: me.messages.hsseSupervisorLabel,
                            value: hsseSupervisor
                            
                        },
                        {
                            xtype: 'fieldcontainer',
                            anchor:'100%',
                            layout: {
                                type: 'hbox',
                                padding: '0 0 0 0'
                            }, 
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    labelWidth: 120,
                                    fieldLabel: me.messages.subStandardLabel,
                                    readOnly: true,
                                    value: substandard
                                },      
                                {
                                    xtype: 'datefield',
                                    margin: '0 0 0 10',
                                    labelWidth: 100,
                                    anchor: '50%',
                                    value : detectionDate,
                                    readOnly: true,
                                    fieldLabel: me.messages.detectionDateLabel
                                }
                            ]
                        }                        
                    ]
                },
                {
                    xtype:'fieldset',
                    columnWidth: 0.5,
                    title: me.messages.workDetailsLabel,
                    defaultType: 'textfield',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            readOnly: true,
                            value: me.workRequest['description']
                        }
                    ]
                },
                {
                    xtype: 'checkbox',
                    name: 'multiOrder',
                    labelWidth: 160,
                    fieldLabel: me.messages.multiOrder,
                    inputValue: true,
                    checked: me.workRequest['multiOrder']
                } 
            ]
        };
        
        me.callParent(arguments);
    }
});