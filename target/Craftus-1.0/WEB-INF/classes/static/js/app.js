$(function(){

  /* Disable double click on reset password page.*/
  Disable_Dbl_Click = function(){};
  Disable_Dbl_Click.fn = Disable_Dbl_Click.prototype;

  Disable_Dbl_Click.fn.init = function()
  {
    var click_num = 0;
    $("#login_button").on("click", function() {
        if (click_num > 0)
        {
            $("#login_button").attr("disabled", "disabled").off('click');
        }
        click_num++;
    });
  };

  if ( $('.forgotpswdreset').length > 0 )
  {
    Disable_Dbl_Click.fn.init();
  }

    /* Alignment on Search Page. Exception for marketplace tags. */
    Search_Add_Margin = function(){};
    Search_Add_Margin.fn = Search_Add_Margin.prototype;

    Search_Add_Margin.fn.init = function(){
      if ( $('.search-results-grid-copy > span.label').length > 0 ){
            $('.search-results-grid-copy').each(function(){
                var mp_tag_src = $(this).find('div').find('img').attr('src');

          if( ($(this).find('span.label').length == 0) && ($(this).find('div.marketplaceDisplay').length == 0) ){
                    $(this).css({'margin-top' : '26px'});
                } else {
                    $(this).css({'margin-top' : '0px'});
                }

                try
                {
                    if( mp_tag_src == "/static/www/images/marketplace/icons/marketplace-flag.gif" )
                    {
                        $(this).css({'margin-top' : '0px'})
                    }
                } catch(e)  {
                    return (e);
                }
            })
        }
    };

    /* Initialize Search_Add_Margin */
    if ( $('#search-results-grid').length > 0 )
    {
        Search_Add_Margin.fn.init();
    };

  /* Remove the company name on the brand page if
   * on a phone. */
  Marketplace_Brand_Remove_Name = function(){};
  Marketplace_Brand_Remove_Name.fn = Marketplace_Brand_Remove_Name.prototype;

  Marketplace_Brand_Remove_Name.fn.init = function()
  {
    var get_marketplace_id = document.getElementById('marketplace-header');
    var get_hp_hero = document.getElementById('hp_hero');
    var get_hp_hero_ul = get_hp_hero.getElementsByTagName('ul');
    var get_window_size = $(document).outerWidth();

    if (get_marketplace_id && get_window_size < 700)
    {
            // IP-9958 do show content for mobile
        //get_hp_hero_ul[0].style.display='none';
    }
  };

  /* Initialize Marketplace_Brand_Remove_Name */
  $(document).ready(function () {
      if(window.location.href.indexOf("brand") > -1)
      {
         Marketplace_Brand_Remove_Name.fn.init();
      }
  });

  /* Add margin to "MEET THE FOUNDERS" section top
   * text block. */
  Marketplace_Founder_Margin = function(){};
  Marketplace_Founder_Margin.fn = Marketplace_Founder_Margin.prototype;

  Marketplace_Founder_Margin.fn.init = function()
  {
    var brand_bio_parent = document.getElementById('brand-bio');
    var brand_bio_p_ele  = brand_bio_parent.getElementsByTagName('p');
    brand_bio_p_ele[0].style.marginTop='10px';
  };

  if( document.getElementById('brand-bio') )
  {
    Marketplace_Founder_Margin.fn.init();
  };

    /* Adjust Where They Help overlay content */
  Marketplace_Where_Help_Overlay = function(){};
  Marketplace_Where_Help_Overlay.fn = Marketplace_Where_Help_Overlay.prototype;

  Marketplace_Where_Help_Overlay.fn.init = function()
  {
    var countryList = $("#countries .overlay-content ul");
        if (countryList.length < 3) {
            var listWidth = parseInt(100 / parseInt(countryList.length)) - 1;
            countryList.css("width",listWidth + "%");
        }
  };

    if( $("#countries.reveal-modal").length > 0 )
  {
    Marketplace_Where_Help_Overlay.fn.init();
  };


  /* Color for the hashtag in the instagram cartridge */
  Insta_Hash_Color = function(){};
  Insta_Hash_Color.fn = Insta_Hash_Color.prototype;

  Insta_Hash_Color.fn.init = function()
  {
    var insta_par_ele = document.getElementById('instagram');
    var insta_sp_ele = insta_par_ele.getElementsByTagName('span');
    insta_sp_ele[0].style.color="#E65E4B";
  };

  /* Initialize Insta_Hash_Color */
  if( document.getElementById('instagram') )
  {
    Insta_Hash_Color.fn.init();
  }

  /* Format guided navigation for Shoes */
    Format_Guided_Shoe_Filter = function(){};
    Format_Guided_Shoe_Filter.fn = Format_Guided_Shoe_Filter.prototype;

    Format_Guided_Shoe_Filter.fn.init = function(){
        var get_shoe_size_title  = $('#sizeFilter').parent().parent().first().find('a.acc-top-filter').text();
    var get_ul_element    = document.getElementById('sizeFilter');
    var get_li_elements   = get_ul_element.getElementsByTagName('li');

            $('#sizeFilter').parent().parent().first().find('a.acc-top-filter').on("click", function(e) {
                get_ul_element.className += get_ul_element.className ? ' block-grid-4' : '';
          });
    };

    
    /* Initialize Format_Guided_Shoe_Filter */
    if ( document.getElementById('guided-navigation') && document.getElementById('sizeFilter') )
    {
      Format_Guided_Shoe_Filter.fn.init();
  };
  /* END copy here for 7552 */

  Cat_Add_Margin = function(){};
  Cat_Add_Margin.fn = Cat_Add_Margin.prototype;

  Cat_Add_Margin.fn.brand = function(){
      $('.brand-product').each(function(){
      if( $(this).find('span.label').length == 0 ){
           $(this).find('.brand-product-title').css({'margin-top' : '36px'});
          }
      })
  };

  if ( $('#brand-products').length > 0 )
  {
    Cat_Add_Margin.fn.brand();
  };

  /* Add margin to the top of product names, on the
     YMAL slider when products dont contain tags
  */
  YMAL_Add_Margin = function(){};
  YMAL_Add_Margin.fn = YMAL_Add_Margin.prototype;

  YMAL_Add_Margin.fn.product = function(){
      $('[id^="product_carousel"] .orbit-container li ul li').each(function(){
        if( $(this).find('.tag').length == 0 ){
                 $(this).find('figcaption').css({'margin-top' : '45px'});
        }
      })
  };

  if ( $('[id^="product_carousel"] .orbit-container li ul li').length > 0 ) {
    YMAL_Add_Margin.fn.product();
  };

  /*
    Adjust margin for bottom pagination on the
    category page.
  */
  Cat_Bottom_Pag_Margin = function(){};
  Cat_Bottom_Pag_Margin.fn = Cat_Bottom_Pag_Margin.prototype;

  Cat_Bottom_Pag_Margin.fn.init = function(){
    var bp_top_node = document.getElementById('bottom-pagination');
    if(bp_top_node){
      var bp_child_node = bp_top_node.childNodes[1];
      bp_child_node.style.margin="50px 0 0 0";
    }

  };

  /* Initialize Cat_Bottom_Pag_Margin */
  if(document.getElementById('results-name-number-con'))
  {
    Cat_Bottom_Pag_Margin.fn.init();
  };

  Cat_Label_Pos = function(){};
    Cat_Label_Pos.fn = Cat_Label_Pos.prototype;

  Cat_Label_Pos.fn.grid_test = function (el)
  {
    if (el === 1)
    {
        return 1;
    };
    return (0);
  };

  Cat_Label_Pos.fn.label_filter = function()
  {
    $(".product-state-1").filter(function(){
          var wdth = $(this).outerWidth()
          return wdth > 55;
      }).css({"margin-left" : "-10px"});
  };

  Cat_Label_Pos.fn.init = function()
    {
    this.search_res_grid = $('#search-results-grid').length;

    if ( Cat_Label_Pos.fn.grid_test(this.search_res_grid) === 1 )
    {
      Cat_Label_Pos.fn.label_filter();
    }
    return (0);
  };

  /* Initialize Cat_Label_Pos */
  Cat_Label_Pos.fn.init();

  Color_Mobile_Links = function(){};
  Color_Mobile_Links.fn = Color_Mobile_Links.prototype;

  Color_Mobile_Links.fn.init = function()
  {
    $('.mobile-links').css({ 'border' : 'none' })
    $('.mobile-links').parent().css({
      'background-color' : '#57b9e1',
      'border-bottom' : '1px solid #4598ba'
    })
  };

  /* Initialize Color_Mobile_Links */
  Color_Mobile_Links.fn.init();

  /* Section removed for IP-7905 */

  /* Category Grid RollOvers */
  var Cat_Grid_RO = function(){};
  Cat_Grid_RO.fn = Cat_Grid_RO.prototype;

  Cat_Grid_RO.fn.init = function()
  {
    
    $('.brand-product').css({'border' : '1px solid #fff'});
    $('.brand-product').on('mouseover', function(){
      $(this).css({
        'border' : '1px solid #ccc'
      });
    });    
    $('.brand-product').on('mouseout', function(){
      $(this).css({'border' : '1px solid #fff'});
    })
    
  };

  /* Initialize Cat_Grid_RO */
  Cat_Grid_RO.fn.init();

  /* Methods that maybe reusable */
  var Global_Methods = function(){};
  Global_Methods.fn = Global_Methods.prototype;

  /* Make garbage android tablets work */
  Global_Methods.fn.Android_Garbage = function()
  {
    var nua = navigator.userAgent;
    var is_android = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1);

    if (is_android == true)
    {
      var element = document.getElementsByTagName("meta");
      for (index = element.length - 1; index >= 0; index--) {
          element[index].parentNode.removeChild(element[index]);
      }

      if (screen.width>=768)
      {
        var vpw = (screen.width>=768)?'1024':'device-width';
          $('head').append('<meta name="viewport" content="width='+vpw+'" />');
      };
    };
  };

  /* Auto initialized for Search Results and Category Page */
  Global_Methods.fn.Flex_Equal_Height = function()
  {
    var container = $('#search-results-grid');

    var currentTallest = 0,
      currentRowStart = 0,
      rowDivs = new Array(),
      $el,
      topPosition = 0;

    $(container).each(function()
    {
      $el = $(this);
      $($el).height('auto')
      topPostion = $el.position().top;

      if (currentRowStart != topPostion)
      {
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++)
        {
          rowDivs[currentDiv].height(currentTallest);
        }

        rowDivs.length = 0; // empty the array
        currentRowStart = topPostion;
        currentTallest = $el.height();
        rowDivs.push($el);
      } else {
        rowDivs.push($el);
        currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
      }

      for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++)
      {
        rowDivs[currentDiv].height(currentTallest);
      }
    });

    $(this).auto_initialize();
  };

  Global_Methods.fn.init = function()
  {
    /* Define Class Variables */
    this.lang_acc_sel = $("#mobile-footer-acc dl.accordion #mobile-acc-one > a");
    this.lang_panel   = $("#mobile-acc-one > #panel1");
    this.dd_li_one    = $('#drop');
    this.pdp_dd_color = $("#pdp_color");
    this.dd_li_two    = $('#drop2');
    this.pdp_dd_size  = $("#pdp_size");
    this.dd_li_three  = $('#drop3');
    this.pdp_dd_qty   = $("#pdp_qty");

    var nua = navigator.userAgent;
    var is_android = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1);

    /* Initialize Methods */
    Global_Methods.fn.resize_window(this.lang_acc_sel, this.lang_panel);  /* Resize Window */
    Global_Methods.fn.back_to_top(this.lang_acc_sel, this.lang_panel);    /* Back To Top */
    Global_Methods.fn.mobile_link();        /* Makes the links to be clickable */
    Global_Methods.fn.drop_down_bttns();

    Global_Methods.fn.pdp_drop_down_bttns(this.dd_li_one, this.pdp_dd_color);
    Global_Methods.fn.pdp_drop_down_bttns(this.dd_li_two, this.pdp_dd_size);
    Global_Methods.fn.pdp_drop_down_bttns(this.dd_li_three, this.pdp_dd_qty);
    Global_Methods.fn.drop_down_bttns();

    Global_Methods.fn.remove_instagram_attr();

    if (is_android == false)
    {
      $('head').append(
        '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">'
      );
    }

    $('.prod-info-acc dd a').on("click", function(){
        var split_div = $('#' + this.href.split('#')[1]);

        $('.prod-info-acc dd a').children('span').html('&#9650');
        if (!split_div.hasClass('active') )
        {
           $(this).children('span').html('&#9660;')
        }
    });
  };

  /* Methods to be fired when the window is resized */
  Global_Methods.fn.resize_window = function(ele1, ele2)
  {
    $(window).resize(function() {
      ele2.removeClass("active");
      ele1.css({"background-color":"#5A534C"});
    });
  };

  /* Remove Member from Array */
  Global_Methods.fn.removeA = function removeA(arr)
  {
    var what, a= arguments, L= a.length, ax;
    while(L> 1 && arr.length)
    {
      what= a[--L];
      while((ax= arr.indexOf(what))!= -1)
      {
        arr.splice(ax, 1);
      }
    }
    return arr;
  }

  /* Back to top */
  Global_Methods.fn.back_to_top = function(ele1, ele2)
  {
    $(".back-to-top-trigger").on("click",function(e) {
      e.preventDefault();
      $("html, body").animate({scrollTop: 0}, 500);
      ele2.removeClass("active");
      ele1.css({"background-color":"#5A534C"});
    });
  };

  /* Dropdown Buttons */
   Global_Methods.fn.drop_down_bttns = function()
   {
    $('#drop li').on("click", function(){
     var drop_text = $(this).text();

     $("#search-results-dd-selected").html(drop_text);
    });
   };

  /* More filter guided nav */
  var More_Filter = function(){};
  More_Filter.fn = More_Filter.prototype;

