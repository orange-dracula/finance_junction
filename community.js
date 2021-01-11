$(document).ready(function () {

    /*bxslider implementation and settings*/
    $("#slider").bxSlider({
        auto: true,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        captions: true,
        speed: 400,
        pause: 5000,
        pager: true,
        pagerType: 'short'
    });

    /*making a call to the external aws server to get the json data using ajax call*/
    /*pulling data from the aws server*/
    $.getJSON('http://3.16.158.247:8080/polls', function (data) {
        $.each(data, function () {
            $.each(this, function (key, value) {
                /*populating the posts div with all the posts one by one*/
                $("#posts").append(
                    "<div class='post-container'>" +
                    "<h3>" + value.subject + "</h3>" +
                    "<h4>" + value.fname + " " + value.lname + "</h4>" +
                    "<p>" + value.description + "</p>" +
                    "<div class='reply-container'>" +
                    "<input type='text' id='reply1' name='reply1' placeholder='reply here...'><div class='postBtn'><button>Post</button></div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='padding2'></div>");
            });
        });
    });

    /*Getting the submitted form data and converting into json object format*/
    const formToJson = elements => [].reduce.call(elements, (data, ele) => {
        data[ele.name] = ele.value;
        return data;
    }, {});

    /*cleaning the empty values from json object*/
    function clean(obj) {
        for (var propName in obj) {
            /*looking for empty strings or undefined values*/
            if (obj[propName] === '' || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
    }

    /*getting the form data, converting into jsob object and sending it to */
    /*code partially retrieved from stackoverflow*/
    const handleFormSubmit = event => {
        event.preventDefault();
        const data = formToJson(form.elements);
        clean(data); /*using the clean function*/
        console.log(data);
        const jsonData = JSON.stringify(data, null, "  ");
        console.log(jsonData);
        /*ajax post call to send data to json file using python file stored on the aws server*/
        $.ajax
        ({
            type: "GET",
            dataType: 'json',
            async: true,
            /*making a call to the aws server that runs the python file by using the url*/
            url: 'http://3.16.158.247:8080/polls/file?name=' + jsonData,
            success: function (data) {
                /*adding newly added post to the posts div*/
                $("#posts").append(
                    "<div class='post-container'>" +
                    "<h3>" + data.subject + "</h3>" +
                    "<h4>" + data.fname + " " + data.lname + "</h4>" +
                    "<p>" + data.description + "</p>" +
                    "<div class='reply-container'>" +
                    "<input type='text' id='reply1' name='reply1' placeholder='reply here...'><div class='postBtn'><button>Post</button></div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='padding2'></div>");
            },
            /*if error send an alert*/
            error: function (err) {
                alert('some error');
            }
        });
    };

    /*triggering handleFormSubmit when submit button clicked*/
    const form = document.getElementById('getForm');
    form.addEventListener('submit', handleFormSubmit);
});