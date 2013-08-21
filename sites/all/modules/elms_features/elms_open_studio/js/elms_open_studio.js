$(document).ready(function(){  
  $('.record_collapse').click();
  // trigger the fluid grid click to go to the node in question
  $('.views-fluid-grid-inline').click(function(){
    window.location = $(this).children().attr('href');
  });
  // trigger clicking inside a pager to go there
  $('.pager li:not(.pager-current)').click(function(){
    window.location = $(this).children().attr('href');
  });
  // add the comments
  $(".add-comment-box").toggle(function(){
    $(this).parent().parent().next().children().children().children('.box').slideDown(500);
  },function(){
    $(this).parent().parent().next().children().children().children('.box').slideUp(500);
  });
  // node add the comments
  $(".node-add-comment-box").toggle(function(){
    $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().next().children('.box').slideDown(500);
  },function(){
    $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().next().children('.box').slideUp(500);
  });
  // show/hide the comments
  $(".show-comment-box").toggle(function(){
    $(this).children(".comment-show-image").animate({backgroundImage: "left"}, 200);   
    $(this).children(".Scomment").slideUp(100);
    $(this).children(".Hcomment").slideDown(500);
    $(this).parent().parent().next().children().children().children('.comment').slideDown(500);
  },function(){
    $(this).children(".comment-show-image").animate({backgroundImage: "right"}, 200);   
    $(this).children(".Hcomment").slideUp(100);
    $(this).children(".Scomment").slideDown(500);
    $(this).parent().parent().next().children().children().children('.comment').slideUp(500);
  });
  // show/hide the comments on a node
  $(".node-show-comment-box").toggle(function(){
    $(this).children(".Scomment").slideUp(100);
    $(this).children(".Hcomment").slideDown(500);
    $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().next().children('.comment').slideDown(500);
  },function(){
    $(this).children(".Hcomment").slideUp(100);
    $(this).children(".Scomment").slideDown(500);
    $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().next().children('.comment').slideUp(500);
  });

  // see if we have any comment items to trigger from the URL
  var str = window.location + '';
  var ary = str.split('#');
  if (ary[1] != 'undefined') {
    // this is the case for a node
   $('#'+ ary[1]).parent().prev().children().children().children().children().children().children().children().children().children().children('.node-show-comment-box').click();
   // this is the case for a sub-image
   $('#'+ ary[1]).parent().parent().parent().prev().children().children('.show-comment-box').click();
  }
});