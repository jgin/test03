/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.SdpActivityDetailController', {
   extend: 'sisprod.controller.Base',
   stores : ['SdpActivityDetailStore'],
   models : ['SdpActivityDetailModel'],
   entityName: 'SdpActivityDetail',
   refs: [{ref: 'listSdpActivityDetail', selector: 'listSdpActivityDetail'}],
   views : ['SdpActivityDetail.ListSdpActivityDetail'],
  
   requires: [
       'sisprod.store.SdpActivityDetailStore'
   ],
   
   deleteOptions: {
       deleteKeys: ['idSdpActivityDetail'],
       caption: '{sdpActivity.sdpActivityName} {wellService.well.wellName}'
   },
   
   init : function(){
        this.control({
            'listSdpActivityDetail button[action=activate]':{
               click: this.activate
           },
           'listSdpActivityDetail button[action=add]':{
               click: this.showAdd
           },
           
           'listSdpActivityDetail button[action=update]':{
               click: this.showUpdateOnButton
           },
           
           'listSdpActivityDetail button[action=delete]': {
               click: this.destroy
           },
           
           'listSdpActivityDetail button[action=print]': {
               click: this.showPrint
           },
           
           'addSdpActivityDetail button[action=save]': {
               click: this.saveEntity
           },
           
           'addSdpActivityDetail combobox[id=idSdp]': {
               select: this.onSelectWell
           },
           
           'updateSdpActivityDetail combobox[id=idSdp]': {
               select: this.onSelectWell
           },
           
           'updateSdpActivityDetail button[action=save]': {
               click: this.saveEntity
           }       
       });
       this.callParent(arguments);
    },
    getGridForEntity: function(){
        var tabGrid = this.getListSdpActivityDetail();
        return tabGrid.getGridPanel();
    },
    autoMappingFunction: function(grid, form, record){
        var varForm = form.down('form');
        varForm.loadRecord(record);
        var cboSdp = Ext.getCmp('idSdp');
        var cboSdpCompany = Ext.getCmp('cboSdpCompany');
        var wellServiceTypeName = Ext.getCmp('wellServiceTypeName');
        wellServiceTypeName.setValue(record.raw.wellService.wellServiceType.wellServiceTypeName);
        cboSdp.setValue(Ext.create(sisprod.getApplication().getModelName('WellService'),{
                idSdp: record.raw.wellService.idSdp,
                wellTplName: record.raw.wellService.well.wellName,
                wellServiceTypeTplName: record.raw.wellService.wellServiceType.wellServiceTypeName
        }));
        cboSdpCompany.setValue(Ext.create(sisprod.getApplication().getModelName('SdpCompany'),{
                idSdpCompany: record.raw.sdpCompany.idSdpCompany,
                companyName: record.raw.sdpCompany.company.companyName
        }));
    },
    onSelectWell: function(combo, selectedRecords, eOpts) {
        var wellServiceType = Ext.getCmp('wellServiceTypeName');
        wellServiceType.setValue(selectedRecords[0].raw.wellServiceType.wellServiceTypeName);
        var cboSdpCompany = Ext.getCmp('cboSdpCompany');
        cboSdpCompany.clearValue()
    },
    onSelectSdpCompanyForEdit: function(combobox, record, eventOptions){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getSelection()[0];
        selection.originalValues = {
            'sdpCompany.idSdpCompany': selection.data['sdpCompany.idSdpCompany']
        };
        selection.set('sdpCompany.idSdpCompany', record[0].data['idSdpCompany']);
    },
    onSelectSdpActivityForEdit: function(combobox, record, eventOptions){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getSelection()[0];
        selection.originalValues = {
            'sdpActivity.idSdpActivity': selection.data['sdpActivity.idSdpActivity']
        };
        selection.set('sdpActivity.idSdpActivity', record[0].data['idSdpActivity']);
    },
    afterEdit: function(editor, context, eventOptions){
        var me = this;
        var record = context.record.data;
        var values = {
            idSdpActivityDetail: record['idSdpActivityDetail'],
            idSdpCompany: record['sdpCompany.idSdpCompany'],
            totalHours: record['totalHour'],
            description: record['description'],
            idSdpActivity: record['sdpActivity.idSdpActivity'],
            isCompleted: record['isCompleted']
        };
        Ext.BaseAjax.request({
            url: 'rest/sdpActivityDetail/updateGrid.htm',
            method: 'POST',
            params: values,
            success: function(response, options){
                var objResponse = Ext.decode(response.responseText);
                if(objResponse.success === true){
                     var grid = me.getGridForEntity();
                     grid.getStore().reload();
                }
                else{
                    showAlertMessage(objResponse.message);
                }
            }
        });
    },
    beforeEdit: function(editor, context, eventOptions){
    },
    cancelEdit: function(editor, context, eventOptions){
        var me = this;
        var grid = me.getGridForEntity();
        var selection = grid.getSelectionModel().getLastSelected();
        var originalValues = selection.originalValues,
            idSdpCompany = null, idSdpActivity = null;
        if(Ext.isDefined(originalValues) && originalValues!==null){
            idSdpCompany = originalValues['sdpCompany.idSdpCompany'];
            if(Ext.isDefined(idSdpCompany) && idSdpCompany!==null)
                selection.set('sdpCompany.idSdpCompany', idSdpCompany);
            idSdpActivity = originalValues['sdpActivity.idSdpActivity'];
            if(Ext.isDefined(idSdpActivity) && idSdpActivity!==null)
                selection.set('sdpActivity.idSdpActivity', idSdpActivity);
        }
    },
    beforeSaveEntity:function(win, form, values){
        if(!Ext.isDefined(values.isCompleted)){
            values.isCompleted = false;
        }
        return true;
    }
});

