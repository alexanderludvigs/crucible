"use strict";

var m = require("mithril"),
    
    db = require("../lib/firebase"),
    
    layout   = require("./layout"),
    listings = require("./content/listings");

module.exports = {
    controller : function() {
        var ctrl = this,
            schema = m.route.param("schema");
        
        db.child("schemas/" + schema).on("value", function(snap) {
            ctrl.schema = snap.val();
            
            ctrl.schema.key = snap.key();
            
            m.redraw();
        });
        
        ctrl.edit = function() {
            m.route("/schema/" + ctrl.schema.key);
        };
    },

    view : function(ctrl) {
        if(!ctrl.schema) {
            return m.component(layout);
        }
        
        return m.component(layout, {
            title   : ctrl.schema.name,
            content : m.component(listings, { schema : ctrl.schema })
        });
    }
};