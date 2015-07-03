var TestPage = (function () {
    var _private = {};
    var _public = {};

    _private.getList = function () {
        $.ajax({
            url: "/api/skillsapi",
            type: "GET",
            success: function (result) {
                console.log(result);
                if (result != null) {
                    var res = "";
                    var i = 0;
                    for (; i < result.length; ++i) {
                        res += "Id: " + result[i].id + "\nName: " + result[i].name + "\nExperience: " + result[i].experience + "\nLevel: " + result[i].Level.level_name + "\n";
                    }
                    alert(res);
                }
            },
            error: function (message) {
                alert("error " + message);
            }
        });
    };

    _private.getItem = function () {
        var id = $("#itemId").val();

        $.ajax({
            url: "/api/skillsapi/" + id,
            type: "GET",
            success: function (result) {
                console.log(result);
                if (result != null) {
                    alert("Id: " + result.id + "\nName: " + result.name + "\nExperience: " + result.experience + "\nLevel: " + result.Level.level_name);
                }
            },
            error: function (message) {
                alert("error " + message);
            }
        });
    };


    _private.createItem = function () {

        $.ajax({
            url: "/api/skillsapi",
            type: "POST",
            datatype: "JSON",
            data: {
                name: "test item", level_id: 1, experience: 1
            },
            success: function (result) {
                console.log(result);
                if (result != null) {
                    alert("Id: " + result.id + "\nName: " + result.name + "\nExperience: " + result.experience + "\nLevel: " + result.Level.level_name);
                }
            },
            error: function (message) {
                alert("error " + message);
            }
        });
    };


    _private.deleteItem = function () {
        var id = $("#itemId").val();

        $.ajax({
            url: "/api/skillsapi/" + id,
            type: "DELETE",
            success: function (result) {
                console.log(result);
                if (result != null) {
                    alert("Id: " + result.id + "\nName: " + result.name + "\nExperience: " + result.experience + "\nLevel: " + result.Level.level_name);
                }
            },
            error: function (message) {
                alert("error " + message);
            }
        });
    };

    _private.updateItem = function () {
        var id = $("#itemId").val();

        $.ajax({
            url: "/api/skillsapi",
            type: "PUT",
            datatype: "JSON",
            data: {
                id: id, name: "New Name for test item", level_id: 2, experience: 2
            },
            success: function (result) {
                console.log(result);
                if (result != null) {
                    alert("Id: " + result.id + "\nName: " + result.name + "\nExperience: " + result.experience + "\nLevel: " + result.Level.level_name);
                }
            },
            error: function (message) {
                alert("error " + message);
            }
        });
    };



    _public.initialize = function () {
        $("#btnGet").click(_private.getList);
        $("#btnGetItem").click(_private.getItem);
        $("#btnDeleteItem").click(_private.deleteItem);
        $("#btnAddItem").click(_private.createItem);
        $("#btnEditItem").click(_private.updateItem);
    };

    return _public;

})();