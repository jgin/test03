Ext.onReady(function() {

    // Add the additional 'advanced' VTypes
    Ext.apply(Ext.form.field.VTypes, {
        daterange: function(val, field) {
            var date = field.parseDate(val);

            if (!date) {
                return false;
            }
            if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                var start = field.up('form').down('#' + field.startDateField);
                start.setMaxValue(date);
                start.validate();
                this.dateRangeMax = date;
            }
            else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                var end = field.up('form').down('#' + field.endDateField);
                end.setMinValue(date);
                end.validate();
                this.dateRangeMin = date;
            }
            /*
             * Always return true since we're only using this vtype to set the
             * min/max allowed values (these are tested for after the vtype test)
             */
            return true;
        },

        timerange : function(val, field) {
            var time = field.parseDate(val);
            if(!time){
                return;
            }
            if (field.startTimeField && (!this.timeRangeMax || (time.getTime() != this.timeRangeMax.getTime()))) {
                var start = Ext.getCmp(field.startTimeField);
                start.maxValue = time;
                start.validate();
                this.timeRangeMax = time;
            } 
            else if (field.endTimeField && (!this.timeRangeMin || (time.getTime() != this.timeRangeMin.getTime()))) {
                var end = Ext.getCmp(field.endTimeField);
                end.minValue = time;
                end.validate();
                this.timeRangeMin = time;
            }
            return true;
        },
        daterangeText: 'Start date must be less than end date',

        numberrange: function (val, field) {
            if (!val) {
                return;
            }
            if (field.startNumberField && (!field.numberRangeMax || (val != field.numberRangeMax))) {
                var start = Ext.getCmp(field.startNumberField);
                if (start) {
                    start.setMaxValue(val);
                    field.numberRangeMax = val;
                    start.validate();
                }
            } else if (field.endNumberField && (!field.numberRangeMin || (val != field.numberRangeMin))) {
                var end = Ext.getCmp(field.endNumberField);
                if (end) {
                    end.setMinValue(val);
                    field.numberRangeMin = val;
                    end.validate();
                }
            }
            return true;
        },

        password: function(val, field) {
            if (field.initialPassField) {
                var pwd = field.up('form').down('#' + field.initialPassField);
                return (val == pwd.getValue());
            }
            return true;
        },

        passwordText: 'Passwords do not match'
    });
});
