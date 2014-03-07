$(document).ready(function() {

    var giveDoseEditorzDaHookupBiotch = function() {
        console.debug('hookin up da editorz, biotch!');
        $('.editable').on('mouseenter', onEditableMouseover);
        $('.editable').on('mouseleave', onEditableMouseout);
        $('.editable').on('click', onEditableClick);
        $('.savebtn').on('click', onSaveBtnClick);
    };

    var onEditableMouseover = function() {
        console.debug('mouse over ', $(this));
        $('.editable').removeClass('rolled-over');
        $(this).addClass('rolled-over');
    };

    var onEditableMouseout = function() {
        console.debug('mouse out ', $(this));
        $(this).removeClass('rolled-over');
    };

    var onEditableClick = function() {
        console.debug("Editing ", $(this).data('id'));

        var cid = $(this).data('id');
        var type = $(this).data('type');
        var content = $(this).html();

        var editor = "#editor-"+type;
        var panel = ".editor-panel-"+type;

        currentElement = this;
        currentEditor = editor;

        $("#editor-modal .modal-title").html(cid);

        if(type === 'html') {
            $(editor).html(content);
            tinymce.activeEditor.execCommand('mceSetContent', false, content);
        } else {
            $(editor).val(content);
        }
        $("#editor-modal").modal();
        $(".editor-panel").hide();
        $(panel).show();

        if(!contentHistory[cid]) {
            contentHistory[cid] = [];
            contentHistory[cid].push({"date": "Original", "content": content});
        }

        populateHistoryPanel(cid);
    };

    var onSaveBtnClick = function() {
        var type = $(currentElement).data('type');

        var cid = $(currentElement).data('id');

        if(type === 'html') {
            content = tinymce.activeEditor.getContent();
        } else {
            content = $(currentEditor).val();
        }

        if(!contentHistory[cid]) {
            contentHistory[cid] = [];
        }

        contentHistory[cid].push({"date": new Date(), "content": content});
        $(currentElement).html(content);

        $("#editor-modal").modal('hide');
    };

    var populateHistoryPanel = function(cid) {
        var historyPanel = $('#editor-modal .history');

        var html = "<ul class='nav nav-pills nav-stacked'>";

        if(contentHistory[cid]) {
            for (var i = 0; i < contentHistory[cid].length; i++) {
                var content = contentHistory[cid][i];
                html += "<li><a href=\"javascript:setContentToHistory("+i+")\">"+contentHistory[cid][i].date+"</a></li>";
            }
        } else {
            html += "<li>This content has not yet been changed.</li>"
        }

        html += "</ul>";

        historyPanel.html(html);
    };

    giveDoseEditorzDaHookupBiotch();
});


var currentElement = null;
var currentEditor = null;

var contentHistory = {};

var setContentToHistory = function(i) {
    $(currentElement).html(contentHistory[$(currentElement).data('id')][i].content);
    $("#editor-modal").modal('hide');
};
