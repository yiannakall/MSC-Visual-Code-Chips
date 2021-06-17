export function DownloadAsFile(json, outputFileName){
    let data = new Blob( [ JSON.stringify(json) ], { type: 'application/json' } )
    let url = window.URL.createObjectURL(data);

    let $a = $('<a>').attr('download', outputFileName).attr('href', url).css('display', 'none');

    $('body').append($a);

    $a[0].click();

    window.URL.revokeObjectURL(url);
    $a.remove();
}