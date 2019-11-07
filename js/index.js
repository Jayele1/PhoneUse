    $(document).ready(function()
    {
        $("#gif1").hover(
            function()
            {
              var src = $(this).attr("src");
              $(this).attr("src", src.replace(/\.png$/i, ".gif"));
              $(".phone #info1").show();
             
             
                        },
            function()
            {
              var src = $(this).attr("src");
              var phone = $(".phone .info").style;
              $(this).attr("src", src.replace(/\.gif$/i, ".png"));
              $(".phone #info1").hide();
            });
        $("#gif2").hover(
            function()
            {
              var src = $(this).attr("src");
              $(this).attr("src", src.replace(/\.png$/i, ".gif"));
              $(".phone #info2").show();
             
             
                        },
            function()
            {
              var src = $(this).attr("src");
              var phone = $(".phone .info").style;
              $(this).attr("src", src.replace(/\.gif$/i, ".png"));
              $(".phone #info2").hide();
            });
        $("#gif3").hover(
            function()
            {
              var src = $(this).attr("src");
              $(this).attr("src", src.replace(/\.png$/i, ".gif"));
              $(".phone #info3").show();
             
             
                        },
            function()
            {
              var src = $(this).attr("src");
              var phone = $(".phone .info").style;
              $(this).attr("src", src.replace(/\.gif$/i, ".png"));
              $(".phone #info3").hide();
            });
    });

        // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

            <!--//--><![CDATA[//><!--
            var images = new Array()
            function preload() {
                for (i = 0; i < preload.arguments.length; i++) {
                    images[i] = new Image()
                    images[i].src = preload.arguments[i]
                }
            }
            preload(
                "avg.gif",
                "monday.gif",
                "friday.gif",
                "avg.png",
                "monday.png",
                "friday.png"
            )
        //--><!]]>