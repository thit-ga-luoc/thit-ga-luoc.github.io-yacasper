/**
 * JS file for tag and authors pagination
 * Should be included after the tag/authors loop, as it relies on its content
 */

var create_pagination_elems = function(page, totalPages, urlPrevious, urlNext, urlFirst) {
    var pagHtml = '';
    pagHtml = pagHtml + '<nav class="pagination" role="pagination">';
    if (page > 1)
        if (page === 2)
            pagHtml = pagHtml + '<a class="newer-posts" href="' + urlFirst +'" title="Previous Page">&laquo; Newer Posts</a>';
        else
            pagHtml = pagHtml + '<a class="newer-posts" href="' + urlPrevious +'" title="Previous Page">&laquo; Newer Posts</a>';
    pagHtml = pagHtml + '<span class="page-number"> Page ' + page + ' of ' + totalPages + ' </span>';
    if (page < totalPages)
        pagHtml = pagHtml + '<a class="older-posts" href="' + urlNext + '" title="Next Page">Older Posts &raquo;</a>';
    pagHtml = pagHtml + '</nav>';

    if (page > 1)
        document.getElementById('pagination-upper').innerHTML = pagHtml;
    else
        document.getElementById('pagination-upper').innerHTML = '';

    document.getElementById('pagination-lower').innerHTML = pagHtml;
};

var do_paginate = function(url, paginate) {
    //var paginate = parseInt(document.getElementById('paginate_container').getAttribute('paginate'));
    var total_items = document.querySelectorAll('.post').length;
    //var url = document.getElementById('paginate_container').getAttribute('url');

    var total_pages = parseInt((total_items - 1 ) / paginate) + 1;

    var hashName = window.location.hash;

    // parse URL hash
    var hashRegexp = /#page(\d)/g;
    var match = hashRegexp.exec(hashName);
    var page = 1;
    if (match !== null)
        page = parseInt(match[1]);

    if (page > 0 && page <= total_pages) {
        var index_first = (page - 1) * paginate;
        var index_last = page * paginate;

        var tt = 0;
        var posts = document.querySelectorAll('.post');
        for (var i = 0; i < posts.length; ++i) {
            var index = posts[i].getAttribute('index') - 1;
            if (index < index_first || index >= index_last) {
                posts[i].style.display = 'none';
            } else {
                posts[i].style.display = '';
            }
        }

        var urlPrevious = url + '#page' + (page-1) + '/';
        var urlNext = url + '#page' + (page+1) + '/';
        var urlFirst = urlPrevious;
        create_pagination_elems(page, total_pages, urlPrevious, urlNext, urlFirst);
    } else {
        window.location = '/404.html';
    }
};