More_Filter.fn.init = function()
 {
  this.more_styles = {
   'color' : '#57b9e1',
   'cursor' : 'pointer'
  };
  this.more_trigger = '';

  /* hide_elements() passed as parameter */
  More_Filter.fn.hide_elements(this.more_trigger)
  More_Filter.fn.toggle_elements($('.gn_nav_more'), this.more_styles);
 };

  More_Filter.fn.hide_elements = function(trggr)
  {
    /*
      -1 as 'Filter By' in the guided nav counts
      as an element.
    */
    var filter_list = $('.gn-filter-by dd').length - 1;

    for (i = 0, j = 5; i < filter_list; i++)
    {
      if ( $('#panel_gn'+j+' a').length > 10 )
      {
        $('#panel_gn'+j+' a:gt(9)').addClass('no-display');

        $('#panel_gn'+j+' ul').append(
          '<li class="gn_nav_more">More</li>'
        )
      }
      j++;
    };

    trggr = $('.gn_nav_more');

    /*
      Returning the event element to pass as parameter to
      the event handler.
    */
    return trggr;
  };

  More_Filter.fn.toggle_elements = function(trggr, styl)
  {
    trggr.css($.extend({}, styl, {'text-decoration':'underline'}))

    $('.gn_nav_more').on('click', function(){
      if ( $(this).parent().children('li').children('a').hasClass('no-display') )
      {
        $(this).parent().children('li').children('a').removeClass('no-display');
        $(this).html('Less');
      } else {
        $(this).parent().children('li').children('a:gt(9)').addClass('no-display');
        $(this).html('More');
      }
    });
  };

  /* Initialize More Filter for Guided Navigation */
  More_Filter.fn.init();
  /* End More Filter */

  /* PDP Dropdown Buttons */
  Global_Methods.fn.pdp_drop_down_bttns = function(ele1, ele2){
    ele1.on("click", function(e){
      if ($(e.target).parents("li").hasClass('oos')) {
        e.stopImmediatePropagation();
        return false;
      } else {
        if ($(e.target).attr("id") == ele1.attr("id")) {
            e.stopImmediatePropagation();
            return false;
        } else {
            var eTarget = $(e.target);
            if (e.target.nodeName == "SPAN") {
                eTarget = $(e.target).parent();
            }
            var drop_text = $.trim(eTarget.contents().filter(function() {return this.nodeType === 3;}).text());
            ele2.html(drop_text);
            $(this).removeClass('open');
            ele2.attr('data-value', drop_text).click();
            if ($(e.target).attr("data-pid")) {
                ele2.attr('data-pid', $(e.target).attr("data-pid"));
            }
            setTimeout(function() {
                ele2.attr('aria-expanded', false).focus();
            },200);
        }
      }
    });
  };

  /* Mobile Link */
  Global_Methods.fn.mobile_link = function()
  {
        var dragging = false;
        $("#mobile-footer-acc li.lang-link a, .hide-for-small.sub-footer-con li.lang-link a, .mobile-nav-lang-select span a, .mobile-nav-content-list li a, .mobile-nav-sub-links a, .mobSale a, .linkMob a, .linkSale a, .navSale a, a.mobile-links, .bv-rating, .nav-gifts a, .lang a, .meganav a").not(".nav-top-links, .nav-toggle, .cart-toggle, .mega-close, .menu-close, .ft-menu-close").on("touchmove", function(){
          dragging = true;
        });
        $("#mobile-footer-acc li.lang-link a, .hide-for-small.sub-footer-con li.lang-link a, .mobile-nav-lang-select span a, .mobile-nav-content-list li a, .mobile-nav-sub-links a, .mobSale a, .linkMob a, .linkSale a, .navSale a, a.mobile-links, .bv-rating, .nav-gifts a, .lang a, .meganav a, .nav-account-details a").not(".nav-top-links, .nav-toggle, .cart-toggle, .mega-close, .menu-close, .ft-menu-close").on("click touchend touchcancel", function(event){
          if(!dragging) {
            if($(this).attr('href') != undefined) location.href=$(this).attr('href');
          } else {
            dragging = false;
          }
        });
  };

  /* Dropdown Buttons */
  Global_Methods.fn.drop_down_bttns = function()
  {
    $('#drop li').on("click", function(){
      var drop_text = $(this).text();

      $("#search-results-dd-selected").html(drop_text);
    });
  };

  /* Remove class attribute on instagram module (double rows) */
  Global_Methods.fn.remove_instagram_attr = function()
  {
        if($("#results-name-number-con").length > 0) { // for category/search page
    $('#instagram').removeAttr('class');
        }
  }

  /* Initialize Global_Methods */
  Global_Methods.fn.init();
  /* Global Methods End */

  /* Language Selector */
  var Lang_Select = function(){};
    Lang_Select.fn = Lang_Select.prototype;

  Lang_Select.fn.init = function()
  {
    /* hoverIntent configuration object
     *
     * sensitivity:      int = sensitivity threshold
     * interval:         int = milliseconds for onMouseOver polling interval
     * over:        function = onMouseOver callback (required)
     * timout:           int = milliseconds delay before onMouseOut
     * out:         function = onMouseOut callback (required)
    */
    var config = {
      sensitivity: 3,
      interval: 0,
      over: do_open,
      timeout: 200,
      out: do_close
    };
    /************************************************************************/
    Lang_Select.fn.flag_switch();

    var dropdown_touch = $("ul.dropdown li");
    var dropdown_click = $("ul.desk-dropdown li.change-lang");
    var d_t_parent     = $('ul:first','ul.dropdown li');

    function do_open()
    {
      $(this).addClass("hover");
      $('ul:first',this).css('visibility', 'visible');
    };

    function do_close()
    {
      $(this).removeClass("hover");
      $('ul:first',this).css('visibility', 'hidden');
    };

    dropdown_touch.hoverIntent(config);
    dropdown_click.hoverIntent(config);

    /* Tap functionality for tablet footer language selector */
    dropdown_touch.add(dropdown_click).on("click", function(e){
      if( $(this).hasClass("hover") )
      {
        $(this).removeClass('hover');
        $('ul:first',this).css('visibility', 'hidden');
      } else {
        $(this).addClass("hover");
        $('ul:first',this).css('visibility', 'visible');
      }
    });

        $(".sub_menu a").on("touchstart", function() {
            document.location = $(this).attr("href");
        });

    /* Close language selector after scroll is complete */
    $(window).scroll(function(){
      dropdown_touch.removeClass('hover');
      d_t_parent.css('visibility', 'hidden');
    });
  };

  Lang_Select.fn.flag_switch = function()
  {
    /* Event */
    function lang_select_nav()
    {
      var country_name = $(this).text();
      var flag_src = $(this).parent().prev().children('img').attr('src');

      $('#desktop-lang-selector .change-lang .change-lang-trigger .desktop-nav-current-language').text(country_name);
      $('#desktop-lang-selector .change-lang .change-lang-trigger img').attr('src', flag_src);
      $('#landscape-footer-links .dropdown .change-lang a img').attr('src', flag_src);
      $('#landscape-footer-links .dropdown .change-lang a .footer-current-lang').text(country_name);
    };

    function close_on_click()
    {
      $('#desktop_lang_selector .change-lang .sub_menu').css('visibility', 'hidden');
    }
    /* Delegate Event */
    $('#desktop-lang-selector .sub_menu a.desktop-nav-lang-trigger').on("click",lang_select_nav);

    function lang_select_footer()
    {
      var country_name = $(this).text();
      var flag_src = $(this).parent().prev().children('img').attr('src');

      $('#desktop-lang-selector .change-lang .change-lang-trigger .desktop-nav-current-language').text(country_name);
      $('#desktop-lang-selector .change-lang .change-lang-trigger img').attr('src', flag_src);
      $('#landscape-footer-links .dropdown .change-lang a img').attr('src', flag_src);
      $('#landscape-footer-links .dropdown .change-lang a .footer-current-lang').text(country_name);
    }
    $('.dropdown ul.sub_menu li a.desktop-footer-lang-trigger').on("click",lang_select_footer);
  };
  /* Initialize Lang_Select */
  Lang_Select.fn.init();
  /* Language Selector Ends */


  /* Methods for Mobile Footer Accordion */
  var Mobile_Accordion = function(){};
  Mobile_Accordion.fn = Mobile_Accordion.prototype;

  Mobile_Accordion.fn.change_lang_bg = function()
  {
    var lang_acc_sel = "#mobile-footer-acc dl.accordion #mobile-acc-one > a";

    function acc_swap_color()
    {
      if ($("#mobile-acc-one > #panel1").not("active"))
      {
        $(lang_acc_sel).css({"background-color":"#3C342C"});
      }
      if ($("#mobile-acc-one > #panel1").hasClass("active"))
      {
        $(lang_acc_sel).css({"background-color":"#5A534C"});
      }
    };

    $(".accordion #mobile-acc-one").on("click", acc_swap_color);

  };

  Mobile_Accordion.fn.init = function()
  {
    Mobile_Accordion.fn.change_lang_bg();
  };
  /* Initialize Mobile_Accordion */
  Mobile_Accordion.fn.init();
  /* Mobile Accordion Ends */

  /* Desktop Navigation */
  var Desktop_Nav = function(){};
  Desktop_Nav.fn = Desktop_Nav.prototype;

  Desktop_Nav.fn.init = function()
  {
    /* hoverIntent configuration object
     *
     * sensitivity:      int = sensitivity threshold
     * interval:         int = milliseconds for onMouseOver polling interval
     * over:        function = onMouseOver callback (required)
     * timout:           int = milliseconds delay before onMouseOut
     * out:         function = onMouseOut callback (required)
    */
    var config = {
      sensitivity: 3,
      interval: 0,
      over: Desktop_Nav.fn.do_open,
      timeout: 0,
      out: Desktop_Nav.fn.do_close
    };
    /************************************************************************/
    Desktop_Nav.fn.tablet_ui();
    Desktop_Nav.fn.product_rollover();
        var meganav_li = $("ul.desktop-nav-trigger li");
        var meganav_trigger = meganav_li.find("a");
        var isSaleSite = (($('#locale').val() == 'en_UG') || ($('#locale').val() == 'en_OM')) ? true : false;
        var CaSaleSite = ($('#locale').val() == 'en_OM') ? true : false;
        meganav_trigger.hoverIntent(config);
        if(isSaleSite){
          $('.desktop-nav-arrow-ro').remove();
        }
        if(CaSaleSite){
          $('.bv-rating, #CustomerReviews').hide();
        }

        // Tablet UI
        meganav_trigger.on("touchstart", function(e) {
            e.preventDefault();
            if (typeof $(this).parent().attr("class") != "undefined") {
                if(isSaleSite){
                  if(typeof $(this).attr('href') != "undefined"){
                    location.href=$(this).attr('href');
                  }
                }else{
                  e.stopPropagation();
                }
            }
            var parentDiv = $(this).parent();
            if ($(this).hasClass("active")) {
                Desktop_Nav.fn.do_close.call($(this));
                $(this).removeClass("active");
            } else {
                // Close any other open nav first
                var activeElem = meganav_li.find("a.active");
                Desktop_Nav.fn.do_close.call(activeElem);
                activeElem.removeClass("active");
                Desktop_Nav.fn.do_open.call($(this));
                $(this).addClass("active");
            }
        });
        $("#mega-nav-con").on("click", function(e) {
            e.stopPropagation();
        });
        $(document).on("click", function() {
            var activeElem = meganav_li.find("a.active");
            Desktop_Nav.fn.do_close.call(activeElem);
            activeElem.removeClass("active");
        });
        var is_mobile = (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) ? true : false;
        if (is_mobile) {
            meganav_trigger.on("click",function(e) {
              if (typeof $(this).parent().attr("class") != "undefined") {
                if(isSaleSite){
                  if(typeof $(this).attr('href') != "undefined"){
                    location.href=$(this).attr('href');
                  }
                }else{
                  e.preventDefault();
                }
              }
            });
        }

    $('.mega-nav-cat-links-col-temp-2 li:nth-last-child(1)').css({"padding-bottom":"1px"});

    $('#0, #1, #2, #3, #4').on('mouseleave', function(){
      $(this).addClass('no-display');
      $('#mega-nav-con').addClass('no-display');
    });
    $('#3').on('mouseleave', function(){
      $(this).addClass('no-display');
      $('#mega-nav-con').addClass('no-display');
    })
    $('#4').on('mouseleave', function(){
      $(this).addClass('no-display');
      $('#mega-nav-con').addClass('no-display');
    })
  };

  /* Desktop Navigation Open State */
  Desktop_Nav.fn.do_open = function(trigger)
  {
    Desktop_Nav.fn.do_default();

    /* Get which mega nav section has been requested */
    var section = $(this).parent().attr('class');
    $('#' + section).hover(function(){
      $('#' + section).addClass('hover')
    }, function(){
      $('#' + section).removeClass('hover');
      $('ul.desktop-nav-trigger li a').css('color','#fff');
      $('ul.desktop-nav-trigger li a span').css('visibility','hidden');
    });

    /* Delegate event to currently opened tab */
    $('#' + section).on('mouseleave', Desktop_Nav.fn.do_default);

    /* Hover effect for nav trigger */
    $(this).css({
      color      : "#5acb89",
      WebkitTransition : 'color 150ms ease-in-out',
      MozTransition    : 'color 150ms ease-in-out',
      MsTransition     : 'color 150ms ease-in-out',
      OTransition      : 'color 150ms ease-in-out',
      transition       : 'color 150ms ease-in-out'
    });
    $('#mega-nav-con').removeClass('no-display');

    /* Open navigation panel based on id */
    $('#' + section).removeClass('no-display');

    /* Arrow that appears underneath anchor */
    $('span',this).css('visibility', 'visible');
  };

  /* Desktop Navigation Close State */
  Desktop_Nav.fn.do_close = function()
  {
    Desktop_Nav.fn.do_default();

    /* Get which mega nav section has been requested */
    var section = $(this).parent().attr('class');

    if( $('#' + section).hasClass('hover') )
    {
      $(this).css({
        color      : "#5acb89",
        WebkitTransition : 'color 150ms ease-in-out',
        MozTransition    : 'color 150ms ease-in-out',
        MsTransition     : 'color 150ms ease-in-out',
        OTransition      : 'color 150ms ease-in-out',
        transition       : 'color 150ms ease-in-out'
      });
      $('span',this).css('visibility', 'visible');
    } else {
      $(this).css({
        color      : "#fff",
        WebkitTransition : 'color 150ms ease-in-out',
        MozTransition    : 'color 150ms ease-in-out',
        MsTransition     : 'color 150ms ease-in-out',
        OTransition      : 'color 150ms ease-in-out',
        transition       : 'color 150ms ease-in-out'
      });
      /* Arrow that appears underneath anchor */
      $('span',this).css('visibility', 'hidden');
      $('#mega-nav-con').addClass('no-display');
      $('#' + section).addClass('no-display');
    }
  };

  /* Return navigation to its default state */
  Desktop_Nav.fn.do_default = function()
  {
    $('ul.desktop-nav-trigger li a').css('color','#fff');
    $('ul.desktop-nav-trigger li a span').css('visibility','hidden');
  };

  Desktop_Nav.fn.product_rollover = function()
  {
    /* hoverIntent configuration object
     *
     * sensitivity:      int = sensitivity threshold
     * interval:         int = milliseconds for onMouseOver polling interval
     * over:        function = onMouseOver callback (required)
     * timout:           int = milliseconds delay before onMouseOut
     * out:         function = onMouseOut callback (required)
    */
    var config = {
      sensitivity: 3,
      interval: 0,
      over: do_over,
      timeout: 200,
      out: do_out
    };
    /************************************************************************/
    $('#mega-nav-con .mega-nav-item-row-con ul li').hoverIntent(config);
    $('#mega-nav-con .mega-nav-item-row-con ul li a').css('text-decoration','none');
    function do_over() {
      $('div p',this).css({
        color      : "#5acb89",
        WebkitTransition : 'color 250ms ease-in-out',
        MozTransition    : 'color 250ms ease-in-out',
        MsTransition     : 'color 250ms ease-in-out',
        OTransition      : 'color 250ms ease-in-out',
        transition       : 'color 250ms ease-in-out'
      });
    };

    function do_out() {
      $('div p',this).css({
        color      : "#373533",
        WebkitTransition : 'color 250ms ease-in-out',
        MozTransition    : 'color 250ms ease-in-out',
        MsTransition     : 'color 250ms ease-in-out',
        OTransition      : 'color 250ms ease-in-out',
        transition       : 'color 250ms ease-in-out'
      });
    }
  }

    Desktop_Nav.fn.tablet_ui = function() {
        var scaleMax = 900, ratio = 1, navCon = $(".desktop-nav-con"), mNav = navCon.find("li a"),
        topBar = $("#nav-bg-full-width"), btsMenu = $("#bts_menu"), logoImg = $(".name img"), navBar = $(".top-bar"),
        cartNum = $("#nav-cart-num"), navLogin = $("#nav-login"), navArr = $(".desktop-nav-arrow-ro"),
        loyalty = $("#loyalty-nav-logo"), cart = $(".cart-nav-con"), promoLink = $(".promo-inline-con, .promo-link"),
        navSale = $(".navSale a");
        var navRowPad = (mNav.length) ? parseInt($(".desktop-nav-con").css("padding-left").replace("px","")) : 0;
        var navTop = (mNav.length) ? parseInt($(".desktop-nav-con").css("padding-top").replace("px","")) : 0;
        var origTopBar = topBar.height(), navMain = $("#navigation-container");
        var is_mobile = (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) ? true : false;

        btsMenu.hover(function() {
            $(this).addClass("hover");
        }, function() {
            $(this).removeClass("hover");
        });
        function onResize() {
            ratio = ((window.innerWidth <= scaleMax) && (window.innerWidth >= 600)) ? (window.innerWidth / scaleMax).toFixed(2) : 1;
            var fontSmVal = (14 * ratio).toFixed(2), fontSm = fontSmVal + "px";
            var fontLg = (16 * ratio).toFixed(2) + "px";
            var bts = (143 * ratio).toFixed(2) + "px";
            var isLoyalty = $(".loyalct").length ? true : false;
            var promoFont = (window.innerWidth >= 600) ? fontSmVal : fontSmVal - 3;
            //topBar.add(navBar).height((origTopBar * ratio).toFixed(2));
            mNav.css({"font-size" : fontSm, "letter-spacing" : "0", "padding" : "0 " + (10 * ratio).toFixed(2) + "px !important"});
            navLogin.css({"font-size" : fontSm});
            promoLink.css({"font-size" : promoFont + "px"});
            cartNum.css({"font-size" : fontLg});
            navCon.css({"padding-left" : (navRowPad * ratio).toFixed(2) + "px"/*, "padding-top" : (navTop * ratio).toFixed(2) + "px"*/});
            btsMenu.attr("data-ratio", ratio).css({"padding-left" : bts, "width" : bts, "height" : (54 * ratio).toFixed(2) + "px", "margin-top" : (-14 * ratio).toFixed(2) + "px"});
            //logoImg.css("width", 120 * ratio + "px");
            navArr.css("top", (28 * ratio).toFixed(2) + "px");
            if (is_mobile && isLoyalty) {
                loyalty.css({"width":88 * ratio, "height":62 * ratio, "right":"5px"});
                navSale.css("margin-left","15px");
                navCon.css({"padding-left" : (navRowPad * ratio).toFixed(2) - 15 + "px"});
            } else {
                //loyalty.css({"width":88 * ratio, "height":62 * ratio, "right":40 * ratio});
            }
            navMain.css("visibility","visible");
        }
        $(window).resize(function() {
            onResize();
        }).trigger("resize");
    }

  /* Initialize Desktop_Nav */
  Desktop_Nav.fn.init();
  /* Desktop Navigation Ends */

  /* Mobile Navigation */
  var Mobile_Nav = function(){};
  Mobile_Nav.fn = Mobile_Nav.prototype;

  Mobile_Nav.fn.init = function()
  {
    /* Variables */
    this.nav_trigger           = $(".mobile-nav-trigger");
    this.ico_src_off           = "/static/www/new/images/navigation/mobile_nav_ico.png";
    /* Embedded Accordions */
    this.mobile_nav            = $("#mobile-nav");
    this.women_trigger         = $("#n_panel1 a");
    this.men_trigger           = $("#n_panel2 a");
    this.kids_trigger          = $("#n_panel3 a");
    this.marketplace_trigger   = $("#n_panel4 a");
    this.coffee_trigger        = $("#n_panel5 a");

    /* Toggle the visibility of embedded accordions */
    Mobile_Nav.fn.toggle_acc(this.women_trigger);
    Mobile_Nav.fn.toggle_acc(this.men_trigger);
    Mobile_Nav.fn.toggle_acc(this.kids_trigger);
    Mobile_Nav.fn.toggle_acc(this.marketplace_trigger);
    Mobile_Nav.fn.toggle_acc(this.coffee_trigger);

    /* Toggle the visibility of the mobile navigation */
    Mobile_Nav.fn.open_close(this.nav_trigger, this.mobile_nav, this.ico_src_off);

        /* Determine category level and apply UI */
        Mobile_Nav.fn.apply_root_level_ui();

    /* Toggle crosshairs for root accordion panels */
    Mobile_Nav.fn.toggle_root_crosshair();

    /* Apply proper padding to anchor list in first level
     * of mobile nav (About TOMS, Get Help...) */
    Mobile_Nav.fn.apply_padding_anchor_list();

    /* Close mobile nav from inside mobile nav */
    Mobile_Nav.fn.close_from_nav(this.ico_src_off, this.nav_trigger);

    /* Swap flags and language displayed when user
     * selects a language in mobile navigation */
    Mobile_Nav.fn.flag_switch();

    /* Swap flags and language displayed when user
     * selects a language in the mobile footer */
    //Mobile_Nav.fn.flag_switch_mobile_footer();
  };

    Mobile_Nav.fn.apply_root_level_ui = function() {
        $.each($(".acc-root","#mobile-nav"),function() {
            if ($(this).attr("data-url")) {
                var tabContent = $(this).next(".content");
                if (!tabContent.find("dd").length) {
                    tabContent.hide();
                    $(this).on("click",function() {
                        location.href = $(this).attr("data-url");
                    }).find(".root-open-close-crosshair").hide();
                }
            }
        });
    }

  Mobile_Nav.fn.open_close = function(ele1, ele2, ele3)
  {
    var ico_src_on  = "/static/www/new/images/navigation/nav-icon-over.png";
    ele1.css("cursor","pointer");

    /* Event */
    function do_toggle(){
      ele2.toggleClass('no-display');
      if(ele2.hasClass('no-display')){
                $(this).removeClass("open");
      } else {
                $(this).addClass("open");
      }
    };
    /* Delegate Event */
    ele1.on("click", do_toggle);
  };

  Mobile_Nav.fn.toggle_acc = function(ele1)
  {
    /* Event */
    function do_toggle()
    {
      $('.open-close-crosshair').html('+');
      $(this).children('.open-close-crosshair').html('-');

      var checkPanel = $(this).attr('href');
      if(checkPanel.match("^#n_panel")) {
        $('dl.tabs dd a').css({"background-color": "#186280"});
      }
      $(this).css({"background-color": "#0a4b65"});

      if($('#' + this.href.split('#')[1]).hasClass('no-display'))
      {
        $('.tabs .tabs-content div').addClass('no-display');
        $('#' + this.href.split('#')[1]).removeClass('no-display');
      } else {

        $('.open-close-crosshair').html('+');
        $(this).css({"background-color": "#186280"});
        $('#' + this.href.split('#')[1]).addClass('no-display');
      }
      $('div.tabs-content a').css({"background-color": "#0a4b65"});
    };
    /* Delegate Event*/
    ele1.on("click", do_toggle);
  };

  Mobile_Nav.fn.toggle_root_crosshair = function()
  {
    /* Event */
    function do_toggle()
    {
      $('.root-open-close-crosshair').html('+');
      $('.root-open-close-crosshair-me').html("&#9660;");

      $(this).children('.root-open-close-crosshair').html('-');
      $(this).children('.root-open-close-crosshair-me').html('&#9650;');

      if($('#' + this.href.split('#')[1]).hasClass('no-display'))
      {
        $('.emb-acc').addClass('no-display');
        $('#' + this.href.split('#')[1]).removeClass('no-display');
      } else {
        $('.root-open-close-crosshair').html('+');
        $('.root-open-close-crosshair-me').html('&#9660;');
        $('#' + this.href.split('#')[1]).addClass('no-display');
        /*
                $(this).siblings('div').find('dl dd.active a').trigger('click');
        */
      }
      $('div.tabs-content dd a').css({"background-color": "#186280"});
    };
    /* Delegate Event */
    $('.acc-root').on("click",do_toggle);
  };

  Mobile_Nav.fn.apply_padding_anchor_list = function()
  {
    $('dd.mobile-nav-sub-links a').css({"padding-top": "0px"});
    $('dd.mobile-nav-sub-links a:first-child').css({"padding-top": "25px"});
    $('dd.mobile-nav-sub-links a:last-child').css({"padding-bottom": "25px"});
  };

  Mobile_Nav.fn.close_from_nav = function(ele1, ele2)
  {
    var ico_src_off = "/static/www/new/images/navigation/mobile_nav_ico.png";

    $('.mobile-nav-close').on("click", function(){
      /*IP-11726*/
      $(".mobile-nav-trigger").trigger("click");
    });
  };

  Mobile_Nav.fn.flag_switch = function()
  {
    /* Event */
    function lang_select()
    {
      var flag_src = $(this).parent().parent().children('a').children('img').attr('src');
      var country_name = $(this).text();

      $('#current-mobile-footer-lang').text(country_name);
      $('.acc-root-lang img').attr('src', flag_src);
      $('#mobile-current-lang').text(country_name);
      $('.mobile-lang-trigger img').attr('src', flag_src);
    };
    /* Delegate Event */
    $('#n_panel6 .tabs .mobile-nav-lang-trigger').on("click", lang_select);
  };

  Mobile_Nav.fn.flag_switch_mobile_footer = function()
  {
    /* Disable return on the panel containing the languages */
    $('#panel1').on("click", function(){return false;})

    /* Event */
    function lang_select()
    {
      var country_name = $(this).text();
      var flag_src = $(this).parent().prev().children('img').attr('src');

      $('#mobile-current-lang').text(country_name);
      $('.mobile-lang-trigger img').attr('src', flag_src);
      $('#current-mobile-footer-lang').text(country_name);
      $('.acc-root-lang img').attr('src', flag_src);
    };
    /* Delegate Event */
    $('.lang-link a').on("click", lang_select);
  };

  /* Initialize Mobile_Nav */
  Mobile_Nav.fn.init();
  /* Mobile Navigation Ends */

  /* Guided Navigation */
  var Guided_Nav = function(){};
  Guided_Nav.fn = Guided_Nav.prototype;

  Guided_Nav.fn.mobile_filter_toggle = function(){

    $('.mobile-filter-wrapper').addClass('no-display');

    $('.mobile-filter-toggle').css({"border-bottom": "2px solid #e9e4de"})

    $('.mobile-filter-toggle').on("click", function(){
      $('.mobile-filter-wrapper').toggleClass('no-display');

      if ( $('.mobile-filter-wrapper').hasClass('no-display') )
      {
        $('.mobile-filter-toggle').css({"border-bottom": "2px solid #e9e4de"})
        $('.content').removeClass('active');
        $('.mobile-filter-open-close-crosshair').html('+');
      } else {
        $('.mobile-filter-toggle').css({"border-bottom": "none"})
        $('.mobile-filter-open-close-crosshair').html('-');
      }
    })

  };

  Guided_Nav.fn.shop_by_rollovers = function(ele)
  {
    ele.on('mouseover', function(){ $(this).css({ "color":"#57b9e1" }) })
    ele.on('mouseout', function(){ $(this).css({ "color":"#53504c" }) })
  };

  Guided_Nav.fn.filter_by_rollovers = function(ele)
  {
    ele.on('mouseover', function(){ $(this).css({ "color":"white", "background-color":"#57b9e1" }) })
    ele.on('mouseout', function(){ $(this).css({ "color":"#53504c", "background-color":"transparent" }) })
  };

  Guided_Nav.fn.set_borders = function(ele1, ele2, ele3)
  {
    var gn_shop_last_a   = $('.gn-shop-by dd:nth-last-child(1) a')
    var gn_shop_last_div = $('.gn-shop-by dd:nth-last-child(1) div')

    ele1.addClass('last-anchor-border');
    ele2.css({"border-bottom": "2px solid #e9e4de"});

    ele3.on('click', function(){
      ele1.addClass('last-anchor-border');
    })

    ele1.on("click", function(){
      if($(this).parent().children('div').hasClass('active'))
      {
        $(this).addClass('last-anchor-border');
      } else {
        $(this).removeClass('last-anchor-border');
      }
    });
  };

  Guided_Nav.fn.clear_all_button = function(ele1, ary)
  {
    function init_clear() {
      ary.length = 0;
      $('#gn_selections span').remove();
      $('#guided-navigation a li').removeClass('filter-selected');
      $('.block_con a div').removeClass('color-selected');
      $('#gn_selections').addClass('no-display');
      $(this).addClass('no-display');
    }
    ele1.on("click",init_clear);
  };

  Guided_Nav.fn.filter_func = function(ele1, ary, counter)
  {
    function init_filters() {
      if ( $(this).hasClass('filter-selected') )
      {
        var current_i = $(this).text().replace(/\s+/g, '-');

        Global_Methods.fn.removeA(ary,current_i);
        $('#'+current_i).detach();
        $('#gn_selections').has('span').length ? true : $('#gn_selections,#clear-all-btn').addClass('no-display');
        $(this).removeClass('filter-selected');

      } else {
        var current_i = $(this).text().replace(/\s+/g, '-');

        $('#gn_selections').removeClass('no-display');
        $(this).addClass('filter-selected');
        $(this).addClass(current_i);

        if ($.inArray(current_i, ary) > -1)
        {
          return false;
        } else {
          ary[counter] = current_i;
          $('#clear-all-btn').removeClass('no-display');
          $('#gn_selections').append('<span id='+ary[counter]+' class="cloud-tag">'+ary[counter]+'&nbsp;X</span>');

          $('.cloud-tag').on('click', function(){
            var span_id = $(this).attr('id');
            $(this).detach();
            Global_Methods.fn.removeA(ary,span_id);
            $('#gn_selections').has('span').length ? true : $('#gn_selections,#clear-all-btn').addClass('no-display');
            $('#guided-navigation .gn-filter-by a li.'+span_id+'').removeClass('filter-selected');
          })
        }
        counter++;
      }
    }
    ele1.on("click", init_filters);
  };

  Guided_Nav.fn.toggle_cross_hairs = function(ele1)
  {
    function toggle() {
      if($('#' + this.href.split('#')[1]).hasClass('active'))
      {
        $(this).parents("dl").find('.open-close-crosshair').html('+');
        $(this).children('.open-close-crosshair').html('+');
      } else {
        $(this).parents("dl").find('.open-close-crosshair').html('+');
        $(this).children('.open-close-crosshair').html('-');
      }
    }
    ele1.on("click", toggle);
  }

  Guided_Nav.fn.init = function()
  {
    var button_store = [];
    var i = 0;

    var gal_a_li        = $('#guided-navigation .gn-anchor-list a li');
    var gal_feat_a_li   = $('#guided-navigation .featured-ul a li');
    var gal_filter_a_li = $('#guided-navigation .gn-filter-anchor-list a li');

    var gn_shop_last_a   = $('.gn-shop-by dd:nth-last-child(1) a');
    var gn_shop_last_div = $('.gn-shop-by dd:nth-last-child(1) div');
    var gn_shop_dd_a     = $('#guided-navigation .gn-shop-by dd a');

    var gn_filter_last_a   = $('.gn-filter-by dd:nth-last-child(1) a');
    var gn_filter_last_div = $('.gn-filter-by dd:nth-last-child(1) div');
    var gn_filter_dd_a     = $('#guided-navigation .gn-filter-by dd a')

    var clear_all_btn = $('#clear-all-btn');

    var filter_triggers = $('#guided-navigation .gn-filter-by a li');
    var color_triggers  = $('.block_con a div');

    var shop_tog_class   = $('.acc-top');
    var filter_tog_class = $('.acc-top-filter')

    clear_all_btn.css({'cursor':'pointer'});

    Guided_Nav.fn.shop_by_rollovers(gal_a_li);
    Guided_Nav.fn.shop_by_rollovers(gal_feat_a_li);

    Guided_Nav.fn.set_borders(gn_shop_last_a, gn_shop_last_div, gn_shop_dd_a);
    Guided_Nav.fn.set_borders(gn_filter_last_a, gn_filter_last_div, gn_filter_dd_a);

    Guided_Nav.fn.filter_by_rollovers(gal_filter_a_li);

    Guided_Nav.fn.clear_all_button(clear_all_btn, button_store);

    Guided_Nav.fn.filter_func(filter_triggers, button_store, i);

    Guided_Nav.fn.toggle_cross_hairs(shop_tog_class);
    Guided_Nav.fn.toggle_cross_hairs(filter_tog_class);
    Guided_Nav.fn.mobile_filter_toggle();

    color_triggers.on('click', function(){
      if ( $(this).hasClass('color-selected') )
      {
        var current_i = $(this).text();
        var cloud_id = $.trim(current_i);
        $('#'+cloud_id).detach();
        $(this).removeClass('color-selected');
        $('#gn_selections').has('span').length ? true : $('#gn_selections,#clear-all-btn').addClass('no-display');

        Global_Methods.fn.removeA(button_store,current_i);


      } else {
        var current_i = $(this).text();

        $.trim(current_i);
        $('#gn_selections').removeClass('no-display');
        $(this).addClass('color-selected');
        $(this).addClass(current_i);

        if ($.inArray(current_i, button_store) > -1)
        {
          return false;
        } else {
          button_store[i] = current_i;
          $('#clear-all-btn').removeClass('no-display');
          $('#gn_selections').append('<span id='+button_store[i]+' class="cloud-tag">'+button_store[i]+'&nbsp;X</span>');

          $('.cloud-tag').on('click', function(){
            var span_id = $(this).attr('id');
            $(this).detach();
            Global_Methods.fn.removeA(button_store,current_i);
            $('#gn_selections').has('span').length ? true : $('#gn_selections,#clear-all-btn').addClass('no-display');
            $('.block_con a div.'+span_id+'').removeClass('color-selected');
          })
        }
        i++;

      }
    });
  };

  /* Initialize Guided Navigation */
  Guided_Nav.fn.init();
  /* Guided Navigation Ends */

  /* Mini Cart */
   var Mini_Cart = function(){};
   Mini_Cart.fn = Mini_Cart.prototype;

   Mini_Cart.fn.jsp_req = function()
   {
    var mc_data = [];

    $.ajax({
              url : '/globalelement/minicart.jsp',
              async : false,
              dataType : 'html',
              success : function(data) {
                 $('#miniCart').html(data);
              }
          })
   }
   Mini_Cart.fn.init = function()
   {
    /* hoverIntent configuration object
     *
     * sensitivity:      int = sensitivity threshold
     * interval:         int = milliseconds for onMouseOver polling interval
     * over:        function = onMouseOver callback (required)
     * timout:           int = milliseconds delay before onMouseOut
     * out:         function = onMouseOut callback (required)
    */
    var config = {
     sensitivity: 3,
     interval: 0,
     over: do_open,
     timeout: 200,
     out: do_close
    };
    /************************************************************************/
    var mini_cart_container = $('#mini-cart');
    var mini_cart_trigger   = $('#nav-cart-img, #nav-cart-num');

    function do_open()
    {
     mini_cart_trigger.css('cursor','pointer');
     mini_cart_container.removeClass('no-display');
    };

    function do_close()
    {
     mini_cart_container.addClass('no-display');
    };

    mini_cart_container.on("mouseout", function(){
     $(this).addClass("no-display");
    })

    mini_cart_trigger.hoverIntent(config);
   // Mini_Cart.fn.jsp_req();

      mini_cart_trigger.on("touchstart", function() {
        document.location = $("a", this).attr("href");
      });
      $("#nav-cart-num").on("touchstart", function() {
        document.location = $(this).next().find("a").attr("href");
      });
   };

   /* Initialize Mini-Cart */
   Mini_Cart.fn.init();
   /* Mini-Cart Ends*/

  /* Nav Account Dropdown */
  var Nav_Account = function(){};
  Nav_Account.fn = Nav_Account.prototype;

  Nav_Account.fn.init = function()
  {
    /* hoverIntent configuration object
     *
     * sensitivity:      int = sensitivity threshold
     * interval:         int = milliseconds for onMouseOver polling interval
     * over:        function = onMouseOver callback (required)
     * timout:           int = milliseconds delay before onMouseOut
     * out:         function = onMouseOut callback (required)
    */
    var config = {
      sensitivity: 3,
      interval: 0,
      over: do_open,
      timeout: 200,
      out: do_close
    };
    /************************************************************************/
    var nav_account_container = $('#nav-account');
    var nav_account_trigger   = $('#nav-login');
    var nav_account_logout = $('.nav_login_dropdown_logout');
    
    nav_account_logout.on('touchstart', function() {
      nav_account_logout.click();
    });
    function do_open()
    {
      nav_account_trigger.css('cursor','pointer');
      nav_account_container.removeClass('no-display');
    };

    function do_close()
    {
      nav_account_container.addClass('no-display');
    };

    nav_account_container.on("mouseout", function(){
      $(this).addClass("no-display");
    })

    nav_account_trigger.hoverIntent(config);

    nav_account_trigger.on("touchstart", function(e) {
      if ($(this).find(".nav_registeredUser_label").length) {
          e.preventDefault();
          e.stopPropagation();
      }
      e.preventDefault();
      if (!$(this).hasClass("hover")) {
      if((/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))){
        $("#nav_myaccount_link").attr("href", "javascript:void(0)");
      }
      do_open();
      $(this).addClass("hover");
      } else {
          do_close();
          $(this).removeClass("hover");
      }
    });
    if(nav_account_container.find(".nav-account-details").length == 0){
      nav_account_container.remove();
    }
  };

  /* Initialize Nav_Account */
  Nav_Account.fn.init();

  $("#guided-navigation").find("dl").not("[data-accordion]").find("dd>a").off("click").on("click",  function(){
      if($(this).find(".open-close-crosshair").text() == "-"){
        $(this).find(".open-close-crosshair").text("+");
      }else{
        $(this).parents("dl").find(".open-close-crosshair").text("+");
        $(this).find(".open-close-crosshair").text("-");
      }
      if(!$(this).next(".content").hasClass("active")){
        $(this).parents("dl").find("dd .content").removeClass("active");
      }
      $(this).next(".content").toggleClass("active");
      if($(this).next(".content").hasClass("active") && $(this).hasClass("last-anchor-border")){
        $(this).css("border-bottom","none");
      }else{
        $(this).removeAttr("style");
      }
  });
  $("#guided-navigation").find("dl").not("[data-accordion]").each(function(){
    $(this).find("dd").each(function(){
      if($(this).hasClass("open")){
        $(this).find(">a").next(".content").addClass("active");
        $(this).find(">a").find(".open-close-crosshair").text("-");
      }
    });
  });

    /* Load Brightcove script if video is detected */
    if ($(".BrightcoveExperience").length > 0) {
        try {
            brightcove.createExperiences();
        } catch(e) {
            var doc = document.getElementsByTagName('head')[0];
            var bcove = document.createElement("script");
            bcove.async = true;
            bcove.onload = function() {
          brightcove.createExperiences();
            }
            bcove.src = ("https:" == document.location.protocol) ? "https://sadmin.brightcove.com/js/BrightcoveExperiences.js" : "http://admin.brightcove.com/js/BrightcoveExperiences.js";
            doc.appendChild(bcove);
        }
    }

    /* Foundation 5 accordion fix :: adding active class to parent div */
    $(".accordion").on("click", "dd > a", function() {
        var parentDD = $(this).parent("dd");
        parentDD.siblings("dd").removeClass("active");
        (parentDD.hasClass("active")) ?  parentDD.removeClass("active") :  parentDD.addClass("active");
    });

    /* Make footer sticky to the bottom of the page */

    var isBlog = ($(".stories-layer").length > 0) ? true : false;
    var stickyFooter = {
        adjust: function() {
            if (!isBlog) {
                var docHeight = $(document.body).height();
                if (docHeight < $(window).height()) {
                    if ($("#fixme").length == 0) {
                        $("#footer-container, .row.center-footer:first, footer").wrapAll('<div id="fixme" class="fixed" style="top: auto; bottom: 0; z-index: 90;"></div>');
                    }
                } else if ($("#fixme").length > 0) {
                    $("#footer-container, .row.center-footer:first, footer").unwrap();
                }
            }
        }
    }
    stickyFooter.adjust();
    $(window).resize(function() {
        stickyFooter.adjust();
    });

    /**
      *   Display Sale Site Email Signup Overlay
      *   @exp cookie expiration - leave null for session cookie
     */
    var SaleSignup = function(exp) {
        this.exp = exp;
        this.mode = "pre";
    }
    SaleSignup.prototype = {
        verifyCookies: function() {
    var currentSite = $('#currentSiteIdInput').val();
            if ($.cookie("sale_signup") === undefined &&  (currentSite == 'tomsSiteUSSale' || currentSite == 'tomsSiteCASale')) {
                this.showOverlay();
            }
        },
        setCookie: function() {
        		  $.cookie("sale_signup","complete",{expires: this.exp, path: '/'});
        },
        showOverlay: function() {
            var _this = this;
      var signUpOverlayLink = "/globalelement/saleSiteEmailOverlay.jsp";
      var signUpPassThroughParam = $('#signUpPassThroughParam').val();
      var passedSignUpParamValue = $('#passedSignUpParamValue').val();
      var myCookies = "";
            var hideOverlay = false;
      var pairs = document.cookie.split(";");
      var cookies = {};
      for (var i=0; i<pairs.length; i++){
                var pair = pairs[i].split("=");
                if (unescape(pair[0]).trim() != null && unescape(pair[0]).trim() == "thankfulCookie") {
                    myCookies = unescape(pair[1]).trim();
                    break;
                }
      } 

            if (myCookies != "") {
                var thankfulUrl = "";
        if (myCookies == "show") {
          thankfulUrl = "/globalelement/saleSiteThankfulEmailSuccessOverlay.jsp";
        } else if (myCookies == "inactive") {
          thankfulUrl = "/globalelement/saleSiteThankfulEmailInactiveOverlay.jsp";
        } else {
                    hideOverlay = true;
                }
                signUpOverlayLink = thankfulUrl + "?" + signUpPassThroughParam + "=" + passedSignUpParamValue;
      } else {
        if (signUpPassThroughParam !=null && typeof signUpPassThroughParam !== "undefined"
                            && signUpPassThroughParam !="" ){
          signUpOverlayLink = "/globalelement/saleSiteEmailOverlay.jsp?"+signUpPassThroughParam+"="+passedSignUpParamValue;
        }
            }
            if (!hideOverlay) {
                $.get(signUpOverlayLink, function(data) {
                    if ($.trim(data) != "") {
                        $("body").append(data);
                        setOverlayData("ssSignup",true);
                        setTimeout(function() {
                            $(document).foundation();
                            $("#ss-submit").val($.trim($("#cto-text").text()));
                            $("#ss-signup").addClass("active").show();
                            if (!$(".lightbox-bg").length) {
                                $("<div />",{"class":"lightbox-bg"}).appendTo("body");
                            }
                            $("#ss-gate").bind("click",function() {
                                _this.setCookie();
                                _this.hideOverlay();
                            });
                            _this.mode = ($("#ss-gate").length > 0) ? "pre" : "active";
                            _this.validateForm();
                        },1);
                    } else {
                        setOverlayData("ssSignup",false);
                    }
                }).fail(function() {
                    setOverlayData("ssSignup",false);
                });
            }
        },
        hideOverlay: function() {
            $("#ss-signup").hide();
            $(".lightbox-bg").remove();
        },
        validateForm: function() {
            var _this = this;
            var sssform = $("form#sss-form");
            sssform.on("valid", function(e) {
                e.preventDefault();
                var thisForm = $(this);
                sssform.find("input").each(function() {
                    $(this).val($.trim($(this).val()));
                });
                $("#sform-error").remove();

                $.ajax({
                    url : "/json-service/cheetahMail/emailSubscriptionIntegration.jsp",
                    async : false,
                    data : thisForm.serialize(),
                    success : function(msg) {
                        if (msg.indexOf("success") != -1) {
                            if (_this.mode == 'active') {
                                _this.setCookie();
                                _this.hideOverlay();
                            }
                            $("#sss-form").hide();
                            $(".sss-em").after('<p id="sform-success">' + $("#em-succ-msg").html() + '</p>');
                        } else {
                            $('<p id="sform-error"></p>').text(msg.trim()).prependTo("#sss-form");
                        }
                    },
                    error : function(status, statusCode) {
                        console.log("error: " + status + ", " + statusCode);
                        var err = 'Oops! An error has occurred. Please try again later.';
                        $('<p id="sform-error"></p>').text(err).prependTo("#sss-form");
                    }
                });
            }).on("invalid", function() {
                $("#sform-error").remove();
                $('<p id="sform-error"></p>').text($("#em-err-msg").html()).prependTo("#sss-form");
            });
        }
    }
    var enterSaleSite = new SaleSignup();
    enterSaleSite.verifyCookies();

    /* Cross Site Sniffer Overlay */

    var crossSiteOverlay = function() {
        var csUrl = "/globalelement/snifferOverlay.jsp";
        $.ajax({url: csUrl,
               cache: false
              })
              .done(function(data) {
              if ($.trim(data) != "") {
                  $("body").append(data);
                    setOverlayData("sniffer",true);
	                setTimeout(function() {
	                    $(document).foundation();
	                    $('#cross-site-overlay').foundation('reveal', 'open');
	                    $(document).on('close.fndtn.reveal','#cross-site-overlay', function () {
                            var domainValue = location.hostname.split('.');
                        document.cookie = "showSnifferOverlay=false; maxage=-1;path=/";
                      });
                      $("#cross-site-overlay").on("touchstart","a.uline",function() {
                          document.location = $(this).attr("href");
                      });
                      var passportCtry = ["NL","FR","DE","UK","CA"];
                      var passportMatch = "/passport";
                      var passportUrl = document.location.pathname;
                      if (($.inArray($.cookie('requestCountryCode'),passportCtry) >= 0) && (passportUrl == passportMatch)) {
                          var ctryLink = $("#cross-site-overlay a.uline");
                          ctryLink.attr("href",ctryLink.attr("href") + passportMatch);
                      }
                  },1);
                } else {
                    setOverlayData("sniffer",false);
                }
        });
    }
    /* End crossSiteOverlay */

    /**
      * Overlay Controller
      * Variables below should be defined in the jsp
      * @displayCrossSiteSniffer
      * @displayEmailOverlay
      * @displaySaleSiteOverlay
     */
    var overlayController = {
        init: function() {
            this.handleData();
            this.showOverlays();
        },
        showOverlays: function() {
            if ((typeof displayCrossSiteSniffer !== "undefined") && displayCrossSiteSniffer) {
                crossSiteOverlay();
            } else {
                setOverlayData("sniffer",false);
            }
        },
        handleData: function() {
            // Main controller logic : driven by "changeData" event when setOverlayData() is called
            var _this = this;
            $("body").on("changeData", function(e, k, v) {
                switch (k) {
                    case "sniffer":
                        // show email overlay only when sniffer is null/false
                  if ((typeof displayEmailOverlay !== "undefined") && displayEmailOverlay && !v && ($("#ss-signup").length == 0)) {
                                displayEmailSignup();
                        } else {
                            setOverlayData("emailSignup",false);
                        }
                        break;
                        }
            });
        }
    }
    if(TOMS.VALS.cookiesAllowed){
    overlayController.init();
    }

    // Empty minicart UI
    $("#nav-cart-num").on("updateBagUI", function() {
        var cartNum = parseInt($(this).text());
        var cartImg = $("#nav-cart-img");
        if (cartNum == 0) {
            cartImg.addClass("empty");
        } else {
            cartImg.removeClass("empty");
        }
    }).trigger("updateBagUI");

});

