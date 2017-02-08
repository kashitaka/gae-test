/*
 * chatapp.js
 * ルート名前空間モジュール
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, chatapp:true */

var chatapp = (function () {
	var
		initmodule,
		elemMap,
		postMap,
		clearPostMap,
		updatePostMap,
		stateMap,
		viewNewComments,
		viewOldComment,
		getComment,
		addCommentToView,
		makeCommentBox,
		onSubmitButtonTapped,
		submitComment;
	
	elemMap = {
		$submitBtn: null,
		$submitTx: null,
		$commentsArea: null
	};
	
	stateMap = {
		nowPage: 0,
		nowElements: 0,
		totalPages: null,
		pageSize: null,
	};
	
	postMap = {
		message: null
	};
	
	clearPostMap = function() {
		postMap.message = null;
	};
	
	updatePostMap = function(callback) {
		postMap.message = elemMap.$submitTxt.val();
		callback();
	};
	
	onSubmitButtonTapped = function() {
		submitComment(function(res){
			clearPostMap();
			elemMap.$submitTxt.val("");
			elemMap.$submitBtn.attr('disabled', false);
		});
	};
	
	submitComment = function(callback) {
		updatePostMap(function(){
			if ( postMap.message === "" || !postMap.message ) {
				elemMap.$submitBtn.attr('disabled', false);
				return;
			}
			$.ajax({
        url: '/api/chat/create/',
        contentType: "application/json; charset=utf-8",
        type:'POST',
        dataType: 'json',
        data : JSON.stringify(postMap),
        timeout:10000,
        success: function(data) {
        	callback(data);
      		getComment(0, function(data){
      			viewOldComment(data);
      		});
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        	console.log(XMLHttpRequest)
        }
      });
		});
	};
	
	getComment = function(page, callback){
		$.ajax({
      url: '/api/chat?page=' + page,
      contentType: "application/json; charset=utf-8",
      type:'GET',
      dataType: 'json',
      cache : false,
      timeout:10000,
      success: function(data) {
      	console.log(data)
      	callback(data);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
      	callback(textStatus);
      }
    });
	};
	
	
	viewOldComment = function(data) {
		elemMap.$commentsArea.html("") 
		$.each(data.content, function(ix, val) {
			elemMap.$commentsArea.prepend(makeCommentBox(val));
		});
	}
	
	makeCommentBox = function (comment) {
		return String()
			+ '<div class="comment-box">'
			+ '<span class="comment-date">'
			+ comment.created.year + '年'
			+ comment.created.monthValue + '月'
			+ comment.created.dayOfMonth + '日 '
			+ comment.created.hour + ':'
			+ comment.created.minute + '</span><br />'
			+ '<span class="comment-text">' + comment.comment
			+ '</span><span class="comment-id">'
			+ comment.id + '</span><br />'
			+ '</div>';
	};	
	
	initmodule = function(){
		elemMap.$submitBtn = $('#ch-submit-btn');
		elemMap.$submitTxt = $("#ch-submit-text");
		elemMap.$commentsArea = $('#commentsArea');
		elemMap.$submitBtn.on('click', function () {
			elemMap.$submitBtn.attr('disabled', true);
			onSubmitButtonTapped();
		});
		getComment(0, function(data){
			viewOldComment(data);
		});
	};
	
	return {
		initmodule: initmodule
	}
}());
