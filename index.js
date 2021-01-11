window.onload = function () {
    /*to avoid this load to flash onload we set productGuide display to none and enable it when cd-tour-trigger/Start Tour button is clicked*/
    $("#productGuide").load("productGuide.html");
    document.getElementById("cd-tour-trigger").onclick = function () {
        document.getElementById("productGuide").style.display = "";
    };
};

/*ajax call to display appropriate topics*/
function topics(identi) { /*identify here is the id of the image or */
    $.getJSON("json/homePageData.json", function (data) {
        $.each(data, function () {
            $("#topics").html("");
            $.each(this, function (key, value) {
                /*using same ajax call for icon and link onclicks*/
                if (value.id == identi.replace('-icon', '') || value.id == identi.replace('-link', '')) {
                    /*displaying the data*/
                    $("#topics").append(
                        "<div class='padding'></div>" +
                        "<div id='credit' class='content-container'>" +
                        "<h2>" + value.title + "</h2>" +
                        "<p>" + value.text + "</p>" +
                        "</div>"
                    );
                    $("#addRes").style.display = "block";
                }
            });
        });
    });
}