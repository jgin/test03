/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.WellFeatureFluidLevelController', {
   extend: 'sisprod.controller.Base',
   entityName: 'WellFeatureFluidLevel',
   checkOutPermissions: false,
   
   messages: {
       selectFeatures: 'Select at least on feature!'
   },
   
   init : function() {
        this.control({
           'addWellFeatureFluidLevel button[action=save]': {
               click: this.onSave
           },
           
           'addWellFeatureFluidLevel button[action=refresh]': {
               click: this.onRefresh
           }
       });
       this.callParent(arguments);
    },
    
    afterLoadStore: function(panel){
        var me = this;
        var gridPanel = panel.down('#wellFeatureFluidLevelGrid');
        var gridStore = gridPanel.getStore();
        var selectionModel = gridPanel.getSelectionModel();
        selectionModel.deselectAll();
        for(var i = 0; i< gridStore.getTotalCount(); i++){
            var data = gridStore.getAt(i).data;
            if(data['checked']) selectionModel.select(i, true);
        }
    },       
    
    onRefresh: function(button){
        var me = this;
        var form = button.up('form');
        var gridPanel = form.down('#wellFeatureFluidLevelGrid');
        gridPanel.getStore().reload();
    },       
    
    onSave: function(button){
        var me = this;
        //
        var form = button.up('form');
        var gridPanel = form.down('#wellFeatureFluidLevelGrid');
        var selected = gridPanel.getSelectionModel().getSelection();
        if(selected.length > 0){
            var ids = new Array();
            for(var i = 0; i<selected.length; i++) {
                var data = selected[i].data;
                ids.push(data['idWellFeature']);
            }
            //
            Ext.BaseAjax.request({
                url: 'rest/wellFeatureFluidLevel/register.htm',
                params: { idWellFeatureStr: ids.join(',') },
                success: function(response){
                    var responseData = Ext.decode(response.responseText);
                    if(responseData.success) {
                        Ext.Msg.alert(me.controllerMessages.alertMessage, responseData.message);
                        gridPanel.getStore().reload();
                    }
                }
            });
        } else Ext.Msg.alert(me.controllerMessages.alertMessage, me.messages.selectFeatures);
    }
});

