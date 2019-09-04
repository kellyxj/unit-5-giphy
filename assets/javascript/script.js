const topics = ["cat","dog","rat","snake"];

function updateButtons() {
    $("#button-holder").empty();
    for(i = 0; i < topics.length; i++) {
        const button = $("<btn>");
        button.addClass("topicButton");
        button.text(topics[i]);
        button.attr("data-topic",topics[i]);
        $("#button-holder").append(button);
    }
}

function addGifs() {
    const url = "https://api.giphy.com/v1/gifs/search?api_key=J1uyivxiG9gqW75GTa5WoevTU1U1OBju&q="+
    $(this).attr("data-topic")+"&limit=10&offset=0&lang=en";
    $.ajax(url).then((gifs) => {
        gifs.data.forEach((gif) => {
            const container = $("<div>");
            container.css("display", "inline-block");
            const image = $("<img>");
            const rating = $("<p>");
            image.attr("src",gif.images.fixed_height_still.url);
            image.attr("data-still", gif.images.fixed_height_still.url);
            image.attr("data-play", gif.images.fixed_height.url);
            image.attr("state", "still");
            rating.text("Rating: "+gif.rating);
            container.append(image);
            container.append(rating);
            $("#gif-holder").prepend(container);
        });
    });
}

function playOrPauseGif() {
    if($(this).attr("state") === "still") {
        $(this).attr("state", "playing");
        $(this).attr("src",$(this).attr("data-play"));
    }
    else {
        $(this).attr("state","still");
        $(this).attr("src",$(this).attr("data-still"));
    }
}

$(document).ready(() => {
    updateButtons();
    $(document).on("click", ".topicButton", addGifs);
    $("#addButton").click((event)=> {
        event.preventDefault();
        topics.push($("#animalInput").val());
        updateButtons();
        $("animalInput").val("");
    });
    $(document).on("click", "img", playOrPauseGif);
});