getalljson()
function getalljson() {
    $.ajax({
        async: false,
        method: "get",
        url: "src/all.json",
        dataType: "json",
        success: function (e) {
            let data = e
            putheaderdata(data.header);
            putmaindata(data.main);
            putfooterdata(data.footer);
        },
    });
}
function putheaderdata(data) {
    $("header .logo img").attr('src', data.logo.img)
    $("header .logo span").text(data.logo.logo_text)
    for (let i = 0; i < data.navbar.length; i++) {
        $(`header .nav img:eq(${i})`).attr('src', data.navbar[i].img)
        $(`header .nav span:eq(${i})`).text(data.navbar[i].link_text)
    }
}
function putmaindata(data) {
    let a1 = data.a1
    let a2 = data.a2
    let a3 = data.a3
    $(`main #a1 img`).attr('src', a1.img.img)
    $(`main #a2 img`).attr('src', a2.img.img)
    for (let i = 0; i < a3.img.length; i++) {
        $(`main #a3 img:eq(${i})`).attr('src', a3.img[i].img)
    }
}
function putfooterdata(data) {
    for (let i = 0; i < data.about_us.length; i++) {
        $(`footer .aboutus img:eq(${i})`).attr('src', data.about_us[i].img)
    }
}