import $ from "jquery";

export async function api(instance, req, login=false, method="GET", d={}, token=undefined, isUpload=false) {
    let r = undefined;
    let contentType: any = 'application/x-www-form-urlencoded; charset=UTF-8';
    let protocol = "https://";
    if (instance.startsWith("localhost")) {
        protocol = "http://";
    }
    if (isUpload) {
        contentType = false;
    }
    await $.ajax({
        url: protocol+instance+req,
        type: method,
        beforeSend: function (xhr) {
            if (login) {
                xhr.setRequestHeader('Authorization', 'Bearer '+token);
            }
        },
        processData: !isUpload,
        contentType: contentType,
        data: d,
        success: function (rd) {
            r = rd;
        },
        error: function () {
            r = null;
        },
    });
    return r;
}