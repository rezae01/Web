function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
$(function(){
  $('#stepOne:checked').click(function(){
    $('.stepOne').show();
    $('.stepOTwe').hide();
  });
  $('#stepTWe:checked').click(function(){
    $('.stepOne').hide();
    $('.stepOTwe').show();
  });
});

