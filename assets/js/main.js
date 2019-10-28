console.log('yo')
$('#mainnav').on('click', 'a', function(e){
    //e.preventDefault();
    var href = this.getAttribute('href');
    if (href.indexOf('#')==0) {
        showNav(href);
    } else {
        //loadPage(href);    
    }
})

function showNav(href){
    $('.pane.active').removeClass('active');
    $(href).addClass('active');
}

// chargement de page
function loadPage(href){

    $.ajax({
        url: href,
        
        beforeSend:function(){
            // gestion de l’historique
            // transformation du hash (#bidule) en search (?bidule)
            var url = '?' + href;
            // création d’une entrée d’historique, en passant le hash (#bidule) et l’URL (?bidule)
            history.pushState({hash: href}, "", url);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // handler(XMLHttpRequest.responseText);
        },
        success: function(data, textStatus, XMLHttpRequest) {            

            // load result in virtual element
            var $dom = $(document.createElement("html"));
            $dom[0].innerHTML = data; 
            // retrieve content
            var $content = $dom.find('head').first().next().html();

            // set content
            // $chanson.html($content);
            $(window).scrollTop(0);

        }
    });
}

// affichage du contenu
function displayContent(href){
    if (href == null) return;

    var $href = $(href);

    // gestion de l’historique
    // transformation du hash (#bidule) en search (?bidule)
    var url = '?' + href.substring(1);
    // création d’une entrée d’historique, en passant le hash (#bidule) et l’URL (?bidule)
    history.pushState({hash: href}, "", url);

    // live open graph modification
    var og_tags = {
        description: $href.attr('data-og_description'),
        image: $href.attr('data-og_image'),
        type: 'article',
        url: document.base_url + href
    }
    for (var key in og_tags) {
        $('#og_' + key ).attr('content', og_tags[key]);
    }   


};

// history popstate
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.hash) {
        displayContent(event.state.hash);
    }
});


// chargement initial
// recherche si un paramètre est présent dans l’url
// élimine le premier caractère (?) : .substring(1)
// prend uniquement le premier paramètre : split('&')[0]
var srch = window.location.search.substring(1).split('&')[0];

// hash management (visite d’une page qui contient un ?hash)
if(srch != ""){
    var hash = "#" + srch;
    if($(hash).length){
        displayContent(hash);
    } else {
        history.replaceState({hash: ""}, document.title, document.location.href);
    }
}


// random
$(function(){
    var $ramdam = $('#randomramdam');
    var text = $ramdam.text();
    var letters = text.split('');

    // suppression du contenu de <div id='ramdam'>
    $ramdam.empty();

    // crée des <span> à partir de chaque lettre du texte
    for (var i = 0; i < letters.length; i++) {
        var $span = $('<span>' + letters[i] + '</span>');
        $ramdam.append($span);
        if(letters[i]=='/') {
            $ramdam.append('<br>');
        }
        // mesure la position naturelle de chaque lettre et l’enregitre dans un attribut pour pouvoir la retrouver plus tard
        $span.attr('data--original-left', $span.position().left)
    };

    // function qui "met en désordre" les lettres
    ramdamize = function(container){
        $(container).find('span').each(function(i){
            var $span = $(this);
            // récupère la valeur left naturelle
            var original_left = $span.attr('data--original-left');
            // crée une valeur left aléatoire
            // qui permette de garder le span à l’intérieur de <div id='ramdam'>
            var new_left = Math.round(Math.random() * ($ramdam.width() - $span.width())) - original_left;
            $span.css({
                'left': new_left,
                'transition': 'left 200ms ease-out'
            })
            // rend visible et anime les lettres sequentiellement
            var s = setTimeout(function(){
                $span.addClass('brbrbr');
            }, 100 * i)
        })
    }

    // à intervale régulier, on remet en désordre
    var interval = setInterval(function(){
        ramdamize($ramdam);
    }, 2000)

    // itialisation
    ramdamize($ramdam);

    // interactivité
    $ramdam.on('mouseenter', function(){
        $(this).find('span').css('left', 0)
        clearInterval(interval);
    }).on('mouseleave', function(){
        ramdamize(this);
        interval = setInterval(ramdamize, 2000, $ramdam);
    })
})