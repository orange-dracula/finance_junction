var $ = function (id) {
    return document.getElementById(id);
};

window.onload = function () {
    /*triggering the dialog box on load with jquery ui widget*/
    $(function () {
        $("#dialog").dialog();
    });

    /*getting the id of the radio checked radio button*/
    $("#subBtn").click(function () {
        var temp1 = String($("input[name='classification']:checked").val());
        var temp2 = String($("input[name='goals']:checked").val());
        if (temp1 == "undefined" || temp2 == "undefined") {
            alert("Please fill in all answer for all the questions to move forward.");
        } else {
            classificationSelector(temp1);
            goalSelector(temp2);
        }
    });
}

/*checks user's response to questions and displays appropriate content*/
function classificationSelector(identi) {
    $.getJSON('json/pathPageData.json', function (data) {
        $.each(data, function () {
            $.each(this, function (key, value) {
                console.log(value.val);
                /*populating the posts div with all the posts one by one*/
                if (value.val == identi) {
                    $("#path-container").html('');
                    $("#path-container").append(
                        "<h1>" + value.title + "</h1>" +
                        "<h2 id>Checklist:</h2><br>" +
                        "<p id='path-text'>" + value.text + "</p>"
                    );
                }
            });
        });
    });
}

/*checks user's response to questions and displays appropriate content*/
function goalSelector(identi) {
    $.getJSON('json/pathPageData.json', function (data) {
        $.each(data, function () {
            $.each(this, function (key, value) {
                /*populating the posts div with all the posts one by one*/
                if (value.val == identi) {
                    $("#path-container").append(
                        "<h2>Goal: " + value.title + "</h2><br>" +
                        "<p>" + value.text + "</p>"
                    );
                }
            });
        });
    });
}