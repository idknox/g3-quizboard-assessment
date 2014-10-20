//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function () {
  var id = location.pathname.split('/')[location.pathname.split('/').length - 1];

  var displayQuiz = function (questions, x, score) {
    if (x == questions.length) {
      $('.container').empty().append('<h1>Final Score: ' + ((score/questions.length) * 100) + '%</h1>' )
      return
    }
    $('.question').empty().prepend(questions[x].description);
    $('.answers').empty();
    $('.result').empty().append('&nbsp;');
    $.each(questions[x].possible_answers, function (i, answer) {
      $('.answers').append('<button class="btn btn-default" data-correct=' + answer.correct + '>' + answer.description + '</button>');
    });
    $('.nav').empty().prepend('<button class="btn btn-primary">Next</button>');
    $('.score').empty().append((x+1) + '/' + questions.length)
    $('.btn-default').on('click', function () {
      if ($(this).data('correct')) {
        $(this).removeClass('btn-default');
        $(this).addClass('btn-success');
        $('.result').empty().append('CORRECT');
        score += 1;
      } else {
        $(this).removeClass('btn-default');
        $(this).addClass('btn-danger');
        $('.result').empty().append('INCORRECT')
      }
      $('.btn-default').attr('disabled', 'disabled');
      $(this).attr('disabled', 'disabled');

    });
    $('.btn-primary').on('click', function () {
      displayQuiz(questions, x + 1, score);
    })

  };

  var promiseOfResult = $.getJSON("/quizzes/" + id + "/questions");
  promiseOfResult.success(function (results) {
    displayQuiz(results, 0, 0);
  });

});
