function addForm(){
    var addrow = '<div class="form-group baru-data">\
                    <div class="col-md-3">\
                    <label for="produk" class="form-label">Produk</label>\
                    <select class="form-control">\
                        <option value="">- Pilih Kategori -</option>\
                        <option value="1">Jet Tempur</option>\
                        <option value="2">Nuklir Hiroshime</option>\
                        <option value="3">Infinity Stone</option>\
                        <option value="4">Burj Khalifa</option>\
                        <option value="5">Rudi Hipersonik</option>\
                    </select>\
                </div>\
                <div class="col-md-3">\
                    <label for="produk" class="form-label">Jumlah</label>\
                    <input type="number" name="jumlah" id="jumlah" placeholder="Jumlah" class="form-control">\
                </div>\
              <div class="button-group">\
                  <button type="button" class="btn btn-success btn-tambah"><i class="fa fa-plus"></i></button>\
                  <button type="button" class="btn btn-danger btn-hapus"><i class="fa fa-times"></i></button>\
              </div>\
       </div>'
    $("#dynamic_form").append(addrow);
 }
 
 $("#dynamic_form").on("click", ".btn-tambah", function(){
    addForm()
    $(this).css("display","none")     
    var valtes = $(this).parent().find(".btn-hapus").css("display","");
 })
 
 $("#dynamic_form").on("click", ".btn-hapus", function(){
  $(this).parent().parent('.baru-data').remove();
  var bykrow = $(".baru-data").length;
  if(bykrow==1){
    $(".btn-hapus").css("display","none")
    $(".btn-tambah").css("display","");
  }else{
    $('.baru-data').last().find('.btn-tambah').css("display","");
  }
 });
 
 $('.btn-simpan').on('click', function () {
    $('#dynamic_form').find('input[type="text"], input[type="number"], select, textarea').each(function() {
       if( $(this).val() == "" ) {
          event.preventDefault()
          $(this).css('border-color', 'red');
          
          $(this).on('focus', function() {
             $(this).css('border-color', '#ccc');
          });
        }

    })
    // var nama = $("#nama").val();
    // $('#package').on('change', function(){
    //     var selectedPackage = $('#package').val();
    // });

    // var jumlah = $("#jumlah").val();
    // var html = nama + "< br/>" + selectedPackage + "< br/>" + jumlah + "< br/>";

    // $('.btn-simpan').html(html);
 })