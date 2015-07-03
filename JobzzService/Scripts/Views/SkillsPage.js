var SkillsPage = (function () {
    var _private = {};
    var _public = {};
    _private.ajax = {};

    _private.ajax.getList = function () {
        $.ajax({
            url: _private.url,
            type: "GET",
            success: function (result) {
                console.log(result);
                if (result != null) {
                    var res = "";
                    var i = 0;
                    for (; i < result.length; ++i) {
                        res += "Id: " + result[i].id + "\nName: " + result[i].name + "\nExperience: " + result[i].experience + "\nLevel: " + result[i].Level.level_name + "\n";
                    }
                    console.log(res);
                }
            },
            error: function (message) {
                console.log("error " + message);
            }
        });
    };
    _private.ajax.getItem = function (id) {

        $.ajax({
            url: _private.url + id,
            type: "GET",
            success: function (result) {
                if (result != null) {
                    _private.onGettingItem({
                        id: result.id,
                        name: result.name,
                        experience: result.experience,
                        level_id: result.level_id,
                        level: result.Level ? result.Level.level_name : ""
                    });
                }
            },
            error: function (message) {
                console.log("error " + message);
            }
        });
    };
    _private.ajax.createItem = function () {

        if (!_private.validate())
            return;

        var name = $("#Name").val().trim();
        //name = _private.encodeValue(name);
        var time = $("#Experience").val().trim();
        var level = $("#LevelId").val();

        $.ajax({
            url: _private.url,
            type: "POST",
            datatype: "JSON",
            data: {
                name: name, level_id: level, experience: time
            },
            beforeSend: function () {
                $("#btnAddItem").attr('disabled', 'disabled');
            },
            success: function (result) {
                if (result != null) {
                    _private.appendSkill({
                        id: result.id,
                        name: result.name,
                        experience: result.experience,
                        level_id: result.level_id,
                        level: result.Level ? result.Level.level_name : ""
                    });

                }
            },
            error: function (message) {
                console.log("error " + message);
            }
        }).always(function () {
            $("#btnAddItem").removeAttr('disabled');
            _private.clearForm();
        });
    };
    _private.ajax.deleteItem = function (event) {
        if (!_private.confirm()) return;

        var $parent = $(event.currentTarget.parentNode);
        var id = $parent.data("itemid");

        $.ajax({
            url: _private.url + id,
            type: "DELETE",
            success: function (result) {
                if (result != null) {
                    $($parent).parent().hide('fast').empty();
                }
            },
            error: function (message) {
                console.log("Error: " + message);
            }
        });
    };
    _private.ajax.updateItem = function () {

        if (!_private.validate())
            return;

        var id = $("#skillId").val();
        var name = $("#Name").val().trim();
        //name = _private.encodeValue(name);
        var time = $("#Experience").val().trim();
        var level = $("#LevelId").val();

        $.ajax({
            url: _private.url,
            type: "PUT",
            datatype: "JSON",
            data: {
                id: id, name: name, level_id: level, experience: time
            },
            beforeSend: function () {
                $("#btnEditItem").attr('disabled', 'disabled');
            },
            success: function (result) {
                if (result != null) {
                    _private.onUpdatingItem({
                        id: result.id,
                        name: result.name,
                        experience: result.experience,
                        level_id: result.level_id,
                        level: result.Level ? result.Level.level_name : ""
                    });
                } else {
                    _private.clearForm();
                }
            },
            error: function (message) {
                console.log("error " + message);
            }
        }).always(function () {
            $("#btnEditItem").removeAttr('disabled');
        });
    };

    _private.appendSkill = function (skill) {
        var div = $('<div class="list-group" style="display:none;"></div>')
            .append(_private.makeSkillDiv(skill));

        div.appendTo($("#skillsList")).show('fast');
    };
    _private.makeSkillDiv = function (skill) {
        var div = $('<div/>', {
            class: "list-group-item"
        }).attr("data-itemid", skill.id);

        div.append('<strong><span class="h4 list-group-item-heading text-success">' + _private.encodeValue(skill.name) + '</span></strong>');

        div.append($('<button title="Delete" type="button" class="delete-button pull-right btn btn-default btn-xs"></button>')
            .click(_private.ajax.deleteItem)
            .append('<span class="glyphicon glyphicon-remove"></span>'));

        div.append($('<button title="Edit" type="button" class="edit-button pull-right btn btn-default btn-xs"></button>')
            .click(_private.prepareEdit)
            .append('<span class="glyphicon glyphicon-edit"></span>'));

        div.append($('<p class="list-group-item-text"></p>')
            .append('Level: ')
            .append('<strong>' + skill.level + '</strong>, ')
            .append('Experience: <strong>' + skill.experience + ' years</strong>'));

        return div;
    };

    _private.validate = function () {
        var error = "";
        var nameValue = $("#Name").val().trim();
        var timeValue = $("#Experience").val().trim();
        var errorLbl = $("#errorLabel");

        if (nameValue.length < 2) {
            error += "input name";
        }
        if (!/^\d{1,2}$/g.test(timeValue)) {
            error += error.length ? " and" : "input";
            error += " experience (from 1 to 99 years).";
        }

        if (error.length > 0) {
            errorLbl.text("Please, " + error);
            errorLbl.show();
        } else {
        }

        return error.length == 0;
    };
    _private.encodeValue = function (value) {
        return $('<div />').text(value).html();
    };
    _private.prepareEdit = function (event) {
        var $parent = $(event.currentTarget.parentNode);
        var id = $parent.data("itemid");
        _private.ajax.getItem(id);
    };
    _private.onGettingItem = function (skill) {
        $("#skillId").val(skill.id);
        $("#Name").val(skill.name);
        $("#Experience").val(skill.experience);
        $("#LevelId").val(skill.level_id);

        _private.showEditButtons();
    };
    _private.onUpdatingItem = function (skill) {
        var div = $("div[data-itemid='" + skill.id + "']");
        if (!div) return;

        var newdiv = _private.makeSkillDiv(skill);
        div.parent().empty().html(newdiv);

        _private.clearForm();
        _private.showCreateButton();
    };

    _private.showCreateButton = function () {
        $("#createButtonsPane").show();
        $("#editButtonsPane").hide();
    };
    _private.showEditButtons = function () {
        $("#createButtonsPane").hide();
        $("#editButtonsPane").show();
    };
    _private.cancelEditBtnClick = function () {
        _private.clearForm();
        _private.showCreateButton();
    };
    _private.clearForm = function () {
        $("#Experience").val("");
        $("#Name").val("");
        $("#LevelId").val(1);
        $("#skillId").val("");

        $("#errorLabel").hide("fast");
    };
    _private.confirm = function (e) {
        return confirm("Are you shure?");
    };



    _public.initialize = function () {
        $("#btnAddItem").click(_private.ajax.createItem);
        $("#btnEditItem").click(_private.ajax.updateItem);

        $(".delete-button").click(_private.ajax.deleteItem);
        $(".edit-button").click(_private.prepareEdit);
        $("#btnEditCancel").click(_private.cancelEditBtnClick);
        _private.url = "/api/skillsapi/";
    };

    return _public;

})();

$(document).ready(function () {
    SkillsPage.initialize();
});