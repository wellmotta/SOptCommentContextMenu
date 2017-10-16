// ==UserScript==
// @name         SOptCommentContextMenu
// @namespace    stackuserflow
// @version      0.0.1
// @description  Aciona todos os links Comentar na pergunta, e adiciona um Menu Contextual com comentários rápidos.
// @author       Wéllingthon M. de Souza
// @match        https://pt.stackoverflow.com/questions/*
// @grant        none
// ==/UserScript==

(function() {
    "use strict";

    var ItensMenu = [
        {
            titulo: 'Achar que nós faremos o seu trabalho todo de graça',
            markdown: 'Essa pergunta está mais para [Faça esse trabalho para mim](https://pt.meta.stackoverflow.com/a/5486/60376)'
        },
        {
            titulo: 'Agradeceu no campo resposta',
            markdown: 'Isso não é uma resposta, não utilize o campo de `resposta` para agradecer, para isso vote na resposta que solucionou seu problema / dúvida, leia [Por que é importante votar?](https://pt.stackoverflow.com/help/why-vote), para saber como fazer boa utilização do site, vá até [Central de Ajuda](https://pt.stackoverflow.com/help)'
        },
        {
            titulo: 'Criar MCV',
            markdown: 'Para podermos te ajudar, [forneça um código Mínimo, Completo e Verificável](https://pt.stackoverflow.com/help/mcve).'
        },
        {
            titulo: 'Fez pergunta no campo resposta',
            markdown: 'Isso não é uma resposta, não utilize o campo de `resposta` para fazer pergunta, para isso clique no botão [Faça uma pergunta](https://pt.stackoverflow.com/questions/ask) no canto superior direito da tela.'
        },
        {
            titulo: 'Não postar Código / Mensagem de erro',
            markdown: 'Eu e os demais usuários do *SOpt* não temos poderes mágicos telepáticos de clarividência e não somos capazes de adivinhar com exatidão o que é que está acontecendo. Leia [Não postar o seu código ou a sua mensagem de erro](https://pt.meta.stackoverflow.com/questions/5483/5484#5484).'
        },
        {
            titulo: 'Postar código como imagem',
            markdown: 'Não poste o código como imagem, em vez disso, coloque-a no corpo da pergunta, leia: [Postar código como imagem](https://pt.meta.stackoverflow.com/a/5485/60376).'
        },
    ];

    var TextareaAtual = "";
    var contextMenuHTML = "";
    var contextMenuCSS = "";
    function createContextMenu() {
        contextMenuCSS += '<style>';
            contextMenuCSS += '@import url("https://fonts.googleapis.com/css?family=Droid+Sans");';
            contextMenuCSS += '.questionCommentContextMenu {';
                contextMenuCSS += 'display: none;';
                contextMenuCSS += 'z-index: 1000;';
                contextMenuCSS += 'position: absolute;';
                contextMenuCSS += 'overflow: hidden;';
                contextMenuCSS += 'white-space: nowrap;';
                contextMenuCSS += 'font-family: sans-serif;';
                contextMenuCSS += 'background: #e9e9e9;';
                contextMenuCSS += 'color: #333;';
            contextMenuCSS += '}';
            contextMenuCSS += '.questionCommentContextMenu li {';
                contextMenuCSS += 'font-family: "Droid Sans", sans-serif !important;';
                contextMenuCSS += 'font-size: 16px;';
                contextMenuCSS += 'font-wigth: 400;';
                contextMenuCSS += 'border-left: 4px solid #F48024;';
                contextMenuCSS += 'padding: 8px 12px;';
                contextMenuCSS += 'cursor: pointer;';
                contextMenuCSS += 'list-style: none;';
            contextMenuCSS += '}';
            contextMenuCSS += '.questionCommentContextMenu li:hover {';
                contextMenuCSS += 'background-color: #F48024;';
                contextMenuCSS += 'color: #fff;';
            contextMenuCSS += '}';
        contextMenuCSS += '</style>';
        contextMenuHTML += '<ul class="questionCommentContextMenu">';
        for (var i = 0; i < ItensMenu.length; i++) {
            contextMenuHTML += '<li data-action="'+i+'">'+ItensMenu[i].titulo+'</li>';
        }
        contextMenuHTML += '</ul>';
        document.body.innerHTML += contextMenuCSS;
        document.body.innerHTML += contextMenuHTML;
    }

    function activeAllLinksComments() {
        var AllLinksComments = document.querySelectorAll('a.comments-link');
        for (var i=0; i < AllLinksComments.length; i++) {
            // document.querySelectorAll('a.comments-link')[i].click();
            AllLinksComments[i].click();
        }
    }

    function changeIdAllTextareaComment() {
        var listTextarea = document.querySelectorAll("[name='comment']");
        for (var i=0; i< listTextarea.length; i++) {
            listTextarea[i].id = "comment-" + i;
        }
    }

    function bindContextMenuAllTextareaComment() {
        $(document.querySelectorAll("[name='comment']")).bind("contextmenu", function (event) {
            event.preventDefault();
            TextareaAtual = "#"+$(this).attr('id');
            $(".questionCommentContextMenu").finish().toggle(100).
                css({
                    top: event.pageY + "px",
                    left: event.pageX + "px"
                });
        });
    }

    function bindDocumentBodyMousedown() {
        $(document.body).bind("mousedown", function (e) {
            if (!$(e.target).parents(".questionCommentContextMenu").length > 0) {
                $(".questionCommentContextMenu").hide(100);
            }
        });
    }

    function bindContextMenuOptionsClick() {
        $(".questionCommentContextMenu li").click(function(e){
            $(TextareaAtual).val(ItensMenu[$(this).attr('data-action')].markdown);
            $(".questionCommentContextMenu").hide(100);
        });
    }

    function init() {
        createContextMenu();
        setTimeout(function() {
            activeAllLinksComments();
            changeIdAllTextareaComment();
            setTimeout(function() {
                bindContextMenuAllTextareaComment();
                bindDocumentBodyMousedown();
                bindContextMenuOptionsClick();
            }, 1000);
            window.scrollTo(0, 0);
        }, 1000);
    }

    init();
})();
