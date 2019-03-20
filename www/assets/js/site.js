function ajax() { //Ajax отправка формы
	var msg = $("#form").serialize();
	$.ajax({
		type: "POST",
		url: "./send.php",
		data: msg,
		success: function(data) {
			$("#results").html(data);
		},
		error:  function(xhr, str){
			alert("Возникла ошибка!");
		}
	});
}

jQuery.fn.notExists = function() { //Проверка на существование элемента
	return $(this).length==0;
}

$(document).ready(function(){ //Валидация формы
	$(".send").validation(
		$(".name").validate({
			test: "blank letters", 
			invalid: function(){
				if($(this).nextAll(".error").notExists()) {
					$(this).after('<div class="error">Введите корректное имя</div>');
					$(this).nextAll(".error").delay(2000).fadeOut("slow");
					setTimeout(function () {
						$(".name").next(".error").remove();
					}, 2600);
				}
			},
			valid: function(){
				$(this).nextAll(".error").remove();
			}
		}),
		$(".email").validate({
			test: "blank email",
			invalid: function(){
				if($(this).nextAll(".error").notExists()) {
					$(this).after('<div class="error">Введите корректный email</div>');
					$(this).nextAll(".error").delay(2000).fadeOut("slow");
					setTimeout(function () {
						$(".email").next(".error").remove();
					}, 2600);
				}
			},
			valid: function(){
				$(this).nextAll(".error").remove();
			}
		}),
		$(".subject").validate({
			test: "blank", 
			invalid: function(){
				if($(this).nextAll(".error").notExists()) {
					$(this).after('<div class="error">Введите тему</div>');
					$(this).nextAll(".error").delay(2000).fadeOut("slow");
					setTimeout(function () {
						$(".subject").next(".error").remove();
					}, 2600);
				}
			},
			valid: function(){
				$(this).nextAll(".error").remove();
			}
		}),
		$(".message").validate({
			test: "blank", 
			invalid: function(){
				if($(this).nextAll(".error").notExists()) {
					$(this).after('<div class="error">Введите сообщение</div>');
					$(this).nextAll(".error").delay(2000).fadeOut("slow");
					setTimeout(function () {
						$(".message").next(".error").remove();
					}, 2600);
				}
			},
			valid: function(){
				$(this).nextAll(".error").remove();
			}
		})
	);
});