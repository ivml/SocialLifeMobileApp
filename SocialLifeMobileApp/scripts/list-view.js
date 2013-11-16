(function (global) {
    var ListViewModel,
    app = global.app = global.app || {};

    ListViewModel = kendo.data.ObservableObject.extend({
        friends: [],
        areUsersFound: false,
        events: [],
        areEventsFound: false,
        isLoggedIn: false,

        init: function () {
            var that = this;
            
            kendo.data.ObservableObject.fn.init.apply(that, []);
        },
        
        onLoad: function (e) {
            var that = global.app.listService.viewModel;
            
            var users = global.app.profileService.viewModel;
            
            that.set("isLoggedIn", global.app.isLoggedIn);
            
            var type = e.view.params.type;
            if (type == 1) {
                if (users.friends.length != 0) {
                    that.set("areUsersFound", true);
                    that.set("areEventsFound", false);
                    that.set("friends", users.friends);
                }
                else {
                    that.set("areUsersFound", false);
                    that.set("friends", []);
                }
            }
            else if (type == 0) {
                httpRequest.getJSON(global.app.serviceUrl + global.app.events + "user/" + users.userId + 
                                    "?sessionKey=" + global.app.sessionKey)
                .then(function (events) {
                    that.set("areUsersFound", false);
                    if (events.length != 0) {
                        that.set("areEventsFound", true);
                        that.set("events", events);
                    }
                    else {
                        that.set("areEventsFound", false);
                    }
                });
            }
            else if (type == 2) {
                users = global.app.eventService.viewModel;
                
                if (users.users.length != 0) {
                    that.set("areEventsFound", false);
                    that.set("areUsersFound", true);
                    that.set("friends", users.users);
                }
                else {
                    that.set("areUsersFound", false);
                    that.set("friends", []);
                }
            }
        },

        navigateToUser: function (e) {
            global.app.application.navigate("views/profile-view.html#profile-view?userId=" + e.data.Id, 'slide:left');
        },
        
        navigateToEvent: function (e) {
            global.app.application.navigate("views/event-view.html#event-view?eventId=" + e.data.EventId, 'slide:left');
        },
    });

    app.listService = {
        viewModel: new ListViewModel(),
    };
})(window);