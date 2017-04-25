var _PDP = {
    includeBV : [false, true], //[0]=run[1]=include
    orientation : "",
    selProd : "",
    selSku : $("#skuId").text(),
    selMatNum : "",
    selName : "",
    selNameDefault : "",
    selColor : "",
    selSize : "",
    selMat : "",
    selPrice: "",
    productType: $("#productType").text(),
    JSONData : {},
    A : [],
    skuData : {},
    currProdImg : $('#current-product').attr('src'),
    add : 0,
    bName : "",
    selLocale : "",
    prev : [], // Previous selected product
    cur : [], // Current selected product
    sUrl : "",
    tNum : 0,
    tName : "",
    dTxt : "", // Default "Size" dropdown Text
    wish : "",
    addToWishList : "", //For Add to Wish list Success Message
    isMobile : (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) ? true : false,
    isIPhone : (navigator.userAgent.match(/iPhone/i)) ? true : false,
    /*
     * Initialize PDP data & set variables
     */
    init: function() {
        var _this = this;
        var lang = $('#locale').val().toLowerCase();
        if (_this.isMobile) {
            $("body").addClass("isMobile");
        }
        _this.selLocale = "locale=" + $("#locale").val();
        
        //if ($("#pdp_shoes").length > 0) {
            _this.tNum = 6; // Location of Master List
            _this.tName = "availableSizes";  // Name of object descriptor for Master List
            //_this.dTxt = TRANS_this[1];
            _this.selProd = $("#cartProdId").val();
            _this.selName = $("#sku_name").html();
            if (!$(".salePrice").length) {
                _this.selPrice = $("#prd_price .regPrice").html();
            } else {
                _this.selPrice = '<span class="oldPrice">' + $(".oldPrice").html() + '</span>';
                _this.selPrice += '<span class="salePrice">' + $(".salePrice").html() + '</span>';
            }
            _this.state = $("#product_state").html();
            _this.selColor = $("#pdp_color").html();
            _this.cur = [_this.selProd,_this.selSku,_this.selName,_this.selColor,_this.selSize];
            _this.handleImageZoom();
            
        //};

        _this.loadProduct();
        _this.isFav();
        
        var availColors = $("#available-colors");
        if ($("li",availColors).length <= 1) {
            availColors.hide();
            $("#available-colorsmob").parent("dd").hide();
        }
        
        _this.handleImageSlider();
        if(TOMS.VALS.cookiesAllowed && lang !== "en_om"){
        _this.handleBV();
        }
        _this.notifyMe();
        _this.removeOOSClassForComingSoonSizes();
        
        $(window).resize(function() {
            _this.screenOrientation();
        }).trigger("resize");
        
        _this.handleSocial();
        
        $("img").error(function() {
            $(this).css({visibility:"hidden"});
        });
        
        if ($("#egiftcard-sku").length || $("#physicalgiftcard-sku").length) {
            _this.loadGiftcard();
        }
        
        $("#prod-social-cntr").insertBefore(".mobile-view");
        
        $("[data-reveal-id]").on("click", function() {
            $(this).addClass("last-focus");
        });
        
        _this.handleVideos();
    },
    /*
     * Hide available colors if only one
     */
    pageDisplay: function() {
        var availColors = $("#available-colors");
        if ($("li",availColors).length <= 1) {
            availColors.hide();
            $("#available-colorsmob").parent("dd").hide();
        }
    },
    /*
     * Checks if product is in user favorites
     */
    isFav: function() {
        var _this = this, bURL = "/browse/updateWishlist.jsp";
        $.ajax({
            url : bURL + "?productId="+ _this.selProd + "&skuId=" + _this.selSku + "&" + _this.selLocale,
            type : "POST",
            async : false,
            cache : false,
            dataType : "html",
            success : function(response) {
                if (response.indexOf("true") !== -1) {
                    $("#addToWishlistFalse").css("opacity","0");
                } else {
                    $("#addToWishlistFalse").css("opacity","1");
                }
            },
            error: function(w,t,f) {
               //console.log(w + "\n" + t + "\n" + f);
            }
        })
    },
    /*
     * Product dynamic content & click events
     */
    loadProduct: function() {
        var _this = this, wanelo = $("#share_wanelo"), prodChoices = $("#pdp_color, #pdp_size, #pdp_amount, #pdp_qty");
        /* Clear Values */
        //$("#cartSkuId, #giftSkuId").val("");
        $("#myDiv").text("");
        $("#pdp_qty").text("1");
        
        /* Product choices click events */
        prodChoices.on("click",function(){
            if ($(this).hasClass("active")) {
                prodChoices.removeClass('active');
            } else {
                prodChoices.removeClass('active');
                $(this).addClass("active");
            }
        });
        
        $("body").on("click", function(e){
            var trg = $(e.target).attr("id");
            if (trg != "pdp_color" && trg != "pdp_size" && trg != "pdp_qty" && trg != "pdp_amount") {
                prodChoices.removeClass("active");
            }
        });
        
        // Remove default SKU for shoes and apparel
        if ((_this.productType == "footwear-sku") || (_this.productType == "apparel-sku") || (_this.productType == "physicalgiftcard-sku")) {
            _this.selSku = "";
        }
        
        $("#cartSkuId, #giftSkuId").val(_this.selSku);
        
        if (_this.productType == "eyewear-sku") {
            var whatFace = $("#face-shape-details a"), faceImg = $("#face_img"), faceDesc = $(".overlay-face > p");
            whatFace.on("click", function(e){
                e.preventDefault();
                var shape = $(this).attr("data-shape");
                faceDesc.hide().filter("."+shape).show().focus();
                whatFace.removeClass("current");
                faceImg.removeClass().addClass(shape);
                $(this).addClass("current");
            });
        }
        
        if ($("#pdp_name .salePrice").length) {
            var pdpName = $("#pdp_name");
            var listPrice = $(".oldPrice", pdpName).text().match(/\d+\.?\,?\d+/)[0].replace(",",".") *1;          
            var salePrice = $(".salePrice", pdpName).text().match(/\d+\.?\,?\d+/)[0].replace(",",".") *1;
            var salePer = (listPrice - salePrice) * 100/listPrice, salePerCntr = $("#salePercentage");
            if (salePerCntr.length) {
                salePerCntr.text("SAVE " + salePer + "%");
            } else {
                $('<span class="saveper" id="salePercentage">SAVE ' + Math.round(salePer) + '%</span>').insertBefore("#myDiv");
            }
        }
        
        // get SKU info on page load
        if ((typeof pdpJsonData != "undefined") && (typeof pdpJsonData.skuVariants != "undefined") && !$.isEmptyObject(pdpJsonData)) {
            for (var i = 0; i < pdpJsonData.skuVariants.length; i++) {
                var elem = pdpJsonData.skuVariants[i], nsku = elem.skuId;
                _this.skuData[nsku] = elem;
            }
        }
        
        var evt = "";
        if ((_this.productType != "egiftcard-sku") && (_this.productType != "physicalgiftcard-sku")) {
            $("#drop").on("click", "li a", function(e) {
                e.preventDefault();
                evt = "click";

                var sColor = $(this).attr("data-color"), pId = $(this).attr("data-pid");
                if (pId != $("#pdp_color").attr("data-pid")) {
                    _this.selColor = sColor;
                    _this.loadSkuDetails(pId, sColor);
                    _this.changeAlsoAvailable(pId);
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                    _this.cur[3] = _this.selColor;
                }
            });
            
            $("#drop2").on("click", "li a", function(e) {
                _this.changeSize($(this));
            });
        }
        
        $("#drop2").on("click", "li a", function(e) {
            e.preventDefault();
            evt = "click";
        });
        
        $("#drop3").on("click", "li a", function(e) {
            e.preventDefault();
            evt = "click";
        });
        
        var d = $("#output"), d2 = $("#output2");
        
        $("#drop, #drop2, #drop3").each(function() {
            var $this = $(this);
            $this.on("blur", "li", function(e) {
                var items = $(this).siblings("li");
                tm = setTimeout(function() {
                    if (items.find(":focus").length == 0) {
                        if (evt != "click") {
                            d2.text("evt: " + evt);
                            $this.siblings(".dropdown").click();
                        }
                    }
                    evt = "";
                },100);
            });
        });

        $("#available-colors li a, #available-colorsmob a").on("click", function(e) {
            e.preventDefault();
            $('#drop [data-pid = "' + $(this).attr("data-pid") + '"]').click();
        });
  
        $(".prod-info-acc").on("click", "dd > a", function(e) {
            e.preventDefault();
            var currHash = location.hash;
            location.hash = $(this).attr("href");
            if (currHash == location.hash) {
                $(window).trigger("hashchange");
            }
        });
        
        $(window).on("hashchange", function() {
            var anchor = $(location.hash), trigger = anchor.prev("a");
            if (anchor.hasClass("content") && trigger.length) {
                $("html, body").animate({
                    scrollTop: trigger.offset().top
                });
            }
        });

        if (wanelo.length > 0) {
            wanelo.attr('data-url', document.URL );
            wanelo.attr('data-title', _this.selName);
            wanelo.attr('data-image', $('#current-product').attr('src') );
            wanelo.attr('data-price', _this.selPrice );
        }

        $(".call-for-order").each(function(){
            var $this = $(this);
            if ($this.find(".virtualTrigger").length == 0) {
                $this.find("a").css({"position":"fixed","left":"-9999px"}).addClass("triggerPoint");
                $this.append("<a href=\"javascript:void(0)\" class=\"virtualTrigger " + $(this).find("a").attr("class") + "\">" + $(this).find("a").text() + "</a>");
                $this.on("click", ".virtualTrigger", function(){
                    window.location = $(this).parent().find(".triggerPoint").attr("href");
                });
            }
        }).on("click",function(e){
            e.stopPropagation();
        });
        
        if ($(window).width() <= 767) {
            $("#sizing_tab > a").on("click", function(e){
                e.preventDefault();
                $(this).addClass("active").siblings().removeClass("active");
                $("#tiny_size, #youth_size").hide();
                $("#" + $(this).data("id")).show();
            });
        }
        
        // Rewards tooltip for mobile
        var tooltip = $(".rw-tooltip");
        tooltip.hover(function() {
            $(this).addClass("hover");
        }, function() {
            $(this).removeClass("hover");
        });
        tooltip.on("touchstart", function() {
            var cTip = $(this);
            cTip.toggleClass("hover");
        });
        $("a",tooltip).on("touchstart", function(e) {
            e.stopPropagation();
            location.href = $(this).attr("href");
        });
        $("#tp-show").on("click", function(e) {
            e.preventDefault();
            tooltip.toggleClass("hover");
            $(".info-tooltip").focus().on("blur", function() {
                setTimeout(function() {
                    tooltip.removeClass("hover");
                },5000);
            });
        });
        
        
        if (_this.productType != "egiftcard-sku") {
            $("#add_to_bag").on("click", function(e) {
                e.preventDefault();
                _this.addToBag();
            });
        }

    },
    /*
     * Eyewear dynamic content & click events
     */
    loadEyewear: function() {
       
    },
    /*
     * Giftcard dynamic content & click events
     */
    loadGiftcard: function() {
        var _this = this;
        $.getScript("/static/www/js/checkout.js");
        
        var cdamt = $("#card-amount"), optSelected = cdamt.find("option:selected"),
            giftDropdowns = $(".egift-form #drop2 a, .pgift-card #drop2 a");
        amtSel = optSelected.text().replace(/\.00/,"").replace(/\,00/,"");
        $(".egift-form #pdp_size").text(amtSel);
         _this.selProd = cdamt.val();
         if ($("#egiftcard-sku").length) {
            _this.selSku = optSelected.attr("data-sku");
         }
        
        giftDropdowns.each(function() {
            $(this).text($(this).text().replace(/\.00/,"").replace(/\,00/,""));
        });
        giftDropdowns.on("click", function() {
            _this.selProd = $(this).attr("data-pid");
            _this.selSku = $(this).attr("data-sid");
            $("#shown_in_sku").text(_this.selSku);
            $("#prd_price").text($(this).text());
        });

    },
    /*
     * PDP image zoom
     */
    handleImageZoom: function() {
        var _this = this;
        if (_this.productType != "egiftcard-sku") {
            var currProd = $("#current-product"),
            angles = $("#pdp_angle"), angleImg = angles.find("li"),
            wanelo = $("#share_wanelo"), hero = $(".hero");

            currProd.load(function() {
                currProd.stop().animate({opacity:"1"});
                if (!_this.isMobile && ($(window).width() > 767)){
                    hero.trigger("zoom.destroy");
                    hero.zoom({magnify: 0.8});
                }
            }).trigger("load");
            
            angles.on("click", ".th-img", function(e) {
                e.preventDefault();
                var s1 = $(this).attr("href");
                if (s1 != currProd.attr('src').replace(/\?(.*)/,'')) {
                    angleImg.removeClass("current");
                    $(this).parent("li").addClass("current");
                    currProd.stop().animate({opacity:"0"},function() {
                        currProd.attr("src",s1);
                        if (wanelo.length > 0){
                            wanelo.attr("data-image", s1);
                        }
                    });
                }
            });
        }
    },
    /*
     * Handle BazaarVoice and reviews
     */
    handleBV: function() {
        var _this = this, pos;
        var crTablet = $("#customer-reviews-tablet"), crDesktop = $("#customer-reviews-desktop");
        $(".bv-rating").addClass("bv-r-" + _this.selProd).off("click").on("click", function(e){
            e.stopPropagation();
            if ($(window).width() >= 768) {
                pos = $("#BVRRContainer").offset().top;
            } else {
                var rvParent = crTablet.parent();
                if (!rvParent.hasClass("active")) {
                    crTablet.prev().trigger("click");
                }
                pos = rvParent.offset().top;
            }
            $("html, body").animate({
                scrollTop: pos
            }, 500);
        });
        
        $(".star-rating").addClass("bv-s-" + _this.selProd);
        
        // Gets the product rating for the current product
        var bvPath = document.location.pathname;
        var urlList = bvDoNotLoad;
        if (!_this.includeBV[0]) {
            if (typeof urlList !== 'undefined' && urlList !== '') {
                for (var i = urlList.length - 1; i >= 0; i--) {
                    if (urlList[i] == bvPath) {
                        _this.includeBV[1] = false;
                    }
                };
            }
            _this.includeBV[0] = true;
        }

        if (_this.includeBV[1]) {
            /* Load Bazaarvoice Statistics */
            var bvapi = document.createElement("script");
            bvapi.async = true;
            bvapi.src = "https://" + bvInfo[0] + "/static/toms/Local/" + bvInfo[1] + "/bvapi.js";
            document.getElementsByTagName('body')[0].appendChild(bvapi);

            if (typeof bvapi_url === 'undefined' || !bvapi_url) {
              switch (window.location.hostname.substring(0,5)) {
                case "stage":
                case "devel":
                case "141s.":
                case "141u.":
                  var bvapi_url='https://stg.api.bazaarvoice.com/data/statistics.json?apiversion=5.4&passkey=osehabxalxl6538fr7wh7o1zq&stats=reviews&filter=contentLocale:eq:'+bvInfo[2]+'&filter=productid:';
                break;
                default:
                  var bvapi_url='https://api.bazaarvoice.com/data/statistics.json?apiversion=5.4&passkey=ovbz4ubdbui174im28xpnwaia&stats=reviews&filter=contentLocale:eq:'+bvInfo[2]+'&filter=productid:';
              }
            }
            $.ajax({
                url : bvapi_url+''+_this.selProd,
                async : true,
                dataType : 'jsonp',
                jsonpCallback : "bvCallback",
                success : function bvCallback (data) {
                    if (data.TotalResults >= 1) {
                        val2 = data.Results[0].ProductStatistics.ReviewStatistics.AverageOverallRating;
                    } else {
                        val2 = 0;
                    }
                    rating = (Math.round(val2 * 2) / 2);
                    pCent = (rating * 20);
                    rTitle = "This product is not yet rated.";
                    if (pCent > 0) {
                      rTitle = "" + rating + " star rating";
                    }
                    $(".bv-rating").attr("title", rTitle);
                    $(".star-rating").addClass("star_" + pCent);
                }
            });
            var bvrr = $("#BVRRContainer");
            if ($(window).width() < 768) {
                bvrr.appendTo(crTablet);
            } else {
                bvrr.appendTo(crDesktop);
            }
            $(window).on("resize", function() {
                if ($(window).width() < 768) {
                    if ($("#BVRRContainer", crDesktop).length) {
                        bvrr.appendTo(crTablet);
                    }
                } else {
                    if ($("#BVRRContainer", crTablet).length) {
                        bvrr.appendTo(crDesktop);
                    }
                }
            });
        } else {
            $(".product-reviews").css("border","none");
            crTablet.closest("dd").remove();
        };
    },
    screenOrientation: function() {
        var _this = this;
        if (_this.isMobile) {
            if (window.innerHeight > window.innerWidth) {
                _this.orientation = "Portrait";
            } else {
                _this.orientation = "Landscape";
            }
        } else {
            _this.orientation = "";
        }
    },
    /*
     * Handle social icons
     */
    handleSocial: function() {
        var _this = this;
        var hT3 = encodeURIComponent(document.URL);
        var hT4 = $("#current-product").attr("src");
        var hT5 = _this.selColor+' '+_this.selName;
        hT5 = encodeURIComponent(hT5);
        var hT6 = encodeURIComponent(_this.selName);
        var hT7 = encodeURIComponent($("#pdp_details .pdp_details_text").text());
        var fbid = $("#facebookAppID").val();

        $("#share_g-plus").attr("href", "https://plus.google.com/share?url="+ hT3);
        $("#share_twitter").attr("href", "https://twitter.com/intent/tweet?text=" + hT6 + "%20%5B" + hT3 + "%5D%20" + "&via=" + $("#twitterAccount").val());
        $("#share_facebook").attr("href", "https://www.facebook.com/dialog/feed?app_id="+ fbid + "&name=" + hT6 + "&picture=" + hT4 + "&link=" + hT3 + "&description=" + hT7 + "&redirect_uri=" + hT3);
        $("#share_pinterest").attr("href", "http://pinterest.com/pin/create/button/?url=" + hT3 + "&media=" + hT4 + "&description=" + hT5);
    },
    /*
     * Adds item to wishlist, not logged in
     */
    guestAddToList: function() {
        var sID = this.selSku;
        var pID = this.selProd;
        var lang = $('#locale').val().toLowerCase();
        var errorMsg = '';
        switch(lang) {
            case 'de_de':
                errorMsg = "W&auml;hle deine Gr&ouml;&szlig;e aus und f&uuml;ge der Wunschliste zu.";
                break;
            case 'nl_nl':
                errorMsg = "Selecteer een maat voor het toevoegen aan je wenslijst.";
                break;
            case 'fr_fr':
                errorMsg = "Veuillez s&eacute;lectionner une pointure avant d'ajouter ce mod&egrave;le &agrave; votre liste de souhaits.";
                break;
            case 'de_at':
                errorMsg = "W&auml;hle deine Gr&ouml;&szlig;e aus und f&uuml;ge der Wunschliste zu.";
                break;
            default:
                errorMsg = "Please select a size before adding to your wish list.";
        }
        if (sID == null || sID == '' || sID === undefined || pID == null || pID == '' || pID === undefined) {
            $("#myDiv").html(errorMsg).focus();
            return false;
        } else {
            return true;
        }
    },
    /*
     * Adds item to wishlist, logged in
     */
    addItemToWishList: function() {
        var _this = this;
        _this.add = 1;
        var sID = _this.selSku;
        var pID = _this.selProd;

        $.ajax({
            url: "/browse/addItemsToWishList.jsp?skuId=" + sID + "&prodId=" + pID,
            type: "POST",
            cache: false,
            headers: {
              Accept: "text/html; charset=utf-8",
              "Content-Type": "text/html; charset=utf-8",
              "Cache-Control": "max-age=-1"
            },
            dataType: "html",
            success: function(response) {
                if (response.indexOf("success") !== -1) {
                    //$("#addToWishlistTrue").show();
                    $("#addToWishlistFalse").css("opacity","0");
                    //$('.product-social li').find(".text-hover").hide();
                    $("#wishListAdded").show(function() {
                        $(this).focus();
                        setTimeout(function() {
                            $("#wishListAdded").hide();
                        }, 3000);
                    });
                } else {
                    $("#myDiv").html(response).focus();
                }
            },
            error: function(w,t,f) {
                //console.log(w + "\n" + t + "\n" + f);
            }
        });
    },
    /*
     * Notify me functionaliy
     */
    notifyMe: function() {
        var notifyMe = $("#btnNotifyMe"), notifyRequest = $("#btnSubmittingRequest"),
            err = $("#errorComingSoon"), em = $('#email'), _this = this;
        notifyMe.click(function() {
            err.html('');
            var email = em.val();
            var emailError = true;
            var sizeError = false;
            var pattern = new RegExp("^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+[.][A-Za-z0-9-.]+$");
            if(email.match(pattern)) {
                emailError = false;
            }

            var pID = _this.selProd;
            var sID = _this.selSku;
            if (sID == '') {
                sizeError = true;
            }

            if (emailError && sizeError) {
                err.html(notifyMeErrorMsg.emailsizeerror).focus();
            } else if (emailError) {
                err.html(notifyMeErrorMsg.emailerror).focus();
            } else if (sizeError) {
                err.html(notifyMeErrorMsg.sizeerror).focus();
            } else {
                var displayName = $("#pdp_name h1").text();
                notifyMe.hide();
                notifyRequest.show();
                $.ajax({
                    url : '/browse/signupComingSoonNotification.jsp',
                    type : 'GET',
                    data : {skuId: sID, emailId: email, prodId: pID, displayName: displayName},
                    dataType : 'json',
                    cache : false
                }).done(function(data) {
                    if (data.status == 'success') {
                        if (em.is(":visible")) {
                            em.val('');
                        }
                        notifyRequest.hide();
                        var btnRequest = $("#btnRequestSubmitted, #requestSubmittedMessage"),
                            comingSoon = $("#comingSoonLegalCopy");
                        btnRequest.show();
                        $("#requestSubmittedMessage").focus();
                        comingSoon.hide();
                        setTimeout(function(){
                            btnRequest.hide();
                            comingSoon.show();
                            notifyMe.show();
                        }, 6000);
                    } else {
                        notifyRequest.hide();
                        notifyMe.show();
                    }
                });
            }
        });
        if (notifyMe.length) {
            em.on('keydown', function(e){
                if (e.keyCode == 13) {
                    notifyMe.click();
                    return false;
                }
            });
        }
    },
    removeOOSClassForComingSoonSizes: function() {
        var drop2 = $("#drop2"), comingProd = $("#comingSoonProduct");
        if ((drop2.length > 0) && (comingProd.length > 0) && comingProd.is(":visible")) {
            drop2.find("li").removeClass("oos");
        }
    },
    /*
     * Add slick slider for angle images
     */
    handleImageSlider: function() {
        var _this = this;
        $("#pdp-hero-slider").on("init", function(event, slick) {
            $(this).find("li").show();
        }).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            infinite: true,
            asNavFor: '#pdp_angle',
            responsive: [
                {
                  breakpoint: 640,
                  settings: {
                    arrows: false,
                    slidesToShow: 1,
                    dots: true
                  }
                }
            ]
        }).on("beforeChange", function(event, slick, currentSlide, nextSlide){
            var link = "#angle_lnk_" + nextSlide;
            $(link).click();
        }).slick('slickFilter','.show');
        
        $("#pdp_angle").on("init", function(event, slick) {
            $(this).css("opacity","1");
        }).on('setPosition', function(event, slick) {
            var trackWidth = $(this).find(".slick-track").width();
            var angleWidth = $(this).width();
            var vidPos = (trackWidth <= angleWidth) ? trackWidth : angleWidth;
            $(this).next(".pdp-vid-cntr").css("left",vidPos);
            var vidCntr = $(this).next(".pdp-vid-cntr");
            var newWidth = $(this).find(".slick-slide:first").width();
            vidCntr.find("li").css("width",newWidth);
        }).slick({
            slide: "li",
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: true,
            asNavFor: '#pdp-hero-slider',
            focusOnSelect: true,
            infinite: false,
            responsive: [
                {
                  breakpoint: 1025,
                  settings: {
                    slidesToShow: 4
                  }
                }
            ]
        }).slick('slickFilter','.show');
    },
	/*IP-17256 Meganav issues*/
    showCart: function() {
    var _this = this, miniCartShow = $("#nav-cart-img > ul"), miniCart = $("#mini-cart");
    //Open Mini Cart Fly out
    miniCart.removeClass("no-display");
    miniCartShow.css("cssText", "opacity:1;-moz-transform:scaleY(1);-ms-transform:scaleY(1);-webkit-transform:scaleY(1);transform:scaleY(1);");
    miniCartShow.children("li").css("cssText", "-webkit-transform:scaleY(1);transform:scaleY(1);");
    setTimeout(function(){
    miniCart.addClass("no-display");
    miniCartShow.css("cssText", "");
    miniCartShow.children("li").css("cssText", "");
    }, 5000)
    },
    /*
     * Adds item to bag, displays mini-cart
     */
    addToBag: function() {
        var _this = this, countOfItems = $("#item_cart").val(),
            sID = _this.selSku, pID = _this.selProd,
            n = $("#pdp_qty").text().trim(), addToBag = $("#add_to_bag"),
            addingToBag = $("#adding_to_bag"), addedToBag = $("#added_to_bag"),
            miniCart = $("#mini-cart");
        _this.add = 1;
        addToBag.hide();
        addingToBag.show();
        tMe = new Date();

        if (_this.isMobile) {
            $("#nav_mini_cart_mobi").bind("DOMSubtreeModified", function() {
                var addMsg = $("#added_bag").val(), orig = addingToBag.text();
                addingToBag.text(addMsg);
                window.setTimeout(function() {
                    addingToBag.hide().text(orig);
                    addToBag.show();
                }, 700);
                _this.add = 0;
            });
        };

        $.ajax({
            url: '/browse/addItemsToCart.jsp?skuId='+sID+'&prodId='+pID+'&t='+tMe.getTime()+'&cartqty='+n,
            type : 'POST',
            cache : false,
            headers: {
                Accept : "text/html; charset=utf-8",
                "Content-Type": "text/html; charset=utf-8",
                "Cache-Control": "max-age=-1"
            },
            dataType: 'html',
            success : function(response) {
              if (response.indexOf("success") !== -1) {
                gaQty($('#sapMID').text().trim(),n);

                $("#myDiv").html("");
                _this.add = 1;
                if (_this.isMobile) {
                    window.location.href = TOMS_BAG;
                };

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
                       miniCart.html(data);
                       _this.showCart();
                    }
                });

                //Open Mini Cart Fly out
                miniCart.removeClass("no-display");
                addingToBag.css("opacity","0");
                addedToBag.show().focus();

                setTimeout(function() {
                //    miniCart.addClass("no-display");
                    addToBag.show().css("opacity","1");
                    addingToBag.add(addedToBag).hide().css("opacity","1");
                }, 3000);

              } else {
                $("#myDiv").html(response).focus();
                addingToBag.hide();
                addToBag.show();
              }
            },
            error: function(w,t,f) {
               //console.log(w + "\n" + t + "\n" + f);
            }
        });

    },
    /*
     * Adds egift cart to bag, displays mini-cart
     */
    addToBagEgift: function() {
        var _this = this, countOfItems = $("#item_cart").val(), addToBag = $("#add_to_bag"),
            addingToBag = $("#adding_to_bag"), addedToBag = $("#added_to_bag"), miniCart = $("#mini-cart");
        var dsgID = $("#card-design").val(), pID = _this.selProd, aID = _this.selSku,
            reID = $("#recipient_email").val(), rID = $("#recipient_name").val();
            seID = $("#sender_email").val(), sID = $("#sender_name").val();
            mID = $("#recipient_message").val(), dID = $("#date_pick").val();
        _this.add = 1;
        
        validate();
        
        if ($(".error").length == 0) {
            // chkOut_validations.validateReqFormFields();
            gaQty($('#sapMID').text().trim(),1);
            addToBag.hide();
            addingToBag.show();
            tMe = new Date();

            if (_this.isMobile) {
                $('#nav_mini_cart_mobi').bind('DOMSubtreeModified', function() {
                    addMsg = $('#added_bag').val();
                    orig = addingToBag.text();
                    addingToBag.text(addMsg);
                    window.setTimeout(function() {
                        addingToBag.hide().text(orig);
                        addToBag.show();
                    }, 700);
                    _this.add = 0;
                });
            };

            //console.log(pID+' : '+sID+' : '+aID+' : '+reID+' : '+rID+' : '+seID+' : '+sID+' : '+mID+' : '+dID);
            $.ajax({
                url:'/category/egift/addItemsToCart.jsp?skuId='+aID+'&prodId='+pID+'&desgnId='+dsgID+'&amount='+aID+'&recipient_email='+reID+'&recipient_name='+rID+'&sender_email='+seID+'&sender_name='+sID+'&recipient_message='+mID+'&date_pick='+dID+'&t='+tMe.getTime(),
                type : 'POST',
                cache : false,
                headers: {
                    Accept : "text/html; charset=utf-8",
                    "Content-Type": "text/html; charset=utf-8",
                    "Cache-Control": "max-age=-1"
                },
                dataType: 'html',
                success : function(response) {
                    if (response.indexOf("success") !== -1) {
                        $('#myDiv').html(' ');
                        _this.add = 1;
                        //MINI_CART.fn.build_menu();
                        if (_this.isMobile) {
                            window.location.href = TOMS_BAG;
                        };

                        //Update Cart Quantity
                        $.ajax({
                            url : '/globalelement/cartQty.jsp',
                            async : false,
                            dataType : 'html',
                            success : function(data) {
                               $('#nav-cart-num').html(data);
                            }
                        });

                        //Update Mini Cart contents
                        $.ajax({
                            url : '/globalelement/minicart.jsp',
                            async : false,
                            dataType : 'html',
                            success : function(data) {
                                miniCart.html(data);
                                _this.showCart();
                            }
                        });

                        //Open Mini Cart Fly out
                        miniCart.removeClass('no-display');
                        addingToBag.css("opacity","0");
                        addedToBag.show().focus();

                        setTimeout(function() {
                        //    miniCart.addClass('no-display');
                            addToBag.show().css("opacity","1");
                            addingToBag.add(addedToBag).hide().css("opacity","1");
                        }, 3000);
                    } else {
                        $('#myDiv').html(response).show().focus();
                        addingToBag.hide();
                        addToBag.show();
                    }
                },
                error: function(w,t,f) {
                   //console.log(w + "\n" + t + "\n" + f);
                }
            });
            //OMNI.omni_data_pdp('add to bag','','','','','',countOfItems,'','egift','ADD_TO_BAG'); return false;
        }
        //OMNI.omni_data_pdp('add to bag error','','','','','','','','egift','#'); return false;
    },
    /*
     *  Load new sku details via ajax
     */
    loadSkuDetails: function(pId, sColor) {
        var _this = this, sizeObj = $("#pdp_size"), selectedSize = sizeObj.text(), pdpName = $("#pdp_name"),
             mSlider = $("#pdp-hero-slider"), pdpAngle = $("#pdp_angle").add(mSlider);
        var skuUrl = "/browse/shoes/getProductDetails.jsp";
        //var skuUrl = "_pdp_shoe_json.jsp";
        
        var prodComingSoon = false;
        pdpDetails = null;
        $.post(skuUrl, {productId: pId, type: _this.productType}, function(r) {
            pdpDetails = r
            // sort by size
            r.skuVariants.sort(function(a, b) {
                return a.displayOrder - b.displayOrder;
            });
            
            if ((_this.productType == "footwear-sku") || (_this.productType == "apparel-sku") ||
                ((_this.productType == "marketplace-sku") && (r.skuVariants.length > 1))) {
                var sizeOpt = "<option>Size</option>", sizeDrop = "", selectedData = {}, loc = $("#locale").val();
                if ((loc == "en_US") || (loc == "en_UG")) {
                    for (var i = 0; i < r.skuVariants.length; i++) {
                        var elem = r.skuVariants[i], nsku = elem.skuId, inStock = elem.stockAvailability, nsize = elem.shoeSize;
                        _this.skuData[nsku] = elem;
                        if ((selectedSize == nsize) && (inStock == 1)) {
                            selectedData.skuId = nsku;
                        }
                        sizeOpt += '<option value="' + nsku + '">' + nsize + '</option>';
                        if ((inStock == 0) && (elem.isComingSoon != "true")) {
                            sizeDrop += '<li tabindex="0" class="oos" title="Currently out of stock">';
                            sizeDrop += '<a href="#" tabindex="0" id="' + nsku + '"><span class="off-screen">size </span>' + nsize + '<span class="off-screen">Currently out of stock</span></a>';
                            sizeDrop += '</li>';
                            prodComingSoon = r.skuVariants[i].isComingSoon;
                        } else {
                            sizeDrop += '<li tabindex="0"><a href="#" id="' + nsku + '"><span class="off-screen">size </span>' + nsize + '</a></li>';
                            prodComingSoon = r.skuVariants[i].isComingSoon;
                        }
                    }
                } else {
                    for (var i = 0; i < r.skuVariants.length; i++) {
                        var elem = r.skuVariants[i], nsku = elem.skuId, inStock = elem.stockAvailability, nsize = elem.shoeSize;
                        _this.skuData[nsku] = elem;
                        var oos = ((inStock == 0) && (elem.isComingSoon != "true")) ? ' class="oos"' : '';
                        if ((selectedSize == nsize) && (inStock == 1)) {
                            selectedData.skuId = nsku;
                        }
                        sizeOpt += '<option value="' + nsku + '">' + nsize + '</option>';
                        sizeDrop += '<li ' + oos + '><a href="#" id="' + nsku + '">' + nsize + '</a></li>';
                        prodComingSoon = r.skuVariants[i].isComingSoon;
                    }
                }
                
                // If size was selected then pre-select the size if available
                if ((selectedSize != "Size") && !$.isEmptyObject(selectedData)) {
                    var skuId = selectedData.skuId;
                    $("#cartSkuId").val(skuId);
                    
                    //IP-15250 code fix
                    sizeObj.html(selectedSize);
                    $("#shown_in_sku").html(sColor + ", " + r.materialNumber + " (" + skuId + ")");
                    $("#sapMID").text(r.materialNumber);
                    $("#drop2").empty().html(sizeDrop);
                    
                    //Display sku attributes
                    _this.changeSize($("#"+skuId));
                } else {
                    sizeObj.html("Size");
                    $("#cartSkuId").val("");
                    $("#drop2").empty().html(sizeDrop);
                    $("#shown_in_sku").html(sColor + ", " + r.materialNumber);
                    $("#sapMID").text(r.materialNumber);
                }
                
            } else if (_this.productType == "eyewear-sku") {
            
                var sizeOpt = "", sizeDrop = "";
                for (var i = 0; i < r.skuVariants.length; i++) {
                    var elem = r.skuVariants[i], nsku = elem.skuId, inStock = elem.stockAvailability, nColor = elem.lensColor;
                    _this.skuData[nsku] = elem;
                    $("#cartSkuId").val(nsku);
                    sizeOpt += '<option value="' + nsku + '">' + nColor + '</option>';
                    sizeDrop += '<li><a href="#" id="' + nsku + '">' + nColor + '</a></li>';
                    prodComingSoon = r.skuVariants[i].isComingSoon;
                }
                sizeObj.html(nColor);
                $("#drop2").empty().html(sizeDrop);
                $("#shown_in_sku").html(sColor + ", " + r.materialNumber);
                $("#sapMID").text(r.materialNumber);
                $("#shown_in_2").html(nColor + " (" + nsku + ")");
                setSkuLabel(r.skuVariants[0].skuLabel);
            } else {
                // accessories
                var sizeOpt = "";
                for (var i = 0; i < r.skuVariants.length; i++) {
                    var elem = r.skuVariants[i], nsku = elem.skuId, inStock = elem.stockAvailability, nColor = elem.lensColor;
                    _this.skuData[nsku] = elem;
                    $("#cartSkuId").val(nsku);
                    prodComingSoon = r.skuVariants[i].isComingSoon;
                }
                $("#shown_in_sku").html(sColor + ", " + r.materialNumber + " (" + nsku + ")");
                $("#sapMID").text(r.materialNumber);
                setSkuLabel(r.skuVariants[0].skuLabel);
            }
            
            // update product detail
            if ($("#eyewear-sku").length) {
                $(".pdp_details_text").each(function() {
                    $(this).contents().first().replaceWith(r.details);
                })
            } else {
                $(".pdp_details_text").html(r.details);
            }
            $(".details_list").html(r.detailsList);
            if ($("#apparel-sku").length) {
                $(".sizeSection").html(r.sizing);
            }
            
            var skuCount = r.skuVariants.length;
            if (skuCount == 1) {
                if (prodComingSoon != "true") { 
                    $("#comingSoonProduct").hide();
                    $("#shoppableProduct").show();
                } else {
                    $("#comingSoonProduct").show();
                    $("#shoppableProduct").hide();
                }
            }
            
            var prodId = r.productId;
            $("#sku_name").html(r.productName);
            $("#breadCrumbs > span:last-child span").html(r.productName);
            _this.selName = r.productName;
            $("#cartProdId").val(prodId);
            _this.selProd = prodId;
            _this.selSku = $("#cartSkuId").val();
            _this.selMatNum = r.materialNumber;
            
            // Set size
            $("#product-size").empty().html(sizeOpt);
            
            _this.cur[0] = _this.selProd;
            _this.cur[1] = _this.selSku;
            _this.cur[2] = _this.selName;
            
            // Set images
            var curProd = $("#current-product");
            var anglesArr = ["dualViewImage","sideViewLarge","topViewImage","frontViewImage","largeAlt1Image","largeAlt2Image","largeAlt3Image","largeAlt4Image"];
            
            curProd.attr("src", r.dualViewImage);
            
            pdpAngle.slick("slickUnfilter");
            pdpAngle.find(".slick-slide").not(".pdp-vid").removeClass("show current");
            $("#angle_0").parents("li").addClass("show current");
            
            for (var i = 0; i < anglesArr.length; i++) {
                if (r[anglesArr[i]]) {
                    var imgPath = r[anglesArr[i]];
                    $("#angle_"+ i).attr("src", imgPath).parent().attr("href", imgPath).parent("li").addClass("show");
                    $("#mob_small_img_" + i).attr("src", imgPath).parent("li").addClass("show");
                }
            }
            
            // Set video
            if (r.videoThumbnailURL != "") {
                $(".pdp-vid").addClass("show").find(".th-vid").attr("data-modal-vid-id",r.videoURL).addClass("show").find("img").attr("src",r.videoThumbnailURL);
                $(document).foundation('reflow');
                _this.handleVideos();
                brightCovePlayer.addPlayer();
            }
            
            pdpAngle.slick("slickFilter",".show");
            
            if ((mSlider.slick("slickCurrentSlide")+1) > mSlider.find(".slick-slide").length) {
                mSlider.slick("slickGoTo", 0)
            }

            // Set price
            if (!r.hasOwnProperty("productSalePrice")) {
                var priceDisplay = '<span class="off-screen">' + $("#price-t").text() + '</span>';
                    priceDisplay += r.productPrice;
                $("#prd_price").html(priceDisplay);
                _this.selPrice = r.productPrice;
            } else {
                var priceDisplay = '<span class="off-screen">' + $("#org-price-t").text() + '</span>';
                    priceDisplay += '<span class="oldPrice">' + r.productPrice + '</span>';
                    priceDisplay += '<span class="off-screen">' + $("#sale-price-t").text() + '</span>';
                    priceDisplay += '<span class="salePrice">' + r.productSalePrice + '</span>';
                    $("#prd_price").html(priceDisplay);
                    _this.selPrice = '<span class="oldPrice">' + r.productPrice + '</span>';
                    _this.selPrice += '<span class="salePrice">' + r.productSalePrice + '</span>';
            }

            //Set sku loyalty
            var rwMsg = $("#pdp-rw-msg");
            rwMsg.find(".stamps-data").html(r.skuLoyaltyStamp);
            rwMsg.find(".loyalty-member").html(r.skuLoyaltyCampaign);

            var salePercentage = $("#salePercentage");
            if ($(".salePrice", pdpName).length) {
                var listPrice = $(".oldPrice", pdpName).text().match(/\d+\.?\d+/)[0]*1;
                var salePrice = $(".salePrice", pdpName).text().match(/\d+\.?\d+/)[0]*1;
                var salePer = (listPrice - salePrice) * 100/listPrice;
                
                if (salePercentage.length) {
                    salePercentage.text('SAVE ' +Math.round(salePer) + '%').css("visibility", "visible");
                } else {
                    $('<span class="saveper" id="salePercentage">SAVE ' + Math.round(salePer) + '%</span>').insertBefore("#myDiv");
                    salePercentage.css("visibility", "visible");
                }
            } else {
                salePercentage.css("visibility", "hidden");	 
            }
            
            // Set urgency message
            var pageMsg = $.trim(r.urgencyMessageText), msgSize = $.trim(r.urgencyMessageTextSize),
                msgColor = $.trim(r.urgencyMessageTextColor), msgStyle = {};
            if ((pageMsg !== undefined) && (pageMsg != "")) {
                var msgDiv = (r.urgencyMessagePositioning == "Top") ? "#page-msg-top" : "#page-msg-bottom";
                if (msgSize != "") {
                    msgStyle["font-size"] = msgSize + "px";
                }
                if (msgColor != "") {
                    msgStyle["color"] = "#" + msgColor;
                }
                $(msgDiv).text(pageMsg).css(msgStyle);
            }
            
            //clearTimeout(tm);
            //_this.loadYmal(r.ymal);
        }, "json");
    },
    /*
     *  Reload YMAL after product switch
     */
    loadYmal: function(ymal) {
        var content = '<li><ul class="medium-block-grid-4 text-center hide-for-small-only">';
        for (var i = 0; i < ymal.length; i++) {
            var el = ymal[i], pName = el.prodDisplayName;
            if ((i > 0) && (i % 4 == 0)) {
                content += '</ul></li><li><ul class="medium-block-grid-4 text-center hide-for-small-only">';
            }
            content += '<li><a href="' + el.templateUrl + '">';
            content += '<figure>';
            content += '<img src="' + el.imageUrl + '" alt="' + pName + '" title="' + pName + '" class="prod-carousel-img" />';
            content += '<figcaption>';
            content += '<div class="tag"><span class="red-label">NEW</span></div>';
            content += '<div class="product-name"><p>' + pName + '</p></div>';
            content += '<div class="price"><span>' + el.priceValue + '</span></div>';
            content += '</figcaption>';
            content += '</figure>';
            content += '</a></li>';
        }
        content += "</ul></li>";
        $(".ymal-slider").slick("unslick").find("li").remove().end().append(content).slick();

    },
    /*
     *  Display sku attributes on size change
     */
    changeSize: function(anchor) {
        if (!anchor.parent().hasClass("oos")) {
            var _this = this, selectedSku = anchor.attr("id"),
                shownSku = $("#shown_in_sku"), shownIn = shownSku.html();
            $("#cartSkuId").val(selectedSku);
            _this.selSku = selectedSku;
            _this.cur[1] = _this.selSku;
            _this.selSize = anchor.text();
            _this.cur[4] = _this.selSize;
            
            if (!$.isEmptyObject(_this.skuData)) {
                // Set sku label
                setSkuLabel(_this.skuData[selectedSku].skuLabel);
                //is coming soon start
                var isComingSoon = _this.skuData[selectedSku].isComingSoon;
                if (isComingSoon == "true") {
                    $("#comingSoonProduct").show();
                    $("#shoppableProduct").hide();
                    // TODO: redo logic if Coming Soon is SKU level
                    //this.removeOOSClassForComingSoonSizes();
                } else {
                    $("#comingSoonProduct").hide();
                    $("#shoppableProduct").show();
                }
            }
            // Added fix for IP-15044
            if (shownSku.length && shownIn.indexOf("(") != -1) {
                shownIn = shownIn.substring(0, shownIn.indexOf("("));
            }
            shownSku.html(shownIn+" ("+selectedSku+")");
            $(".product-size").removeClass("open");
            $("#pdp_size").removeClass("active");
        }
    },
    /*
     *  Update UI for Also Available In
     */
    changeAlsoAvailable: function(pId) {
        $("#available-colors").children("li").each(function () {
            var a = $(this).children("a").attr("data-pid");
            if (a == pId) {
                this.style.display = "none";
            } else {
                this.style.display = "block";
            }
        });
        $("#available-colorsmob").find("a").each(function () {
            var a = $(this).attr("data-pid");
            if (a == pId) {
                this.style.display = "none";
            } else {
                this.style.display = "inline-block";
            }
        });
    },
    /*
     *  Handle videos
     */
    handleVideos: function() {
        if (this.isIPhone) {
            var vidCntr = $("#mobile_hero_image .th-vid");
            vidCntr.removeAttr("data-reveal-id");
            var options = {"data-vid-id": vidCntr.attr("data-modal-vid-id"), "class": "flex-video vid-hack"};
            $("<div />", options).prependTo(vidCntr);
            vidCntr.on("click", function() {
                var mobVid = $(this).find(".vid-hack").data("vidjs");
                if (mobVid) {
                    mobVid.play();
                }
            });
        } else {
            $(document).on("click", "#prodvid", function(e) {
                e.preventDefault();
                $("#product-video .overlay-header").html("<h2>" + _PDP.selName + "</h2>");
            });
        }
    }
}

