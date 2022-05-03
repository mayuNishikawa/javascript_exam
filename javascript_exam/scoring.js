$(function () {
  // 「国語、英語、数学、理科、社会」の点数（入力値）を取得して合計点と平均点を出すロジック
  function score_indicate() {
    //合計点
    let subject_points = [
      Number($('#national_language').val()),
      Number($('#english').val()),
      Number($('#mathematics').val()),
      Number($('#science').val()),
      Number($('#society').val())
    ];

    let sum = subject_points[0];
        sum = sum + subject_points[1];
        sum = sum + subject_points[2];
        sum = sum + subject_points[3];
        sum = sum + subject_points[4];
 
    $("#sum_indicate").text(sum);

    //平均点
    let average = sum/subject_points.length;
    $("#average_indicate").text(average);
  };

  // 平均点数を取得し、取得した平均点数から「A、B、C、D」にランク分けするロジック
  function get_achievement() {
    let averageIndicate = $("#average_indicate").text();
   
    if (averageIndicate >= 80) {
      return "A";
    }
    else if (averageIndicate >= 60) {
      return "B";
    }
    else if (averageIndicate >= 40) {
      return "C";
    }
    else {
      return "D";
    }
  };

  // 各教科の点数を取得し、取得した点数から「合格、不合格」の判断を下すロジック
  function get_pass_or_failure() {
    let subject_points = [
      Number($('#national_language').val()),
      Number($('#english').val()),
      Number($('#mathematics').val()),
      Number($('#science').val()),
      Number($('#society').val())
    ];
  
    let judge = "合格";

    for(let i=0; i<subject_points.length; i++) {
      if(subject_points[i] < 60) {
        judge="不合格";
        break;
      }
    }
    return judge;
  };

  // 最終的なジャッジのロジック
  function judgement() {
      let achievement = get_achievement();
      let pass_or_failure = get_pass_or_failure();
      $('#declaration').append( `<label id="alert-indicate" class="alert alert-info">あなたの成績は${achievement}です。${pass_or_failure}です。</label>`);
    };
  
  //発火編
  $('#national_language, #english, #mathematics, #science, #society').change(function () {
    score_indicate();
  });
  $('#btn-evaluation').click(function () {
    $("#evaluation").text(get_achievement());
  });
  $('#btn-judge').click(function () {
    $("#judge").text(get_pass_or_failure());
  });
  // 「最終ジャッジ」(id="btn-declaration")ボタンが押された際、「function judgement()」の処理を実行させる。
  // ２回目以降に「最終ジャッジ」ボタンを押した際は、それまでに表示していたジャッジのHTML要素を削除して、新たなジャッジのHTML要素を追加する。
  // ヒント：removeメソッドについて調べてみましょう。
  $('#btn-declaration').click(function () {
    $('#alert-indicate').remove();
    return judgement();
  });
});

// ここに書かれているJavaScriptの記述はあくまでヒントとして用意された雛形なので、書かれている記述に従わずに実装したいという場合は、自分の好きに実装して構いません。合格要件をすべて満たしていれば合格となります。