$("path, circle").hover(function(e) {
  $("#info-box").css("display", "block");
  $("#info-box").html($(this).data("info"));
});

$("path, circle").mouseleave(function(e) {
  $("#info-box").css("display", "none");
});

$("path, circle").click(function(e) {
  console.log($(this).data("info"));
});

$(document)
  .mousemove(function(e) {
    $("#info-box").css("top", e.pageY - $("#info-box").height() - 30);
    $("#info-box").css("left", e.pageX - $("#info-box").width() / 2);
  })
  .mouseover();