$(function() {
    _PDP.init();
    
    $(document).foundation('reveal', 'reflow');
    $(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
        var $this = $(".overlay-content", this);
        if ($("object", this).length) {
            $this = $("object", this);
        } else if ($("table", this).length) {
            $this = $("table", this);
        }
        $this.attr("tabindex","-1").focus().click();
    });
    $(document).on('closed.fndtn.reveal', '[data-reveal]', function () {
        $(".last-focus").focus().removeClass(".last-focus");
    });
    
});

if (typeof TOMS_BAG == 'undefined' || TOMS_BAG == '') {
    TOMS_BAG = "/shopping-bag";
};

function setSkuLabel(w) {
    var o = w.split('-');
    for (var i = 0; i < o.length; i++) {
        var idx = i;
        if (i == 0) {
            idx = '';
        }
        if (o[i] != undefined && o[i] != '') {
            $('#product_state' + idx).html(o[i]).parent(".label-wrap").css("display","inline-block");
        } else {
            $('#product_state' + idx).empty().parent(".label-wrap").css("display","none");
        }
    }
}

function imgErr(image) {
    image.onerror = "";
    $(this).addClass('in-error');
    image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    return true;
}
    
window.addEventListener("load", function() {
    if ((typeof $BV != 'undefined') && ($BV != undefined)) {
        $BV.configure('global', { productId : _PDP.selProd });
        $BV.ui( 'rr', 'show_reviews', {});
	}
}, false);

$('.rw-tooltip').hover(function() {
    var elementID = $(this).attr('aria-describedby');
    $(this).find('#'+elementID).attr('aria-hidden','false');
}, function() {    
    var elementID = $(this).attr('aria-describedby');    
    $(this).find('#'+elementID).attr('aria-hidden','true');
});
