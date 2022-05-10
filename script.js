let produk =  {
    "Jet Tempur" : 10,
    "Nuklir Hiroshime" : 13,
    "Infinity Stone" : 24,
    "Burj Khalifa" : 9,
    "Rudi Hipersonik" : 12,
};

function keyword(a,b) {
    const keys = Object.keys(a).filter(key => key in b);

    const inv = Object.assign({}, a)
    for (const key of keys) {
        delete inv[key]
    }

    return inv
}

function validasi() {
    const o = ambilData();
    if(Object.keys(o).length <= 0) {
        return false
    }

    for (const id of Object.keys(o)){
        if (o[id] <= 0 || o[id] > produk[id]) {
            return false
        }
    }
    return true
}

function tampilData(a,b) {
    return `<li>${a} (${b})</li>`
}

function ambilNama() {
    const nama = $("#nama").val();
    return `<h2>${nama}</h2>`;
}

function ambilData() {
    const o = {};

    $("#pilih div").each(function() {
        const id = $(this).find("select option:selected").val();
        const val = $(this).find($("input")).val()

        if (id == "pilih produk") {
            return
        }
        o[id] = val;   
    })
    return o;
}

function detailData() {
    const nama = ambilNama();
    const o    = ambilData();
    const item = Object.keys(o).map(id => tampilData(id, o[id]));

    return [
        nama, 
        "<ul>",
         ...item, 
         "</ul>"
    ].join("\n");
}

function lihatData() {
    const detail = detailData()

    $("#lihatData").html(detail)
}

function opsiProduk(opsi) {
    const product = Object.keys(opsi).map(p => `<option value='${p}'>${p}</option>`);

    return [
        `<select>`,
        `<option selected disabled>pilih produk</option>`,
        product,
        "</select>",
    ].join("\n");
}

function inputProduk() {
    return `<input type="number" name="jumlah" id="jumlah" placeholder="Jumlah" value="1" class="form-control">`;
}

function deleteButton() {
    return `<button type="button" class="btn btn-danger btn-hapus">Hapus</button>`;
}

function tambahData() {
    const o = ambilData();
    const jumlah = Object.keys(o).length;

    const product = keyword(produk, o);

    let opsi = opsiProduk(product);
    let input = inputProduk();
    let hapus = "";

    if (jumlah > 0 ){
        hapus = deleteButton();
    }

    return [
    "<div class='flex flex-content form-group product-opt mb-3'>",
    opsi,
    input,
    hapus,
    "</div>",
    ].join("\n")
}

function listProduk () {
    const opsi = tambahData();
    $("#pilih").append(opsi);

    $("#pilih div select").change(function() {
        $("#tambahButton").show();
    })
}

function hapusData() {
    const o =ambilData();
    const jumlah = Object.keys(o).length;
    const jumlahproduk = Object.keys(produk).length;

    if (jumlah == 0 ) {
        return
    }

    $("#pilih div:last-child").remove();
    $("#pilih div:last-child button").show();
    $("#pilih div:last-child button").click(hapusData);


    if (jumlah < jumlahproduk) {
        $("#tambahButton").show();
    }

    $("#pilih div:last-child select").attr('disabled', false);
}

$(function() {
    $("#tambahButton").hide();
    $("#tambahButton").click(function() {
        $("#pilih div:last-child select").attr("disabled", true)
        $("#pilih div:last-child button").hide();

        const val = parseInt( $("#pilih div:last-child input").val());

        if ( isNaN(val)) {
            alert("Masukkan Angka");
            return
        }

        const tambahin = tambahData();
        $("#pilih").append(tambahin);
        $("#pilih div:last-child button").click(hapusData);

        const o = ambilData();
        const jumlah = Object.keys(o).length;
        const jumlahproduk = Object.keys(produk).length

        if (jumlah == jumlahproduk) {
            $(this).hide();
        }
    })
    listProduk();

    $("#submit").click(function () {
        isEligible = validasi()
        if (!isEligible) {
            alert("pasokan barang tidak mencukupi")
            return
        }

        lihatData();
    })
})