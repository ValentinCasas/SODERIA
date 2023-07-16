function test() {
    var tabsNewAnim = document.querySelector("#navbarSupportedContent");
    var selectorNewAnim = document.querySelectorAll("#navbarSupportedContent li").length;
    var activeItemNewAnim = tabsNewAnim.querySelector(".active");
    var activeWidthNewAnimHeight = activeItemNewAnim?.offsetHeight;
    var activeWidthNewAnimWidth = activeItemNewAnim?.offsetWidth;
    var itemPosNewAnimTop = activeItemNewAnim?.offsetTop;
    var itemPosNewAnimLeft = activeItemNewAnim?.offsetLeft;
    document.querySelector(".hori-selector").style.top = itemPosNewAnimTop + "px";
    document.querySelector(".hori-selector").style.left = itemPosNewAnimLeft + "px";
    document.querySelector(".hori-selector").style.height = activeWidthNewAnimHeight + "px";
    document.querySelector(".hori-selector").style.width = activeWidthNewAnimWidth + "px";
    
    var navItems = document.querySelectorAll("#navbarSupportedContent li");
    navItems.forEach(function (item) {
      item.addEventListener("click", function (e) {
        navItems.forEach(function (navItem) {
          navItem.classList.remove("active");
        });
        this.classList.add("active");
        var activeWidthNewAnimHeight = this.offsetHeight;
        var activeWidthNewAnimWidth = this.offsetWidth;
        var itemPosNewAnimTop = this.offsetTop;
        var itemPosNewAnimLeft = this.offsetLeft;
        document.querySelector(".hori-selector").style.top = itemPosNewAnimTop + "px";
        document.querySelector(".hori-selector").style.left = itemPosNewAnimLeft + "px";
        document.querySelector(".hori-selector").style.height = activeWidthNewAnimHeight + "px";
        document.querySelector(".hori-selector").style.width = activeWidthNewAnimWidth + "px";
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
      test();
    });
  });
  
  window.addEventListener("resize", function () {
    setTimeout(function () {
      test();
    }, 500);
  });
  
  var navbarToggler = document.querySelector(".navbar-toggler");
  navbarToggler.addEventListener("click", function () {
    var navbarCollapse = document.querySelector(".navbar-collapse");
    navbarCollapse.style.display = navbarCollapse.style.display === "none" ? "block" : "none";
    setTimeout(function () {
      test();
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    var path = window.location.pathname.split("/").pop();
    if (path === "") {
      path = "index.html";
    }
    var target = document.querySelector('#navbarSupportedContent ul li a[href="' + path + '"]');
    if (target) {
      target.parentNode.classList.add("active");
    }
  });
  
  
// Add active class on another page linked
// ==========================================
window.addEventListener('load', function () {
    var current = location.pathname;
    console.log(current);
    var navLinks = document.querySelectorAll('#navbarSupportedContent ul li a');
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href.indexOf(current) !== -1) {
        link.parentNode.classList.add('active');
        link.parentNode.parentNode.classList.add('show-dropdown');
        link.parentNode.parentNode.parentNode.classList.add('active');
      } else {
        link.parentNode.classList.remove('active');
      }
    });
  });
  
  