// Mobile search
(function() {
    var mobSearchTrigger = $("#m-search-trigger"), mobSearch = $("#m-search"),
        mobSearchFd = $("#mobi_search_text_field"), mobIcon = $("#m-search-ico"),
        mobNavTrigger = $(".mobile-nav-trigger"), mobNav = $("#mobile-nav"),
        pdpCt = $(".pdp.container"), mClear = $("#m-search-clear");

    mobSearchTrigger.on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.mobile-nav-trigger > img').attr('src', '/static/www/new/images/navigation/mobile_nav_ico.png');
        mobSearch.add(mobIcon).toggleClass("open");
        mobNavTrigger.removeClass("open");
        mobNav.addClass("no-display");
        if (mobSearch.hasClass("open")) {
            mobSearchFd.focus();
            pdpCt.addClass("open");
        } else {
            pdpCt.removeClass("open");
        }
    });
    mobSearchFd.on("keyup", function() {
        if ($(this).val() == "") {
            mClear.hide();
        } else {
            mClear.show();
        }
    }).trigger("keyup");
    mobSearch.on("click", function(e) {
        e.stopPropagation();
    });
    mClear.on("click", function(e) {
        e.preventDefault();
        mobSearchFd.val("").focus();
        $(this).hide();
    });
    $(window).on("click", function(e) {
        if (mobSearch.hasClass("open")) {
            mobSearch.add(mobIcon).add(pdpCt).removeClass("open");
        }
    });
})();

