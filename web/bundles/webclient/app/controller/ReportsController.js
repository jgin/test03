/**
 * @param {string} nombre de la clase
 * @param {object} atributos de la clase
 */
Ext.define('sisprod.controller.ReportsController', {
   extend: 'sisprod.controller.Base',
   entityName: 'Reports',
   checkOutPermissions: false,
   
   init : function() {
        this.control({
//           'reportBasePrintWindow button[action=print]': {
//               click: this.onPrint
//           },
           
           'performedActivitiesReports combobox[id^=idWorkCategory]': {
               select: this.onSelectWorkCategory
           },
           
           'productivityByQuadrilleReports combobox[id^=idWorkCategory]': {
               select: this.onSelectWorkCategory
           },
           
           'managementQuadrilleWorkReports combobox[id^=idWorkCategory]': {
               select: this.onSelectWorkCategory
           }
       });
       this.callParent(arguments);
    },
    
    onSelectWorkCategory: function(combobox, records, event) {
        var formPanel = combobox.up('form');
        var result = formPanel.query('combobox[id^=idWorkType]');
        var workCategoryDetail;
        if(result.length > 0) workCategoryDetail = result[0];
        if(Ext.isDefined(workCategoryDetail) && workCategoryDetail !== null){
            workCategoryDetail.clearValue();
            workCategoryDetail.getStore().reload();
        }
    }
});