var setOverlayData = function(k,v) {
    var b = $("body");
    var d = b.data("overlays") || {};
    var o = {};
    o[k]=v;
    $.extend(true, d, o);
    b.data("overlays",d).trigger("changeData", [k, v]);
}

var displayEmailSignup = function() {
    var firstJS = document.getElementsByTagName('script')[0];
    var signUpOverlayJS = document.createElement('script'); signUpOverlayJS.type = 'text/javascript'; signUpOverlayJS.async = true;
    signUpOverlayJS.src = '/static/www/js/emailMarketingSubscription.js';
    firstJS.parentNode.insertBefore(signUpOverlayJS, firstJS);

    var signUpOverlayCSS = document.createElement('link'); signUpOverlayCSS.rel = 'stylesheet';
    signUpOverlayCSS.href = '/static/www/css/email-pop.css';
    firstJS.parentNode.insertBefore(signUpOverlayCSS, firstJS);
}

/* Ajax function to hit Service that returns JSON data for Seewhy Gtm Tag variables */
var SEEWHY = function() {};
SEEWHY.fn = SEEWHY.prototype;
SEEWHY.fn.pushGTMDataLayer = function(stg, ac, ue) {
  $.ajax({
    url : "/json-service/gtm/seewhyGtmTags.jsp",
    async : false,
    data : "stg="+stg+"&ac="+ac+"&ue="+ue+"&aj=true",
    cache : false,
    dataType : "json",
    success : function(resp) {
      dataLayer.push(resp);
      (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
          var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
          j.async = true;
          j.src =
                  '//www.googletagmanager.com/gtm.js?id=' + i + dl;
          f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', googleTagMgrAccount);
    },
    error : function(w, t, f ) {
    }
  });
};
/*
    Add margin to the top of product names, on the
   Homepage Bestseller/No Search Page YMAL, if there is no label.
*/
Prod_Carousel_Add_Margin = function(){};
Prod_Carousel_Add_Margin.fn = Prod_Carousel_Add_Margin.prototype;

Prod_Carousel_Add_Margin.fn.init = function() {
    if ( $('[id^="product_carousel"] li figure figcaption> div.tag').length > 0 ) {
        $('[id^="product_carousel"] li figure figcaption').each(function() {
            if( $(this).find('.tag').length == 0 ) {
                $(this).find('.product-name').css({'margin-top' : '35px'})
            }
        })
    }
};

/* Initialize Prod_Carousel_Add_Margin */
if ( $('.oneColumnPage, .twoColumnPage').length > 0 )
{
    Prod_Carousel_Add_Margin.fn.init();
};

/* Set Body Class to "marketplace" if on a marketplace page. */
Marketplace_Body_class = function(){};
Marketplace_Body_class.fn = Marketplace_Body_class.prototype;

Marketplace_Body_class.fn.init = function()
{
   if(window.location.href.indexOf("marketplace") > -1) {
      $('body').addClass('marketplace');
    }
};

/* Initialize Marketplace Body Class Check */
Marketplace_Body_class.fn.init();


/* Adjustments for the dropdown box on the marketplace brand page */
Marketplace_Brand_Dropdown = function(){};
Marketplace_Brand_Dropdown.fn = Marketplace_Brand_Dropdown.prototype;

Marketplace_Brand_Dropdown.fn.init = function()
{
  var doc_width = $(window).outerWidth();

  if (doc_width == '1024')
  {
    var parent_width = $('.marketplace .toms-custom-dd-btn').outerWidth()+"px";
  }

  if (doc_width == '768')
  {
    var parent_width = $('.marketplace .toms-custom-dd-btn').outerWidth()+"px";
  };

  var child_width = $('.marketplace ul#drop');
  child_width.css({"width" : parent_width});
};

/* Initialize Marketplace_Brand_Dropdown */
if( document.getElementById('brand-products') )
{
  Marketplace_Brand_Dropdown.fn.init();
};

/* Ensure phone link in mobile opens with a single tap */

if (matchMedia(Foundation.media_queries['small']).matches){
    $('a[href^="tel"]').on('click touchend',function() {
        window.location = $(this).attr('href');
    });
};

/*Fix for IP-12693 */
  $('.mobPhone').each(function(){
  if($(this).find(".virtualTrigger").length == 0){
    $(this).find("a").css({"position":"fixed","left":"-9999px"}).addClass("triggerPoint");
    $(this).append("<a href=\"javascript:void(0)\" class=\"virtualTrigger "+$(this).find("a").attr("class")+"\">"+$(this).find("a").text()+"</a>");
    $(this).find(".virtualTrigger").on("click",function(){
      window.location = $(this).parent().find(".triggerPoint").attr("href");
    });
  }
  });
  $('.mobPhone').on("click",function(e){
  e.stopPropagation();
  });

//IP-11522
$(function(){
  $(".gn-filter-by .hide-for-small").each(function(){
    $(this).addClass("active").find(".content").addClass("active");
    $(this).find(".open-close-crosshair").html("-");
  });
  $(".gn-filter-by .hide-for-small").find("a.acc-top-filter").on("click", function(e){
    e.preventDefault();
    $(this).parent().toggleClass("active").find(".content").toggleClass("active");
    $(".gn-filter-by .hide-for-small").each(function(){
      if($(this).hasClass("active")){
        $(this).find(".open-close-crosshair").html("-");
      }else{
        $(this).find(".open-close-crosshair").html("+");
    }
    });
    return false;
  });
});

function shareAction(shareType, promoImage, shareContentDesc, host, fbid){
  var hT3 = encodeURIComponent(document.URL);
  var hT4 = "http://"+host+promoImage;
  var hT5 = shareContentDesc.replace(/(<([^>]+)>)/ig,"").replace(/"/g, "");
  hT4 = encodeURIComponent(hT4);
  hT5 = encodeURIComponent(hT5);

  switch(shareType) {
    case "facebook":
      window.open('https://www.facebook.com/dialog/feed?app_id='+ fbid + '&picture=' + hT4 + '&link=' + hT3 + '&description=' + hT5 + '&redirect_uri=' + hT3);
      break;
    case "twitter":
      window.open('https://www.twitter.com/share?url='+hT3+'&text='+hT5);
      break;
    case "googlePlus":
      window.open('https://plus.google.com/share?url='+hT3);
      break;
    case "pinterest":
      window.open('http://pinterest.com/pin/create/button/?url='+hT3+'&media='+hT4+'&description='+hT5);
      break;
    default:
      window.open("http://"+host+promoImage);
  }
};
$(function(){
  $('[id^="product_carousel"] ul[data-orbit]').each(function(){
    if($(this).children().length < 2){
    $(this).nextAll().hide();
    };
  });
});

var gaQty = function(prd,qty) {
  var evt = 'add-to-cart';
  if(qty < 0){
    evt = 'remove-from-cart';
    qty = Math.abs(qty);
  }
  dataLayer.push({
    'event' : evt,
    'productId' : prd,
    'quantity' : qty
  });
}

var showPassportModal = function() {
  $.ajax({
    url: "/loyalty/userInfoModal.jsp",
    cache: false
  }).done(function(data) {
    $("#rw-modal").remove();
    $("body").append(data);
    var modal = $("#rw-modal");
    modal.foundation("reveal", "open");
    $(document).foundation();
    $("#rw-modal-later").on("click", function(e) {
      e.preventDefault();
      $("a.close-reveal-modal").trigger("click");
    });
    $("#rw-modal-submit").on("click", function() {
      $("#rw-handler").val("signUp");
    });
    $("#rw-modal-nothanks").on("click", function() {
      $("#rw-handler").val("noThanks");
      $("#rw-modal-form input[required]").removeAttr("required");
      $("a.close-reveal-modal").trigger("click");
    });

    var modalForm = $("#rw-modal-form");
    var modalBody = $("#rw-modal-body");
    var tncCheck = $("#rw-tnc");

    modal.on("invalid.fndtn.abide", function() {
      $("#rw-modal-body").find(".errorMessage").remove().end().prepend('<p class="errorMessage">Please correct the error(s) highlighted below:</p>');
      $("#rw-modal-submit").blur();
    });
    modalForm.on("valid.fndtn.abide", function() {
      tncCheck.removeAttr("data-invalid").parent("#rw-form-terms").removeClass("error");
      modalBody.find(".errorMessage").remove();
      var fields = {
        "handlemethod": $("#rw-handler").val(),
        "dob": $.trim($("#rw-dob").val()),
        "zip": $.trim($("#rw-zip").val()),
        "tnc": $("#rw-tnc").val()
      };
      $.ajax({
        type: 'POST',
        data: fields,
        url: "/loyalty/loyaltySignUpAjax.jsp",
        dataType: "json",
        cache: false,
        success: function(response) {
          if (response.messageCode == "error") {
            modalBody.find(".errorMessage").remove().end().prepend('<p class="errorMessage">'+response.errorMessages+'</p>');
          } else if (response.messageCode == "success" && (response.redirectURL != null)) {
            document.location = response.redirectURL;
          }
        }
      });
    });
  });
}

var bcVideoEventFired = function(evt) {
  if (typeof ct_trck_watched_a_video === "function") {
    setTimeout(bcVideoTracking, 1000, evt);
  }
}

var bcVideoTemplateReady = function(evt) {
  if (typeof ct_trck_watched_a_video === "function") {
    var $player = $(this);
    $player.brightcoveVideo("onMediaEvent", "PROGRESS", function(evt) {
      setTimeout(bcVideoTracking, 1000, evt);
    });
  }
}

var bcVideoTracking = function(evt) {
  var t = 20;
  if (evt.duration < t) t = evt.duration - 1.5;

  if(evt.position >= t && !vFlag){
    vFlag = true;
    ctVideoTag(evt.media.id, evt.media.displayName);
  } else if(evt.position >= t && vFlag) {
    vFlag = true;
  } else {
    vFlag = false;
  }
}

var ctVideoTag = function(vid, title) {
  ct_trck_watched_a_video({
    content_identifier: vid,
    link: document.URL,
    title: title
  });
}
var setExplicitSaleSignUPCookie = function()
   {
   $.cookie("sale_signup","complete",{expires: this.exp, path: '/'});
}
//IP-13843
if($("#promotional-strip").length > 0){
  $("#promotional-strip .bannerPaypal").each(function(){
    if($(this).height() > 25){
      $(this).css({"line-height":"1rem","paddingTop":"5px"});
    }
  });
}

//IP-13754
$("#hp_hero img.hero-image").on('load', function(){
// Get on screen image
var screenImage = $(this);
// Create new offscreen image to test
var theImage = new Image();
theImage.src = screenImage.attr("src");
// Get accurate measurements from that.
var imageWidth = theImage.width;
if (imageWidth < 600) screenImage.css("marginLeft","0px");
}).each(function() {
  if(this.complete) $(this).load();
});

/* IP-13244 and IP-14272 Content Starts */
if($(".marketplace-story #hp_hero1").length){
  $(".marketplace-story #hp_hero1").wrapInner("<div class=\"hp_hero_wrapper\"></div>");
    var sliderHeight = $(".marketplace-story #hp_hero1 .hp_hero_wrapper").outerHeight();
    $(".marketplace-story #hp_hero1 .hp_hero_wrapper").css("min-height", sliderHeight);
  $(".toggleShow").on("click", function(){
     if($(".marketplace-story").hasClass("container")){
      $(".marketplace-story").find(".toggleShow").eq(0).hide();
    }
    else{
      $("#hp_hero1").hide();
      $(".marketplace-story").find(".toggleShow").eq(1).hide();
    }
  $("#hp_hero1").slideToggle();
    $(".toggleShow").toggle();
  });
};
/* IP-13244 and IP-14272 Content Ends */

//IP-13693
if($(".dept_carousel").length > 0)
{
    if ( $('.dept_carousel li figure figcaption > div.tag').length > 0 )
    {
        $('.dept_carousel li figure figcaption').each(function(){
            if( $(this).find('.tag').length == 0 )
            {
                $(this).find('.product-name').css({'margin-top' : '35px'})
            }
        })
    }
}

/* IP-8139 changes Starts */
$(function(){

  if ( $('#cs').length > 0 ) { // about TOMS
    var twitterUrl = $('ul li a.tw').attr('href');
    if(twitterUrl != undefined) {
      twitterUrl = twitterUrl.replace('toms', $('#twitterAccount').val());
      $('ul li a.tw').attr('href',twitterUrl);
    }
  }

});
/* IP-8139 changes End */

/*IP-14430 - Toms.com- Full screen banner*/
$(function(){
    if($(document).width() > "640"){
        var hpFwBnr = $("#hp_hero.full-width-banner"), bnrSlider = hpFwBnr.find(".orbit-container");
        var is_mobile = (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) ? true : false;
        if ((hpFwBnr.length > 0) && (bnrSlider.length == 0)){
            $(".full-width-banner").wrapInner("<div class='full-bannerHomepage'></div>");
            if (is_mobile) {
                $(".full-bannerHomepage").addClass("isMobile");
            }
            //$(window).on("load", function(){
                imgSrc = $(".full-width-banner img.hero-image").attr("src");
                $(".full-bannerHomepage").css("background","url("+imgSrc+")");
                $(".full-width-banner img.hero-image").hide();
                var newAnchor = $('<a class="hero-image"></a>').appendTo($('#hp_hero'));
                newAnchor.attr('href',$('.full-bannerHomepage a').attr('href'));
                $('#hp_hero .full-bannerHomepage').insertAfter(newAnchor);
            //});
            $(".fw-vid-bnr").closest("#hp_hero").children("a").addClass("vid-mask");
        }

        if ((hpFwBnr.length > 0) && (bnrSlider.length > 0)){
            var isVid = ($(".fw-vid-bnr").length > 0) ? true : false;
            $("#hp_hero.full-width-banner img.hero-image").each(function(){
                $(this).hide().wrap("<div class='full-bannerHomepage'></div>");
                var fwBanner = $(this).closest('.full-bannerHomepage');
                fwBanner.css("backgroundImage","url("+$(this).attr('src')+")");
                if (isVid) {
                    fwBanner.insertAfter($(this).closest("#hero-link"));
                }
                if (is_mobile) {
                    $(".full-bannerHomepage").addClass("isMobile");
                }
            });
            $(".fw-vid-bnr").siblings("#hero-link").addClass("vid-mask");
        }

        $('#hp_hero li ul.hero-text[data-link]').on('click', function(e){
            if($(e.target).is('ul.hero-text') && $(e.target).attr('data-link') != ''){
              window.location = $(e.target).attr('data-link');
            }else{
              return true;
            }
        });
    }
});


/* IP-13998 - Enhanced Mega Nav Starts */
$(document).ready(function(){
  $(".promotional-slot p").eq(0).addClass("show");
  $(window).on("resize load",function(){
    if(typeof(window.resizeTimer) != "undefined"){
      clearTimeout(window.resizeTimer);
    }
    window.resizeTimer = setTimeout(function(){
      if($(window).width() < 641){
        var mPh = $(".meganav .inner-top .search input[type=search]").attr("data-mobile-placeholder")
        if(typeof(mPh) != "undefined"){
          var tempMPH = $(".meganav .inner-top .search input[type=search]").attr("placeholder");
          $(".meganav .inner-top .search input[type=search]").attr("placeholder",mPh);
          $(".meganav .inner-top .search input[type=search]").attr("data-placeholder",tempMPH);
        }
        if($(".left-off-canvas-menu .left-menu-data").length){
          // populate Mobile Nav from Desktop Nav
          var mobileNavHTML = "";
          var deskTopNav = $(".meganav").clone(false);
          deskTopNav.find("*").each(function(){
          if($(this).hasClass("remove-on-mobile")){
            $(this).remove();
          }else{
            if($(this).hasClass("lang")){
              $(this).attr("class", "lang");
            }else{
              if($(this).hasClass("other-links")){
                $(this).attr("class", "other-links");
              }else{
                if($(this).hasClass("sale") && $(this).hasClass("megaNav")){
                  $(this).attr("class", "sale megaNav");
                }else{
                  if($(this).hasClass("sale")){
                    $(this).attr("classs", "sale");
                  }else{
                    if($(this).hasClass("labelNew")){
                      $(this).attr("class", "labelNew");
                    }else{
                      if($(this).hasClass("topNavLoyalty")){
                        $(this).attr("class", "topNavLoyaltyMobile");
                      }else{
                        if($(this).hasClass("nav-top-links")){
                          $(this).attr("class", "nav-top-links");
                        }else{
                          if($(this).hasClass("megaNav")){
                            $(this).attr("class", "megaNav");
                          }else{
                            if($(this).hasClass("all-links") && $(this).hasClass("shopAllFirst")){
                              $(this).attr("class", "all-links shopAllFirst");
                            }else{
                              if($(this).hasClass("all-links") && $(this).hasClass("shopAllSecond")){
                                $(this).attr("class", "all-links shopAllSecond");
                              }else{
                                if($(this).hasClass("megaNavSidePane")){
                                  $(this).attr("class", "megaNavSidePane");
                                }else{
                                  if($(this).hasClass("all-links")){
                                    $(this).attr("class", "all-links");
                                  }else{
                                    if($(this).hasClass("mega-featured")){
                                      $(this).attr("class", "mega-featured");
                                    }else{
                                      if($(this).hasClass("megaNavLastMobile")){
                                        $(this).attr("class", "megaNavLastMobile");
                                      }else{
                                        if($(this).hasClass("all-links shopAllSecond")){
                                          $(this).attr("class", "all-links");
                                        }else{
                                          if($(this).hasClass("off-screen")){
                                            $(this).attr("class", "off-screen");
                                          }else{
                                            $(this).removeAttr("class");
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        });
        deskTopNav.prepend($(deskTopNav.find(">ul").eq(1)));
        deskTopNav.find(">ul:eq(0)>li:last-child").addClass("last");
        deskTopNav.find('.mega-featured').each(function(){
          $(this).children('span').remove();
          $('<span class="mobileDropdown"> </span>').insertAfter(this);
        });
        $(".left-off-canvas-menu .nav-data").html(deskTopNav.html());
        $(".left-off-canvas-menu .nav-data.lang").html("").append($($(".left-off-canvas-menu .nav-data>ul:eq(1)")));
        $(".left-off-canvas-menu .nav-data").find("ul li>p>a").on("click",function(e){
          e.stopPropagation();
          if($(this).parent().next("ul").length){
            e.preventDefault();
          }
          $(this).parent().trigger("click");
        });
        $(".left-off-canvas-menu .nav-data").find(">ul li>span").on("click",function(){
          if($(this).hasClass('mobileDropdown')){
          }else{
            $(this).prev().trigger("click",true);
          }
        });
        $(".left-off-canvas-menu .nav-data").find(">ul li>p>span").on("click",function(e){
          e.stopPropagation();
          $(this).parent().trigger("click");
        });
        $(document).on('touchmove', function(){
          window.drag = true;
        });
        $('.left-off-canvas-menu').on('touchend', function(ev){
          if(!drag){
            if($(ev.target).closest('li').is('li.lang > ul.open > li')){
              window.location = $(ev.target).closest('li').find('a').attr('href');
            }
            if($(ev.target).is('li.lang > ul.open > li')){
              window.location = $(ev.target).find('a').attr('href');
            }
          } else {
            drag = false;
          }
        });
          $(".left-off-canvas-menu .nav-data").find("ul li>a,ul li>p, ul li>span.mobileDropdown").on("click",function(e){
            var isScrollNeeded = 0;
            if($(this).find("~ ul").length > 0){
              e.preventDefault();
              if((e.target.nodeName == "P" && $(this).siblings("p").length > 0)){
                if($(this).find('a>span').length > 0){
                  $(this).toggleClass("active").siblings("p").removeClass("active");
                  $(this).next("ul").toggleClass("open").siblings("ul").removeClass("open");
                  if($(this).hasClass("active")){
                    $(this).parent().addClass("active");
                    isScrollNeeded = 1;
                  }
                }else{
                  window.location = $(this).children('a').attr('href');
                  e.stopPropagation();
                }
              }else{
                if($(e.target).not('.mobileDropdown') && $(e.target).hasClass('mega-featured')){
                  if($(this).attr('href')){
                    window.location = $(this).attr('href');
                    e.stopPropagation();
                  }
                }else{
                  $(this).parent().toggleClass("active").siblings("li").removeClass("active");
                  $(this).parent().siblings("li").find("*").removeClass("hide-for-small-only active");
                  $(this).toggleClass("active");
                  $(this).parent().siblings().find("p").removeClass("active");
                  if($(this).parent().hasClass("active")){
                    $(this).siblings("ul").addClass("open");
                    isScrollNeeded = 1;
                  }else{
                    $(this).siblings("ul").removeClass("open");
                  }
                }
              }
            }
            if( ($(this).parent().siblings("ul").length || $(this).siblings("ul").length) && !$(this).parent().parent().parent().hasClass("nav-data") ){
              if($(this).closest(".open").length){
                if($(this).parent().hasClass("active") && $(this).hasClass("active")){
                  $(this).parent().prevAll().addClass("hide-for-small-only");
                  $(this).closest(".open").prevAll().addClass("hide-for-small-only");
                }else{
                  $(this).parent().prevAll().removeClass("hide-for-small-only");
                  $(this).closest(".open").prevAll().removeClass("hide-for-small-only");
                }
              }else{
                $(this).parent().prevAll().toggleClass("hide-for-small-only");
              }
            }
            if(isScrollNeeded){
              clearTimeout(window.leftNavTargetRefTo);
              if($('.off-canvas-wrap').hasClass('move-right')){
                window.leftNavTargetRef = $(this);
                window.leftNavTargetRefTo = setTimeout(function(){
                  $("body,html").animate({scrollTop:0});
                  if(window.leftNavTargetRef.offset().top > $(".left-off-canvas-menu").scrollTop()){
                    $(".left-off-canvas-menu").animate({scrollTop:window.leftNavTargetRef.offset().top});
                  }else{
                   if(window.leftNavTargetRef.offset().top < 0){
                    $(".left-off-canvas-menu").animate({scrollTop: 59});
                   }
                  }
                },250);
                $(this).closest(".open").siblings("ul").addClass("dim");
                $(this).find("~p").addClass("dim");
              };
            }else{
              $(this).closest(".open").siblings("ul").removeClass("dim");
              $(this).find("~p").removeClass("dim");
            }
            if($(this).closest(".nav-data").find(".active").length){
              $(this).closest(".nav-data").addClass("opened");
            }else{
              $(this).closest(".nav-data").removeClass("opened");
            }
          });
          $(".left-off-canvas-menu .nav-data").find(">ul>li:first-child>a").trigger("click");
        }
      }else{
        var mPh = $(".meganav .inner-top .search input[type=text]").attr("data-placeholder");
        if(typeof(mPh) != "undefined"){
          $(".meganav .inner-top .search input[type=text]").attr("placeholder",mPh);
        }
      }
      if($(".meganav").length){
        $(document).trigger("leftNavLoaded");
        window.leftNavLoaded = true;
      }
    },1000);
  });
  $(".meganav>ul:eq(1)>li").not(".loyalty-logo, .logo").on("mouseenter click", function(){
    $(this).parent().addClass("hover");
  });

  $(".meganav>ul>li").hover(function(){
    $(this).siblings().removeClass("hover");
    $(this).addClass("hover");
    if(typeof(window.menuHoverTimeout) != "undefined" && $(this).parent().prevAll().length != 0){
      clearTimeout(window.menuHoverTimeout);
    }
  },function(){
    if($(this).parent().prevAll().length == 0){
      $(this).removeClass("hover");
    }else{
      window.menuHoverTimeout = setTimeout(function(){
        $(".meganav>ul>li").each(function(e){
         if(!$(this).is(":hover")){
          $(this).removeClass("hover");
         }
        });
        $(".meganav>ul").removeClass("hover");
      },500);
    }
  });
  
    // ADA
    var navType = "";

    // ADA : Meganav
    var navElm = $(".topMainNav"), navElmLi = navElm.parent("li"), navElmUl = navElm.parent("ul");
    navElm.on("click", function(e) {
        e.preventDefault();
        navType = "key";
        var elLi = $(this).parent("li");
        if (!elLi.hasClass("hover")) {
            navElmLi.add(navElmUl).removeClass("hover");
            elLi.add($(this).closest("ul")).addClass("hover");
            navElm.siblings("ul").attr("aria-hidden", "true");
            $(this).attr("aria-expanded", "true");
            $(this).siblings("ul").attr("aria-hidden", "false");
        } else {
            elLi.add($(this).closest("ul")).removeClass("hover");
            $(this).attr("aria-expanded", "false");
            $(this).siblings("ul").attr("aria-hidden", "true");
        }
    });
  
    // ADA: nav keyboard UI
    var navKeyboardUI = function(e) {
        e.preventDefault();
        /*
        navType = "key";
        var $this = $(this);
        $this.blur();
        if ($this.hasClass("close")) {
            $this = $this.closest("ul").closest("li").find(".nav-toggle").first();
        }
        var elParent = $this.closest("li"), elPanel = elParent.find("ul").first();
        if (elParent.hasClass("hover")) {
            elParent.trigger("mouseleave");
            $this.attr("aria-expanded", "false");
            elPanel.attr("aria-hidden", "true");
            console.log((elParent.next("li").length));
            if (elParent.next("li").length > 0) {
                elParent.next("li").focus();
            }
        } else {
            $this.attr("aria-expanded", "true");
            elPanel.attr("aria-hidden", "false").focus();
            elParent.trigger({type:"mouseenter", pageX:"5", pageY:"5"}).trigger({type:"mousemove", pageX:"5", pageY:"5"});
        }*/
    }
    
    $(".nav-toggle, .change-lang-trigger").on("click", navKeyboardUI);
    $("#mini-cart").on("click", ".cart-toggle", navKeyboardUI);
    
    // ADA: sale site nav keyboard UI
    var ssNavKeyboardUI = function(e) {
        e.preventDefault();
        /*
        navType = "key";
        var elPanel = $(this).parents("li").find(".panel-toggle");
        if (elPanel.hasClass("no-display")) {
            $(this).attr("aria-expanded", "true");
            elPanel.attr("aria-hidden", "false").removeClass("no-display");
        } else {
            $(this).attr("aria-expanded", "false");
            elPanel.attr("aria-hidden", "true").addClass("no-display");
        }*/
    }
    
    $("#nav-content .nav-toggle").on("click", ssNavKeyboardUI);
    $("#nav-content #mini-cart").on("click", ".cart-toggle", ssNavKeyboardUI);

    $("#mini-cart, #nav-account").on("blur", function(e) {
        if ($(this).has(document.activeElement).length == 0) {
            if (navType == "key") {
                $(this).parents("li").find(".nav-toggle").first().click();
            }
        }
        evt = "";
    });
  
    // ADA: footer language selector
    /*
    $("#hdr-lang-dropdown, #ft-lang-dropdown, .mega-sub-nav").on("focusout", function(e) {
        var $this = $(this), items = $this.find("li");
        tm = setTimeout(function() {
            if (items.find(":focus").length == 0) {
                if ((navType == "key") && ($this.attr("aria-hidden") == "false")) {
                    $this.parents("li").find(".nav-toggle, .change-lang-trigger").first().click();
                    $this.siblings(".topMainNav").click();
                }
            }
            evt = "";
        },100);
    });*/
    
    $("#hdr-lang-dropdown, #ft-lang-dropdown, .mega-sub-nav").on("focusout", function(e) {
        var $this = $(this);
        if (navType == "key") {
			tm = setTimeout(function() {
				//console.log("focused: " + $this.has(document.activeElement).length);
				if ($this.has(document.activeElement).length == 0) {
					if ($this.attr("id") == "hdr-lang-dropdown") {
                        //console.log("main nav focus");
                        $this.parents("li").find(".nav-toggle, .change-lang-trigger").first().click();
						$("#top-main-nav").focus();
					} else if ($this.attr("aria-hidden") == "false") {
                        //console.log("nav out");
                        $this.parents("li").find(".nav-toggle, .change-lang-trigger").first().click();
                        $this.siblings(".topMainNav").click();
                    }
				}
			},100);
		}
        evt = "";
    });
    
    $(".menu-close").on("click", function(e) {
        e.preventDefault();
        $("#top-main-nav").focus();
    });
    
    $(".ft-menu-close").on("click", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $(this).closest("ul").closest("li").next("li").focus();
    });
    
    $(".mega-close").on("click", function(e) {
        e.preventDefault();
        $(this).closest("ul").closest("li").next("li").find(".topMainNav").focus();
        //$(this).closest("ul").siblings(".topMainNav").trigger("click");
    });
    
  /*off-canvas swipe code*/
  if(document.body.clientWidth <= 640){
    if(typeof($(document).swiperight) != "undefined"){
      $(document).swiperight(function(e){
        $('.off-canvas-wrap').addClass('move-right');
      });
      $(document).swipeleft(function(e){
        $('.off-canvas-wrap').removeClass('move-right');
      });
    }
  }

  /*Subbanner height 100%*/
  $(window).on("load", function(){
    $(".sub-banner").each(function(){
      var getHeight = $(this).parent("ul").height();
      $(this).css("height",getHeight);
      $(this).find("img").css("height", "100%");
    });
  })

  /*Tapping Navigation*/
  if(document.body.clientWidth <= 1024 && document.body.clientWidth > 640){
    $(document).on('mouseup touchend', function(e) {
      e.stopPropagation();
      if($(e.target).closest("li").is('.meganav>ul>li.hover')||$(e.target).is('.meganav>ul>li.hover')){
        //do nothing
      }else{
        $('.meganav>ul>li, .meganav>ul').removeClass("hover");
      }
      if($(e.target).closest("li").is('.meganav>ul>li')){
        if($(e.target).closest("li").hasClass('lang')){
          if($(e.target).closest("li").hasClass('hover')){
            $(e.target).closest("li").removeClass('hover');
          }else{
            $(e.target).closest("li").addClass('hover');
          }
        }else{
          //$(e.target).closest("li").addClass('hover');
        }
        return true;
      }
      if($(e.target).is('.meganav>ul>li')){
        if($(e.target).hasClass('lang')){
          if($(e.target).hasClass('hover')){
            $(e.target).removeClass('hover');
          }else{
            $(e.target).addClass('hover');
          }
        }else{
          $(e.target).addClass('hover');
        }
      }
    });
  }

});
/* IP-13998 - Enhanced Mega Nav Ends */

/* IP-14863 - Back to Top Interaction */
var backtotop = {
    config: {
        dvSize: "",
        isTouch: false,
        isAndroid: false
    },
    init: function() {
        this.util();
        this.backToTop();
    },
    util: function() {
        var _this = this, nua = navigator.userAgent;
        $(window).on("resize", function() {
            if (matchMedia(Foundation.media_queries["small"]).matches){
                _this.config.dvSize = "small";
            };
            if (matchMedia(Foundation.media_queries["medium"]).matches){
                _this.config.dvSize = "medium";
            };
            if (matchMedia(Foundation.media_queries["large"]).matches){
                _this.config.dvSize = "large";
            };
        }).trigger("resize");

        _this.config.isTouch = (nua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) ? true : false;
        if (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android') > -1 && nua.indexOf('AppleWebKit') > -1) {
            _this.config.isAndroid = true;
            $("html").addClass("isAndroid");
        }
    },
    backToTop: function() {
            $('<div id="gv-btop"><a href="#" class="btt gv-sp">Back to Top</a></div>').appendTo("body");
            var btop = $("#gv-btop"), bttState = "";
            if (this.config.isTouch) {
                btop.addClass("m");
            }
            btop.on("click", ".btt", function(e) {
                e.preventDefault();
                $("html, body").stop().animate({scrollTop: 0}, 500);
            });
            $(window).on("scroll", function() {
                if ($(this).scrollTop() > 700) {
                    if (bttState != "show") {
                        btop.fadeIn(400);
                        bttState = "show";
                    }
                } else {
                    if (bttState != "hide") {
                        btop.fadeOut(400);
                        bttState = "hide";
                    }
                }
            }).trigger("scroll");
    }
}

$(function() {
  if($('body.en_US').length > 0)  backtotop.init();

    /*IP-14813 - Mobile Search :: Search Icon Will Not Close on Tap When Open*/
  if($(document).width() <= "640"){
    var searchInput = $("#search-input-new");
    $(".search").on("click", function(e){
        e.stopImmediatePropagation();
        if (!$(this).hasClass("active")) {
            searchInput.focus();
        }
        $(this).add(searchInput).toggleClass("active");
    });
    searchInput.on("click", function(e){
        e.stopPropagation();
    });
    $("#atg_store_searchSubmit").on("click", function(e){
        e.preventDefault();
    });
    $(document).on("click", function(){
        $(".search").add(searchInput).removeClass("active");
    });
  }

    /*---IP-14273---*/
  if($(window).width() <= 640 && $('.closeText').length > 0){
    var heropadding = $('.closeText').outerHeight();
    $('#hp_hero1').css('padding-bottom',heropadding);
  }

    /* IP-14707 changes Starts */
    if ($(".email-signup.TOMSEmailSignUp .emailSignupContainer").length > 0 ) {
        $(".email-signup.TOMSEmailSignUp").closest(".container").attr("data-equalizer","");
        $(".email-signup.TOMSEmailSignUp").closest(".container").find(".image-container").attr("data-equalizer-watch","");
        $(document).foundation('equalizer', 'reflow');
    }

    if (($(".grid-a").length > 0) || ($(".grid-b").length > 0) || ($(".grid-c").length > 0)) {
        var doc = document.getElementsByTagName("body")[0];
        var gridJS = document.createElement("script");
        gridJS.async = true;
        gridJS.src = "/static/www/new/js/fixedgrid.js";
        doc.appendChild(gridJS);
    }

    /* IP-16247 category lifestyle images */
    if (($("#filterApplied").val() == "false") && ($("#gn_selections").length == 0)) {
        var lifestyle1 = $(".search-results-grid-img-lifestyle-right"), lifestyle2 = $(".search-results-grid-img-lifestyle-left");
        var img1 = (lifestyle1.length > 0) ? true : false, img2 = (lifestyle2.length > 0) ? true : false;
        if (img1 || img2) {
            var imgGrid = $(".search-results-grid-img"), imgGridW = imgGrid.eq(0).width(),
                gridCntnr = imgGrid.eq(0).parent(), gridCntnrW = gridCntnr.width(), imgIndex1, imgIndex2;
            var imgRow1 = ($.trim(lifestyle1.attr("data-row")) != "") ? lifestyle1.attr("data-row") : 3;
            var imgRow2 = ($.trim(lifestyle2.attr("data-row")) != "") ? lifestyle2.attr("data-row") : 7;

            $(window).resize(function() {
                if ($(document).width() > 768) {
                    if (img1) {
                        imgIndex1 = (imgRow1 - 1) * 3;
                    }
                    if (img2) {
                        if (img1) {
                            imgIndex2 = (imgRow2 - 2) * 3 - 2;
                        } else {
                            imgIndex2 = (imgRow2 - 1) * 3 - 1;
                        }
                    }
                    if (img1) {
                        lifestyle1.insertAfter(imgGrid.eq(imgIndex1)).show();
                    }
                    if (img2) {
                        lifestyle2.insertAfter(imgGrid.eq(imgIndex2)).show();
                    }
                } else {
                    imgGridW = imgGrid.width();
                    gridCntnrW = gridCntnr.width();
                    var gridCol = (gridCntnrW/imgGridW >= 3) ? 3 : 2;
                    if (img1) {
                        imgIndex1 = (imgRow1 - 1) * gridCol - 1;
                        if (imgRow1 == 1) {
                            lifestyle1.insertBefore(imgGrid.eq(0)).show();
                        } else {
                            lifestyle1.insertAfter(imgGrid.eq(imgIndex1)).show();
                        }
                    }
                    if (img2) {
                        if (img1) {
                            imgIndex2 = (imgRow2 - 2) * gridCol - 1;
                        } else {
                            imgIndex2 = (imgRow2 - 1) * gridCol - 1;
                        }
                        if (imgRow2 == 1) {
                            lifestyle2.insertBefore(imgGrid.eq(0)).show();
                        } else {
                            lifestyle2.insertAfter(imgGrid.eq(imgIndex2)).show();
                        }
                    }
                }
            }).trigger("resize");
            window.addEventListener("orientationchange", function() {
                $(window).trigger("resize");
            }, false);
        }
    }
    var imgBnrWrap = $("[id^='img-content-wrapper']");
    imgBnrWrap.each(function() {
        var imgBnrCont = $(this).find("[id^='img-content-cntr']"), gNav = $("#guided-navigation");
        $(window).resize(function() {
            if (matchMedia(Foundation.media_queries['small']).matches && !matchMedia(Foundation.media_queries['medium']).matches) {
                imgBnrCont.insertBefore(gNav);
            } else {
                imgBnrCont.appendTo(imgBnrWrap);
            }
        }).trigger("resize");
        window.addEventListener("orientationchange", function() {
            $(window).trigger("resize");
        }, false);
    });
});

if($('a[data-video-modal]').length > 0){
  var sVen = 0;
  var vidInverval = 0;
  function tomsVideoModal(data,vidID){
    if(typeof data === "object"){
      var vid_id = data['id'];
      var vid_url = data['FLVURL'];
      var vid_name = data['name'];
      var tomsVid = $('#video-modal-' + vid_id);
      var vidWatch = (parseInt(TOMS.UTIL.getCookie('s_vidMax')) || 0);

      if($('#video-modal-' + vid_id).length == 0){
        var modal = '<div id="video-modal-' + vid_id + '" class="reveal-modal toms-modal-video" data-reveal><div class="inner"><div class="close-reveal-modal"></div><div class="flex-video"></div></div></div>';
        $('body').append(modal);

        tomsVid = $('#video-modal-' + vid_id);
        tomsVid.find('.flex-video').html('<video width="100%" height="100%" autoplay controls><source src="'+vid_url+'" type="video/mp4"></video>');
        $(document).on('opened.fndtn.reveal', '.toms-modal-video', function () {
          if(!$('.toms-hero.toms-video').hasClass('show-image')){
            $('.toms-hero-video').find('video')[0].pause();
          }
          tomsVid.find('video')[0].play();
        })
        $(document).on('closed.fndtn.reveal', '.toms-modal-video', function () {
          if(!$('.toms-hero.toms-video').hasClass('show-image')){
            $('.toms-hero-video').find('video')[0].play();
          }
          tomsVid.find('video')[0].pause();
        })
        tomsVid.foundation('reveal', 'open');
        tomsVid.css("height", ($(window).height() - 40) +"px;");
        $('.reveal-modal-bg .mainContentBody').on('click', function(){
          tomsVid.foundation('reveal', 'close');
        })
        $(window).on('resize orientationchange', function(){
          tomsVid.css("height", ($(window).height() - 40) +"px;");
        })
      }else{
        tomsVid.foundation('reveal', 'open');
      }
    }else{
      var tomsLoopURL = '//api.brightcove.com/services/library?command=find_video_by_id&media_delivery=http&video_fields=FLVURL,id,videoStillURL,name&token=VzIP99idF7FD8AobkBP8cT96B5qBRz4JC9fKYlAb-wsecDlRutP41A..&callback=tomsVideoModal&video_id='+vidID;
      $.getScript(tomsLoopURL);
    }
  };
  var is_mobile = (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) ? true : false;
  if (is_mobile) {
    $('a[data-video-modal]').on('touchend', function(){
      tomsVideoModal('',$(this).attr('data-video-modal'));
    });
  } else {
    $('a[data-video-modal]').on('click', function(){
      tomsVideoModal('',$(this).attr('data-video-modal'));
    });
  }
}

if(TOMS === undefined || typeof TOMS !== "object"){var TOMS = {};};
if(TOMS.UTIL === undefined || typeof TOMS.UTIL !== "object"){
  TOMS.UTIL = (function(){
    return {
      getParam: function(query_param){
        query_param = query_param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + query_param + "=([^&#]*)"), results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
      },
      getCookie: function(c_name){
        var c_value;
        var c_array = document.cookie.split(";");
        c_name = c_name + "=";
        for (var i = 0; i < c_array.length; i++) {
          var c = c_array[i].trim();
          if (c.indexOf(c_name) == 0) {
            c_value = unescape(c.substring(c_name.length,c.length));
            break;
          } else {
            c_value = null;
          }
        }
        return c_value;
      },
      setCookie: function(c_name,value,exdays) {
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        var hostName=location.hostname.split('.');
        hostName.shift();
        document.cookie=c_name + "=" + c_value + ";domain=."+hostName.join('.')+";path=/";
      }
    };
  })();
}
if(TOMS.COOKIE === undefined || typeof TOMS.COOKIE !== "object"){
  TOMS.COOKIE = (function(){
    return {
      init: function(){
        if(!(TOMS.UTIL.getCookie(TOMS.VALS.cookieName) == TOMS.VALS.cookieVersion) && ($('#acceptCookies').length > 0)){
          $('body').append('<div class="disable-bg" style="display:block;"/>');
          $('.cookie-buttons .lang-en, .cookie-buttons .lang-default').on("click", function(e){
            e.preventDefault();
            $('#acceptCookies').toggleClass('lang-en lang-default');
            if($('#acceptCookies').hasClass('view-policy')){ TOMS.COOKIE.getPolicy(); }
          });
          $('.read-cookie-policy').on("click", function(e){
            e.preventDefault();
            $('#acceptCookies').addClass('view-policy');
            TOMS.COOKIE.getPolicy();
          });
          $('.back-to-notice').on("click", function(e){
            e.preventDefault();
            $('#acceptCookies').removeClass('view-policy');
          });
          $('.accept-cookies').on("click", function(e){
            e.preventDefault();
            TOMS.UTIL.setCookie(TOMS.VALS.cookieName,TOMS.VALS.cookieVersion,365);
            location.reload();
          });
        }
      },
      getPolicy: function(){
        var currentCountry = $('#locale').val().substring(3);
        var currentLang = ($('#acceptCookies').hasClass('lang-default')) ? currentCountry.toLowerCase() : 'en';
		if(currentLang == 'at'){
        	currentLang = 'de';
        }
        var requestLoc = currentLang + "_" + currentCountry;
        var clss = (currentLang == 'en') ? '.lang-en' : '.lang-default';

        if($('#acceptCookies .policy ' + clss).hasClass('tomsloader')){
          $.ajax({
            url : "/static/www/content/" + requestLoc + "/privacy_policy_new.html",
            async : false,
            cache : false,
            dataType : "html",
            success : function(data) {
              $('#acceptCookies .policy ' + clss).removeClass('tomsloader').html(data);
            }
          });
        }

      }
    };
  })();
}

$(document).ready(function(){
  if(TOMS.VALS.cookieEnabled){
    TOMS.COOKIE.init();
  }

	//Update Cart Quantity
    $.ajax({
        cache: false,
        url : '/globalelement/cartQty.jsp',
        async : false,
        dataType : 'html',
        success : function(data) {
           $('#nav-cart-num').html(data).trigger("updateBagUI");
        }
    });
    //Update Mini Cart contents
    $.ajax({
        cache: false,
        url : '/globalelement/minicart.jsp',
        async : false,
        dataType : 'html',
        success : function(data) {
           $('#mini-cart').html(data);
        }
    });      

    $('input[type=text],[type=tel]').blur(function () {
        $(this).val(
            $.trim($(this).val())
        );
    });
            
    $(".off-screen.show-on-focus").on("focus", function() {
        $(this).addClass("show");
    }).on("blur", function() {
        var _this = $(this);
        setTimeout(function() {
            _this.removeClass("show");
        }, 3000);
    });
    
    valicateCAZip();


    if($('.dept-grid [class^=dept-]').length){
      $('.dept-grid [class^=dept-] a').on('click', function(e){
        if( window.ga && typeof(ga.getAll) != "undefined" ){
          e.preventDefault();
          gaNum = ga.getAll()[0].get('name');
          newLoc = $(this).attr('href');
          itm = $(this).parent().index();
          var dta = '';
          if($('#breadcrubmcontent > span').length > 2){
            dta += $('.lastCrumb').parent().prev().children().text().trim() + ' ';
          }
          dta += $('.lastCrumb').text().trim();
          switch(itm) {
            case 1:
              dta += ' - big image';
              break;
            case 2:
              dta += ' - small image 1';
              break;
            case 3:
              dta += ' - small image 2';
              break;
          }
          ga(gaNum + '.send', 'event', 'Department Page', 'Clickthrough', dta);
          setTimeout(function(){
            document.location = newLoc;
          },30);
        };
      });
    }
    if($('#results-pagination-con').length){
      $('#results-pagination-con a').on('click', function(e){
        if( window.ga && typeof(ga.getAll) != "undefined" ){
          e.preventDefault();
          gaNum = ga.getAll()[0].get('name');
          newLoc = $(this).attr('href');
          var dta = 'Pagination - '
          if($(this).parent().hasClass('next')){
            dta += 'Next Page';
          }else if($(this).parent().hasClass('previous')){
            dta += 'Previous Page';
          }else if($(this).parent().hasClass('pag-view-all')){
            dta += 'View All';
          }else{
            dta += 'Page ' + $(this).clone().children().remove().end().text().trim();
          }
          ga(gaNum + '.send', 'event', 'Category', 'Clickthrough', dta);
          setTimeout(function(){
            document.location = newLoc;
          },30);
        };
      });
    }
    if($('.toms-custom-dd-btn').length){
      $('.toms-custom-dd-btn').on('click', function(){
        if( window.ga && typeof(ga.getAll) != "undefined" ){
          gaNum = ga.getAll()[0].get('name');
          ga(gaNum + '.send', 'event', 'Category', 'Dropdown', 'Sort By - Dropdown Arrow');
        };
      });
    }
    if($('.cat-page-sort-drop').length){
      $('.cat-page-sort-drop a').on('click', function(e){
        if( window.ga && typeof(ga.getAll) != "undefined" ){
          e.preventDefault();
          gaNum = ga.getAll()[0].get('name');
          newLoc = $(this).attr('href');
          var dta = 'Sort By - ' + $(this).clone().children().remove().end().text().trim();
          ga(gaNum + '.send', 'event', 'Category', 'Sort', dta);
          setTimeout(function(){
            document.location = newLoc;
          },30);
        };
      });
    }
    if($('.gn-shop-by').length){
      $('.gn-shop-by ul a[href]').on('click', function(e){
        if( window.ga && typeof(ga.getAll) != "undefined" ){
          e.preventDefault();
          gaNum = ga.getAll()[0].get('name');
          newLoc = $(this).attr('href');
          var dta = $(this).closest('dd').find('a.acc-top').clone().children().remove().end().text().trim();
          if($('.currentCategory').text().trim() != ""){
            if(($('.currentCategory').parents().length +1) < $(this).parents().length){
              dta += ' - ' + $('.currentCategory').text().trim();
            }
          }
          if($(this).text().trim() != ""){
            dta += ' - ' + $(this).clone().children().remove().end().text().trim();
          }
          ga(gaNum + '.send', 'event', 'Category', 'Navigate', dta);
          setTimeout(function(){
            document.location = newLoc;
          },30);
        };
      });
    }
    if($('.gn-filter-by').length){
      $('.gn-filter-by a[href^="/"]').on('click', function(e){
        if( window.ga && typeof(ga.getAll) != "undefined" ){
          e.preventDefault();
          gaNum = ga.getAll()[0].get('name');
          newLoc = $(this).attr('href');
          var dta = 'Filter By - ' + $(this).closest('dd').find('a.acc-top-filter .filter-label').text().trim();
          if($('.currentCategory').text().trim() != ""){
            if(($('.currentCategory').parents().length + 1) < $(this).parents().length){
              dta += ' - ' + $('.currentCategory').text().trim();
            }
          }
          if($(this).text().trim() != ""){
            dta += ' - ' + $(this).attr('title');
          }
          ga(gaNum + '.send', 'event', 'Category', 'Navigate', dta);
          setTimeout(function(){
            document.location = newLoc;
          },30);
        };
      });
    }
    if($('#breadcrubmcontent a').length){
      $('#breadcrubmcontent a').on('click', function(e){
        if( window.ga && typeof(ga.getAll) != "undefined" ){
          e.preventDefault();
          gaNum = ga.getAll()[0].get('name');
          newLoc = $(this).attr('href');
          var clickedItem = $(this).text().trim();
          var dta = $('#breadcrubmcontent').text().split(clickedItem)[0].replace(/([ \t\n])+/ig,"") + clickedItem;
          var dta = dta.replace("/", " - ");
          ga(gaNum + '.send', 'event', 'Category', 'Breadcrumb', 'Breadcrumb - ' + dta);
          setTimeout(function(){
            document.location = newLoc;
          },30);
        };
      });
    }
    if($('.meganav').length){
      $('.meganav > ul[role] a').on('click', function(e){
        if( window.ga && typeof(ga.getAll) != "undefined" ){
          e.preventDefault();
          gaNum = ga.getAll()[0].get('name');
          newLoc = $(this).attr('href');
          var dta = 'Text -';
          if($(this).hasClass('topMainNav')){
            dta += ' ' + $(this).text().trim() + ' Header';
          }else{
            if(!$(this).closest('li.left').hasClass('marketplace')){
              var dParent = $(this).closest('li.left').not('.marketplace').children('p').text().trim();
              dta += ' ' + dParent;
            }
            var itemText = $(this).text().trim();
            if($(this).parent().is('p') && !$(this).closest('li.left').hasClass('marketplace')){
              dta += ' Header';
            }else if(dta.indexOf(itemText) == -1){
              dta += ' ' + itemText;
            }
            if($(this).closest('li').hasClass('sub-banner')){
              var alt = $(this).find('img').attr('alt') != undefined ? $(this).find('img').attr('alt') : "";
              dta = 'Image - ' + itemText + ' - ' + alt + ' - ' + newLoc;
            }
            if($(this).closest('li').hasClass('logo')){
              dta = 'Logo - TOMS Flag';
            }
            if($(this).closest('li').hasClass('loyalty-logo')){
              dta = 'Logo - Passport';
            }
          }
          ga(gaNum + '.send', 'event', 'MegaNav', 'Clickthrough', dta);
          setTimeout(function(){
            document.location = newLoc;
          },30);
        };
      });

      $('.topNavLoyalty').hover(function(e){
        if(!$(this).hasClass('waitForEvent')){
          if( window.ga && typeof(ga.getAll) != "undefined" ){
            $(this).addClass('waitForEvent');
            gaNum = ga.getAll()[0].get('name');
            ga(gaNum + '.send', 'event', 'MegaNav', 'Hover', 'Logo - Passport');
          }
        };
      },function(e){
        $(e.target).data('timeout', setTimeout(function(){
            $(e.target).removeClass('waitForEvent');
          },1500)
        );
      });
      $('.expandable > .nav-top-links').hover(function(e){
        if( window.ga && typeof(ga.getAll) != "undefined" ){
          if(!$(this).hasClass('waitForEvent')){
            $(this).addClass('waitForEvent');
            gaNum = ga.getAll()[0].get('name');
            ga(gaNum + '.send', 'event', 'MegaNav', 'Hover', 'Text - ' + $(this).clone().children().remove().end().text().trim() + ' Header');
          }
        }
      },function(e){
        $(e.target).data('timeout', setTimeout(function(){
            $(e.target).removeClass('waitForEvent');
          },1500)
        );
      });
    }
});

var valicateCAZip = function() {
    var paymentZip = $("#enter_payment #address_four, #enter_payment #address_four_US"),
        CAZips = $("#ship.en_CA #address_five, #ship.en_OM #address_five").add(paymentZip),
        valCAZip = true;
        
    if (paymentZip.length) {
        $("#country").on("change", function() {
            valCAZip = ($(this).val() == "CA") ? true : false;
            CAZips.trigger("blur");
        }).trigger("change");
    }
    
    CAZips.on("keydown", function(e) {
        if (valCAZip) {
            if (($(this).val().length == 3) && (e.which != "32") && (e.which != "8")) {
                $(this).val($(this).val() + " ");
            }
        }
    }).on("blur", function() {
        if (valCAZip) {
            var zipVal = $(this).val();
            if (zipVal.charAt(3) != " ") {
                var fZip = zipVal.substr(0,3) + " " + zipVal.substr(3,zipVal.length);
                $(this).val(fZip);
            }
        }
    });
};

// Custom plugin for setting max height to a collection of objects
(function( $ ) {
    $.fn.setMax = function() {
        this.height("auto");
        var max = Math.max.apply(Math, this.map(function() {
                      return $(this).height();
                  }));
        return this.height(max);
    };
}( jQuery ));

$(document).ready(function() {
    //ADA 4.1.2 - Role of UI elements        
    $("dl.accordion dd.hide-for-small, dl.accordion dd.open, dl.accordion dd.rare").each(function() {
        if ($(this).find('div.content').hasClass('active')) {
            $(this).attr("aria-expanded","true");
        } else {
            $(this).attr("aria-expanded","false");
        }   
    });
    $("dl.accordion a.acc-top, dl.accordion a.acc-top-filter").click(function(e) {
        var dd = $(this).closest('dd');
        if (e.currentTarget.className === "acc-top") {
            $(this).closest('dl.accordion').find('dd').attr("aria-expanded","false");
        }
        if (dd.find('div.content').hasClass('active')) {
            dd.attr("aria-expanded","true");
        } else {
            dd.attr("aria-expanded","false");
        }
    });
    $('input:checkbox').change(function(){
        if ($(this).is(':checked')) {
            $(this).attr('aria-checked','true');
        } else {
            $(this).attr('aria-checked','false');
        }
    }); 
    $('#join-rewards').change(function(){
      if ($(this).is(':checked')) {
         $("#date_of_birth, #address_five_US").attr("aria-required","true");
      }else{
        $("#date_of_birth,  #address_five_US").removeAttr("aria-required","true");
      }
     });
     brightCovePlayer.addPlayer();
});
// New Brightcove Player
var brightCovePlayer = {
    playerDefaultOptions: {
        "data-account": "2272822600001",
        "data-player": "ryTlh2O7x",
        "data-embed": "default",
        "class": "video-js",
        "controls": ""
    },
    addPlayer: function() {
        var _this = this, vids = $("[data-vid-id]"), modalVids = $("[data-modal-vid-id]");
        if (vids.length) {
            _this.initPlayer(vids);
        }
        if (modalVids.length) {
            modalVids.each(function() {
                $(this).on("click", function(e) {
                    e.preventDefault();
                    var userOptions = {
                        "data-video-id": $(this).attr("data-modal-vid-id"),
                        "data-player": $(this).attr("data-vid-player"),
                        "loop": $(this).attr("data-vid-loop"),
                        "autoplay": true,
                        "data-vid-event": $(this).attr("data-vid-event")
                    }
                    var vidOverlay = $("#" + $(this).attr("data-reveal-id")).find(".flex-video");
                    if ((vidOverlay.data("vidjs") === undefined) || (vidOverlay.data("vidjs").mediainfo.id != userOptions["data-video-id"])) {
                        _this.initPlayer(vidOverlay, userOptions);
                    }
                });
            });
            
        }
    },
    initPlayer: function(vids) {
        var _this = this, arg = arguments, playerObj = {};
        vids.each(function() {
            if (arg[1] !== undefined && (typeof arg[1] === "object")) {
                var userOptions = arg[1];
            } else {
                var userOptions = {
                    "data-video-id": $(this).attr("data-vid-id"),
                    "data-player": $(this).attr("data-vid-player"),
                    "loop": $(this).attr("data-vid-loop"),
                    "autoplay": $(this).attr("data-vid-autoplay"),
                    "data-vid-event": $(this).attr("data-vid-event")
                }
            }
            var player = userOptions["data-player"] || _this.playerDefaultOptions["data-player"];
            _this.createPlayer($(this), userOptions);
            if (!playerObj.hasOwnProperty(player)) {
                playerObj[player] = [];
                playerObj[player].push($(this));
            } else {
                playerObj[player].push($(this));
            }
        });

        $.each(playerObj, function(key, value) {
            // Create and execute the player script tag
            var s = document.createElement('script'),
                scSrc = "https://players.brightcove.net/" + _this.playerDefaultOptions["data-account"] + "/" + key + "_default/index.min.js";
            s.src = scSrc;
            document.body.appendChild(s);

            s.onload = function() {
                $.each(value, function() {
                    var myPlayer = videojs($(this).find(".video-js").get(0)), // initialize players
                        $this = $(this);
                    $(this).data("vidjs", myPlayer);
                    myPlayer.on("loadedmetadata", function() {
                        $this.show();
                        if ($this.attr("data-vid-get-poster") !== undefined) {
                            this.pause();
                            var poster = myPlayer.poster();
                            $this.attr("data-vid-poster", poster).trigger("posterReady");
                        }
                        if ($this.attr("data-vid-event") !== undefined) {
                            $this.trigger($this.attr("data-vid-event"));
                        }
                        $this.find(".vjs-control-bar button, .vjs-control-bar a").addClass("needsclick");
                    });
                    // track view time
                    myPlayer.on("pause", function() {
                        //console.log(myPlayer.currentTime());
                        if (myPlayer.currentTime() > 20) {
                            this.trigger("trackVideoView");
                        }
                    });
                    myPlayer.one("ended", function() {
                        this.trigger("trackVideoView");
                    });
                    myPlayer.one("trackVideoView", function() {
                        _this.sendCTData(this);
                    });
                });
            }
        });
        $(document).on("opened.fndtn.reveal","[data-reveal]", function(){
            var mydiv = $(this), mydivData = mydiv.find(".flex-video").data("vidjs");
            $(window).height()>mydiv.height()&&(myVidHeight=$(window).height()-mydiv.height(),topPosition=myVidHeight/2,0>topPosition&&(topPosition=0),mydiv.css({position:"fixed",top:topPosition+"px"}))
            if (mydivData) {
                mydivData.play();
            }
        });
        $(document).on("closed.fndtn.reveal","[data-reveal]", function(){
            var mydivData = $(this).find(".flex-video").data("vidjs");
            if (mydivData) {
                mydivData.pause();
            }
        });
    },
    /* Create player HTML and append to DOM */
    createPlayer: function(el, opts) {
        var playerOptions = $.extend({}, this.playerDefaultOptions, opts);
        var $player = $("<video />", playerOptions);
        el.html($player);
    },
    /* Send CT data */
    sendCTData: function(el) {
        if (!el.loop() && (typeof ct_trck_watched_a_video === "function")) {
            ctVideoTag(el.mediainfo.id, el.mediainfo.name);
            //console.log("log CT: " + el.mediainfo.id + ", " + el.mediainfo.name);
        }
    }
}
